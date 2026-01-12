---
description: issue ベースで実装用のプランを行うコマンド
argument-hint: [issue番号1] [issue番号2] ...
models: claude-opus-4.5
---

# /create-plan - issue ベースで実装プラン作成

issue ベースで実装用のプランを作成するコマンド。create-plan スキルを参照して作成する。

---

## Step 1: issue の内容を確認

```sh
gh issue view <issue-number>
```

## Step 2: 仕様書の確認

`docs/spec/` 配下の仕様書を確認し、実装内容を把握する。

## Step 3: プラン作成

- create-plan スキルの実装順序に従う
- テンプレートを使用してプランを出力

## 出力先

`.working/{yyyymmdd}_{hhmmss}_{issue-numbers:i12-i13}_{作業内容}.md`

例: `.working/20260112_100000_i11_fix-xxx-test.md`
例: `.working/20260112_100000_i12-i13-i14_create-xxx-handler.md`
