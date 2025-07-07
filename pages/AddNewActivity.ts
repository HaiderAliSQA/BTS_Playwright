import { expect, Page } from "@playwright/test";
import { activitylocator } from "./locators/activitylocator";
import { TestUtils } from "../utils/TestUtils";
import { chromium } from "playwright";
import { TermLocator } from "pages/locators/TermLocator";
import path from "path";

export class ActivityPage {
  readonly page: Page;
  generatedActivityTitle?: string;

  constructor(page: Page) {
    this.page = page;
  }
  async OpenActivityGrid() {
    await this.page.goto("http://localhost:4200/bts/dashboard");
    await this.page.waitForTimeout(5000);
    await this.page.locator(activitylocator.CreateNewButton).click();
    await this.page.locator(activitylocator.AddNewActivity).click();
  }

  async Activity_Titile_Notes() {
    const randomName = TestUtils.generateRandomClientName();
    const titleField = this.page.locator(activitylocator.activityName);
    const notesField = this.page.locator(activitylocator.Activity_Notes);

    // 🟡 Read existing value (if any)
    const existingTitle = await titleField.inputValue();

    // 🟢 Append new part
    const newTitlePart = `Activity Form playwright ${randomName}`;
    const finalTitle = existingTitle
      ? `${existingTitle} | ${newTitlePart}`
      : newTitlePart;

    // 🔵 Fill updated title and notes
    await titleField.fill(finalTitle);
    await notesField.fill(finalTitle);

    // ✅ Store if you want to reuse later
    (this as any).generatedActivityTitle = finalTitle;

    console.log("📌 Final Title/Notes:", finalTitle);
  }

  async selectProvider(partialProviderName: string) {
    //Select provider
    await this.page.locator(activitylocator.WBSDropdownContainer).click();
    await this.page
      .locator(activitylocator.providerSearchinput)
      .fill(partialProviderName);

    const matchingprovider = this.page.locator(
      `.ng-option:has-text("${partialProviderName}")`
    );
    const providerCount = await matchingprovider.count();
    if (providerCount > 0) {
      await matchingprovider.first().click();
      console.log(
        `Selected Provider with partial match: ${partialProviderName}`
      );
    } else {
      console.log(`No student found with partial name: ${partialProviderName}`);
    }
  }
  async SaveActivity() {
    await this.page.locator(TermLocator.SaveButton).click();
  }

  async SelectClient(partialClientName: string) {
    await this.page
      .locator(activitylocator.clientSearchInput)
      .fill(partialClientName);
    const MatchingClientName = this.page.locator(
      `.ng-option:has-text("${partialClientName}")`
    );
    const clientCount = await MatchingClientName.count();
    if (clientCount > 0) {
      await MatchingClientName.first().click();
      console.log(`Selected student with partial match: ${partialClientName}`);
    } else {
      console.log(`No student found with partial name: ${partialClientName}`);
    }
  }

  async SelectWBSActivityName(partialWBSName: string) {
    await this.page.locator(activitylocator.activityDropdownContainer).click();
    // await this.page.waitForTimeout(5000);
    await this.page.locator(activitylocator.SelectWBS).fill(partialWBSName);
    const MatchingWBS = this.page.locator(
      `.ng-option:has-text("${partialWBSName}")`
    );
    const countWBS = await MatchingWBS.count();
    if (countWBS > 0) {
      await MatchingWBS.first().click();
      console.log(`Selected student with partial match: ${partialWBSName}`);
    } else {
      console.log(`No student found with partial name: ${partialWBSName}`);
    }
  }

  async simpleActivityTime() {
    console.log(" lfhewofhwoh");
    const date = TestUtils.generateRandomPastDate();
    console.log("Rendum date ", date);

    await this.page.locator(activitylocator.activityStartDate).fill(date);
    await this.page.waitForTimeout(5000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);
    //await this.page.waitForTimeout(8000);

    // 1. Open the dropdown
    const activityduration = this.page.locator(
      activitylocator.activityduration
    );

    await this.page.waitForTimeout(1000);
  }
  async selectStudent(partialName: string) {
    await this.page
      .locator(activitylocator.ActivityStudentDropdownContainer)
      .click();
    await this.page
      .locator(activitylocator.StudentSearchInput)
      .fill(partialName);
    // await this.page.waitForTimeout(1000); // give time to populate results

    // Find any option that contains the partial name
    const matchingOption = this.page.locator(
      `.ng-option:has-text("${partialName}")`
    );
    const count = await matchingOption.count();

    if (count > 0) {
      await matchingOption.first().click();
      console.log(`Selected student with partial match: ${partialName}`);
    } else {
      console.log(`No student found with partial name: ${partialName}`);
    }
  }
  async selectClientLocation(partialClientLocationNamee: string) {
    console.log(" Haider KAJDFksfneonoen");
    //Select Client Location
    await this.page
      .locator(activitylocator.clientLocationDropdownContainer)
      .click();
    await this.page
      .locator(activitylocator.clientLocationInput)
      .fill(partialClientLocationNamee);

    const matchingLocation = this.page.locator(
      `.ng-option:has-text("${partialClientLocationNamee}")`
    );
    const LocationCount = await matchingLocation.count();
    console.log(" ye hy location ", matchingLocation);
    if (LocationCount > 0) {
      await matchingLocation.first().click();
      console.log(
        `Selected student with partial match: ${partialClientLocationNamee}`
      );
    } else {
      console.log(
        `No student found with partial name: ${partialClientLocationNamee}`
      );
    }
  }

  async RepeatDailyAfter() {
    const CurrentDate = TestUtils.getCurrentDate();
    console.log("CurrentDate ", CurrentDate);

    await this.page
      .locator(activitylocator.activityStartDate)
      .fill(CurrentDate);
    await this.page.waitForTimeout(5000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);
    const RepeatsType = this.page.locator(activitylocator.ActivityType);

    await RepeatsType.selectOption({ label: "Daily" });

    const repectAfter_on = this.page.locator(activitylocator.Repeat_after_on);
    await repectAfter_on.selectOption({ label: "After" });
    const end_Date = TestUtils.getRepesatLastdateindays();
    console.log("After_end_date selector:", activitylocator.After_end_date);
    await this.page.locator(activitylocator.After_end_date).fill(`${end_Date}`);
  }
  async RepeatDailyON() {
    const CurrentDate = TestUtils.getCurrentDate();
    console.log("CurrentDate ", CurrentDate);

    await this.page
      .locator(activitylocator.activityStartDate)
      .fill(CurrentDate);
    await this.page.waitForTimeout(1000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);
    const RepeatsType = this.page.locator(activitylocator.ActivityType);

    await RepeatsType.selectOption({ label: "Daily" });

    const repectAfter_on = this.page.locator(activitylocator.Repeat_after_on);
    await repectAfter_on.selectOption({ label: "On" });

    const date = TestUtils.getDateAfter7Days();
    await this.page.locator(activitylocator.RepeatEndDateTime).fill(date);
    console.log(" randum date", date);
    await this.page.waitForTimeout(1000);
  }

  async RepeatWeeklyAfter() {
    const CurrentDate = TestUtils.getCurrentDate();
    console.log("CurrentDate ", CurrentDate);

    await this.page
      .locator(activitylocator.activityStartDate)
      .fill(CurrentDate);
    await this.page.waitForTimeout(1000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);

    const RepeatsType = this.page.locator(activitylocator.ActivityType);
    await RepeatsType.selectOption({ label: "Weekly" });
    const repectAfter_on = this.page.locator(activitylocator.Repeat_after_on);
    await repectAfter_on.selectOption({ label: "After" });
    const date = TestUtils.getRepesatLastdateindays();
    console.log(" ae gi ye ni ", date);
    //await expect(this.page.locator(activitylocator.After_end_date)).toBeVisible();
    console.log(this.page.locator(activitylocator.After_end_date));
    await this.page.locator(activitylocator.After_end_date).fill(`${date}`);
  }
  async RepeatWeeklyON() {
    const CurrentDate = TestUtils.getCurrentDate();
    console.log("Rendum date ", CurrentDate);

    await this.page
      .locator(activitylocator.activityStartDate)
      .fill(CurrentDate);
    await this.page.waitForTimeout(5000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);
    const RepeatsType = this.page.locator(activitylocator.ActivityType);
    await RepeatsType.selectOption({ label: "Weekly" });
    const repectAfter_on = this.page.locator(activitylocator.Repeat_after_on);
    await repectAfter_on.selectOption({ label: "On" });
    const date = TestUtils.getDateAfter2Weeks();
    console.log(" ae gi ye ni ", date);
    //await expect(this.page.locator(activitylocator.After_end_date)).toBeVisible();
    console.log(this.page.locator(activitylocator.After_end_date));
    await this.page.locator(activitylocator.RepeatEndDateTime).fill(`${date}`);
  }
  async RepeatMonthlyON() {
    const CurrentDate = TestUtils.getCurrentDate();
    console.log("Rendum date ", CurrentDate);

    await this.page
      .locator(activitylocator.activityStartDate)
      .fill(CurrentDate);
    await this.page.waitForTimeout(5000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);

    const RepeatsType = this.page.locator(activitylocator.ActivityType);
    await RepeatsType.selectOption({ label: "Monthly" });
    const repectAfter_on = this.page.locator(activitylocator.Repeat_after_on);
    await repectAfter_on.selectOption({ label: "On" });
    const Monthlydate = TestUtils.getDateAfter2Months();
    console.log(" ae gi ye ni Monthlydate", Monthlydate);
    //await expect(this.page.locator(activitylocator.After_end_date)).toBeVisible();
    console.log(this.page.locator(activitylocator.After_end_date));
    await this.page
      .locator(activitylocator.RepeatEndDateTime)
      .fill(`${Monthlydate}`);
  }
  async RepeatMonthlyAfter() {
    const CurrentDate = TestUtils.getCurrentDate();
    console.log("Rendum date ", CurrentDate);

    await this.page
      .locator(activitylocator.activityStartDate)
      .fill(CurrentDate);
    await this.page.waitForTimeout(5000);
    const activityTime = TestUtils.generateRandomTime();
    console.log(" Start time of Activity ", activityTime);
    await this.page
      .locator(activitylocator.activityStartTime)
      .fill(activityTime);
    const RepeatsType = this.page.locator(activitylocator.ActivityType);
    await RepeatsType.selectOption({ label: "Monthly" });
    const repectAfter_on = this.page.locator(activitylocator.Repeat_after_on);
    await repectAfter_on.selectOption({ label: "After" });
    const date = TestUtils.getDateAfter2Months();
    console.log(" ae gi ye ni ", date);
    //await expect(this.page.locator(activitylocator.After_end_date)).toBeVisible();
    console.log(this.page.locator(activitylocator.After_end_date));
    await this.page.locator(activitylocator.RepeatEndDateTime).fill(`${date}`);
  }

  async IsPlacementSchoolActivitychekbox() {
    // console.log(" haider alu ")
    await this.page.check(activitylocator.IsPlacementSchoolActivity);
    //await this.page.waitForTimeout(4000);
  }
  async IsPlacementSchoolClientSelect(partialClientName: string) {
    await this.page
      .locator(activitylocator.clientSearchInput)
      .fill(partialClientName);
    const MatchingClientName = this.page.locator(
      `.ng-option:has-text("${partialClientName}")`
    );
    const clientCount = await MatchingClientName.count();
    if (clientCount > 0) {
      await MatchingClientName.first().click();
      console.log(`Selected student with partial match: ${partialClientName}`);
    } else {
      console.log(`No student found with partial name: ${partialClientName}`);
    }
  }
  async RepeatchekBox() {
    await this.page.check(activitylocator.RepeatcheckBox);

    // Date Add
  }
  async AtivitytitleAssertion() {
    const Activitytitle = this.page.locator(activitylocator.Activitytitle);
    await expect(Activitytitle).toHaveText("Add New Activity");
    await this.page.waitForTimeout(1000);
  }

  // async screenshotDropdown() {
  //   await this.page.screenshot({ path: "dropdown-open.png" });
  // }
}
