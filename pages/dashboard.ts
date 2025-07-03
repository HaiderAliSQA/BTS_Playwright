import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoDashboard() {
    try {
      await this.page.goto("http://localhost:4200/bts/dashboard");
      //await this.page.waitForLoadState("domcontentloaded");
      // Wait for the dashboard to be visible/clickable if needed
    } catch (error) {
      console.error("Error during navigation:", error);
      throw error;
    }
  }
}