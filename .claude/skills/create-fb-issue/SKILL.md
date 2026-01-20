---
name: create-fb-issue
description: |
  フィードバック用 GitHub Issue 作成支援を行うコマンド
---

# /create-fb-issue - フィードバック用 Issue 作成

ルール・テンプレート・スキルへのフィードバックを Issue 化する。

**対象リポジトリ**: `nanahiryu/ai-cybozu-plugin-template`

## 手順

### Step 1: フィードバック内容のヒアリング

以下の情報をヒアリング:

- 対象: ルール / テンプレート / スキル
- 背景・理由
- 具体的な内容

### Step 2: Issue 作成

`gh issue create` コマンドで Issue を作成:

```bash
gh issue create --repo nanahiryu/ai-cybozu-plugin-template --title "..." --body "..."
```

## テンプレート

[templates/feedback.md](templates/feedback.md) を参照。

## チェックリスト

- [ ] タイトルが簡潔でわかりやすい
- [ ] 背景・理由が明確
- [ ] 完了条件が明確
