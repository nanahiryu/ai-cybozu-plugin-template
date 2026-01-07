# 開発フロー

## セットアップ

開発を開始する前に、以下を実行してください：

```bash
pnpm install
```

これにより依存関係がインストールされ、Husky の pre-commit hook も設定されます。

## プラグイン開発の着手からリリースまでのフロー

### 最もシンプルなフロー

1. 仕様書を作成する(`/create-spec`)
2. 課題を作成する(`/issue`)
3. テストの設計と実装を行う(`/design-test`)
4. issue ベースで実装用のプランを行う(`/plan`)
5. 実装を行う(`/do-plan`)
6. テスト実行を行う(`/qa`)

### 修正を伴う際のフロー

1. 仕様書を作成する(`/create-spec`)
2. 課題を作成する(`/issue`)
3. テストの設計と実装を行う(`/design-test`)
4. issue ベースで実装用のプランを行う(`/plan`)
5. 実装を行う(`/do-plan`)
6. テスト実行を行う(`/qa`)
7. テストが通らない場合は課題を作成し直す(`/issue`)
8. 実装のプランを行う(`/plan`)
9. 実装を行う(`/do-plan`)
10. テスト実行を行う(`/qa`)
11. 7~10 を繰り返す

## 各フェーズの詳細手順

### 仕様書を作成する (`/create-spec`)

1. `/docs/spec/` に仕様書を記載
2. ブランチ作成: `git switch -c feature/create-spec`
3. コミット: 仕様書ファイルのみ
4. PR 作成

### 課題を作成する (`/issue`)

1. GitHub Issues として課題を作成
2. ブランチ作成: `git switch -c feature/issue`
3. コミット: 課題ファイルのみ
4. PR 作成

### E2E, Integration テストを書く (`/design-test`)

1. ブランチ作成: `git switch -c feature/design-test`
2. テスト環境セットアップ
3. Integration テスト実装（skip 状態）
4. E2E 認証テスト実装
5. E2E その他テスト実装（skip 状態）
6. テスト実行
7. コミット
8. PR 作成

### 計画を立てる (`/plan`)

1. `.working/PLAN_{yyyymmdd}_{hhmmss}.md` に計画を記載
2. ブランチ作成: `git switch -c plan/{short-description}`
3. コミット: 計画ファイルのみ
4. PR 作成

### 実装を行う (`/do-plan`)

1. ブランチ作成: `git switch -c feature/{short-description}`
2. 実装が進むたびに実装箇所の handler のテストの skip を削除していく
3. 小さい単位で「実装 → テスト実行 → コミット」を繰り返す

### デプロイ (手動)

`pnpm run deploy` コマンドでデプロイします。

## 実装方針変更時のルール

- **実装方針変更前に必ずユーザーに確認を依頼してください**
- 実装中に方針が変更された場合は、関連するドキュメントも同時に修正すること。

- **仕様書**: UI のテキストや挙動が変わる場合は `docs/spec/` の該当箇所を更新
- **PR 説明**: 変更理由を明記

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
