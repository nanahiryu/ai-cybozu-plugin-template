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
