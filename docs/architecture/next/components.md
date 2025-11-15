## `components/` ディレクトリ

- **ドメインに依存しない共通 UI / レイアウト** を置く層。
- 例: `components/ui`（shadcn/ui などの primitive）, `components/layout`（AppShell, Header など）。
- コンポーネント名や props にドメイン用語（User, Request など）が出てくるものは置かない。
- それらは `features/<domain>/components` 側に置く。

