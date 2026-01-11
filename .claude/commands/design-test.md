---
description: テスト設計を行うコマンド
---

# /design-test - テスト設計

E2Eテストの設計（テスト仕様書作成）を行うコマンド。

**注意**: このコマンドは「設計」のみを行う。E2Eテストの実装は `/do-plan` フローで行う。

---

## Step 1: 仕様書の確認

design-test スキルの「参照すべき仕様書」を確認する。

## Step 2: E2E テスト設計

- `docs/spec/test-spec.md` を作成
- design-test スキルのテンプレートを使用
- プラグイン設定による分岐を考慮
- テスト実行時間の最適化を意識

## 出力物

- `docs/spec/test-spec.md` - E2Eテスト仕様書
