import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { resolve } from "node:path";

const marketingRoutes = [
  "/en",
  "/en/pricing",
  "/en/lp/residency-cost",
  "/en/find-my-plan",
  "/en/book",
  "/es/book",
];
for (const route of marketingRoutes) {
  test(`automated accessibility ${route}`, async ({ page }) => {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}

for (const width of [320, 360, 390, 768, 1440]) {
  test(`reflow and unfilled visual evidence ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    for (const route of [
      "/en",
      "/en/pricing",
      "/en/find-my-plan",
      "/en/book",
      "/es/lp/family-relocation",
    ]) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        width: document.documentElement.clientWidth,
      }));
      expect(
        dimensions.scroll,
        `${route} overflows at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.width);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      // Capture only unfilled pages, never contact drafts or completed receipts.
      if ([390, 1440].includes(width))
        await page.screenshot({
          path: resolve(
            "artifacts",
            "screenshots",
            `${route.replaceAll("/", "_")}-${width}.png`,
          ),
          fullPage: true,
        });
    }
  });
}

test("keyboard menu, skip link, dialog dismissal and focus recovery", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content", exact: true }),
  ).toBeFocused();
  await page.getByLabel("Open navigation", { exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation", exact: true }),
  ).not.toBeVisible();
  const whatsapp = page
    .getByRole("button", { name: "Ask us on WhatsApp", exact: true })
    .first();
  await whatsapp.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(whatsapp).toBeFocused();
});

test("RTL mixed-script fixture and emulated 200-percent zoom remain usable", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto("/en/internal/rtl");
  await expect(page.locator('[dir="rtl"]')).toBeVisible();
  const rtlResult = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(rtlResult.violations).toEqual([]);
  // Browser zoom halves the CSS viewport and doubles its pixel density. CSS
  // style.zoom alone does not update media queries and is not this model.
  const zoomContext = await browser.newContext({
    viewport: { width: 720, height: 450 },
    deviceScaleFactor: 2,
  });
  const zoomPage = await zoomContext.newPage();
  await zoomPage.goto("/en/pricing");
  await expect(zoomPage.getByTestId("package-temporary-guided")).toBeVisible();
  const size = await zoomPage.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(size.content).toBeLessThanOrEqual(size.viewport);
  await zoomPage.screenshot({
    path: resolve("artifacts", "screenshots", "pricing-200-percent.png"),
  });
  await zoomContext.close();
});
