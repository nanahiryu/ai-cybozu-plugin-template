---
description: kintone プラグインの仕様書を作成するコマンド
---

# /create-spec - kintone プラグイン仕様書作成

仕様書を作成するコマンド。design-kintone-plugin スキルを参照して設計を行う。

---

## Step 1: kintone アプリ構成の取得

1. 既存のアプリを利用するか質問する
2. 既存アプリを利用する場合:
   - ユーザーに `.env` ファイル設定を確認
   - フィールド情報を取得:
   ```bash
   pnpm exec tsx .claude/skills/design-kintone-plugin/scripts/get-form-fields.ts <appId>
   ```

## Step 2: ヒアリング

design-kintone-plugin スキルの設計手順に沿って、不足している情報をヒアリングする。

例:
- ユースケース: "{user} が {action} することができる" 形式で整理
- 前提条件: モバイル対応、多言語対応など
- 外部連携: 利用する外部 API やライブラリ

## Step 3: 設計

- design-kintone-plugin スキルを参照して仕様書を作成
- 出力先: `docs/spec/`
