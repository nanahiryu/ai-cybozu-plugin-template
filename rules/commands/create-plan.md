# /create-plan - issue ベースで実装用のプランを行う

issue ベースで実装用のプランを行うコマンド

---

## 入力

- issue 番号が 1 つ以上渡されます

## 出力

計画は `.working/PLAN_{yyyymmdd}_{hhmmss}.md` に出力してください。

## 実行タスク

### issue の内容を確認

- issue の内容を確認してください

```sh
gh issue view <issue-number>
```

### 実行する流れを整理し、実装のプランを行なってください

- issue の内容を確認しつつ、依存関係を整理し、実行する流れを整理してください
