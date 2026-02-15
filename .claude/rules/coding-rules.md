# コーディング規約

## 基本ルール

- TypeScript strict モード
- arrow function を使用する
- 入出力の型定義を入出力に記載する
- `any` 禁止(やむなく利用する場合は、コメントに理由を記載する)
- `let`, `var`はなるべく避け、`const`を使用する(必要であれば`let`を使用する)
- ファイル名:
  - ドキュメントファイル：ケバブケース（`record-processor.ts`）
  - ReactUI コンポーネント：基本的にパスカルケース（`RecordProcessor.ts`）で export するコンポーネント名と一致させる
    - 複数ファイル export する場合は一致させなくても良い
  - その他全てのファイル：キャメルケース（`recordProcessor.ts`）

## UI 実装のルール

- UI は必ず tsx ファイルで定義する
- inline での React コンポーネント作成を禁止
- UI コンポーネントには必ず Storybook を追加する

### useEffect の利用

- useEffect は必要最低限の利用に留める
- render 前に取得できるデータは、useEffect を使わずに取得する
- useEffect を使用する前に、公式ドキュメント [You Might Not Need an Effect](https://ja.react.dev/learn/you-might-not-need-an-effect) を参照し、本当に必要かどうかを適切に判断すること

## SD コーディングルール

### Linter / Formatter

- Biome を使用する
- デフォルト設定を基本とする（`biome.json` 参照）

### 命名規則

- 変数: キャメルケース（`userId`, `recordList`）
- 関数・メソッド: キャメルケース、動詞で開始（`getUser`, `validateInput`）
- クラス・コンストラクタ: パスカルケース（`RecordProcessor`）
- 定数: アッパースネークケース（`MAX_RETRY_COUNT`）
- boolean: `is`, `has`, `can`, `exists` を接頭辞に使用（`isActive`, `hasPermission`）
- 配列: 複数形または `List` を使用（`users`, `recordList`）
- 1 文字変数禁止（ループカウンター `i`, `j` は例外）
