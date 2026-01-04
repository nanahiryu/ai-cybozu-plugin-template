# kintone plugin 開発上のルール

## 原則

kintone オブジェクト（`kintone.events`, `kintone.api`, `kintone.app` など）を使用する際は、**必ず実装前に公式ドキュメントを WebFetch, WebSearch で参照してください**。

### 参考ドキュメント

実装前に以下のドキュメントを WebFetch で参照してください：

- [kintone JavaScript API 概要](https://cybozu.dev/ja/kintone/docs/overview/)
- [イベントハンドラ一覧](https://cybozu.dev/ja/kintone/docs/js-api/event/)
- [フィールド操作](https://cybozu.dev/ja/kintone/docs/js-api/field/)
- [REST API](https://cybozu.dev/ja/kintone/docs/rest-api/)

## kintone API の利用方法

- kintone オブジェクトと呼ばれるグローバルオブジェクトを利用して、kintone の API を利用します。
- プラグイン ID を引数に取り、即時関数として実行し、プラグイン ID を引数として取ります。
- 基本的には即時関数で wrap し、スコープを限定して引数を宣言するようにしてください。
- イベントハンドラは必ず `event` オブジェクトを return する
- フィールド値は `event.record` から取得・設定する

例:

```typescript
((pluginId: string) => {
  kintone.events.on("app.record.index.show", (event) => {
    const config = kintone.plugin.app.getConfig(pluginId);
    console.log(config);
  });
})(kintone.$PLUGIN_ID);
```

## kintone API の利用上の注意

- 直接、または間接的な window オブジェクトへのアクセス(window.alert, location.href), 全画面を利用するような UI はできるだけ利用せず、kintone API を利用して開発するようにしてください
  - 今後のアップデートによって window オブジェクトへのアクセスが制限される可能性があり、これらの機能が動作しなくなる可能性があります
  - 回避策例:
    - ダイアログを表示する
      - kintone.createDialog を利用する
        - FYI: https://cybozu.dev/ja/kintone/docs/js-api/kintone/create-dialog/
    - alert を表示する
      - kintone.showNotification を利用する
        - FYI: https://cybozu.dev/ja/kintone/docs/js-api/kintone/show-notification/
    - アプリの一覧画面にボタン等を差し込みたい
      - kintone.app.getHeaderSpaceElement を利用する
        - FYI: https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-header-element/
      - kintone.app.getHeaderMenuSpaceElement を利用する
        - FYI: https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-header-menu-element/

## 実装 Tips

### ファイル操作

#### ファイルダウンロードの手順

ファイルダウンロードは 2 つの手順が必要です：

1. **レコード情報から `fileKey` を取得する**
2. **`fileKey` を使ってファイルをダウンロードする**

#### 参考ドキュメント

- [ファイルをダウンロードする](https://cybozu.dev/ja/kintone/docs/rest-api/files/download-file/)
- [ファイルダウンロードで必須となる 2 つの手順](https://cybozu.dev/ja/kintone/tips/development/customize/file/steps-download-files/)
