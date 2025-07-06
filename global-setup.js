import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

async function globalSetup() {
  const authFile = path.join(__dirname, "auth.json");
  
  // Check if auth.json exists and is less than 24 hours old
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const hoursSinceLastLogin = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastLogin < 24) {
      console.log('✅ Using existing authentication (less than 24 hours old)');
      return; // Skip login, use existing auth.json
    }
  }
  
  console.log('🔐 Starting fresh login process...');
  
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
  console.log('✅ Authentication saved successfully');
  await browser.close();
}

module.exports = globalSetup;
