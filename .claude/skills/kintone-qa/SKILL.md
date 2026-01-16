---
name: kintone-qa
description: |
  E2Eテストの実装・実行・調査を行う総合QAスキル。
  WHEN: /qa 実行時、E2Eテスト実装時、テスト失敗調査時
  WHEN NOT: 仕様書作成時、設計時
---

# /qa - kintone プラグイン QA

## 概要

テスト仕様書を元に E2E テストを実装・実行し、品質を保証する。

## フロー

```
1. テスト仕様書を元に E2E テストを実装
    - テストの実装の際には Playwright MCP を利用して動作確認しながら実装する
   ↓
2. E2E テストを実行
   ↓
3. 失敗時の対応
   - E2E テストの実装に問題がある → 1に戻って修正
   - コード/仕様書の乖離 → ユーザーに報告
```

### 1. テスト実装

テスト仕様書（`docs/test-spec.md` 等）を読み、E2E テストを実装する。

量が多い場合は **e2e-tester subagent** を適切な粒度（ページごと等）で呼び出す。

### 2. テスト実行

```bash
pnpm exec playwright test
```

### 3. 失敗時の対応

| 原因                   | 対応           |
| ---------------------- | -------------- |
| E2E テストの実装に問題 | 1 に戻って修正 |
| コード/仕様書の乖離    | ユーザーに報告 |

**報告形式（コード/仕様書の乖離の場合）:**

| テストケース                     | 失敗原因             | 実装の状態                                   |
| -------------------------------- | -------------------- | -------------------------------------------- |
| 「プレビューボタンが表示される」 | ボタンが見つからない | 仕様では表示されるはずだが、実装されていない |

## 呼び出し関係

```
ユーザー
  | /qa
親エージェント
  | テスト仕様書を読む
  | e2e-tester subagent を適切な粒度で起動
e2e-tester
  | Playwright MCP 使用
  | E2E テスト実装
  | 結果を親に返却
親エージェント
  | テスト実行
  | 結果をユーザーに報告
```

**重要**: 親エージェントは Playwright MCP を直接使用しない。必ず e2e-tester 経由で使用する。

## E2E テストアーキテクチャ

詳細: [rules/guidelines/architecture-e2e.md](../../../rules/guidelines/architecture-e2e.md)

## Tips

| ケース | 参照 |
|--------|------|
| プラグイン設定が反映されない | [tips/kintone/save-plugin-config.md](tips/kintone/save-plugin-config.md) |
| テストがタイムアウトする | [tips/playwright/wait-for-load-state.md](tips/playwright/wait-for-load-state.md) |
| 要素が見つからない | [tips/playwright/selectors.md](tips/playwright/selectors.md) |
