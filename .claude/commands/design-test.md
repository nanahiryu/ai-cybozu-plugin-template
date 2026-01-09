---
description: テスト設計&実装を行うコマンド
---

# /design-test - テスト設計&実装

テスト設計&実装を行うコマンド

## 参照すべき仕様書

テスト設計の前に `docs/spec/` 配下の仕様書を確認してください。

- `docs/spec/concept.md` - プラグイン概要
- `docs/spec/kintone-app.md` - kintone アプリ設計
- `docs/spec/plugin-config.md` - プラグイン設定
- `docs/spec/requirements.md` - 要件定義
- `docs/spec/usecases/*.md` - ユースケース詳細

## タスク

1. E2E テストの設計

- `docs/spec/test-spec.md`を作成してください
- `rules/templates/test/e2e.md`をベースにしてください

### 注意事項

- テストケースはプラグイン設定による分岐も考慮してください
- 実装の際にはプラグイン設定の変更も playwright のコードで実装してください
- できるだけ同じプラグイン設定で実行できるテストはまとめて行い、テスト実行時間が短くなるよう工夫してください

2. E2E テストの実装

## 注意事項

- `rules/guidelines/test.md` を参照してテストを実装してください。
- テスト実装時に想定した挙動になりそうか、playwright mcp を利用して確認してください。
- この実装時には全てのテストを skip してください。
- テストの具体はコメントアウトする必要はありません。
