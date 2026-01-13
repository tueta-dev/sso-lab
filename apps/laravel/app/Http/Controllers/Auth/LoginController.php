<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    /**
     * @see https://www.keycloak.org/securing-apps/oidc-layers
     * @see https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowSteps
     */
    public function __invoke(Request $request): RedirectResponse
    {
        // 認証リクエストの準備
        $config = config('keycloak');

        $state = Str::random(40);
        $nonce = Str::random(40);
        $request->session()->put('keycloak_oauth_state', $state);
        $request->session()->put('nonce', $nonce);

        // 必須パラメータの組み立て
        $query = http_build_query([
            'client_id' => $config['client_id'],
            'redirect_uri' => $config['redirect_uri'],
            'response_type' => 'code',
            'scope' => 'openid',
            'state' => $state,
            'nonce' => $nonce,
        ]);

        // 認可エンドポイント
        $authorizeUrl = rtrim($config['public_base_url'], '/') . '/realms/' . $config['realm'] . '/protocol/openid-connect/auth?' . $query;

        // KeyCloak側へ
        return redirect()->away($authorizeUrl);
    }
}
