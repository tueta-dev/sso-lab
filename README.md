# sso-lab

Keycloak + Next.js + Laravel で SSO の仕組みを理解するためのモノレポ。  
ローカルを汚さず Docker / Volta で環境を構築する。

## 構成
infra/keycloak # 認証基盤(Keycloak)

apps/next # Next.js (フロント)

apps/laravel # Laravel (API)

compose.yml # 全サービス起動


## 前提環境
- macOS
- Docker Desktop
- Volta（Node管理ツール）
- PHP / Composer は Docker内で完結