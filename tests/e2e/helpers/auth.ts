import type { Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.BASE_URL || !process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error("Environment variables are not set");
}

/**
 * kintoneにログインする
 * @param page Playwrightのページオブジェクト
 */
export const login = async (page: Page): Promise<void> => {
  await page.goto(`${process.env.BASE_URL}/login`);

  // プレースホルダーベースのセレクタを使用
  await page.fill('input[placeholder="Login name"]', process.env.USERNAME!);
  await page.fill('input[placeholder="Password"]', process.env.PASSWORD!);

  // ログインボタンはinput要素（buttonタグではない）
  await page.click('input[type="submit"][value="Login"]');

  // ポータルまたはkintoneアプリ画面に遷移
  await page.waitForURL(
    (url) => url.pathname === "/" || url.pathname.startsWith("/k/"),
    { timeout: 60000 },
  );
};
