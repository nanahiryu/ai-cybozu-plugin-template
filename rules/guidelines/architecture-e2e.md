# E2E テストアーキテクチャ

E2E テストのディレクトリ構造と責務を定義する。

```
tests/e2e/
├── *.spec.ts           # テストケースのみ
├── helpers/
│   ├── env.ts          # 環境変数一元管理
│   ├── auth.ts         # ログイン処理
│   ├── pluginConfig.ts # プラグイン設定処理
│   ├── pages/          # 画面内の要素取得・操作
│   └── navigation/     # 画面遷移
├── fixtures/           # 生成済み静的ファイル（コミット対象）
└── scripts/            # 生成スクリプト等
```

## 各層の責務

| パス | 責務 | 例 |
| --- | --- | --- |
| `*.spec.ts` | テストケースのみ。汎用関数は helpers/ に切り出す | - |
| `helpers/env.ts` | 環境変数の一元管理・バリデーション | - |
| `helpers/auth.ts` | kintone へのログイン処理 | - |
| `helpers/pluginConfig.ts` | プラグイン設定の保存・デプロイ処理 | - |
| `helpers/pages/` | 画面内の要素取得・操作（DOM 操作） | `getCheckboxByFieldCode()` |
| `helpers/navigation/` | 画面遷移（URL 遷移 + 遷移完了待機） | `navigateToRecordDetail()` |
| `fixtures/` | 生成済み静的ファイル（コミット対象） | `sample.pdf`, `sample.png` |
| `scripts/` | fixtures 生成スクリプト等 | `generateFixtures.ts` |

## 守るべきルール

1. **spec.ts にはテストケースのみ**: 汎用関数は helpers/ に切り出す
2. **動的 import 型は使わない**: トップレベルで `import type { Page } from "@playwright/test";`
3. **環境変数は一元管理**: helpers/env.ts
4. **fixtures/ と scripts/ の分離**: fixtures/ はコミット対象、scripts/ は生成スクリプト
5. **pages/ と navigation/ の分離**: 要素操作と画面遷移を分離することで責務を明確化
