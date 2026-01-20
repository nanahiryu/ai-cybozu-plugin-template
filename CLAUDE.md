# CLAUDE.md

- このプロジェクトは、AI エージェントと共に、kintone プラグインを開発するためのプロジェクトです。
- このリポジトリをフォークしてプロジェクトを開始することができます

## 最初に読むべきドキュメント

### Tier 1: 常時参照（必須）

以下のドキュメントは常に参照すること:

- `rules/guidelines/architecture.md` - アーキテクチャ
- `rules/guidelines/coding-rules.md` - コーディング規約
- `rules/guidelines/develop-flow.md` - 開発フロー
- `rules/guidelines/git.md` - Git運用ルール

### Tier 2: 作業時参照

以下は該当作業時に参照:

- `rules/guidelines/test.md` - テスト実装時
- `rules/guidelines/architecture-e2e.md` - E2Eテスト時
- `rules/guidelines/kintone-api-reference.md` - API実装時
- `rules/guidelines/i18n.md` - 文言追加時
- `rules/guidelines/review.md` - レビュー時

## ドキュメント記載のルール

- 1 ファイルは 150 行以内に収める
- 関心ごとが分かれたり、行数が多くなりすぎたらファイルの分割を検討する
- 指示によってドキュメントを作成している場合は、ファイル分割の前に分割方針をユーザーに共有する
- 重複する内容は記載せず、ファイルへのリンクを貼るようにする
- markdown のパラグラフの構造は正確に記載する。具体的には以下を守る
  - 並列した情報の記載では同一の見出しレベルを使用する
  - 情報の詳細度を高める場合などは、見出しのレベルを下げる

## コマンド実行時の注意

- `.claude/settings.json` および `package.json` を確認し、実行許可されているコマンドを優先して利用する

## パッケージマネージャー

- このプロジェクトでは pnpm を使用する
- `npm` は `pnpm` に置き換えること
- `npx` は `pnpm exec` または `pnpm dlx` に置き換えること
  - `pnpm exec`: ローカルにインストール済みのパッケージを実行
  - `pnpm dlx`: 一時的にパッケージをダウンロードして実行
