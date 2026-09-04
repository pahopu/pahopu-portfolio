import { expect, test } from "@playwright/test";

// The navbar's decorative star-particle effects (cursor trail, click sparkle)
// spawn `<span>★</span>` elements appended straight to document.body.
const starCount = (page: import("@playwright/test").Page) =>
  page.locator("body > span", { hasText: "★" }).count();

test.describe("reduced motion", () => {
  test("cursor trail and click sparkle are disabled when prefers-reduced-motion is set", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await page.mouse.move(100, 100);
    await page.mouse.move(200, 200, { steps: 10 });
    await page.mouse.click(300, 300);

    expect(await starCount(page)).toBe(0);
  });

  test("cursor trail and click sparkle still work without reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await page.mouse.move(100, 100);
    await page.mouse.move(200, 200, { steps: 10 });

    await expect
      .poll(() => starCount(page), { timeout: 2000 })
      .toBeGreaterThan(0);
  });
});
