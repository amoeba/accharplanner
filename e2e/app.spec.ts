import { test, expect } from "@playwright/test";

test("homepage has the correct title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Overly-Detailed Asheron's Call Character Planner (ODACCP)"
  );
});
