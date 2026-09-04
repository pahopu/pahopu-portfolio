import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("homepage loads for both locales", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/pahopu/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/vi");
    await expect(page).toHaveTitle(/pahopu/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("locale switcher navigates between /en and /vi", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Switch language" }).click();
    await expect(page).toHaveURL(/\/vi$/);
  });

  test("sitemap and robots are served", async ({ page }) => {
    const sitemap = await page.request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("<urlset");

    const robots = await page.request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Sitemap:");
  });
});
