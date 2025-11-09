# sso-lab

Keycloak + Next.js + Laravel で SSO の仕組みを理解するためのモノレポ。  
ローカルを汚さず Docker / Volta で環境（Next.js と Laravel）を構築する。

## 構成
- infra/keycloak # 認証基盤(Keycloak)
- apps/next # Next.js (フロント)
- apps/laravel # Laravel (API)


## 前提環境
- macOS
- Docker Desktop
- Volta（Node管理ツール）
- PHP / Composer は Docker内で完結

## 環境構築
```bash
# 1) クリーンビルド → 起動
docker compose build --no-cache
docker compose up -d

# 2) 雛形を“コンテナ内で”生成
# Laravel
docker compose run --rm laravel bash -lc \
  "test -f artisan || composer create-project laravel/laravel . && \
   php -r 'file_exists(\".env\") || copy(\".env.example\", \".env\");' && \
   php artisan key:generate"

# Next
docker compose run --rm next sh -lc \
  "test -f package.json || npm create next-app@latest . -- --ts --eslint"

# 3) 再起動 & 確認
docker compose up -d
docker compose ps
open http://localhost:8000
open http://localhost:3000

```