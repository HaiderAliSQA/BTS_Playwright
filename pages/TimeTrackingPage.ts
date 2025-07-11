import { Page } from '@playwright/test';
import { TermLocator } from './locators/TermLocator';
import { TimeTracking } from './locators/timeTrackingLocator';


import path from 'path';
import { TestUtils } from 'utils/TestUtils';
import { console } from 'inspector';
import { strict } from 'assert';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { expect } from "@playwright/test";

export class TimeTrackingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async GotUnposted() {
    // Go to Time Trackong -> Unposted
    await this.page.hover(TimeTracking.TimeTrackingDropDownIcon);
    // thoda sa time do UI ko update hone ka
    await this.page.click(TimeTracking.TimeTrackingDropDownIcon);
    await this.page.locator(TimeTracking.unPostedTab).click();
  }
  async Gotoposted() {
    // Go to Time Trackong -> Unposted
    await this.page.hover(TimeTracking.TimeTrackingDropDownIcon);
    // thoda sa time do UI ko update hone ka
    await this.page.click(TimeTracking.TimeTrackingDropDownIcon);
    await this.page.locator(TimeTracking.PostedButton).click();
  }
  async ApplyFilter() {
    await this.page.locator(TimeTracking.ApplyButton).click();
    await this.page.waitForTimeout(1000);
  }
  //====================
  // check All From Time Tracking 
  async checkAll(){
    const checkAllCheckbox = this.page.locator(TimeTracking.checkAll);
    
    await checkAllCheckbox.click({ force: true }); 
    await expect(checkAllCheckbox).toBeChecked();// force in case of overlap
  }
  //===========================================
  // Post All Activity 
  async PostAllActivity (){
    await this.page.locator(TimeTracking.PostButton).click();
    await this.page.locator(TermLocator.Confirmsavebtn).click();

  }
  async BulkUnpost(){
     await this.page.locator(TimeTracking.PostButton).click();
     await this.page.locator(TermLocator.Confirmsavebtn).click();
  }

  // async downloadExcelFromIcon() {

  //   const folderPath = path.join(process.cwd(), 'downloads', 'exported-files');
  //   await fsPromises.mkdir(folderPath, { recursive: true });

  //   const [download] = await Promise.all([
  //     this.page.waitForEvent('download', { timeout: 15000 }),
  //     this.page.locator("//i[@class='text-dark mdi mdi-cloud-download font-24']").click(),
  //   ]);

  //   const fullPath = path.join(folderPath, download.suggestedFilename());
  //   await download.saveAs(fullPath);

  //   console.log(`✅ File downloaded to: ${fullPath}`);
  // }
}