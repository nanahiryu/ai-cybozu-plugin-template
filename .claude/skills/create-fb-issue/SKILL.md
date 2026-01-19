---
name: create-fb-issue
description: |
  フィードバック用 GitHub Issue 作成支援を行うコマンド
---

# /create-fb-issue - フィードバック用 Issue 作成

ルール・テンプレート・スキルへのフィードバックを Issue 化する。

## 手順

### Step 1: Issue 種別の確認

ユーザーに作成する Issue の種別を質問:

| 種別 | 用途 |
|------|------|
| ルール追加 | guidelines へのルール追加 |
| テンプレート修正 | スキルテンプレートの改善 |
| スキル改善 | スキル機能の改善 |

### Step 2: Issue 内容のヒアリング

種別に応じて必要な情報をヒアリング:

- **ルール追加**: 追加するルール、背景、対象ファイル
- **テンプレート修正**: 対象テンプレート、修正内容
- **スキル改善**: 対象スキル、改善内容

### Step 3: Issue 作成

`gh issue create` コマンドで Issue を作成。

## テンプレート

種別ごとのテンプレートは [templates/](templates/) を参照:

| テンプレート | 用途 |
|-------------|------|
| [rule.md](templates/rule.md) | ルール追加用 |
| [template.md](templates/template.md) | テンプレート修正用 |
| [skill.md](templates/skill.md) | スキル改善用 |

## チェックリスト

- [ ] タイトルが簡潔でわかりやすい
- [ ] 背景・理由が明確
- [ ] 完了条件が明確
