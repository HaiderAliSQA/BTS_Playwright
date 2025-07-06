import { test, expect } from '@playwright/test';
import { ClientPage } from '../../pages/ClientPage';

import { ExportFile } from 'pages/ExportFile';
import { DashboardPage } from 'pages/dashboard';
import path from "path";
import fs from "fs";

test.describe.serial('Create Contact as a Client', () => {
  let clientPage: ClientPage;
  let exportFile: ExportFile;
  let dashboard : DashboardPage;

  test.beforeEach(async ({ page }) => {
    clientPage = new ClientPage(page);
    dashboard = new DashboardPage(page)
     exportFile = new ExportFile(page);
  });

  test('should create new contact', async ({ page }) => {
    console.log("🚀 Starting contact creation test...");
    
    try {
      // Navigate directly to clients page (authentication handled by Playwright)
      console.log("👥 Navigating directly to clients...");
      await clientPage.navigateToClients();
      
      console.log("🔘 Clicking clients tab...");
      await clientPage.clickClientsTab();
      
      console.log("➕ Clicking add client...");
      await clientPage.clickAddClient();
      
      console.log("📝 Filling client details...");
      await clientPage.fillClientDetails("Test Client");
      
      console.log("💾 Saving client...");
      await clientPage.saveClient();
      
      console.log("✅ Contact creation test completed successfully!");
    } catch (error) {
      console.error("❌ Test failed:", error);
      
      // Take a screenshot for debugging
      await page.screenshot({ path: 'test-failure-screenshot.png' });
      console.log("📸 Test failure screenshot saved");
      
      throw error;
    }
  });

  test.skip('should edit client', async () => {
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("Activity Saved");
    await clientPage.editClient();
    await clientPage.saveClient();
  });

  test.skip('Add location in the Client Grid', async () => {
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("Activity Saved");
    await clientPage.fillClientLocation();
  });
test.skip("Export Client in XLX File", async ({ page }) => {
  await clientPage.navigateToClients();
  await clientPage.searchClient("ABC", "Active", "District", "Prospective");
  await exportFile.downloadExcelFromButtonCLick();
  
});
   
});