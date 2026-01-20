# waitForLoadState の注意点

## 問題

テストがタイムアウトする。特に `waitForLoadState("networkidle")` 使用時。

## 原因

kintoneは常にバックグラウンドでネットワーク通信を行っているため、
`networkidle` 状態にならない。

## 解決策

`networkidle` ではなく `load` を使用する。

```typescript
// NG - タイムアウトの原因
await page.waitForLoadState("networkidle");

// OK
await page.waitForLoadState("load");
```

## ページ遷移後の待機パターン

```typescript
// 推奨パターン
await page.goto(url);
await page.waitForLoadState("load");
await expect(page.getByText("期待するテキスト")).toBeVisible();
```

## 参考

- [Playwright公式ドキュメント](https://playwright.dev/docs/api/class-page#page-wait-for-load-state)
