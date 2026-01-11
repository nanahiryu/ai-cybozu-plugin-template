---
name: design-kintone-plugin
description: |
  kintone プラグインの仕様書を設計する際に使用する。
  仕様書テンプレート構造、kintone アプリ設計、プラグイン設定の定義方法を提供する。
  WHEN: /create-spec 実行時、仕様書作成時、プラグイン設計時
  WHEN NOT: 実装中、テスト実行時、コードレビュー時
---

# kintone プラグイン設計ガイド

## 仕様書の出力先

`docs/spec/` に以下の構造で出力：

- `concept.md` - プロジェクト概要
- `requirements.md` - ユーザー要件
- `kintone-app.md` - アプリ設計
- `plugin-config.md` - プラグイン設定
- `usecases/{name}.md` - ユースケース詳細

## テンプレート

各仕様書のテンプレートは [templates/](templates/) を参照。

| テンプレート | 用途 |
|------------|------|
| [concept.md](templates/concept.md) | 経緯・背景・コンセプト・前提条件 |
| [requirements.md](templates/requirements.md) | 想定ユーザーと要件 |
| [kintone-app.md](templates/kintone-app.md) | アプリのフィールド設計 |
| [plugin-config.md](templates/plugin-config.md) | プラグイン設定・Proxy設定 |
| [usecase-detail.md](templates/usecase-detail.md) | ユースケースごとの詳細 |

## kintone アプリ情報取得

既存アプリのフィールド情報を取得する場合：

```bash
pnpm exec tsx .claude/skills/design-kintone-plugin/scripts/get-form-fields.ts <appId>
```

**必要な環境変数**: `BASE_URL`, `USERNAME`, `PASSWORD`

## 設計手順

### 0. プロジェクト概要・要件を整理

- 経緯・背景・コンセプト・前提条件を整理
- 想定ユーザーと要件を定義

FYI. [templates/concept.md](templates/concept.md), [templates/requirements.md](templates/requirements.md)

### 1. kintone アプリのデータ構造を決定

- フィールドの種類は [kintone フィールドタイプ](https://cybozu.dev/ja/kintone/docs/rest-api/apps/form/get-form-fields/) を参照

FYI. [templates/kintone-app.md](templates/kintone-app.md)

### 2. プラグイン設定のデータ構造を決定

- 機密データ（API token等）は proxyConfig に格納
- 参照: [外部API実行](https://cybozu.dev/ja/kintone/docs/js-api/plugins/kintone-plug-in-proxy/)

FYI. [templates/plugin-config.md](templates/plugin-config.md)

### 3. 各ユースケースの実現方針を決定

| 方針 | 用途 |
|------|------|
| 標準機能 | [kintone ヘルプ](https://cn.kintone.help/k/ja/) で対応可能な場合 |
| JS API | [event handler](https://cybozu.dev/ja/kintone/docs/js-api/events/event-handling/) を利用 |
| カスタマイズビュー | 一覧画面の自由なカスタマイズ |

FYI. [templates/usecase-detail.md](templates/usecase-detail.md)

### 4. 各 handler の処理フローを設計

- handler を実装すると考えた際に、関数に分離する単位で処理の流れを記載

FYI. [templates/usecase-detail.md](templates/usecase-detail.md)

## kintone API 参照

型定義・API 仕様は @rules/guidelines/kintone-api-reference.md を参照。
