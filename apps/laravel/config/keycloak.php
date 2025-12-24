<?php

return [
    'base_url' => env('KEYCLOAK_BASE_URL', 'http://localhost:8080'),
    // ブラウザから到達できるURL（リダイレクト用）
    'public_base_url' => env('KEYCLOAK_PUBLIC_BASE_URL', env('KEYCLOAK_BASE_URL', 'http://localhost:8080')),
    // API サーバー(Laravelコンテナ)から到達できるURL（トークン取得用）
    'internal_base_url' => env('KEYCLOAK_INTERNAL_BASE_URL', env('KEYCLOAK_BASE_URL', 'http://localhost:8080')),
    'realm' => env('KEYCLOAK_REALM', 'master'),
    'client_id' => env('KEYCLOAK_CLIENT_ID', 'laravel-app'),
    'client_secret' => env('KEYCLOAK_CLIENT_SECRET'),
    'redirect_uri' => env('KEYCLOAK_REDIRECT_URI', env('APP_URL') . '/auth/callback'),
    'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),
];
