# kintone プラグインの設計手順

## 1. kintone アプリのデータ構造を決定

- kintone アプリのデータ構造を決定してください
- フィールドの種類はリンク先を参考にして日本語で記載してください

### 記載形式

- 表形式で記載してください

例)

| フィールドコード | フィールド名  | フィールドタイプ   | 必須 | 重複禁止 | 備考                  |
| ---------------- | ------------- | ------------------ | ---- | -------- | --------------------- |
| accountId        | アカウント ID | 文字列（1 行）     | o    | o        | A app のアカウント ID |
| name             | 名前          | 文字列（1 行）     | ○    | x        |                       |
| gender           | 性別          | ラジオボタン       | o    | x        | 男, 女, その他        |
| memo             | メモ          | テキスト（複数行） | x    | x        |                       |

FYI.
https://cybozu.dev/ja/kintone/docs/rest-api/apps/form/get-form-fields/

## 2. プラグイン設定のデータ構造を決定

- プラグイン設定のデータ構造を決定してください
- JSON 形式で記載してください

### Caution：機密データの扱い

- API token など隠蔽する必要があるデータが存在する場合、proxyConfig への格納を検討してください
- proxyConfig は pluginConfig とは別の json として記載してください

FYI.

- 外部 API の実行に必要な情報を取得する：https://cybozu.dev/ja/kintone/docs/js-api/plugins/get-config-for-proxy/
- 外部 API の実行に必要な情報をプラグインへ保存する：https://cybozu.dev/ja/kintone/docs/js-api/plugins/set-config-for-proxy/
- プラグインから外部 API を実行する：https://cybozu.dev/ja/kintone/docs/js-api/plugins/kintone-plug-in-proxy/

## 3. 各ユースケースの実現方針を決定

### 3.0. kintone の標準機能で実現する

標準機能で対応できる場合はそちらを提案しましょう

FYI.

- ヘルプサイト：https://cn.kintone.help/k/ja/

### 3.1. kintone JS API の event, handler を利用して実現する

- kintone プラグインでは、event handler を利用し、特定イベント発生時に処理を行うことがよくあります
- 特定イベント発生時に特定の処理を行いたいケースではこちらの実装方針を検討します

FYI.

- handler の登録方法：https://cybozu.dev/ja/kintone/docs/js-api/events/event-handling/
- event オブジェクトで実行できる操作：https://cybozu.dev/ja/kintone/docs/js-api/events/event-object-actions/

### 3.2. カスタマイズビュー

- 一覧画面のカスタマイズを自由に行うことができます
- kintone 標準機能であったり、kintone の JS API を利用した一覧のカスタマイズでは機能不足の際にこちらの実装方針を検討します
  - 例: カンバンビュー

FYI.

- https://cn.kintone.help/k/ja/app/view/settings/set_view#view_set_view_2020

## 4. 各 handler に対して処理の流れを具体的に設計

- handler を実装すると考えた際に、関数に分離する単位で処理の流れを記載してください
- markdown の順序付きリスト形式で記載してください
