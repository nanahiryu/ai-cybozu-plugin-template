# kintone E2E テスト Tips

## プラグイン設定の反映

プラグイン設定を保存しただけでは反映されない。**「アプリを更新」が必要**。

E2E テストでは `helpers/pluginConfig.ts` の `savePluginConfigAndDeploy()` を使用。

```typescript
await savePluginConfigAndDeploy(page, APP_ID, PLUGIN_ID, config);
```

## アプリを更新が必要なケース

- プラグイン設定を変更した
- フィールドを追加・変更・削除した
- JavaScript/CSS カスタマイズを変更した
