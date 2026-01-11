/**
 * kintone アプリのフィールド情報を取得するスクリプト
 *
 * 使用方法:
 *   pnpm exec tsx .claude/skills/design-kintone-plugin/scripts/get-form-fields.ts <appId>
 *
 * 必要な環境変数 (.env):
 *   - BASE_URL: kintone の URL (例: https://example.cybozu.com)
 *   - USERNAME: kintone のユーザー名
 *   - PASSWORD: kintone のパスワード
 *
 * 例:
 *   pnpm exec tsx .claude/skills/design-kintone-plugin/scripts/get-form-fields.ts 123
 */

import dotenv from "dotenv";
dotenv.config();

const getFormFields = async (
  baseUrl: string,
  auth: string,
  appId: string
) => {
  const response = await fetch(
    `${baseUrl}/k/v1/app/form/fields.json?app=${appId}`,
    {
      method: "GET",
      headers: {
        "X-Cybozu-Authorization": auth,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get form fields: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data;
};

(async () => {
  try {
    const baseUrl = process.env.BASE_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const appId = process.argv[2];

    if (!baseUrl || !username || !password) {
      console.error(
        "環境変数が設定されていません。.env に BASE_URL, USERNAME, PASSWORD を設定してください。"
      );
      process.exit(1);
    }

    if (!appId) {
      console.error("使用方法: pnpm exec tsx .claude/skills/design-kintone-plugin/scripts/get-form-fields.ts <appId>");
      console.error("例: pnpm exec tsx .claude/skills/design-kintone-plugin/scripts/get-form-fields.ts 123");
      process.exit(1);
    }

    const auth = Buffer.from(`${username}:${password}`).toString("base64");
    const fields = await getFormFields(baseUrl, auth, appId);
    console.log(JSON.stringify(fields, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
