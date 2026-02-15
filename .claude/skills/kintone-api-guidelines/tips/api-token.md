# 他アプリ操作時の APIトークン要件

自アプリ以外のアプリに対して REST API を実行する場合、APIトークンによる認証が必要。

## 必要な設定

1. **プラグイン設定画面で APIトークンを入力させる UI を用意する**
2. **APIトークンは proxyConfig に保存する**（機密データのため pluginConfig は使用しない）

## 実装例

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

## 注意事項

- APIトークンは機密情報のため、proxyConfig を使用し pluginConfig には保存しない
- ログ出力やデバッグ表示に含めない
- 複数アプリにアクセスする場合は、アプリごとに APIトークンを管理する
