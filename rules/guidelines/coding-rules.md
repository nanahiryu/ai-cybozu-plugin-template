# コーディング規約

## 基本ルール

- TypeScript strict モード
- arrow function を使用する
- 入出力の型定義を入出力に記載する
- `any` 禁止(やむなく利用する場合は、コメントに理由を記載する)
- ファイル名:
  - ドキュメントファイル：ケバブケース（`record-processor.ts`）
  - ReactUI コンポーネント：基本的にパスカルケース（`RecordProcessor.ts`）で export するコンポーネント名と一致させる
    - 複数ファイル export する場合は一致させなくても良い
  - その他全てのファイル：キャメルケース（`recordProcessor.ts`）

## UI 実装のルール

- UI は必ず tsx ファイルで定義する
- inline での React コンポーネント作成を禁止

### useEffect の利用

- useEffect は必要最低限の利用に留める
- render 前に取得できるデータは、useEffect を使わずに取得する
- useEffect を使用する前に、公式ドキュメント [You Might Not Need an Effect](https://ja.react.dev/learn/you-might-not-need-an-effect) を参照し、本当に必要かどうかを適切に判断すること
