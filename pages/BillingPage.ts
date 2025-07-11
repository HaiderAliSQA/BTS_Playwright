import { BillingLocatorPage } from "./locators/billingLocator";
import { TimeTracking } from "./locators/timeTrackingLocator";
import { Page } from "@playwright/test";
import { expect } from "@playwright/test";


export class Billingpage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async GotoApproved() {
    await this.page.hover(BillingLocatorPage.billingdropdownicon);
    // thoda sa time do UI ko update hone ka
    await this.page.click(BillingLocatorPage.billingdropdownicon);
    await this.page.locator(BillingLocatorPage.ApproveGrid).click();  

  }
  async StartDate_ApplyFilter(){
    await this.page.locator(BillingLocatorPage.Start_Date).clear();
    await this.page.locator(BillingLocatorPage.ApplyButton).click();
  }
  async bulkApprove(){
    const checkAllCheckbox = this.page.locator('//input[@id="checkAll"]');
    await checkAllCheckbox.waitFor({ state: "visible" });
        await checkAllCheckbox.evaluate((el) =>
          (el as HTMLInputElement).click()
        );

    // await checkAllCheckbox.click();
    // Assert that the checkbox is now checked
    await expect(checkAllCheckbox).toBeChecked();
    await this.page.waitForTimeout(9000)
  }


}
