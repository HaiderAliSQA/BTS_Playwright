export const Studentlocator = {
  // Student Navigation Locators
  studentsTab: "//span[normalize-space()='Students']",
  addStudentButton: "//button[@title='Create Student']",
  saveStudentButton: "//button[normalize-space()='Save and Close']",

  // Student Form Locators
  studentNameInput: "//input[@name='studentName']",
  studentEmailInput: "//input[@name='email']",
  studentPhoneInput: "//input[@name='phone']",
  studentAddressInput: "//input[@name='address']",
  addServicebutton: "//button[normalize-space()='Add Service']",

  // Student Name Fields
  StudentfirstName: "//input[@name='firstName']",
  StudentMidlleName: "//input[@name='middleName']",
  StudentLastName: "//input[@name='lastName']",

  selectLocation: "//ng-select[@name='location']//input[@type='text']",
  profilePictureUrl: "//input[@name='profilePictureUrl']",
  selectProvider: "//ng-select[@name='providers']//input[@type='text']",

  // Student Grid Locators
  studentGrid: "//div[@class='student-grid']",
  selectStudentGrid: "//a[contains(text(),'Students')]",

  // static readonly searchStudentInput = "//input[@placeholder='Search student']";
  // static readonly editStudentButton = "button[title='Edit Student']";

  // Student Details Locators
  studentIdInput: "//input[@name='studentId']",
  studentGradeInput: "//select[@name='grade']",
  studentSchoolInput: "//input[@name='school']",
  studentEdit:
    "//tbody/tr[2]/td[6]/div[1]/edit-delete-btns[1]/div[1]/a[5]/span[1]",

  // Service Type Locators
  SelectServiceTypes:
    "//select[@class='browser-default custom-select ng-untouched ng-pristine ng-valid']",
  PONumerStudentGrid:
    "//div[@class='card-body pt-0']//div[@class='col-md-4']//input[contains(@placeholder,'')]",
  selectLocationDropdownContainer:
    "//ng-select[@name='location']//span[@class='ng-arrow-wrapper']",
  selectLocationDropdownInput:
    "//ng-select[@name='location']//input[@type='text']",
};
