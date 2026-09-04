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

  // `next build` only compiles this route, it doesn't execute it — a broken
  // Satori render (e.g. an unsupported CSS value) still shows as a clean
  // build but serves an empty image in production. Regression test for
  // exactly that: opengraph-image.tsx using `width: "fit-content"`, which
  // Satori's layout engine rejects.
  test("opengraph-image renders a non-empty PNG", async ({ page }) => {
    const res = await page.request.get("/opengraph-image");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"]).toBe("image/png");
    const body = await res.body();
    expect(body.length).toBeGreaterThan(1000);
  });
});
