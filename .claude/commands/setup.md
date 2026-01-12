---
description: 初回セットアップを実行するコマンド
---

# /setup - 初回セットアップを実行する

プラグイン開発の初回セットアップをガイド付きで実行するコマンド

---

## 概要

プラグイン開発を始める際に必要な以下のステップを一括で実行します：

1. 依存関係のインストール (`pnpm i`)
2. 秘密鍵の生成 (`pnpm gen-ppk`)
3. manifest.json の設定（プラグイン名の入力）
4. 初回デプロイ (`pnpm run deploy`)

## 実行タスク

### 1. 依存関係のインストール

```sh
pnpm i
```

### 2. 秘密鍵の生成

```sh
pnpm gen-ppk
```

※ すでに `private.ppk` が存在する場合はスキップ

### 3. manifest.json の設定

ユーザーに以下を確認してください：

- プラグイン名（日本語）【必須】
- プラグイン名（英語）【任意】※ 未入力の場合は日本語名を使用
- プラグインの説明（日本語）【任意】
- プラグインの説明（英語）【任意】
- ホームページ URL【任意】

確認後、`plugin/manifest.json` の以下のフィールドを更新：

- `name.ja` - 日本語プラグイン名
- `name.en` - 英語プラグイン名（未入力時は日本語名を設定）
- `description.ja` - 日本語説明（任意）
- `description.en` - 英語説明（任意）
- `homepage_url.ja` - ホームページ URL（任意）
- `homepage_url.en` - ホームページ URL（任意、ja と同じ値を設定）

### 4. 初回デプロイ

```sh
pnpm run deploy
```

### 5. GitHub Secrets への環境変数登録（任意）

CI で E2E テストを実行したい場合、`.env` の内容を GitHub Secrets に登録します。

ユーザーに GitHub Secrets への登録を行うか確認してください。
希望する場合、以下のコマンドを実行します：

```sh
# E2Eテストを有効化（Repository Variables）
gh variable set E2E_ENABLED --body "true"

# 環境変数をSecretsに登録
gh secret set BASE_URL --body "<.envのBASE_URL値>"
gh secret set USERNAME --body "<.envのUSERNAME値>"
gh secret set PASSWORD --body "<.envのPASSWORD値>"
```

※ `.env` ファイルから値を読み取り、上記コマンドを実行してください
※ `SPACE_ID`, `THREAD_ID`, `APP_ID`, `PLUGIN_ID` は E2E テスト内容に応じて必要であれば追加
※ `E2E_ENABLED` が `true` でない場合、CI では E2E テストはスキップされます

## 完了メッセージ

セットアップ完了後、以下を案内してください：

- `pnpm dev` で開発サーバーを起動できること
- `plugin/` ディレクトリにプラグインファイルが生成されること
- kintone にプラグインをアップロードする手順
