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

  // Navigation Actions
  async navigateToClients() {
    try {
      await this.page.goto("http://localhost:4200/bts/clients");

      await this.page.waitForLoadState("domcontentloaded");

      // Wait for the clients tab to be visible and clickable
      await this.page.waitForSelector(ClientLocators.clientsTab);

      await this.page.click(ClientLocators.clientsTab);
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error("Error during navigation:", error);
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