import { Page } from '@playwright/test';
import { TermLocator } from './locators/TermLocator';
import { TimeTracking } from './locators/timeTrackingLocator';

import path from 'path';
import { TestUtils } from 'utils/TestUtils';
import { console } from 'inspector';
import { strict } from 'assert';
import fs from 'fs';
import fsPromises from 'fs/promises';

export class ExportFile {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async downloadExcelFromIcon() {
    const folderPath = path.join(process.cwd(), "downloads", "exported-files");
    await fsPromises.mkdir(folderPath, { recursive: true });

    const [download] = await Promise.all([
      this.page.waitForEvent("download", { timeout: 15000 }),
      this.page
        .locator("//i[@class='text-dark mdi mdi-cloud-download font-24']")
        .click(),
    ]);

    const fullPath = path.join(folderPath, download.suggestedFilename());
    await download.saveAs(fullPath);

    console.log(`✅ File downloaded to: ${fullPath}`);
  }
  // checkAll From Unposted 

  //  Export File From Button Click
  async downloadExcelFromButtonCLick() {
    const folderPath = path.join(process.cwd(), "downloads", "exported-files");
    await fsPromises.mkdir(folderPath, { recursive: true });

    const [download] = await Promise.all([
      this.page.waitForEvent("download", { timeout: 15000 }),
      this.page.locator("//button[normalize-space()='Export']").click(),
    ]);

    const fullPath = path.join(folderPath, download.suggestedFilename());
    await download.saveAs(fullPath);

    console.log(`✅ File downloaded to: ${fullPath}`);
  }
}