import { test, expect } from "@playwright/test";
import { TimeTracking } from "pages/locators/timeTrackingLocator";
import { DashboardPage } from "pages/dashboard";
import { ActivityPage } from "pages/AddNewActivity";
import { ExportFile } from "pages/ExportFile";
import { BillingLocatorPage } from "pages/locators/billingLocator";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import  { Billingpage } from "pages/BillingPage";

test.describe.serial('Create Contact as a Student', () => {
 
  let activityPage: ActivityPage;
  let exportFile: ExportFile;
  let createdStudentName: string;
  let dashboard: DashboardPage;
  let Billing: Billingpage;
  test.beforeEach(async ({ page }) => {
    activityPage = new ActivityPage(page);
    dashboard = new DashboardPage(page);
    exportFile = new ExportFile(page);
    Billing = new Billingpage(page)
  });
  //==============
  // Billing me Approved me jana 
  test(" Go to Billing then Approved " , async({page})=>{
    await dashboard.gotoDashboard();
    await Billing.GotoApproved();
    await activityPage.selectProvider("UI Test");
    await Billing.StartDate_ApplyFilter();
    await Billing.bulkApprove();
    await page.waitForTimeout(1000)


  })
})
