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
   
      // Navigate directly to clients page (authentication handled by Playwright)
      await clientPage.navigateToClients();
      await clientPage.clickClientsTab();
      await clientPage.clickAddClient();
      await clientPage.fillClientDetails("Test Client")
      await clientPage.saveClient();
   
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
test("Export Client in XLX File", async ({ page }) => {
  await clientPage.navigateToClients();
  await clientPage.searchClient("ABC", "Active", "District", "Prospective");
  await exportFile.downloadExcelFromButtonCLick();
  
});
   
});