# kintone API ドキュメント統合プラン

## Context

kintone API 関連の情報が2箇所に分散している：
- `.claude/rules/kintone-api-reference.md` - 常時読み込み（公式ドキュメントリンク、型定義、APIトークン要件）
- `.claude/skills/kintone-api-guidelines.md` - 単体ファイル（原則、利用方法、注意事項、実装Tips）

問題点：
1. API 実装時のみ必要な情報が rules/ で常時読み込みされている
2. `kintone-api-guidelines.md` が単体ファイルで、正しいスキル構造（`<skill-name>/SKILL.md`）になっていない

## 方針

正しいスキルディレクトリ構造で統合し、具体的な実装例・詳細は `tips/` に切り出す。
kintone-qa スキルの tips パターン（SKILL.md にテーブルでリンク、詳細は tips/ に配置）に倣う。

### 新しいディレクトリ構成

```
.claude/skills/kintone-api-guidelines/
├── SKILL.md                         # メイン指示
└── tips/
    ├── type-definitions.md          # 型定義の使用方法（dts-gen, 型拡張）
    ├── api-token.md                 # 他アプリ操作時のAPIトークン要件
    └── file-operations.md           # ファイルダウンロードの手順
```

### ファイル内容

**SKILL.md**（~70行）：
- フロントマター（name, description）
- 公式ドキュメントリンク（両ファイルから統合・重複排除）
- 原則（WebFetch/WebSearch で参照する指示）
- kintone API の利用方法（即時関数パターン、event return）
- kintone API の利用上の注意（window オブジェクト回避）
- Tips テーブル（tips/ へのリンク）

**tips/type-definitions.md**（~50行）：
- dts-gen の基本方針
- tsconfig.json の設定
- 型の拡張方法（コード例）
- 注意事項

**tips/api-token.md**（~40行）：
- 必要な設定
- proxyConfig の実装例（コード例）
- 注意事項

**tips/file-operations.md**（~15行）：
- ファイルダウンロードの2手順
- 参考ドキュメントリンク

## 削除するファイル

- `.claude/rules/kintone-api-reference.md`
- `.claude/skills/kintone-api-guidelines.md`（単体ファイル）

## 参照更新

| ファイル | 変更内容 |
|---|---|
| `.claude/skills/create-spec/SKILL.md:102` | `@.claude/rules/kintone-api-reference.md` → `@.claude/skills/kintone-api-guidelines/SKILL.md` |
| `.claude/agents/reviewer.md:13` | `@.claude/skills/kintone-api-guidelines.md` → `@.claude/skills/kintone-api-guidelines/SKILL.md` |
| `.claude/agents/coder.md:13` | `@.claude/skills/kintone-api-guidelines.md` → `@.claude/skills/kintone-api-guidelines/SKILL.md` |

## 作業手順

1. `release/v0.14.0` からブランチ作成: `chore/merge-kintone-api-docs`
2. `.claude/skills/kintone-api-guidelines/` ディレクトリ作成
3. `SKILL.md` を作成
4. `tips/type-definitions.md` を作成
5. `tips/api-token.md` を作成
6. `tips/file-operations.md` を作成
7. `.claude/skills/kintone-api-guidelines.md`（単体ファイル）を削除
8. `.claude/rules/kintone-api-reference.md` を削除
9. 参照先を更新（create-spec, reviewer, coder）
10. コミット・push・PR 作成（base: `release/v0.14.0`）

## 検証

- `kintone-api-reference` への参照が残っていないことを grep で確認
- `kintone-api-guidelines.md`（単体ファイル）が削除されていること
- 新しいスキルディレクトリ構造が正しいこと
