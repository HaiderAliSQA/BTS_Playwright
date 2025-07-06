import { Page } from '@playwright/test';
import { ClientLocators } from './locators/ClientLocators';
import { TestUtils } from '../utils/TestUtils';
import { chromium } from 'playwright';
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export class ClientPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Check if user is authenticated
  async checkAuthentication() {
    try {
      console.log("🔐 Checking authentication status...");
      
      // Check if we're redirected to login page
      const currentUrl = this.page.url();
      if (currentUrl.includes('/login')) {
        console.log("❌ Redirected to login page - authentication required");
        return false;
      }
      
      // Check for common authenticated page elements
      const isAuthenticated = await this.page.locator('body').isVisible();
      if (!isAuthenticated) {
        console.log("❌ Page not loaded properly");
        return false;
      }
      
      console.log("✅ Authentication check passed");
      return true;
    } catch (error) {
      console.error("❌ Authentication check failed:", error);
      return false;
    }
  }

  // Alternative navigation method through dashboard
  async navigateToClientsViaDashboard() {
    try {
      console.log("🔄 Navigating to clients via dashboard...");
      
      // First go to dashboard
      await this.page.goto("http://localhost:4200/bts/dashboard");
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(3000);
      
      // Then navigate to clients
      await this.page.goto("http://localhost:4200/bts/clients");
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(3000);
      
      console.log("✅ Navigation via dashboard completed");
    } catch (error) {
      console.error("❌ Error during dashboard navigation:", error);
      throw error;
    }
  }

  // Navigation Actions
  async navigateToClients() {
    try {
      console.log("🔄 Navigating directly to clients page...");
      
      // Navigate directly to clients URL since login is already handled
      await this.page.goto("http://localhost:4200/bts/clients");
      console.log("✅ URL loaded");

      // Wait for the page to be fully loaded
      await this.page.waitForLoadState("domcontentloaded");
      console.log("✅ DOM content loaded");

      // Add a small delay to ensure the page is fully rendered
      await this.page.waitForTimeout(3000);
      console.log("✅ Page rendered");

      // Check if we're on the right page by looking for any client-related element
      const pageTitle = await this.page.title();
      console.log("📄 Page title:", pageTitle);

      // Wait for the clients tab to be visible and clickable
      console.log("🔍 Looking for clients tab...");
      await this.page.waitForSelector(ClientLocators.clientsTab, { timeout: 15000 });
      console.log("✅ Clients tab found");

      await this.page.click(ClientLocators.clientsTab);
      console.log("✅ Clients tab clicked");
      
      await this.page.waitForTimeout(2000);
      console.log("✅ Navigation completed successfully");
    } catch (error) {
      console.error("❌ Error during navigation:", error);
      
      // Take a screenshot for debugging
      await this.page.screenshot({ path: 'debug-navigation-error.png' });
      console.log("📸 Screenshot saved as debug-navigation-error.png");
      
      // Log the current URL
      const currentUrl = this.page.url();
      console.log("🌐 Current URL:", currentUrl);
      
      throw error;
    }
  }

  async clickClientsTab() {
    await this.page.locator(ClientLocators.clientsTab).click();
    await this.page.waitForTimeout(1000);
  }

  async clickAddClient() {
    await this.page.locator(ClientLocators.addClientButton).click();
    await this.page.waitForTimeout(1000);
  }

  // Client Management Actions
  async AttachStudentselectClient(partialClientName: string) {
    await this.page
      .locator(ClientLocators.searchClientInput)
      .fill(partialClientName);
    const clientLocator = this.page.locator(
      `//a[contains(normalize-space(.), "${partialClientName}")]`
    );
    await clientLocator.click();
  }

  async editClient() {
    await this.page.locator(ClientLocators.editClientButton).click();
    await this.page.waitForTimeout(1000);
    const randomDigits = TestUtils.generateRandomDigits();
    const billingName = `Billing ${randomDigits}`;
    await this.page.locator(ClientLocators.billingattn).fill(billingName);
  }
  
  async searchClient(
    ClientName: string,
    Active_InActive: string,
    schooltype: string,
    prospectiveName: string
  ) {
    await this.page.locator(ClientLocators.searchClientInput).fill(ClientName);
    await this.page
      .locator(ClientLocators.Active_InActive)
      .selectOption({ label: Active_InActive });
    //Select School Type
    await this.page
      .locator(ClientLocators.schoolTypeDropdown)
      .selectOption({ label: schooltype });
    //prospective Type Select
    await this.page
      .locator(ClientLocators.prospectiveType)
      .selectOption({ label: prospectiveName });

    await this.page.waitForTimeout(5000);
  }

  async downloadExcelFromButton(page, folderPath: string, customFileName?: string) {
    // Create folder if it doesn't exist
    await fsPromises.mkdir(folderPath, { recursive: true });

    // Start download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator("//button[normalize-space()='Export']").click(),
    ]);

    // Use custom file name if provided, otherwise use suggested
    const fileName = customFileName || download.suggestedFilename();
    const fullPath = path.join(folderPath, fileName);
    await download.saveAs(fullPath);

    if (fs.existsSync(fullPath)) {
      console.log(" File verified at location:", fullPath);
    } else {
      console.error(" File not found at expected location:", fullPath);
    }

    console.log(`✅ Excel downloaded to: ${fullPath}`);
  }

  async fillClientDetails(clientName: string) {
    const randomDigits = TestUtils.generateRandomDigits();
    const clientRandomName = TestUtils.generateRandomClientName();

    await this.page
      .locator(ClientLocators.clientNameInput)
      .fill(clientRandomName);
    await this.page
      .locator(ClientLocators.poNumber)
      .fill(TestUtils.generateRandomPONumber());

    await this.page
      .locator(ClientLocators.invoiceTeplate)
      .selectOption({ label: "Simplified" });

    await this.page
      .locator(ClientLocators.billingattn)
      .fill(`Billing Attn ${randomDigits}`);
    await this.page
      .locator(ClientLocators.billingOffice1)
      .fill(`Billing Office 1 ${randomDigits}`);
    await this.page
      .locator(ClientLocators.billingOffice2)
      .fill(`Billing Office 2 ${randomDigits}`);

    //await this.page.check(ClientLocators.placementSchool);
    await this.page.check(ClientLocators.prospective);

    await this.page.waitForTimeout(1000);
  }

  async saveClient() {
    await this.page.locator(ClientLocators.saveButton).click();
    await this.page.waitForTimeout(2000);
  }

  // Location Management Actions
  async fillClientLocation() {
    const randomDigits = TestUtils.generateRandomDigits();

    await this.page.locator(ClientLocators.addLocationIcon).click();
    //await this.page.locator(ClientLocators.locationTitle).waitFor({ state: 'visible' });

    await this.page
      .locator(ClientLocators.locationTitle)
      .fill(`Location ${randomDigits}`);
    await this.page
      .locator(ClientLocators.locationAddress)
      .fill(`Address ${randomDigits}`);
    await this.page
      .locator(ClientLocators.locationPhone)
      .fill(TestUtils.generateRandomUSPhoneNumber());
    await this.page
      .locator(ClientLocators.locationFaxNumber)
      .fill(`Fax number ${randomDigits}`);
    await this.page
      .locator(ClientLocators.locationWebsite)
      .fill(`www.abc ${randomDigits}`);

    await this.page.locator(ClientLocators.saveButton).click();
  }

  async FillActivitydetail(Activitytitle: string) {}
}