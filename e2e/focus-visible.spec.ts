import { expect, test } from "@playwright/test";

test.describe("keyboard focus", () => {
  test("logo button shows a visible focus ring when tabbed to", async ({ page }) => {
    await page.goto("/en");

    const logo = page.getByRole("button", { name: "Home" });

    // Tab from the top of the page until the logo receives focus (bounded to
    // avoid an infinite loop if the DOM order ever changes).
    for (let i = 0; i < 5; i++) {
      const isFocused = await logo.evaluate((el) => el === document.activeElement);
      if (isFocused) break;
      await page.keyboard.press("Tab");
    }

    await expect(logo).toBeFocused();
    const boxShadow = await logo.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toBe("none");
  });
});
