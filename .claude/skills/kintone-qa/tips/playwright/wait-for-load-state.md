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

## 固定秒数待機の禁止

`waitForTimeout()` の使用は原則禁止。以下の代替手段を使用する:

```typescript
// NG - 固定秒数待機
await page.waitForTimeout(3000);

// OK - 要素の状態を待機
await expect(page.getByText("読み込み完了")).toBeVisible();

// OK - 特定の条件を待機
await page.waitForFunction(() => document.querySelector(".loaded") !== null);
```

例外: デバッグ目的での一時的な使用のみ許可。本番コードにはコミットしない。

## 参考

- [Playwright公式ドキュメント](https://playwright.dev/docs/api/class-page#page-wait-for-load-state)
