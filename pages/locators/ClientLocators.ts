export const ClientLocators = {
  // Navigation Locators
  clientsTab: "//span[normalize-space()='Clients']",
  addClientButton: "//button[normalize-space()='Add Client']",
  saveButton: "//button[normalize-space()='Save']",

  // Client Form Locators
  clientNameInput: "//input[@name='name']",
  poNumber: "//input[@name='poNumber']",
  invoiceTeplate: "//select[@name='defaultInvoiceFormat']",
  billingattn: "//input[@name='billingAttn']",
  billingOffice1: "//input[@name='billingOffice1']",
  billingOffice2: "//input[@name='billingOffice2']",
  placementSchool: "//label[@for='placementSchool']",
  prospective: "//label[@for='prospective']",

  // Client Search Locators
  searchClientInput: "//input[@placeholder='Search client']",
  firstClientRow: "//tbody/tr[1]/td[1]/a[1]",
  editClientButton: "button[title='Edit Client']",

  // Location Locators
  addLocationIcon:
    "//div[@class='col-lg-8 col-xlg-9 col-md-7']//div[2]//div[1]//span[1]//a[1]//i[1]",
  locationTitle: "//input[@name='title']",
  locationAddress: "//input[@name='address']",
  locationPhone: "//input[@name='phone']",
  locationFaxNumber: "//input[@name='fax']",
  locationWebsite: "//input[@name='website']",

  // Client Filter
  Active_InActive: "//select[@name='deleted']",
  schoolTypeDropdown: "//select[@name='placementSchool']",
  prospectiveType: "//select[@name='prospective']",
  ExportButton: "//button[normalize-space()='Export']",
}; 