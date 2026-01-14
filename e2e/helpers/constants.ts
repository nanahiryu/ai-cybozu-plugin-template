/**
 * E2Eテスト用の定数定義
 */

/**
 * 添付ファイルフィールドのコードとラベルのマッピング
 */
export const ATTACHMENT_FIELDS = {
  attachment1: {
    code: "attachment1",
    label: "添付ファイル1",
  },
  attachment2: {
    code: "attachment2",
    label: "添付ファイル2",
  },
} as const;

/**
 * フィールドコードからラベルを取得する
 */
export const getFieldLabel = (
  fieldCode: keyof typeof ATTACHMENT_FIELDS
): string => {
  return ATTACHMENT_FIELDS[fieldCode].label;
};

/**
 * 全フィールドコードの配列を取得する
 */
export const getAllFieldCodes = (): string[] => {
  return Object.keys(ATTACHMENT_FIELDS);
};

/**
 * テスト用のタイムアウト値
 */
export const TIMEOUTS = {
  /** 要素表示待機 */
  ELEMENT_VISIBLE: 10000,
  /** ページ遷移待機 */
  PAGE_NAVIGATION: 30000,
  /** 保存完了待機 */
  SAVE_COMPLETE: 10000,
  /** モーダル非表示待機 */
  MODAL_HIDDEN: 5000,
} as const;
