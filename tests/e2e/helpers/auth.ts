import type { Page } from "@playwright/test";
import { ENV } from "./env";

/**
 * kintoneにログインする
 * @param page Playwrightのページオブジェクト
 */
export const login = async (page: Page): Promise<void> => {
  await page.goto(`${ENV.BASE_URL}/login`);

  // プレースホルダーベースのセレクタを使用
  await page.fill('input[placeholder="Login name"]', ENV.USERNAME);
  await page.fill('input[placeholder="Password"]', ENV.PASSWORD);

  // ログインボタンはinput要素（buttonタグではない）
  await page.click('input[type="submit"][value="Login"]');

  // ポータルまたはkintoneアプリ画面に遷移
  await page.waitForURL(
    (url) => url.pathname === "/" || url.pathname.startsWith("/k/"),
    { timeout: 60000 },
  );
};
