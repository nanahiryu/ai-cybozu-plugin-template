---
description: フィードバック用 GitHub Issue 作成支援を行うコマンド
---

# /create-fb-issue - フィードバック用 Issue 作成

ルール・テンプレート・スキルへのフィードバックを Issue 化する。

**対象リポジトリ**: `nanahiryu/ai-cybozu-plugin-template`

## 手順

### Step 1: フィードバック内容のヒアリング

以下の情報をヒアリング:

- 対象: ルール / テンプレート / スキル / ...
- 背景・理由
- 具体的な内容

### Step 2: Issue 作成

`gh issue create` コマンドで Issue を作成:

```bash
gh issue create --repo nanahiryu/ai-cybozu-plugin-template --title "..." --body "..."
```

## テンプレート

### タイトル

```
[Feedback] {対象}: {内容の概要}
```

例:
- `[Feedback] Rule: kintoneオブジェクトアクセス制限の追加`
- `[Feedback] Skill: /create-specの出力改善`

### 本文

```markdown
## 対象

<!-- ルール / テンプレート / スキル のいずれか -->
<!-- 具体的なファイルパスがあれば記載 -->

## 背景

<!-- なぜこの変更が必要か -->

## 内容

<!-- 具体的な変更内容 -->

## 完了条件

- [ ] {完了条件を列挙}
```

## チェックリスト

- [ ] タイトルが簡潔でわかりやすい
- [ ] 背景・理由が明確
- [ ] 完了条件が明確
