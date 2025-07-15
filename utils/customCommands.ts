import { Page } from "@playwright/test";
import { ActivityPage } from "../pages/AddNewActivity";

export async function createSimpleActivity(page: Page, activityData: {
  provider: string,
  wbsActivityName: string,
  client: string,
  location: string,
  student: string,
  notes?: string
}) {
  const activityPage = new ActivityPage(page);
  await activityPage.OpenActivityGrid();
  await activityPage.AtivitytitleAssertion();
  await activityPage.selectProvider(activityData.provider);
  await activityPage.SelectWBSActivityName(activityData.wbsActivityName);
  await activityPage.Activity_Titile_Notes();
  await activityPage.SelectClient(activityData.client);
  await activityPage.selectClientLocation(activityData.location);
  await activityPage.simpleActivityTime();
  await activityPage.selectStudent(activityData.student);
  await activityPage.SaveActivity();
  await page.waitForTimeout(1000);
} 