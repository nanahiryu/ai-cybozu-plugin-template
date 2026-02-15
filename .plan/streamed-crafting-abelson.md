# coding-rules.md への追加プラン

## 追加内容

### 1. Linter/Formatter セクション（新規追加）

「基本ルール」の前に追加：

```markdown
## Linter / Formatter

- Biome を使用する
- デフォルト設定を基本とする（`biome.json` 参照）
```

### 2. 変数名・関数名の命名規則（基本ルールに追記）

「ファイル名」の後に追加：

```markdown
- 変数名・関数名:
  - 変数: キャメルケース（`userId`, `recordList`）
  - 関数・メソッド: キャメルケース、動詞で開始（`getUser`, `validateInput`）
  - クラス・コンストラクタ: パスカルケース（`RecordProcessor`）
  - 定数: アッパースネークケース（`MAX_RETRY_COUNT`）
  - boolean: `is`, `has`, `can`, `exists` を接頭辞に使用（`isActive`, `hasPermission`）
  - 配列: 複数形または `List` を使用（`users`, `recordList`）
  - 1文字変数禁止（ループカウンター `i`, `j` は例外）
```

## 追加しないもの

- **kintone event return**: `architecture.md` で定義済みのため重複回避

## 変更対象ファイル

- [.claude/rules/coding-rules.md](.claude/rules/coding-rules.md)

## 検証方法

- `pnpm lint` で Biome チェックが通ること
