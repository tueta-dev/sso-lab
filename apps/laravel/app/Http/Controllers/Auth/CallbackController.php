<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CallbackController extends Controller
{
    /**
     * Keycloak が OK を出すと、code と state を付けて redirect_uri に戻してくる
     * クライアント（Laravel）はその code を使ってトークン（access_token/id_token）を取得し、検証
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $config = config('keycloak');

        // state の検証
        $expectedState = $request->session()->pull('keycloak_oauth_state');
        $state = (string) $request->query('state');
        if (! $expectedState || $expectedState !== $state) {
            abort(400, 'Invalid state.');
        }

        // code の取得
        $code = (string) $request->query('code');
        if ($code === '') {
            abort(400, 'Missing authorization code.');
        }

        // トークンエンドポイントの作成
        $tokenEndpoint = rtrim($config['internal_base_url'], '/') . '/realms/' . $config['realm'] . '/protocol/openid-connect/token';

        // code を使って Access Token / ID Token を取得する
        $response = Http::asForm()->post($tokenEndpoint, [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => $config['redirect_uri'],
            'client_id' => $config['client_id'],
            'client_secret' => $config['client_secret'],
        ]);

        if (! $response->successful()) {
            abort(500, 'Failed to exchange authorization code.');
        }

        // 取得した JWT を header.payload.signature に分割
        $jwt = $response->json('id_token');
        [$header, $payload, $signature] = explode('.', $jwt);

        $decodeHeader = json_decode(base64_decode($header), true);
        $decodePayload = json_decode(base64_decode($payload), true);

        // alg の検証、署名アルゴリズムはRS256
        if ($decodeHeader['alg'] !== 'RS256') {
            abort(400, 'Invalid authorization code.');
        }

        // kid の取得 Key ID（キーの識別子）＝「どの鍵で署名したか」を示すタグ
        // Keycloak は署名にに使った鍵をローテーションするため、どの鍵かを特定する必要がある
        $kid = $decodeHeader['kid'];

        // 認可サーバーを一意に表す識別子
        $issuer = rtrim($config['internal_base_url'], '/');

        // 設定エンドポイント
        // @see https://www.keycloak.org/securing-apps/oidc-layers
        $wellKnown = $issuer.'/realms/'.$config['realm'].'/.well-known/openid-configuration';
        $oidc = Http::get($wellKnown)->throw()->json();

        // kid の検証に使う jwks_uri を取得
        $jwksUri = $oidc['jwks_uri'] ?? null;

        if (! $jwksUri) {
            throw new \RuntimeException('jwks_uri not found');
        }

        // jwks_uri が public のまま返る場合に内部URLへ置換
        $jwksUri = str_replace(
            rtrim($config['public_base_url'], '/'),
            $issuer,
            $jwksUri
        );

        // Certificate endpoint（証明書エンドポイント）から、レルムによって有効化された公開鍵を取得
        // JWK Set（JSON Web Key Set）
        $jwkSet = Http::get($jwksUri)->throw()->json('keys');
        $tokens = $response->json();
        $request->session()->put('keycloak_tokens', $tokens);

        return redirect()->away(rtrim($config['frontend_url'], '/') . '/');
    }
}
