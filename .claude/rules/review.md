# コードレビューガイド

## レビュアーが確認したいこと

### MUST(厳しめ)

- lint が通っているか
  - `pnpm lint` を実行し、エラーがないか確認する
- 型チェックが通っているか
  - `pnpm exec tsc --noEmit` を実行し、型エラーがないか確認する
- 単体テスト, integration テストが必要な関数に対して、適切に実装されているか
- テストが通っているか
  - `pnpm test` を実行し、テストが通っているか確認する
- （実装されていれば）コードの実装が issue と齟齬がないか
- （実装されていれば）単体テストの実装が issue と齟齬がないか
- （実装されていれば）integration テストの実装が issue と齟齬がないか

### SHOULD(緩め)

- 単体テストの実装がテスト方針（@.claude/rules/test.md）に沿っているか
- コードがコーディング規約（@.claude/rules/coding-rules.md）に沿っているか
- コードがアーキテクチャ（@.claude/rules/architecture.md）に沿っているか
  - infra/, domain/, handler/, components/の依存関係は適切か
  - domain/で kintone オブジェクトにアクセスしていたり、その他外部 API を呼び出していないか
  - ui/でロジックを実装していないか
  - ui/で複数の UI コンポーネントを束ねた複雑かつ汎用性の低い UI コンポーネントを実装していないか
