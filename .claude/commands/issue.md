---
description: GitHub Issue 作成支援を行うコマンド
---

# /issue - GitHub Issue 作成

実装計画を Issue 化してから着手する（Issue 駆動開発）

## Issue 作成手順

1. 設計ドキュメント（`/plan`）の確認
2. 実装タスクの洗い出し（Domain → Infra → Handler → UI の順）
3. 適切な粒度に分割
4. 依存関係の整理
5. GitHub Issue を作成

## 適切な粒度

- コード変更ファイル数が多くなりすぎない(基準は 10 ファイル)
  - 変更内容が簡単なものであれば超えても構わない（lint, コメントなどの削除, リアーキテクチャによるコード移動など）
- コード変更行数も多くなりすぎない(基準は 500 行)
  - 変更内容が簡単なものであれば超えても構わない（lint, コメントなどの削除, リアーキテクチャによるコード移動など）
- 関心が他に移る場合は PR を分割する
  - 例: A ハンドラと B ハンドラをまとめて 1PR で作成するのではなく、A ハンドラと B ハンドラを別々の PR で作成する

例:

- "Domain 層: 価格計算ロジックの実装"
- "Handler 層: レコード保存前イベントの実装"
- "E2E: レコード作成フローのテスト"

## テンプレート

@rules/template/issue.md

## ラベル

- `layer:domain` / `layer:infra` / `layer:handler` / `layer:ui`
- `type:feature` / `type:bug` / `type:test`
- `priority:high` / `priority:medium` / `priority:low`

## 開発フロー

```
Issue選択 → ブランチ作成 → 実装 → テスト → PR作成（Closes #XX）→ マージ
```

## チェックリスト

- [ ] タイトルが簡潔でわかりやすい
- [ ] Acceptance Criteria が明確
- [ ] 1 日以内で完了できる粒度
- [ ] 依存関係が整理されている
- [ ] 適切なラベルが付いている
