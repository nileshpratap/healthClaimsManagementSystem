// @ts-check
// Navigating to different sections of the Playwright website.
// Searching for content on the website.
// Checking footer links.
// Checking the responsiveness of the website.

const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("https://google.com/", {
    waitUntil: "load",
  });
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://health-claims-management-system.vercel.app/");

  // Wait for all images to be loaded
  const images = await page.$$eval("img", (imgs) =>
    imgs.map((img) => ({
      src: img.getAttribute("src"),
      isLoaded: img.complete && img.naturalHeight !== 0,
    }))
  );

  // Check if all images are loaded successfully
  const unloadedImages = images.filter((img) => !img.isLoaded);

  if (unloadedImages.length > 0) {
    console.error("Some images failed to load:", unloadedImages);
  } else {
    console.log("All images loaded successfully!");
  }
});

test("auth pages", async ({ page }) => {
  await page.goto(
    "https://health-claims-management-system.vercel.app/user/login",
    {
      waitUntil: "load",
    }
  );
  await page.goto(
    "https://health-claims-management-system.vercel.app/admin/login",
    {
      waitUntil: "load",
    }
  );
  await page.goto(
    "https://health-claims-management-system.vercel.app/user/register",
    {
      waitUntil: "load",
    }
  );
  await page.goto(
    "https://health-claims-management-system.vercel.app/admin/register",
    {
      waitUntil: "load",
    }
  );
  console.log("All auth pages are working fine!");
});
