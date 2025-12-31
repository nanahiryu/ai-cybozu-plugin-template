# アーキテクチャ

Simplified Hexagonal Architecture を採用

```
src/
  ├── components/
  │   ├── ui/             # UI Layer: 単一機能の UIコンポーネント
  │   └── pages/          # pages Layer: 一度に画面に表示されるUIコンポーネント
  ├── hooks/              # ページごと, または複数ページで利用するUIロジック・状態管理
  ├── functions/
  │   ├── domain/         # Domain Layer: 純粋なビジネスロジック
  │   ├── usecases/       # domain/, infra/ を呼び出すオーケストレーション関数（基本的には作成しない）
  │   ├── infra/          # Infra Layer: kintone API
  │   └── handlers/       # Handler Layer: kintone イベントハンドラ登録のみ
  └── pages/              # Entry Points
```

## 依存関係ルール

- `domain` → 依存なし
- `ui` → `domain` のみ
- `pages` → `ui`, `hooks`
- `infra` → `domain` のみ
- `hooks` → `usecases`, `domain`, `infra`
- `handlers` → `domain`, `infra`
- `usecases` → `domain`, `infra`

## 各層の責務

### functions

#### handlers

kintone イベントハンドラ（`app.record.detail.show` など）の登録のみを行う。
UI 構築やビジネスロジック, 外部への副作用は他の層に委譲する。

#### usecases

domain/ と infra/ を組み合わせて呼び出すオーケストレーション関数を配置する。

使用例：
- UIイベント（onClick等）から呼び出されるヘビーな処理
- 複数の domain 関数と infra 関数を組み合わせる処理

注意：
- ロジック実装は domain/ に委譲し、usecases/ では組み合わせのみ行う
- 単純な処理は hooks/ や handlers/ から直接 domain/infra/ を呼んでよい

### hooks

ページごとの UI ロジック・状態管理を行う。onClick などの UI イベント処理を記載する。処理が極端に複雑化(1 関数の処理が 100 行以上)したり、他のページでも利用する一連の処理が出てきた場合は `usecases` に切り出す。

### components

### ui

共通利用するような UI コンポーネントを作成する。
onClick などの UI イベント処理は基本的には記載せず、props で受け取る。

### pages

ページごとの UI を作成する。
ページごとの ロジック・状態管理は hooks に委譲する。

詳細は `examples/handler-pattern.ts` を参照してください。
