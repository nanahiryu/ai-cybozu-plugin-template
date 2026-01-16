import type { Page } from "@playwright/test";
import { ENV } from "./env";

/**
 * Basic認証用のヘッダーを生成する
 */
const createAuthHeader = (): string => {
  return Buffer.from(`${ENV.USERNAME}:${ENV.PASSWORD}`).toString("base64");
};

/**
 * プラグイン設定を保存する
 * kintone.plugin.app.setConfig() を使用してプラグイン設定を保存する
 * @param page Playwrightのページオブジェクト（ログイン済み）
 * @param appId アプリID
 * @param pluginId プラグインID
 * @param config プラグイン設定（key-valueオブジェクト）
 */
const savePluginConfig = async (
  page: Page,
  appId: string,
  pluginId: string,
  config: Record<string, string>
): Promise<void> => {
  // プラグイン設定画面に遷移
  await page.goto(
    `${ENV.BASE_URL}/k/admin/app/${appId}/plugin/config?pluginId=${pluginId}`
  );
  await page.waitForLoadState("load");

  // kintone.plugin.app.setConfig() を使用して設定を保存
  await page.evaluate((cfg) => {
    return new Promise<void>((resolve, reject) => {
      try {
        kintone.plugin.app.setConfig(cfg, () => resolve());
      } catch (error) {
        reject(error);
      }
    });
  }, config);
};

/**
 * アプリ設定を運用環境に反映
 * https://cybozu.dev/ja/kintone/docs/rest-api/apps/settings/deploy-app-settings/
 * REST API を使用
 * @param page Playwrightのページオブジェクト
 * @param appId アプリID
 */
const deployApp = async (page: Page, appId: string): Promise<void> => {
  const response = await page.request.post(
    `${ENV.BASE_URL}/k/v1/preview/app/deploy.json`,
    {
      headers: {
        "X-Cybozu-Authorization": createAuthHeader(),
        "Content-Type": "application/json",
      },
      data: {
        apps: [{ app: appId }],
      },
    }
  );

  if (!response.ok()) {
    const body = await response.json();
    throw new Error(`Failed to deploy app: ${JSON.stringify(body)}`);
  }
};

/**
 * アプリ設定の反映完了を待機する
 * https://cybozu.dev/ja/kintone/docs/rest-api/apps/settings/get-app-deploy-status/
 * REST API を使用
 * @param page Playwrightのページオブジェクト
 * @param appId アプリID
 * @param timeout タイムアウト（ミリ秒）
 */
const waitForDeployComplete = async (
  page: Page,
  appId: string,
  timeout = 30000
): Promise<void> => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const response = await page.request.get(
      `${ENV.BASE_URL}/k/v1/preview/app/deploy.json?apps=${appId}`,
      {
        headers: {
          "X-Cybozu-Authorization": createAuthHeader(),
        },
      }
    );

    if (!response.ok()) {
      const body = await response.json();
      throw new Error(`Failed to check deploy status: ${JSON.stringify(body)}`);
    }

    const body = await response.json();
    const status = body.apps?.[0]?.status;

    if (status === "SUCCESS") {
      return;
    }

    if (status === "FAIL" || status === "CANCEL") {
      throw new Error(`Deploy failed with status: ${status}`);
    }

    // 1秒待機してリトライ
    await page.waitForTimeout(1000);
  }

  throw new Error(`Deploy timeout after ${timeout}ms`);
};

/**
 * プラグイン設定を保存してアプリを更新する（一括処理）
 * @param page Playwrightのページオブジェクト（ログイン済み）
 * @param appId アプリID
 * @param pluginId プラグインID
 * @param config プラグイン設定（key-valueオブジェクト）
 */
export const savePluginConfigAndDeploy = async (
  page: Page,
  appId: string,
  pluginId: string,
  config: Record<string, string>
): Promise<void> => {
  await savePluginConfig(page, appId, pluginId, config);
  await deployApp(page, appId);
  await waitForDeployComplete(page, appId);
};
