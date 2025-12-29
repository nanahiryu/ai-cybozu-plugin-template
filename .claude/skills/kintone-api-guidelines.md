# kintone API ガイドライン

## 基本方針

kintone オブジェクト（`kintone.events`, `kintone.api`, `kintone.app` など）を使用する際は、**必ず実装前に公式ドキュメントを WebFetch, WebSearch で参照してください**。

推測で実装せず、公式ドキュメントの情報に基づいて正確に実装してください。

## 主要な注意点

以下のポイントに特に注意してください：

1. **イベントハンドラは必ず `event` オブジェクトを return する**
2. **フィールド値は `event.record` から取得・設定する**
3. **ファイルは `fileKey` を使って取得する**

## 参考ドキュメント

実装前に以下のドキュメントを WebFetch で参照してください：

- [kintone JavaScript API 概要](https://cybozu.dev/ja/kintone/docs/overview/)
- [イベントハンドラ一覧](https://cybozu.dev/ja/kintone/docs/js-api/event/)
- [フィールド操作](https://cybozu.dev/ja/kintone/docs/js-api/field/)
- [REST API](https://cybozu.dev/ja/kintone/docs/rest-api/)

## レビュー時のチェックポイント

コードレビューを行う際は、以下の点を確認してください：

- イベントハンドラが `event` オブジェクトを return しているか
- フィールド値の取得・設定が `event.record` を使っているか
- kintone API の使用方法が公式ドキュメントに準拠しているか
