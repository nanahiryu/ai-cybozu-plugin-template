# kintone API リファレンスガイド

AI エージェントが kintone プラグイン開発時に参照すべき公式ドキュメントへのポインタ集

## 📚 公式ドキュメント

- **REST API**: https://cybozu.dev/ja/kintone/docs/rest-api/
- **JavaScript API**: https://cybozu.dev/ja/kintone/docs/js-api/
- **プラグイン開発**: https://cybozu.dev/ja/kintone/docs/plugin/
- **クエリ構文**: https://cybozu.dev/ja/kintone/docs/overview/query/

## 型定義の使用方法

### 基本方針

`@kintone/dts-gen` の型定義を活用し、不足分のみ拡張する。
全て独自に定義するのではなく、公式の型定義を基本とする。

### tsconfig.json の設定

`tsconfig.json` の `files` に dts-gen の型定義を追加することで、kintone の型が利用可能になります。

```json
{
  "files": ["./node_modules/@kintone/dts-gen/kintone.d.ts"]
}
```

### 型の拡張方法

dts-gen に含まれていない型のみ、`src/types/kintone.d.ts` で拡張します。

例：`kintone.createDialog()` の型定義（2025年10月追加のAPI）

```typescript
// src/types/kintone.d.ts
declare namespace kintone {
  type DialogAction = "OK" | "CANCEL" | "CLOSE" | "FUNCTION";

  interface DialogConfig {
    title?: string;
    body?: HTMLElement;
    showOkButton?: boolean;
    okButtonText?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    showCloseButton?: boolean;
    beforeClose?: (action: Exclude<DialogAction, "FUNCTION">) => boolean | Promise<boolean>;
  }

  interface Dialog {
    show(): Promise<DialogAction>;
    close(): void;
  }

  function createDialog(config: DialogConfig): Promise<Dialog>;
}
```

### 注意事項

- dts-gen で提供される型を再定義しない
- 型拡張が必要な場合は、最小限の範囲で行う
- 可能な限り公式ドキュメントを参照して型を定義する
- `declare global` は使用禁止。型拡張には `declare namespace kintone` を使用する

## 他アプリ操作時のAPIトークン要件

自アプリ以外のアプリに対してREST APIを実行する場合、APIトークンによる認証が必要。

### 必要な設定

1. **プラグイン設定画面でAPIトークンを入力させるUIを用意する**
2. **APIトークンは proxyConfig に保存する**（機密データのため pluginConfig は使用しない）

### 実装例

```typescript
// 設定保存時: proxyConfig にAPIトークンを保存
kintone.plugin.app.setProxyConfig(
  "https://{subdomain}.cybozu.com/k/v1/records.json",
  "GET",
  { "X-Cybozu-API-Token": apiToken },
  {},
  pluginId
);

// API実行時: kintone.plugin.app.proxy を使用
const response = await kintone.plugin.app.proxy(
  pluginId,
  "https://{subdomain}.cybozu.com/k/v1/records.json",
  "GET",
  {},
  { app: externalAppId, query: "..." }
);
```

### 注意事項

- APIトークンは機密情報のため、proxyConfig を使用し pluginConfig には保存しない
- ログ出力やデバッグ表示に含めない
- 複数アプリにアクセスする場合は、アプリごとにAPIトークンを管理する
