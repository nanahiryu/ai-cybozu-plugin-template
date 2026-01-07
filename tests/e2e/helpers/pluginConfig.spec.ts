import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { login } from "./auth";
import { savePluginConfigAndDeploy } from "./pluginConfig";

dotenv.config();

const APP_ID = process.env.APP_ID;
const PLUGIN_ID = process.env.PLUGIN_ID;

test.describe("pluginConfig helper", () => {
  test("savePluginConfigAndDeploy が正常に動作する", async ({ page }) => {
    if (!APP_ID || !PLUGIN_ID) {
      test.skip();
      return;
    }

    // ログイン
    await login(page);

    // プラグイン設定を保存してデプロイ
    await savePluginConfigAndDeploy(page, APP_ID, PLUGIN_ID, {
      testKey: "testValue",
    });

    // デプロイ完了（エラーが発生しなければ成功）
    // アプリにアクセスして動作確認
    await page.goto(`${process.env.BASE_URL}/k/${APP_ID}/`);
    await page.waitForLoadState("load");
    expect(page.url()).toContain(`/k/${APP_ID}/`);
  });
});
