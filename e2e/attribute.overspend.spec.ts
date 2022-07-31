import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Click text=Reset
  await page.locator("text=Reset").click();

  await expect(
    page.locator("#attributes_and_vitals > div > div.pane-header > div.right")
  ).not.toContainText(/You have overspent on attribute points!/);

  // Go to http://localhost:5173/
  await page.goto("http://localhost:5173/");

  // Click text=Strength1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Strength1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .click();

  // Fill text=Strength1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Strength1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .fill("100");

  // Click text=Coordination1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Coordination1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .click();

  // Fill text=Coordination1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Coordination1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .fill("100");

  // Click text=Quickness1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Quickness1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .click();

  // Fill text=Quickness1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Quickness1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .fill("100");

  // Click #augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input
  await page
    .locator(
      "#augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input"
    )
    .click();

  // Fill #augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input
  await page
    .locator(
      "#augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input"
    )
    .fill("10");

  // Click text=Endurance1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Endurance1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .click();

  // Fill text=Endurance1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"] >> nth=0
  await page
    .locator(
      'text=Endurance1010IIIIIIIVVVIVIIVIIIMinorMajorEpicLegen. >> input[type="text"]'
    )
    .first()
    .fill("60");

  // Click #augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input
  await page
    .locator(
      "#augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input"
    )
    .click();

  // Fill #augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input
  await page
    .locator(
      "#augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input"
    )
    .fill("0");

  // Press Tab
  await page
    .locator(
      "#augmentations > div > .table-wrapper > table > tbody > tr:nth-child(5) > .number > input"
    )
    .press("Tab");

  await expect(
    page.locator(
      "#attributes_and_vitals > div > div.pane-header > div.right > span.error"
    )
  ).toContainText(/You have overspent on attribute points!/);
});
