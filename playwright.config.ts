import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  globalSetup: require.resolve('./global-setup'),
  timeout: 120000,
  use: {
    baseURL: "http://localhost:4200",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    storageState: 'auth.json',
    navigationTimeout: 120000,
    actionTimeout: 60000,
  },
  projects: [
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
        ignoreHTTPSErrors: true,
      },
    },
  ],
}); 