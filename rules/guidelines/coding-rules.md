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
