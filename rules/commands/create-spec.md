# /create-spec - kintone プラグイン開発計画

設計を行うコマンド

**📚 重要**: 実装時は `rules/guidelines/kintone-api-reference.md` を参照してください。
kintone API のエンドポイント、イベント、フィールドタイプ、サンプルコードなどが記載されています。

---

## 出力

計画は `/docs/spec/` に出力してください。

## Step 1: kintone アプリ構成の取得

**参照**: `rules/guidelines/kintone-api-reference.md` の「Phase 1: Planning」セクション

- 既存のアプリを利用してプラグインの開発を行うかを質問してください
- すでにアプリが存在する場合は、ユーザーに `.env` ファイルが記入済みか確認してください

**注意**: AI エージェントは `.env` ファイルの存在確認ができません。ユーザーに直接確認を依頼してください。

### アプリ情報取得スクリプト

`.env` に認証情報を設定した上で、以下のスクリプトでフィールド情報を取得できます：

```bash
pnpm exec tsx scripts/get-form-fields.ts <appId>
```

**使用する API**:

- アプリ情報取得: `GET /k/v1/app.json`
- フィールド情報取得: `GET /k/v1/app/form/fields.json`

詳細は kintone-api-reference.md を参照してください。

## Step 2: ユースケースのヒアリング

- ユーザーは誰か
- "{user} が {action} することができる"の形式でユースケースを整理してください

## Step 3: 設計

ユースケースを元にプラグインの設計を行なってください
仕様書は`rules/templates/spec/`のテンプレートを利用して作成してください

### テンプレートのディレクトリ構成

- `rules/templates/spec/concept.md`
- `rules/templates/spec/requirements.md`
- `rules/templates/spec/kintone-app.md`
- `rules/templates/spec/plugin-config.md`
- `rules/templates/spec/usecase-detail.md`

### 仕様書のディレクトリ構成

- `docs/spec/`
  - `concept.md`
  - `requirements.md`
  - `kintone-app.md`
  - `plugin-config.md`
  - `usecases/`
    - `{ユースケース名}.md`

**Note**: テスト設計は `/design-test` コマンドで行います。
