import { test, expect } from '@playwright/test';
import { StudentPage } from '../../pages/StudentPage';
import { TestData } from '../../utils/TestData';
import { ClientPage } from "../../pages/ClientPage";

test.describe.serial('Create Contact as a Student', () => {
  let studentPage: StudentPage;
  let clientPage: ClientPage;
  let createdStudentName: string;

  test.beforeEach(async ({ page }) => {
    studentPage = new StudentPage(page);
    clientPage = new ClientPage(page);
  });

  test('should create new student', async ({ page }) => {
    await clientPage.navigateToClients();
    await clientPage.AttachStudentselectClient("ABC School District");
    await page.waitForTimeout(5000)
    await studentPage.selectStudentGrid();
    await studentPage.addStudent();
    await studentPage.fillStudentDetails();
    await studentPage.selectclientLocationAttachedStudent("Location")
    await studentPage.selectServiceType();
   
    //await studentPage.saveStudent();
     //await studentPage.EditStudent();
     //await studentPage.saveStudent();
  });
  test.skip(" Edit Student " , async ({page})=>{
    await clientPage.navigateToClients();
     await studentPage.selectclientLocationAttachedStudent("Location");
    await studentPage.selectStudentGrid();
    await studentPage.EditStudent();
    await page.waitForTimeout(5000)
     await studentPage.saveStudent();

  })
});
