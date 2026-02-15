# ai-cybozu-plugin-template

AI エージェントと共に、kintone プラグインを開発するためのテンプレートプロジェクトです。

## セットアップ

### 依存関係のインストール

```bash
pnpm install
```

### 環境変数の設定

`.env` ファイルをプロジェクトルートに作成し、以下の環境変数を設定してください。

```env
BASE_URL=https://your-domain.cybozu.com
USERNAME=your-username
PASSWORD=your-password
```

### 秘密鍵の生成

kintone プラグインのパッケージングに必要な秘密鍵を生成します。

```bash
pnpm gen-ppk
```

## 開発

### ビルド

```bash
pnpm build       # 本番ビルド
pnpm dev         # 開発モード（ウォッチモード）
```

### テスト実行

```bash
pnpm test        # Unit/Integration テスト
pnpm test:e2e    # E2E テスト
```

### デプロイ

```bash
pnpm deploy      # ビルド → パッケージング → アップロードを一括実行
```

個別に実行する場合：

```bash
pnpm build       # ビルド
pnpm package     # プラグインのパッケージング
pnpm upload      # kintoneへアップロード
```

## Claude Code / MCP 設定

### Playwright MCP

E2E テストの実行や kintone 画面の確認に Playwright MCP を利用できます。

`.mcp.json` で設定済みのため、追加のセットアップは不要です。`.env` の認証情報を使って自動ログインします。

## プロジェクト構成

詳細は `.claude/rules/` ディレクトリ内のドキュメントを参照してください。

- `CLAUDE.md` - AI エージェントへの指示
- `.claude/rules/` - 開発ガイドライン
