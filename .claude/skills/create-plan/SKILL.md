---
name: create-plan
description: |
  実装用のプランを作成する。issue ベースまたは PR review ベースで作成可能。
  WHEN: /create-plan 実行時、実装プラン作成時
  WHEN NOT: 仕様書作成時、テスト設計時、コードレビュー時
argument-hint: issue <issue番号...> | review <PR番号>
model: claude-opus-4-5-20251101
---

# /create-plan - 実装プラン作成

## 概要

issue または PR review の情報を取得し、plan mode に入ってプランを作成するラッパースキル。

## 使用方法

### issue モード

`/create-plan issue <issue番号> [issue番号2] ...`

issue の内容を元にプランを作成。

### review モード

`/create-plan review <PR番号>`

PR についた review comment を収集し、修正プランを作成。

## 手順

### issue モード

1. `gh issue view <issue-number>` で issue 内容を確認
2. `docs/spec/` 配下の仕様書を確認
3. 依存関係を整理し、実装順序を決定
4. **plan mode に入り、テンプレートに従ってプランを作成**

### review モード

1. `gh pr view <PR番号>` で PR 内容を確認
2. `scripts/get-unresolved-reviews.sh <PR番号>` で未解決レビューコメント取得
3. 各コメントの指摘内容を整理
4. **plan mode に入り、テンプレートに従って修正プランを作成**

## 実装順序の原則

依存関係に基づいて以下の順序で実装:

1. **Domain 層** - ビジネスロジック
2. **Infra 層** - 外部連携（API、ストレージ）
3. **UI 層** - プラグイン設定画面
4. **Handler 層** - kintone イベントハンドラ

## 出力

plan mode により `.plan/` ディレクトリに出力される。

ファイル名形式: `{yyyymmdd}_{hhmmss}_{識別子}_{作業内容}.md`

例:

- issue: `.plan/20260112_100000_i11_fix-xxx-test.md`
- review: `.plan/20260112_100000_pr50_fix-review-comments.md`

テンプレート: [templates/plan.md](templates/plan.md)
