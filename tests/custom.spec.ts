import { test, expect } from "@playwright/test";
import { createSimpleActivity } from "../utils/customCommands";

test("Create a Simple activity (custom command)", async ({ page }) => {
  await createSimpleActivity(page, {
    provider: "UI Test",
    wbsActivityName: "(PSYCH) TRAVEL MIDDAY - FOREIGN LANGUAGE EVALUATION",
    client: "Client Simple",
    location: "Location",
    student: "Student"
    // notes: "Kuch bhi likh dein agar zarurat ho"
  });
});
