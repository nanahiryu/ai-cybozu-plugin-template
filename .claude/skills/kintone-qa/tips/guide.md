# QA Tips ガイド

QA作業中に遭遇する問題と、対応するTipsへのリンク集。

## 利用ケース別リンク

### kintone 操作関連

| ケース | 参照 |
|--------|------|
| プラグイン設定を保存したが反映されない | [kintone/plugin-config-deploy.md](kintone/plugin-config-deploy.md) |
| アプリ更新のタイミングがわからない | [kintone/app-update.md](kintone/app-update.md) |

### Playwright 操作関連

| ケース | 参照 |
|--------|------|
| テストがタイムアウトする | [playwright/wait-for-load-state.md](playwright/wait-for-load-state.md) |
| 要素が見つからない・セレクタの選び方 | [playwright/selectors.md](playwright/selectors.md) |

## Tipsの追加方法

1. `tips/kintone/` または `tips/playwright/` に `.md` ファイルを追加
2. このファイル（guide.md）に利用ケースとリンクを追記
