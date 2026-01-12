---
name: create-plan
description: |
  issue ベースで実装用のプランを作成する際に使用する。
  プラン作成のガイドライン、テンプレートを提供する。
  WHEN: /create-plan 実行時、実装プラン作成時
  WHEN NOT: 仕様書作成時、テスト設計時、コードレビュー時
---

# 実装プラン作成ガイド

## プラン作成の流れ

1. issue の内容を確認
2. 仕様書（`docs/spec/`）を参照
3. 実装内容に関して、依存関係を整理し、実装順序を決定
4. プランを`.working/`配下に出力
   - 例: `.working/{yyyymmdd}_{hhmmss}_{issue-numbers:i12-i13}_{作業内容}.md`

## 実装順序の原則

依存関係に基づいて以下の順序で実装:

1. **Domain 層** - ビジネスロジック
2. **Infra 層** - 外部連携（API、ストレージ）
3. **UI 層** - プラグイン設定画面
4. **Handler 層** - kintone イベントハンドラ

## プランに含める内容

template を参照してプランを出力

FYI. テンプレート: [templates/plan.md](templates/plan.md)
