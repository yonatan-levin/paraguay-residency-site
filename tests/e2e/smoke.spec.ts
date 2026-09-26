import { expect, test } from "@playwright/test";

test("Hebrew server direction and language navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/he/pricing?plan=temporary-guided");
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByTestId("package-temporary-guided")).toContainText(
    "2,850",
  );
  await page.locator(".language-switcher summary").click();
  await page.getByRole("link", { name: "Deutsch", exact: true }).click();
  await expect(page).toHaveURL(/\/de\/pricing\?.*plan=temporary-guided/);
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await context.close();
});

test("preview marketing, canonical and Spanish equivalent retain plan context", async ({
  page,
}) => {
  const response = await page.goto(
    "/en/pricing?plan=temporary-guided&utm_source=instagram",
  );
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/en\/pricing$/,
  );
  await page.locator(".language-switcher summary").click();
  await page.getByRole("link", { name: "Español", exact: true }).click();
  await expect(page).toHaveURL(/\/es\/pricing\?.*plan=temporary-guided/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByTestId("package-temporary-guided")).toBeVisible();
});

test("no-JavaScript marketing content and ordinary navigation remain available", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Make Paraguay your next chapter",
  );
  await page
    .getByRole("link", { name: "Compare packages", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/en\/pricing/);
  await expect(page.getByTestId("package-temporary-guided")).toContainText(
    "2,850",
  );
  await context.close();
});

test("unknown routes and unsupported languages return real 404s", async ({
  page,
}) => {
  expect((await page.goto("/en/not-a-real-service"))?.status()).toBe(404);
  expect((await page.goto("/es/accounting"))?.status()).toBe(200);
  expect((await page.goto("/xx"))?.status()).toBe(404);
});
