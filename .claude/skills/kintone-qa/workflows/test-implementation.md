# テスト実装フロー

## 概要

テスト仕様に基づいてE2Eテストを実装するフロー。

## 入力

| パラメータ | 説明 |
|-----------|------|
| testSpec | テスト仕様（何をテストするか） |
| targetFile | 実装先ファイル（省略可） |

## フロー

```
1. テスト仕様の理解
   - 何をテストするか
   - 前提条件は何か
   - 期待結果は何か

2. 必要な操作の特定
   - テストに必要な操作を洗い出す
   - 既存のhelperで対応できるか確認

3. 不足している操作の調査
   - exploration.md フローでUI探索
   - 新しいセレクタ・操作を取得

4. テストコード実装
   - spec.ts にテストケースを追加
   - 必要に応じてhelperを追加・修正

5. 実行・検証
   - テストを実行
   - 失敗した場合は failure-investigation.md フローへ
```

## E2Eテストアーキテクチャに従う

実装時は [../SKILL.md](../SKILL.md) の「E2Eテストアーキテクチャ」セクションに従う。

- spec.ts にはテストケースのみ
- 汎用関数は helpers/ へ
- pages/ と navigation/ を分離

## 実装時のチェックリスト

- [ ] spec.ts にテストケースのみ記述しているか
- [ ] 汎用関数は helpers/ に切り出しているか
- [ ] 動的import型ではなくトップレベルimportを使用しているか
- [ ] 環境変数は helpers/env.ts から取得しているか
- [ ] 定数は helpers/constants.ts に定義しているか
- [ ] waitForLoadState("networkidle") を使用していないか

## 参考

- [exploration.md](exploration.md) - UI探索フロー
- [failure-investigation.md](failure-investigation.md) - 失敗調査フロー
