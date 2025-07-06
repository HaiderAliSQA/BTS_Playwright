import { chromium } from "@playwright/test";
import path from "path";

async function globalSetup() {
  const authFile = path.join(__dirname, "auth.json");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // --- LOGIN FLOW ---
  await page.goto("http://localhost:4200/bts/login");
  await page.locator("//img[@alt='Loginbtn']").click();
  await page.waitForTimeout(8000);
  await page.getByRole("textbox", { name: /email/i }).fill("hafizhaideraliuet@gmail.com");
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("textbox", { name: /password/i }).fill("Rustam@90");
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForTimeout(2000);
  if (await page.getByRole("button", { name: "Yes" }).isVisible()) {
    await page.getByRole("button", { name: "Yes" }).click();
  }
  await page.waitForTimeout(5000);
  await page.goto("http://localhost:4200/bts");
  await page.waitForTimeout(3000);

  // --- SAVE STORAGE STATE ---
  await context.storageState({ path: authFile });
  await browser.close();
}

module.exports = globalSetup;
