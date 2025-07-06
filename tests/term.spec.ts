
import { test, expect } from "@playwright/test";
import { TermPage } from "pages/TermPage";
import { StudentPage } from "pages/StudentPage";
import { ClientPage } from "pages/ClientPage";
import { DashboardPage } from "pages/dashboard";

test.describe.serial("Create Contact as a Student", () => {
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

  test.skip("GoTO Term Locator", async ({ page }) => {
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("ABC School District");
    //
    await termPage.selectTermByName("Add Term 002");
    await termPage.selectLocationTermPartial("Location 002");
    //await termPage.getRowDataByTitle("Assistive Technology / SLP");

    //await termPage.selectWBS_ByTitle("CF Supervision");
    await termPage.selectWBS_ByTitle_XPath(
      "Augusta School District",
      "Physical Therapy HY Tech ( Update Service Titile )"
    );
    await page.waitForTimeout(5000);
  });

  //=================================
  test("Add PO NUMBER and Amount in the service", async ({ page }) => {
    await dashboard.gotoDashboard();
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("ABC School District");
    //
    await termPage.selectTermByName("Add Term 002");
    //await termPage.selectLocationTermPartial("Location 002");
    //await termPage.getRowDataByTitle("Assistive Technology / SLP");

    await termPage.selectWBS_ByTitle_XPath(
      "Location 002",
      "Physical Therapy HY Tech ( Update Service Titile )"
    );
    //     await termPage.PODetails(
    //   "Foreign Language Evaluation - SPEECH",
    //   [
    //     "(SPEECH) TRAVEL MIDDAY - FOREIGN LANGUAGE EVALUATION",
    //     "(SPEECH) TRAVEL-COMMUTE HOURLY FOREIGN LANGUAGE EVALUATION",
    //     "(SPEECH) TRAVEL - FOREIGN LANGUAGE EVALUATION"
    //   ],
    //   [
    //     "400",  // Amount for 1st title
    //     "500",  // Amount for 2nd title
    //     "600"   // Amount for 3rd title
    //   ]
    // );

    await page.waitForTimeout(5000);

    // await termPage.fillChargeByTitle(
    //   "Foreign Language Evaluation - SPEECH",
    //   "150"
    // );

    // await termPage.PODetails("Foreign Language Evaluation - SPEECH");
    await page.waitForTimeout(5000);
  });
});
