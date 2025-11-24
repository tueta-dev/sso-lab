FROM php:8.4-cli

# 作業ディレクトリ
WORKDIR /var/www/html

# 必要パッケージ & PHP拡張
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
 && rm -rf /var/lib/apt/lists/* \
 && docker-php-ext-install pdo pdo_mysql

# Composerを追加
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
