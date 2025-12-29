import ja from "../../../src/i18n/ja.json";
import en from "../../../src/i18n/en.json";

export const i18n = {
  ja,
  en,
};

/**
 * 文言キーから日本語の文言を取得する
 * @param key ドット区切りの文言キー（例: "config.save"）
 * @returns 日本語の文言
 */
export const t = (key: string): string => {
  const keys = key.split(".");
  let value: any = ja;
  for (const k of keys) {
    value = value[k];
  }
  return value;
};
