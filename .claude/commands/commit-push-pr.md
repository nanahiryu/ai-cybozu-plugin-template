---
description: 変更を add, commit, push, PR 作成まで一気に行うコマンド
argument-hint: [コミットメッセージ（省略可）]
---

# /commit-push-pr - 変更をコミットしてPR作成

変更を add, commit, push, PR 作成まで一気に行う。

## 手順

### Step 1: 変更確認

```sh
git status
git diff --stat
```

### Step 2: ステージング

```sh
git add -A
```

### Step 3: コミット

- 引数でメッセージが指定されていればそれを使用
- なければ変更内容から適切なメッセージを生成
- Co-Authored-By を付与

```sh
git commit -m "メッセージ

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

### Step 4: プッシュ

```sh
git push -u origin <current-branch>
```

### Step 5: PR 作成

```sh
gh pr create --title "PRタイトル" --body "$(cat <<'EOF'
## Summary
<変更内容の要約>

## Test plan
- [ ] テスト項目

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

## 注意

- main/master への直接 push は行わない
- PR の base ブランチはデフォルトで main
