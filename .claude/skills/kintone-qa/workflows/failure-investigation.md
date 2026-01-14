# 失敗調査フロー

## 概要

E2Eテストが失敗した場合の原因調査フロー。

## 入力

| パラメータ | 説明 |
|-----------|------|
| error | エラーメッセージまたは失敗内容 |
| testFile | 失敗したテストファイル（省略可） |

## フロー

```
1. エラー内容の分析
   - エラーメッセージを確認
   - どの操作で失敗したか特定

2. 実際のUIを確認
   - Playwright MCP で該当画面を開く
   - browser_snapshot で現在の状態を取得

3. 原因の特定
   - セレクタが変わった？
   - UIの構造が変わった？
   - 待機が不足している？
   - kintone特有の問題？

4. 解決策の提案
   - 正しいセレクタを特定
   - 必要な修正内容を報告

5. tips への反映
   - 汎用的な問題であれば tips/ に追加
```

## よくある失敗原因と対処

### 要素が見つからない

1. Playwright MCP で実際の画面を確認
2. browser_snapshot でアクセシビリティツリーを取得
3. 正しいセレクタを特定

参考: [../tips/playwright/selectors.md](../tips/playwright/selectors.md)

### タイムアウト

1. `waitForLoadState("networkidle")` を使っていないか確認
2. 必要な待機が不足していないか確認

参考: [../tips/playwright/wait-for-load-state.md](../tips/playwright/wait-for-load-state.md)

### プラグインが動作しない

1. プラグイン設定が反映されているか確認
2. 「アプリを更新」が実行されているか確認

参考: [../tips/kintone/plugin-config-deploy.md](../tips/kintone/plugin-config-deploy.md)

## 調査結果の報告形式

```
## 失敗原因

- 原因: [具体的な原因]
- 該当箇所: [ファイル名:行番号]

## 解決策

- 修正内容: [具体的な修正内容]
- 修正後のコード:
  ```typescript
  // 修正後のコード
  ```

## 再発防止

- [ ] tips に追加すべき内容があるか
- [ ] helperの修正が必要か
```
