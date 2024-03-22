// @ts-check
// Navigating to different sections of the Playwright website.
// Searching for content on the website.
// Checking footer links.
// Checking the responsiveness of the website.

const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("navigation to Documentation", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the Documentation link.
  await page.getByRole("link", { name: "Documentation" }).click();

  // Expects page to have a heading with the name of Documentation.
  await expect(
    page.getByRole("heading", { name: "Documentation" })
  ).toBeVisible();
});

test("navigation to API", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the API link.
  await page.getByRole("link", { name: "API" }).click();

  // Expects page to have a heading with the name of API.
  await expect(page.getByRole("heading", { name: "API" })).toBeVisible();
});

test("navigation to GitHub", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the GitHub link.
  await page.getByRole("link", { name: "GitHub" }).click();

  // Expects page to have a heading with the name of Open Source.
  await expect(
    page.getByRole("heading", { name: "Open Source" })
  ).toBeVisible();
});

test('search for text "HCMS"', async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Type "Playwright" in the search input and press Enter.
  await page.fill('input[name="search"]', "HCMS");
  await page.press('input[name="search"]', "Enter");

  // Expects page to have a heading with the search result.
  await expect(
    page.getByRole("heading", { name: "Search results" })
  ).toBeVisible();
});

test("check footer links", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the Community link in the footer.
  await page.getByRole("link", { name: "Community" }).click();

  // Expects page to have a heading with the name of Community.
  await expect(page.getByRole("heading", { name: "Community" })).toBeVisible();

  // Navigate back to the homepage.
  await page.goto("https://playwright.dev/");

  // Click the Blog link in the footer.
  await page.getByRole("link", { name: "Blog" }).click();

  // Expects page to have a heading with the name of Blog.
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
});

test("check responsiveness of the website", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Set the viewport to mobile.
  await page.setViewportSize({ width: 375, height: 667 });

  // Expects the navigation menu to be visible and functional.
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();

  // Set the viewport to tablet.
  await page.setViewportSize({ width: 768, height: 1024 });

  // Expects the navigation menu to be visible and functional.
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();

  // Set the viewport to desktop.
  await page.setViewportSize({ width: 1280, height: 800 });

  // Expects the navigation menu to be visible and functional.
  await expect(page.getByRole("link", { name: "Documentation" })).toBeVisible();
});
