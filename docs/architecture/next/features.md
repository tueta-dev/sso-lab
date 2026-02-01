## `features/` ディレクトリ

- アプリを **機能（ドメイン）ごとに束ねる層**。
- `features/<domain>/` として、ユーザー管理・リクエスト管理などの単位で分ける。
- 各ドメインの「画面の本体（Screen）」「ドメイン専用 components / hooks」をここに置く。
- URL と結びつくのは `app/`、機能の中身は `features/` に寄せる。

### サブ構成の考え方（最小 → 必要に応じて拡張）
まずは最小構成で始め、規模や複雑さに応じて段階的に分割する。

**最小構成（まずはここから）**
- `components/`：ドメイン専用 UI（共通化できるものは `components/` 直下へ昇格）
- `lib/`：ドメイン専用のユーティリティや処理
- `format.ts` など：小さな共通処理

**拡張構成（必要になったら）**
- `components/server/`：Server Components（ページテンプレート）
- `components/client/`：Client Components（Container / Presenter / Hook 層）
- `hooks/`：クライアントロジック（例: TanStack Query）
- `queries/`：クエリキーや DTO ヘルパー
- `actions/`：Server Actions の薄いラッパー
- `types/`：型定義・Enum など

### 置き場の判断基準
- **共通 UI** なら `components/` 直下へ
- **ドメイン専用** なら `features/<domain>/components`
- **処理がドメイン依存** なら `features/<domain>/lib`
