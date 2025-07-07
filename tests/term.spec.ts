
import { test, expect } from "@playwright/test";
import { TermPage } from "pages/TermPage";
import { StudentPage } from "pages/StudentPage";
import { ClientPage } from "pages/ClientPage";
import { DashboardPage } from "pages/dashboard";

test.describe.serial("Yahan ik page sy sare Object ban rahen han Term page ky leay ", () => {
  let studentPage: StudentPage;
  let clientPage: ClientPage;
  let dashboard: DashboardPage;
  let termPage: TermPage;
  let createdStudentName: string;

  test.beforeEach(async ({ page }) => {
    termPage = new TermPage(page);
    studentPage = new StudentPage(page);
    dashboard = new DashboardPage(page);
    clientPage = new ClientPage(page);
  });

  test("Add service type First Time BY Select Location and Title", async ({ page }) => {
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("ABC School District");
    //
    await termPage.selectTermByName("Add Term 002");
    await termPage.selectLocation("Location 001");
    //await termPage.getRowDataByTitle("Assistive Technology / SLP");

    //await termPage.selectWBS_ByTitle("CF Supervision");
    await termPage.AddservicetypeFirstTime("BTO");
    await page.waitForTimeout(5000);
  });

  //=================================
  test.skip("Add More Services type in the service by Clicking on the Edit Icon", async ({ page }) => {
    await dashboard.gotoDashboard();
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("ABC School District");
    //
    await termPage.selectTermByName("Add Term 002");
    //await termPage.selectLocationTermPartial("Location 002");
    //await termPage.getRowDataByTitle("Assistive Technology / SLP");

    await termPage.addMoreServiceType("Location 002", "COVIDDEP");
   
    
  });
  test.skip("Add PO Number and Amount in the service by Clicking on the Edit Icon", async ({ page }) => {
    await dashboard.gotoDashboard();
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("ABC School District");
    await termPage.selectTermByName("Add Term 002");
    // yaahn Location 002 ko select karna hai or Title ko select karna hai
    await termPage.clickonServiceType(
      "Location 002",
      "Foreign Language Evaluation - SPEECH"
    );
    // yahan PO Number and Amount add karna hai
    // yahah Service Type ko select karna hai or on ky leay  Amount add karna hai
        await termPage.PODetails(
      "Foreign Language Evaluation - SPEECH",
      [
        "(SPEECH) TRAVEL MIDDAY - FOREIGN LANGUAGE EVALUATION",
        "(SPEECH) TRAVEL-COMMUTE HOURLY FOREIGN LANGUAGE EVALUATION",
        "(SPEECH) TRAVEL - FOREIGN LANGUAGE EVALUATION"
      ],
      [
        "434",  // Amount for 1st title
        "545",  // Amount for 2nd title
        "653"   // Amount for 3rd title
      ]
    );
    await page.waitForTimeout(1000);
  })
});
