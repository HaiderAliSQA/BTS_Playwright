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
  })
})
test.skip("is ka kiaa bany ga ", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const clientPage = new ClientPage(page);
  const termPage = new TermPage(page);

  console.log(" is test me a gaya hya ");
  await dashboard.gotoDashboard();
  await clientPage.navigateToClients();
  await clientPage.AttachStudentselectClient("ABC School District");
  await termPage.selectTermByName("Add Term 002");
});

test("login and save session", async ({ page }) => {
  await page.goto("http://localhost:4200/bts/login");
  await page.getByRole("link", { name: "Loginbtn" }).click();
  await page.fill('input[type="email"]', 'hafizhaideraliuet@gmail.com');
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Rustam@90");
  await page.getByRole("button", { name: "Show password" }).click();
  await page.getByTestId("primaryButton").click();
  await page.getByTestId("primaryButton").click();

  // Save session/cookies
  await page.context().storageState({ path: "auth.json" });
});
