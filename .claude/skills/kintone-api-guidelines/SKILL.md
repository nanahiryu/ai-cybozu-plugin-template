---
name: kintone-api-guidelines
description: |
  kintone API 実装時のガイドライン。公式ドキュメント参照、利用方法、注意事項を提供する。
  WHEN: kintone API を実装する時、kintone REST API を呼び出す時、kintone イベントハンドラを書く時
  WHEN NOT: UI のみの実装時、ドキュメント作成時、テスト実行時
---

# kintone plugin 開発上のルール

## 公式ドキュメント

- [REST API](https://cybozu.dev/ja/kintone/docs/rest-api/)
- [JavaScript API](https://cybozu.dev/ja/kintone/docs/js-api/)
- [プラグイン開発](https://cybozu.dev/ja/kintone/docs/plugin/)
- [クエリ構文](https://cybozu.dev/ja/kintone/docs/overview/query/)
- [イベントハンドラ一覧](https://cybozu.dev/ja/kintone/docs/js-api/event/)
- [フィールド操作](https://cybozu.dev/ja/kintone/docs/js-api/field/)

## 原則

kintone オブジェクト（`kintone.events`, `kintone.api`, `kintone.app` など）を使用する際は、**必ず実装前に公式ドキュメントを WebFetch, WebSearch で参照してください**。

## kintone API の利用方法

- kintone オブジェクトと呼ばれるグローバルオブジェクトを利用して、kintone の API を利用する
- 基本的には即時関数で wrap し、スコープを限定してプラグイン ID を引数として取る
- イベントハンドラは必ず `event` オブジェクトを return する
- フィールド値は `event.record` から取得・設定する

```typescript
((pluginId: string) => {
  kintone.events.on("app.record.index.show", (event) => {
    const config = kintone.plugin.app.getConfig(pluginId);
    console.log(config);
  });
})(kintone.$PLUGIN_ID);
```

## kintone API の利用上の注意

直接、または間接的な window オブジェクトへのアクセス(window.alert, location.href)、全画面を利用するような UI はできるだけ利用せず、kintone API を利用して開発する。

今後のアップデートによって window オブジェクトへのアクセスが制限される可能性があるため。

### 代替 API

| やりたいこと | 代替 API | 参考 |
|---|---|---|
| ダイアログを表示 | `kintone.createDialog` | [docs](https://cybozu.dev/ja/kintone/docs/js-api/kintone/create-dialog/) |
| alert を表示 | `kintone.showNotification` | [docs](https://cybozu.dev/ja/kintone/docs/js-api/kintone/show-notification/) |
| 一覧画面にボタン等を差し込む | `kintone.app.getHeaderSpaceElement` | [docs](https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-header-element/) |
| 一覧ヘッダーメニューに差し込む | `kintone.app.getHeaderMenuSpaceElement` | [docs](https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-header-menu-element/) |

## Tips

| ケース | 参照 |
|--------|------|
| 型定義の使用方法（dts-gen, 型拡張） | [tips/type-definitions.md](tips/type-definitions.md) |
| 他アプリ操作時の APIトークン要件 | [tips/api-token.md](tips/api-token.md) |
| ファイルダウンロードの手順 | [tips/file-operations.md](tips/file-operations.md) |
