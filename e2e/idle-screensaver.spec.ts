import { expect, test } from "@playwright/test";

// The idle-star screensaver kicks in after 5s of no scroll (see
// src/components/shared/easter-egg.tsx). We fast-forward virtual time via
// Playwright's clock API instead of waiting for real seconds to pass.

test.describe("idle star screensaver", () => {
  test("does not spawn when prefers-reduced-motion is set", async ({ page }) => {
    await page.clock.install();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    // EasterEgg is loaded via next/dynamic (no SSR) — wait for its chunk to
    // load and its idle timer to be armed before advancing the fake clock.
    await page.waitForLoadState("networkidle");

    await page.clock.runFor(5_500);

    await expect(page.locator(".idle-star")).toHaveCount(0);
  });

  test("spawns after idling when reduced motion is not set", async ({ page }) => {
    await page.clock.install();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");
    // EasterEgg is loaded via next/dynamic (no SSR) — wait for its chunk to
    // load and its idle timer to be armed before advancing the fake clock.
    await page.waitForLoadState("networkidle");

    await page.clock.runFor(5_500);

    await expect(page.locator(".idle-star").first()).toHaveCount(1);
  });

  test("idle star z-index stays below the case-study dialog overlay", async ({ page }) => {
    await page.clock.install();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");
    // EasterEgg is loaded via next/dynamic (no SSR) — wait for its chunk to
    // load and its idle timer to be armed before advancing the fake clock.
    await page.waitForLoadState("networkidle");

    await page.clock.runFor(5_500);
    const star = page.locator(".idle-star").first();
    await expect(star).toHaveCount(1);
    const starZ = await star.evaluate((el) => Number(getComputedStyle(el).zIndex));

    await page.getByRole("button", { name: "Read Case Study" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const dialogZ = await dialog.evaluate((el) => Number(getComputedStyle(el).zIndex));

    expect(starZ).toBeLessThan(dialogZ);
  });
});
