# コードレビューガイド

## レビュアーが確認したいこと

### MUST(厳しめ)

- lint が通っているか
  - `pnpm lint` を実行し、エラーがないか確認する
- 型チェックが通っているか
  - `pnpm exec tsc --noEmit` を実行し、型エラーがないか確認する
- テストが通っているか
  - `pnpm test` を実行し、テストが通っているか確認する
- （実装されていれば）コードの実装が issue と齟齬がないか
- （実装されていれば）単体テストの実装が issue と齟齬がないか
- （実装されていれば）integration テストの実装が issue と齟齬がないか

### SHOULD(緩め)

- 単体テストの実装がテスト方針（@rules/guidelines/test.md）に沿っているか
- コードがコーディング規約（@rules/guidelines/coding-rules.md）に沿っているか
- コードがアーキテクチャ（@rules/guidelines/architecture.md）に沿っているか
