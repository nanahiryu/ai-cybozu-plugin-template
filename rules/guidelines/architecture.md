# アーキテクチャ

Simplified Hexagonal Architecture を採用

```
src/
  ├── components/
  │   ├── ui/          # UI Layer: 単一機能の UIコンポーネント
  │   └── pages/      # pages Layer: 一度に画面に表示されるUIコンポーネント
  ├── functions/
  │   ├── domain/         # Domain Layer: 純粋なビジネスロジック
  │   ├── infra/          # Infra Layer: kintone API
  │   └── handlers/       # Handler Layer: イベント処理（糊の役割）
  └── pages/              # Entry Points
```

### 依存関係ルール

- `domain` → 依存なし
- `ui` → `domain` のみ
- `infra` → `domain` のみ
- `handlers` → 全層可（ただしロジック実装禁止）
