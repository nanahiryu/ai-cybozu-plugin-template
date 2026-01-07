# テスト

## テスト方針

- TDD を採用し、e2e, integration テストは先に書く
- unit テストは domain/, ui/を実装中に記載する
  - plugin の性質上、api は既に用意されているものを利用するため、特殊なケースを除いて infra/のテストをしない
- テストコードは実装ファイルと同じディレクトリに配置する
- メンテナンスしやすいように必要最小限のテストを実装することを意識する

### Domain 層

- 全ての関数に対して正常系を少なくとも一つ書く
- 複雑なロジックに対しては境界値を意識したテストを保守しやすいよう必要最小限書く

### Handler 層

- ハンドラに対して正常系を少なくとも一つ書く
- infra/はモックを使用することとする

### UI/Pages 層

- ロジックは基本的にはテストを行わない
  - 原則的に UI にはロジックを持たせないことを実装段階で意識するため
- UI/Pages は storybook を利用し、コンポーネントの操作が意図的かを常に人間が確認できる状態に**必ず**しておく
  - storybook においても story は必要最低限にする

### hooks/

- hooks/配下のカスタムフックはテストを必要としない
  - UI コンポーネントと密接に結びついており、コンポーネントのテストでカバーされるため

### E2E 層

- kintone 標準の機能についてはテストしないことを意識する
- テストコードは id, class は変更される可能性が高いため、テストコード内では使用しないことを意識する

#### 環境変数の読み込み

テストヘルパーや config では必ず以下を実装:

```typescript
import dotenv from "dotenv";
dotenv.config();

if (!process.env.BASE_URL || !process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error("Environment variables are not set");
}
```

#### kintone ログインの実装

kintone のログインヘルパー実装は `tests/e2e/helpers/auth.ts` を参照してください。

## テスト実装中の注意

- テストコードは常に通るようにしてください。実装がまだ行われておらず、通らないテストがある場合にはライブラリ固有の機能などを利用し、skip するようにしてください。

### skip の使い方

実装前のテストは `test.describe.skip()` でスキップし、実装完了後に `.skip` を削除してください。

例: describe 単位で skip

```typescript
// 実装前
test.describe.skip("プラグイン設定画面", () => {
  test("設定が保存される", async ({ page }) => {
    // テストコード
  });
});

// 実装後 - .skip を削除
test.describe("プラグイン設定画面", () => {
  test("設定が保存される", async ({ page }) => {
    // テストコード
  });
});
```
