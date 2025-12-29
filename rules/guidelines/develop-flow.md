# 開発フロー

## 各フェーズの詳細手順

### 1. 計画を立てる (`/plan`)

1. `.working/PLAN_{timestamp}.md` に計画を記載
2. ブランチ作成: `git switch -c feature/plan`
3. コミット: 計画ファイルのみ

### 2. E2E, Integration テストを書く (`/design-test`)

1. ブランチ作成: `git switch -c feature/design-test`
2. テスト環境セットアップ
3. Integration テスト実装（skip 状態）
4. E2E 認証テスト実装
5. E2E その他テスト実装（skip 状態）
6. テスト実行
7. コミット

### 3. Issue を作成 (`/issue`)

GitHub Issues として課題を作成します。

### 4. 実装 (subagent を利用)

1. ブランチ作成: `git switch -c feature/xxx`
2. 小さい単位で「実装 → テスト実行 → コミット」を繰り返す

### 5. デプロイ (手動)

`pnpm deploy` コマンドでデプロイします。

## コミット前の必須確認

以下を必ず確認してからコミットしてください：

- テスト実行済み: `pnpm test`, `pnpm test:e2e`
- Lint 確認: `pnpm lint`
- 不要なファイルがないか: `git status`

## 自動化

### Pre-commit hook (Husky)

コミット前にLintを自動実行するため、Huskyを使用します。
セットアップ方法は以下の通りです：

```bash
pnpm add -D husky
pnpm exec husky init
```

`.husky/pre-commit` ファイル:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Lintチェック
echo "Running lint..."
pnpm lint

# Lint失敗時はコミットを中止
if [ $? -ne 0 ]; then
  echo "❌ Lint failed. Please fix the errors before committing."
  exit 1
fi
```

`package.json` に以下を追加:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

### GitHub Actions CI/CD

`.github/workflows/test.yml` でLintとテストを自動実行します。
詳細は `.github/workflows/test.yml` を参照してください。
