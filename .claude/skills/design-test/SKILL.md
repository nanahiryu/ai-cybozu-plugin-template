---
name: design-test
description: |
  テスト設計&実装を行う際に使用する。
  E2Eテスト設計のベストプラクティス、テスト仕様書テンプレート、実装ガイドラインを提供する。
  WHEN: /design-test 実行時、テスト設計時、E2Eテスト実装時
  WHEN NOT: 仕様書作成時、プラグイン設定時、コードレビュー時
---

# テスト設計ガイド

## E2Eテスト実装タイミング

**重要**: E2Eテストは事前にskip状態で実装するのではなく、**ハンドラ実装完了後に段階的に実装・実行**する。

```
ハンドラ実装 → レビュー完了 → E2Eテスト実装 → E2Eテスト実行
```

## 参照すべき仕様書

テスト設計の前に `docs/spec/` 配下の仕様書を確認:

- `docs/spec/concept.md` - プラグイン概要
- `docs/spec/kintone-app.md` - kintone アプリ設計
- `docs/spec/plugin-config.md` - プラグイン設定
- `docs/spec/requirements.md` - 要件定義
- `docs/spec/usecases/*.md` - ユースケース詳細

## テスト仕様書の出力

`docs/spec/test-spec.md` に出力

FYI. テンプレート: [templates/test-spec.md](templates/test-spec.md)

## E2E テスト設計のベストプラクティス

### プラグイン設定による分岐を考慮

- テストケースはプラグイン設定による分岐も考慮する
- 設定の組み合わせパターンを洗い出す

### テスト実行時間の最適化

- 同じプラグイン設定で実行できるテストはまとめて実行
- プラグイン設定の変更回数を最小化する

### Playwright での実装方針

- プラグイン設定の変更も Playwright のコードで実装
- 手動操作を減らし、再現性を確保

## E2E テスト実装ガイドライン

詳細は `rules/guidelines/test.md` を参照。

### 重要ポイント

- id, class は変更される可能性が高いため使用を避ける
- kintone 標準機能はテスト対象外
- `waitForLoadState("networkidle")` は使用しない（タイムアウトの原因）
- `waitForLoadState("load")` を使用する

## Playwright MCP の活用

テスト実装時は Playwright MCP を利用して、想定した挙動になるか確認する。
