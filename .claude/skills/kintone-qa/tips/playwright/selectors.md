# セレクタ選定のベストプラクティス

## 推奨: Role ベースのセレクタ

アクセシビリティ属性を活用したセレクタを優先する。

```typescript
// 推奨
page.getByRole("button", { name: "Save" })
page.getByRole("checkbox", { name: /attachment1/ })
page.getByRole("textbox", { name: "タイトル" })

// 非推奨
page.locator("#save-button")
page.locator(".checkbox-attachment1")
```

## セレクタの優先順位

1. `getByRole()` - ロールとアクセシブルな名前
2. `getByText()` - 表示テキスト
3. `getByLabel()` - ラベルテキスト
4. `getByPlaceholder()` - プレースホルダーテキスト
5. `getByTestId()` - data-testid属性
6. `locator()` - CSSセレクタ（最終手段）

## kintoneでのセレクタ例

### ボタン

```typescript
// 保存ボタン
page.getByRole("button", { name: "Save" })

// アプリを更新ボタン
page.getByRole("button", { name: "アプリを更新" })
```

### チェックボックス

```typescript
// フィールド名を含むチェックボックス
page.getByRole("checkbox", { name: /\(fieldCode\)/ })
```

### テキストフィールド

```typescript
// ラベルで指定
page.getByLabel("タイトル")
```

## 要素が見つからない場合

1. `browser_snapshot` でアクセシビリティツリーを確認
2. 実際のrole属性とname属性を特定
3. 正しいセレクタを作成

## 参考

- [Playwright Locators](https://playwright.dev/docs/locators)
