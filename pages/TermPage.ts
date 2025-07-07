import { Page } from '@playwright/test';
import { TermLocator } from './locators/TermLocator';
import path from 'path';
import { TestUtils } from 'utils/TestUtils';
import { console } from 'inspector';
import { strict } from 'assert';

export class TermPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectTermByName(titleText: string) {
    await this.page.locator(TermLocator.GotoTermpage).click();
    // await this.page.waitForTimeout(5000);

    const allTitles = this.page.locator(TermLocator.GenraltermName);

    const count = await allTitles.count();

    for (let i = 0; i < count; i++) {
      const text = await allTitles.nth(i).innerText();
      if (text.trim() === titleText) {
        await allTitles.nth(i).click();
        console.log(` Clicked title: ${titleText}`);
        return;
      }
    }
    console.log(` Title not found in grid: ${titleText}`);
  }

  async selectLocation(partialText: string) {
    await this.page.locator(TermLocator.AddTermLocation).click();

    const dropdown = this.page.locator(TermLocator.locationDropDowninTerm); // or TermLocator
    //await expect(dropdown).toBeVisible();

    const options = dropdown.locator("option");
    const count = await options.count();
    console.log(" No of Location ", count);

    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).innerText();
      const value = await options.nth(i).getAttribute("value");

      if (
        text.trim().toLowerCase().includes(partialText.toLowerCase()) &&
        value &&
        value.trim() !== "" &&
        !text.includes("-Select")
      ) {
        await dropdown.selectOption({ value });
        console.log(` Selected Location ye hay : ${text.trim()}`);
        return;
      }
    }
  }
  //=============================================================================================

  async getRowDataByTitle(titleToMatch: string): Promise<string> {
    const rows = this.page.locator("//tr");
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const titleCell = rows.nth(i).locator("td").nth(1); // td[2]
      const text = await titleCell.innerText();

      if (text.trim().toLowerCase() === titleToMatch.toLowerCase()) {
        console.log(`✅ Title found: ${text.trim()}`);
        return text.trim(); // or return full row data if needed
      }
    }

    console.log(`❌ Title not found in table: ${titleToMatch}`);
    return "";
  }

  //============================================================================================

  async clickonServiceType(locationMatch: string, titleToMatch: string) {
    const locator = this.page.locator(
      `//span[contains(@class, 'list-item-text') and normalize-space(text()) = "${locationMatch}"]`
    );
    await locator.click();
  }
  async AddservicetypeFirstTime(titleToMatch: string) {
    //checkBox ko click karna hai
    const checkboxLocator = this.page.locator(
      `//tbody/tr[td[2][normalize-space(text())="${titleToMatch}"]]/td[1]//input[@type="checkbox"]`
    );
    await checkboxLocator.first().check({ force: true });
    console.log(` Checked (XPath): ${titleToMatch}`);
    await this.page.locator(TermLocator.AddserviceSaveBTN).click();
  }

  async addMoreServiceType(locationMatch: string, titleToMatch: string) {
    //const location = "Augusta School District"; // ya koi bhi title

    //const locationMatch = "Augusta School District";
    const locator = this.page.locator(
      `//span[contains(@class, 'list-item-text') and normalize-space(text()) = "${locationMatch}"]`
    );
    await locator.click();

    const editIcon = this.page.locator(
      `//span[contains(@class, 'list-item-text') and normalize-space(text()) = "${locationMatch}"]/ancestor::div[contains(@class, 'practice-item')]//span[contains(@class, 'icon-pencil')]`
    );

    await editIcon.click();

    // await this.page.locator(TermLocator.locationiconpencil).click();

    // XPath: Find the checkbox in the row where the 2nd td's text matches titleToMatch
    const checkboxLocator = this.page.locator(
      `//tbody/tr[td[2][normalize-space(text())="${titleToMatch}"]]/td[1]//input[@type="checkbox"]`
    );
    const count = await checkboxLocator.count();
    if (count === 0) {
      console.log(` Checkbox not found for title: ${titleToMatch}`);
    }
    await checkboxLocator.first().check({ force: true });
    console.log(` Checked (XPath): ${titleToMatch}`);
    await this.page.locator(TermLocator.AddserviceSaveBTN).click();
    await this.page.waitForTimeout(2000);
  }
  //======================================================

  // Search Client

  async PODetails(
    editservice: string,
    activityTitles: string[],
    amount: string[]
  ) {
    const POGridDropDown = this.page.locator(
      `//span[contains(normalize-space(.), "${editservice}")]/ancestor::div[contains(@class, "card-toolbar")]//i[contains(@class, "mdi-chevron-down")]`
    );
    await POGridDropDown.click();

    const PO_Number = TestUtils.generateRandomPONumber();
    const TargetTime = TestUtils.generateRandomDigits();
    console.log("Generated PO:", PO_Number);

    await this.page.locator(TermLocator.PONumber).fill(PO_Number);
    await this.page
      .locator(TermLocator.TargetTime_input)
      .fill(TargetTime.toString());
    await this.page
      .locator(TermLocator.TargetAmount_input)
      .fill(TargetTime.toString());
    //await this.page.locator(TermLocator.AddPOno_AddPaymentsaveBTS).click();

    // 🔁 Loop through activity titles
    for (let i = 0; i < activityTitles.length; i++) {
      const activityTitle = activityTitles[i];
      const amountValue = amount[i];

      const row = this.page.locator(
        `//td[contains(normalize-space(.), "${activityTitle}")]/parent::tr`
      );
      const input = row.locator('input[type="number"]');

      const isVisible = await input.isVisible();
      if (!isVisible) {
        console.log(` Input not visible for activity title: ${activityTitle}`);
        continue;
      }

      await input.fill(amountValue);
      console.log(
        `✅ Filled amount "${amountValue}" for activity: ${activityTitle}`
      );
    }
    await this.page.locator(TermLocator.AddPOno_AddPaymentsaveBTS).click();
    await this.page.waitForTimeout(1000);

    await this.page.locator(TermLocator.Confirmsavebtn).click();
  }

  //===========
  async fillChargeByTitle(activityTitle: string, amount: string) {
    const POGridDropDown = this.page
      .locator(`//span[contains(normalize-space(.), "${activityTitle}")]/ancestor::div[contains(@class, "card-toolbar")]//i[contains(@class, "mdi-chevron-down")]
`);
    await POGridDropDown.click();
    // Find the row containing the given activity title
    const row = this.page.locator(
      `//td[contains(normalize-space(.), "${activityTitle}")]/parent::tr`
    );
    const input = row.locator('input[type="number"]');

    const isVisible = await input.isVisible();
    if (!isVisible) {
      throw new Error(
        `❌ Input not visible for activity title: ${activityTitle}`
      );
    }

    await input.fill(amount);
    console.log(`✅ Filled amount "${amount}" for activity: ${activityTitle}`);
  }

  //===============================================================
}
