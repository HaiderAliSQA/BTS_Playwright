export const activitylocator = {
  // Navigation Locators
  CreateNewButton: "//span[contains(text(),'Create New')]",
  AddNewActivity: "//a[normalize-space()='Add New Activity']",
  Activitytitle: "//h5[@id='modal-basic-title']",

  // Activity Locators
  activityName: "//input[@id='activity-title']",
  clientSearchInput: "//ng-select[@name='client']//input[@type='text']",
  providerSearchinput: "//ng-select[@name='provider']//input[@type='text']",
  activityselectclient: "//div[@aria-expanded='true']//input[@type='text']",
  clientDropdownContainer:
    "//ng-select[@name='client']//span[@class='ng-arrow-wrapper']",
  activityDropdownContainer:
    "//ng-select[@name='wbs']//span[@class='ng-arrow-wrapper']",
  clientLocationDropdownContainer:
    "//ng-select[@title='select activity location']//span[@class='ng-arrow-wrapper']",
  clientLocationInput:
    "//ng-select[@title='select activity location']//input[@type='text']",
  WBSDropdownContainer:
    "//ng-select[@name='provider']//span[@class='ng-arrow-wrapper']",
  SelectWBS: "//ng-select[@name='wbs']//input[@type='text']",
  IsPlacementSchoolActivity:
    "//label[normalize-space()='Is Placement School Activity']",
  activityStartDate: "//input[@placeholder='Due Date']",
  activityStartTime: "//input[@placeholder='Time']",
  activityduration: "//select[@name='duration']",
  RepeatcheckBox: "//label[normalize-space()='Repeat']",
  ActivityType: "//select[@name='occurenceType']",
  Repeat_after_on: "//select[@name='entDrop']",
  RepeatEndDateTime: "//input[@placeholder='End Date Time']",
  After_end_date: "//input[@placeholder='Occurance']",
  ActivityStudentDropdownContainer:
    "//ng-select[@name='students']//span[@class='ng-arrow-wrapper']",
  StudentSearchInput: "//ng-select[@name='students']//input[@type='text']",
  Activity_Notes: "//textarea[@name='activityNote']",
};