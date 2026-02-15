# 型定義の使用方法

## 基本方針

`@kintone/dts-gen` の型定義を活用し、不足分のみ拡張する。
全て独自に定義するのではなく、公式の型定義を基本とする。

## tsconfig.json の設定

`tsconfig.json` の `files` に dts-gen の型定義を追加することで、kintone の型が利用可能になる。

```json
{
  "files": ["./node_modules/@kintone/dts-gen/kintone.d.ts"]
}
```

## 型の拡張方法

dts-gen に含まれていない型のみ、`src/types/kintone.d.ts` で拡張する。

例：`kintone.createDialog()` の型定義（2025年10月追加のAPI）

```typescript
// src/types/kintone.d.ts
declare namespace kintone {
  type DialogAction = "OK" | "CANCEL" | "CLOSE" | "FUNCTION";

  interface DialogConfig {
    title?: string;
    body?: HTMLElement;
    showOkButton?: boolean;
    okButtonText?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    showCloseButton?: boolean;
    beforeClose?: (action: Exclude<DialogAction, "FUNCTION">) => boolean | Promise<boolean>;
  }

  interface Dialog {
    show(): Promise<DialogAction>;
    close(): void;
  }

  function createDialog(config: DialogConfig): Promise<Dialog>;
}
```

## 注意事項

- dts-gen で提供される型を再定義しない
- 型拡張が必要な場合は、最小限の範囲で行う
- 可能な限り公式ドキュメントを参照して型を定義する
- `declare global` は使用禁止。型拡張には `declare namespace kintone` を使用する
