---
name: create-plan
description: |
  issue ベースで実装用のプランを作成する際に使用する。
  プラン作成のガイドライン、テンプレートを提供する。
  WHEN: /create-plan 実行時、実装プラン作成時
  WHEN NOT: 仕様書作成時、テスト設計時、コードレビュー時
argument-hint: [issue番号1] [issue番号2] ...
model: claude-opus-4-5-20251101
---

# /create-plan - issue ベースで実装プラン作成

issue ベースで実装用のプランを作成する。

## 入力

- issue 番号が 1 つ以上渡される

## 手順

### Step 1: issue の内容を確認

```sh
gh issue view <issue-number>
```

### Step 2: 仕様書の確認

`docs/spec/` 配下の仕様書を確認し、実装内容を把握する。

### Step 3: プラン作成

依存関係を整理し、実装順序を決定してプランを出力。

## 実装順序の原則

依存関係に基づいて以下の順序で実装:

1. **Domain 層** - ビジネスロジック
2. **Infra 層** - 外部連携（API、ストレージ）
3. **UI 層** - プラグイン設定画面
4. **Handler 層** - kintone イベントハンドラ

## 出力

`.working/{yyyymmdd}_{hhmmss}_{issue-numbers}_{作業内容}.md`

例:
- `.working/20260112_100000_i11_fix-xxx-test.md`
- `.working/20260112_100000_i12-i13-i14_create-xxx-handler.md`

FYI. テンプレート: [templates/plan.md](templates/plan.md)
