## `features/` ディレクトリ

- アプリを **機能（ドメイン）ごとに束ねる層**。
- `features/<domain>/` として、ユーザー管理・リクエスト管理などの単位で分ける。
- 各ドメインの「画面の本体（Screen）」「ドメイン専用 components / hooks」をここに置く。
- URL と結びつくのは `app/`、機能の中身は `features/` に寄せる。

