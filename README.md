# ai-cybozu-plugin-template

AIエージェントと共に、kintoneプラグインを開発するためのテンプレートプロジェクトです。

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

kintoneプラグインのパッケージングに必要な秘密鍵を生成します。

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

## プロジェクト構成

詳細は `rules/guidelines` ディレクトリ内のドキュメントを参照してください。

- `CLAUDE.md` - AIエージェントへの指示
- `rules/guidelines/` - 開発ガイドライン
