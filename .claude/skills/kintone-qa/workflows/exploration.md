# UI探索フロー

## 概要

e2e-tester が Playwright MCP を使ってUIを探索し、
操作手順とPlaywrightコードを取得するフロー。

## 入力

| パラメータ | 説明 | 例 |
|-----------|------|-----|
| goal | 達成したい操作 | 「プラグイン設定を保存する」 |
| startUrl | 開始URL（省略可） | `/k/admin/app/123/plugin/` |
| context | 追加情報（省略可） | 「APP_ID=123のアプリで」 |

## 出力

| 項目 | 説明 |
|------|------|
| playwrightCode | そのまま使えるPlaywrightコード |
| steps | 自然言語での手順リスト |
| selectors | 発見したセレクタ一覧 |
| notes | 注意点・ハマりポイント |

## フロー

```
1. 認証
   - .envの認証情報（USERNAME, PASSWORD）を使用
   - helpers/auth.ts の login() 相当の処理

2. 開始地点への遷移
   - startUrlが指定されていれば遷移
   - なければcontextから判断

3. 状態確認
   - browser_snapshot でアクセシビリティツリー取得
   - 現在の画面状態を把握

4. ゴールに向けた探索
   - ゴールに近づく操作を判断
   - 操作を実行（browser_click, browser_type等）
   - 各操作でセレクタと手順を記録

5. 結果の整理
   - 記録した操作をPlaywrightコードに変換
   - 手順を自然言語でまとめる
   - セレクタ一覧を整理

6. 終了条件
   - ゴール達成
   - タイムアウト（デフォルト5分）
   - 明らかに行き詰まった場合
```

## 出力例

### 入力

```
goal: "プラグイン設定画面で attachment1 のみチェックして保存する"
```

### 出力

```typescript
// playwrightCode
await page.goto(`${BASE_URL}/k/admin/app/${APP_ID}/plugin/config?pluginId=${PLUGIN_ID}`);
await page.waitForLoadState("load");
await expect(page.getByText("PDF Preview Target Fields")).toBeVisible();

const attachment1Checkbox = page.getByRole("checkbox", { name: /\(attachment1\)/ });
const attachment2Checkbox = page.getByRole("checkbox", { name: /\(attachment2\)/ });

if (await attachment1Checkbox.isChecked()) {
  await attachment1Checkbox.click();
}
if (await attachment2Checkbox.isChecked()) {
  await attachment2Checkbox.click();
}

await attachment1Checkbox.click();
await page.getByRole("button", { name: "Save" }).click();
```

```
// steps
1. プラグイン設定画面に遷移
2. "PDF Preview Target Fields" が表示されるまで待機
3. attachment1, attachment2 のチェックボックスを取得
4. 両方のチェックを外す
5. attachment1 のみチェック
6. Save ボタンをクリック
```

```
// notes
- 保存後、アプリへの反映には「アプリを更新」が必要
- tips/kintone/plugin-config-deploy.md を参照
```

## 注意事項

- 探索中は browser_snapshot を積極的に使用して状態を確認する
- セレクタは role ベースを優先（id, class は避ける）
- kintone特有の挙動は [../tips/kintone/](../tips/kintone/) を参照
