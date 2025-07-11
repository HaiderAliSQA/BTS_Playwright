import { test, expect } from "@playwright/test";
import { ActivityPage } from "../pages/AddNewActivity";
import { SimpleActivityDataList } from "../utils/activity"; 


  test.skip("Create a Simple activity", async ({ page }) => {
    const activityPage = new ActivityPage(page);
    await activityPage.OpenActivityGrid();
    await activityPage.AtivitytitleAssertion();
    await activityPage.selectProvider("UI Test")
    await activityPage.SelectWBSActivityName(
      "(PSYCH) TRAVEL MIDDAY - FOREIGN LANGUAGE EVALUATION"
    );
    await activityPage.Activity_Titile_Notes();
    await activityPage.SelectClient("Client Simple");
    await activityPage.selectClientLocation("Location");
    await activityPage.simpleActivityTime();
    await activityPage.selectStudent("Student");
    await activityPage.SaveActivity();
    await page.waitForTimeout(1000)
    //await activityPage.RepeatchekBox()
  });
//===================================================================
test("Create multiple Simple (3) activities Created ", async ({ page }) => {
  const activityPage = new ActivityPage(page);

  for (const data of SimpleActivityDataList) {
    await activityPage.OpenActivityGrid();
    await activityPage.AtivitytitleAssertion();
    await activityPage.selectProvider(data.provider);
    await activityPage.SelectWBSActivityName(data.wbsName);
    await activityPage.Activity_Titile_Notes();
    await activityPage.SelectClient(data.client);
    await activityPage.selectClientLocation(data.location);
    await activityPage.simpleActivityTime();
    await page.waitForTimeout(3000);
    await activityPage.selectStudent(data.student);
     // optional delay between activities
    await activityPage.SaveActivity();
  }
});




//================================================================
    test.skip("Create a Is Placement School Activity", async ({ page }) => {
      const activityPage = new ActivityPage(page);
      await activityPage.OpenActivityGrid();
      await activityPage.AtivitytitleAssertion();
      await activityPage.selectProvider("UI Test");
      await activityPage.SelectWBSActivityName("CONSULTATION");
      await activityPage.Activity_Titile_Notes();
      await activityPage.IsPlacementSchoolActivitychekbox();
      await activityPage.IsPlacementSchoolClientSelect("Placement");
      await activityPage.selectClientLocation("Location");
      await activityPage.simpleActivityTime();
      await activityPage.selectStudent("Placement");
      await page.waitForTimeout(5000);
      
    });

  test.skip(" Activity Repeat Daily After  date with Simpple Client ", async ({ page })=>{
 
     const activityPage = new ActivityPage(page);
     await activityPage.OpenActivityGrid();
     await activityPage.AtivitytitleAssertion();
     await activityPage.selectProvider("UI Test");
     await activityPage.SelectWBSActivityName("CONSULTATION");
     await activityPage.Activity_Titile_Notes();
     await activityPage.SelectClient("Client Simple");
     await activityPage.selectClientLocation("Location");
     await activityPage.RepeatchekBox();
     await activityPage.RepeatDailyAfter();
    //  await activityPage.simpleActivityTime();
     await activityPage.selectStudent("Student");
     
    
  });
   test.skip(" Activity Repeat Daily ON   date With Simple Client ", async ({ page }) => {
      const activityPage = new ActivityPage(page);
      await activityPage.OpenActivityGrid();
      await activityPage.AtivitytitleAssertion();
      await activityPage.selectProvider("UI Test");
      await activityPage.SelectWBSActivityName("CONSULTATION");
      await activityPage.Activity_Titile_Notes();
      await activityPage.SelectClient("Client Simple");
      await activityPage.selectClientLocation("Location");
      await activityPage.RepeatchekBox();
      await activityPage.RepeatDailyON();
    //   await activityPage.simpleActivityTime();
      await activityPage.selectStudent("Student");
      await page.waitForTimeout(5000);
     
     
   });
   test.skip(" Activity Repeat Weekly Afer  date With Simple Client ", async ({ page }) => {
     const activityPage = new ActivityPage(page);
     await activityPage.OpenActivityGrid();
     await activityPage.AtivitytitleAssertion();
     await activityPage.selectProvider("UI Test");
     await activityPage.SelectWBSActivityName("CONSULTATION");
     await activityPage.Activity_Titile_Notes();
     await activityPage.SelectClient("Client Simple");
     await activityPage.selectClientLocation("Location");
     await activityPage.simpleActivityTime();
     await activityPage.RepeatchekBox();
     await activityPage.RepeatWeeklyAfter();
     await activityPage.selectStudent("Student");
     await page.waitForTimeout(5000);
     
   });
   test.skip(" Activity Repeat Weekly ON date With Simple Client", async ({ page }) => {
     const activityPage = new ActivityPage(page);
     await activityPage.OpenActivityGrid();
     await activityPage.AtivitytitleAssertion();
     await activityPage.selectProvider("UI Test");
     await activityPage.SelectWBSActivityName("CONSULTATION");
     await activityPage.Activity_Titile_Notes();
     await activityPage.SelectClient("Client Simple");
     await activityPage.selectClientLocation("Location");
    // await activityPage.simpleActivityTime();
     await activityPage.RepeatchekBox();
     await activityPage.RepeatDailyON();
     await activityPage.selectStudent("Student");
     await page.waitForTimeout(5000);
     
   });
   test.skip(" Activity Repeat Monthly ON date With Simple Client", async ({page}) => {
     const activityPage = new ActivityPage(page);
     await activityPage.OpenActivityGrid();
     await activityPage.AtivitytitleAssertion();
     await activityPage.selectProvider("UI Test");
     await activityPage.SelectWBSActivityName("CONSULTATION");
     await activityPage.Activity_Titile_Notes();
     await activityPage.SelectClient("Client Simple");
     await activityPage.selectClientLocation("Location");
     //await activityPage.simpleActivityTime();
     await activityPage.RepeatchekBox();
     await activityPage.RepeatMonthlyON();
     await page.waitForTimeout(5000);
     await activityPage.selectStudent("Student");
     await page.waitForTimeout(5000);
   });
   test.skip(" Activity Repeat Monthly After date With Simple Client", async ({
     page,
   }) => {
     const activityPage = new ActivityPage(page);
     await activityPage.OpenActivityGrid();
     await activityPage.AtivitytitleAssertion();
     await activityPage.selectProvider("UI Test");
     await activityPage.SelectWBSActivityName("CONSULTATION");
     await activityPage.Activity_Titile_Notes();
     await activityPage.SelectClient("Client Simple");
     await activityPage.selectClientLocation("Location");
     //await activityPage.simpleActivityTime();
     await activityPage.RepeatchekBox();
     await activityPage.RepeatWeeklyAfter();
     
     await activityPage.selectStudent("Student");
     await page.waitForTimeout(5000);
   });
