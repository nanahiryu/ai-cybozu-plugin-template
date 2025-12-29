# Git

## issue

- `.github/ISSUE_TEMPLATE.md` を利用する

## PR

- `.github/PULL_REQUEST_TEMPLATE.md` を利用する
- 背景に `closes #<issue-number>` を利用する

## コミットメッセージ

- conventional commit を採用する
- スコープを基本的には明示する
  - やむなく変更範囲が大きくなってしまった場合には省略可

`<type>: <subject>` 形式

type 例：

- `feat(UI)`: UI 新機能
- `fix(domain)`: domain バグ修正
- `refactor(infra)`: infra リファクタリング
- `chore`: コードベースに影響を与えない変更

FYI.
https://www.conventionalcommits.org/ja/v1.0.0/

## ブランチ

### ブランチ戦略

- git flow を採用する
  - ブランチは以下のように分かれる
    - 中心的なブランチ
      - main: 本番環境
      - develop: 開発環境
    - 実装系
      - feature/: 機能実装
      - fix/: バグ修正
      - chore/: コードベースに影響を与えない変更
    - リリース系
      - release/: リリース
      - hotfix/: 緊急バグ修正(merge 順番の想定は main -> hotfix/ -> main, develop)

### ブランチ命名規則

- `feature/<issue-number>-<short-description>`
- `fix/<issue-number>-<short-description>`
- `chore/<issue-number>-<short-description>`

### ブランチの利用方法

**原則 git worktree を利用する**

- subagent による並列開発が可能なため、git worktree を用いてブランチ管理を行う
- PR マージ後はブランチを削除する
