export class TestUtils {
  // Generate random PO Number with special characters
  static generateRandomPONumber(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let poNumber = "";
    for (let i = 0; i < 12; i++) {
      poNumber += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return poNumber;
  }

  // Generate random US Phone Number
  static generateRandomUSPhoneNumber(): string {
    const area = Math.floor(200 + Math.random() * 800);
    const prefix = Math.floor(200 + Math.random() * 800);
    const line = Math.floor(1000 + Math.random() * 9000);
    return `(${area}) ${prefix}-${line}`;
  }

  // Generate random 3-digit number
  static generateRandomDigits(): number {
    return Math.floor(100 + Math.random() * 900);
  }

  // Generate random client name
  static generateRandomClientName(): string {
    const randomDigits = this.generateRandomDigits();
    return `Playwright Test Client ${randomDigits}`;
  }
  static generateRandomPastDate(): string {
    const today = new Date();

    // 18 months ≈ 547 days
    const randomOffset = Math.floor(Math.random() * 547); // 0–546 days ago

    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - randomOffset);

    // Format to MM/DD/YYYY
    const mm = String(pastDate.getMonth() + 1).padStart(2, "0");
    const dd = String(pastDate.getDate()).padStart(2, "0");
    const yyyy = pastDate.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  }
  static getRepesatLastdateindays(): number {
    return Math.floor(Math.random() * 7) + 1;
  }

  static getCurrentDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }

  
  static generateRandomTime(): string {
    const totalMinutesInDay = 24 * 60;
    const randomMinutes = Math.floor(Math.random() * totalMinutesInDay);

    const hours24 = Math.floor(randomMinutes / 60); // 0–23
    const minutes = randomMinutes % 60;

    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

    const formattedHour = String(hours12).padStart(2, "0");
    const formattedMinute = String(minutes).padStart(2, "0");

    return `${formattedHour}:${formattedMinute} ${period}`;
  }

  // Repeat Activity ky leay nichay 3 function
  static getDateAfter7Days(): string {
    const today = new Date();
    today.setDate(today.getDate() + 7); // 7 din aage

    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }
  static getDateAfter2Weeks(): string {
    const today = new Date();
    today.setDate(today.getDate() + 14); // 14 din aage

    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }
  static getDateAfter2Months(): string {
    const today = new Date();

    // 2 months add karo
    today.setMonth(today.getMonth() + 2);

    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }
} 