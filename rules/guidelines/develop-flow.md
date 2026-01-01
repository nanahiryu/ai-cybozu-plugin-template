# 開発フロー

## セットアップ

開発を開始する前に、以下を実行してください：

```bash
pnpm install
```

これにより依存関係がインストールされ、Husky の pre-commit hook も設定されます。

## 各フェーズの詳細手順

### 1. 計画を立てる (`/plan`)

1. `.working/PLAN_{yyyymmdd}_{hhmmss}.md` に計画を記載
2. ブランチ作成: `git switch -c feature/plan`
3. コミット: 計画ファイルのみ
4. PR 作成

### 2. E2E, Integration テストを書く (`/design-test`)

1. ブランチ作成: `git switch -c feature/design-test`
2. テスト環境セットアップ
3. Integration テスト実装（skip 状態）
4. E2E 認証テスト実装
5. E2E その他テスト実装（skip 状態）
6. テスト実行
7. コミット
8. PR 作成

### 3. Issue を作成 (`/issue`)

GitHub Issues として課題を作成します。

### 4. 実装 (subagent を利用)

1. ブランチ作成: `git switch -c feature/xxx`
2. 実装が進むたびに実装箇所の handler のテストの skip を削除していく
3. 小さい単位で「実装 → テスト実行 → コミット」を繰り返す

### 5. デプロイ (手動)

`pnpm deploy` コマンドでデプロイします。

## コミット前の必須確認

以下を必ず確認してからコミットしてください：

- テスト実行済み: `pnpm test`
- Lint 確認: `pnpm lint`
- 型チェック: `pnpm exec tsc --noEmit`
- ビルド成功: `pnpm build`
- 不要なファイルがないか: `git status`

## 自動化

### Pre-commit hook (Husky)

コミット前に Lint を自動実行するため、Husky を使用します。
詳細は `.husky/pre-commit` を参照してください。

### GitHub Actions CI/CD

`.github/workflows/test.yml` で Lint とテストを自動実行します。
詳細は `.github/workflows/test.yml` を参照してください。
