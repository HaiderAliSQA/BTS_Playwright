import { test, expect } from "@playwright/test";
import { TimeTracking } from "pages/locators/timeTrackingLocator";
import { ClientPage } from "pages/ClientPage";
import { StudentPage } from "pages/StudentPage";
import { TimeTrackingPage } from "pages/TimeTrackingPage";
import { DashboardPage } from "pages/dashboard";
import { ActivityPage } from "pages/AddNewActivity";
import { ExportFile } from "pages/ExportFile";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

test.describe.serial('Create Contact as a Student', () => {
  let studentPage: StudentPage;
  let clientPage: ClientPage;
  let activityPage: ActivityPage;
  let exportFile: ExportFile;
  let TimeTracking : TimeTrackingPage
  let createdStudentName: string;
  let dashboard : DashboardPage;

  test.beforeEach(async ({ page }) => {
    TimeTracking = new TimeTrackingPage(page);
    studentPage = new StudentPage(page);
    clientPage = new ClientPage(page);
    activityPage = new ActivityPage(page);
    dashboard = new DashboardPage(page)
    exportFile = new ExportFile(page)
  })

  test("Unposted ko yaahn Export kiyaaa jeeee ga", async ({ page }) => {
    
    await dashboard.gotoDashboard();
    await TimeTracking.GotUnposted();
    await activityPage.selectProvider("UI Test");
    await TimeTracking.ApplyFilter();
    await exportFile.downloadExcelFromIcon();

  });

  //  TimeTracking me Unposted 
  test.skip("Export Posted file From Time Tracking -> Posted  ", async ({ page }) => {
    console.log("khbgiwugfiwebfuiehncelno");
     await dashboard.gotoDashboard();
     await TimeTracking.Gotoposted();
     await activityPage.selectProvider("UI Test");
     await TimeTracking.ApplyFilter();
     
    await exportFile.downloadExcelFromIcon();


   });
})