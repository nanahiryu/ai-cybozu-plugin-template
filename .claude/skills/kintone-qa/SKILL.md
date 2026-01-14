---
name: qa
description: |
  E2Eテストの実装・実行・調査を行う総合QAスキル。
  WHEN: /qa 実行時、E2Eテスト実装時、テスト失敗調査時
  WHEN NOT: 仕様書作成時、設計時
---

# /qa - kintone プラグイン QA

## 概要

e2e-tester subagent を通じて Playwright MCP を活用し、
UI探索 -> テスト実装 -> 実行 -> 失敗調査のサイクルを回す。

## 呼び出し関係

```
ユーザー
  | /qa explore "プラグイン設定を保存する"
親エージェント
  | qa skill読み込み -> workflows/exploration.md参照
  | e2e-tester subagent起動
e2e-tester
  | Playwright MCP使用
  | UI探索実行
  | 結果を親に返却
親エージェント
  | ユーザーに結果報告
```

**重要**: 親エージェントは Playwright MCP を直接使用しない。必ず e2e-tester 経由で使用する。

## モード

### `/qa explore <goal>`

UI探索モード。指定したゴールに向けてUIを探索し、Playwrightコードと手順を返す。

例:

- `/qa explore "プラグイン設定を保存する"`
- `/qa explore "レコード詳細画面でPDFプレビューボタンをクリックする"`

詳細: [workflows/exploration.md](workflows/exploration.md)

### `/qa implement <test-spec>`

テスト実装モード。テスト仕様に基づいてE2Eテストを実装する。

例:

- `/qa implement "プレビューボタン表示テスト"`

詳細: [workflows/test-implementation.md](workflows/test-implementation.md)

### `/qa run [test-file]`

テスト実行モード。E2Eテストを実行し、結果を報告する。

例:

- `/qa run` - 全テスト実行
- `/qa run pdf-preview.spec.ts` - 特定ファイルのみ

### `/qa investigate <error>`

失敗調査モード。テスト失敗の原因をPlaywright MCPで調査する。

例:

- `/qa investigate "プレビューボタンが見つからない"`

詳細: [workflows/failure-investigation.md](workflows/failure-investigation.md)

## E2Eテストアーキテクチャ

### ディレクトリ構造

```
tests/e2e/
├── *.spec.ts           # テストケースのみ
├── helpers/
│   ├── env.ts          # 環境変数一元管理
│   ├── constants.ts    # 定数管理
│   ├── auth.ts         # ログイン処理
│   ├── pluginConfig.ts # プラグイン設定処理
│   ├── testData.ts     # テストデータ管理
│   ├── pages/          # 画面内の要素取得・操作
│   └── navigation/     # 画面遷移
├── fixtures/           # 生成済み静的ファイル（コミット対象）
└── scripts/            # 生成スクリプト等
```

### 守るべきルール

1. **spec.tsにはテストケースのみ**: 汎用関数は helpers/ に切り出す
2. **動的import型は使わない**: トップレベルで `import type { Page } from "@playwright/test";`
3. **環境変数・定数は一元管理**: helpers/env.ts, helpers/constants.ts
4. **fixtures/ と scripts/ の分離**: fixtures/はコミット対象、scripts/は生成スクリプト

## 参照

- [tips/guide.md](tips/guide.md) - Tips一覧
- [workflows/exploration.md](workflows/exploration.md) - UI探索フロー
- [workflows/test-implementation.md](workflows/test-implementation.md) - テスト実装フロー
- [workflows/failure-investigation.md](workflows/failure-investigation.md) - 失敗調査フロー
