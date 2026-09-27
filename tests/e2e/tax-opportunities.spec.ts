import { expect, test } from "@playwright/test";
import { supportedLocales } from "../../src/config/locales";

test("tax opportunities explain both structures with visible conditions", async ({
  page,
}) => {
  await page.goto("/en/why-paraguay?plan=temporary-guided");
  const financial = page.locator("#financial-planning");
  await expect(
    financial.getByRole("heading", {
      name: "Keep more of your international income, when the facts fit.",
    }),
  ).toBeVisible();
  const dividend = financial.locator('[data-tax-case="foreign-dividends"]');
  await expect(dividend).toContainText(
    "Potential 0% Paraguayan personal income tax on qualifying foreign dividends",
  );
  await expect(dividend).toContainText("nonbinding consultation 380");
  await expect(dividend).toContainText("not automatically a foreign dividend");
  const us = financial.locator('[data-tax-structure="us"]');
  await expect(us).toContainText("not US citizens or US tax residents");
  await expect(us).toContainText("not effectively connected");
  await expect(us).toContainText("Form 5472");
  await expect(us).toContainText("Form 1120");
  const paraguay = financial.locator('[data-tax-structure="paraguay"]');
  await expect(paraguay).toContainText("10% IRE on net taxable income");
  await expect(paraguay).toContainText("Dividend taxes, VAT");
  await expect(
    financial.locator('[data-tax-case="services-from-paraguay"]'),
  ).toContainText("working from Paraguay");
  await expect(financial.locator("details")).toHaveCount(0);
  await expect(
    financial.getByRole("link", {
      name: "Explore my tax options",
      exact: true,
    }),
  ).toHaveAttribute("href", /tax-planning.*plan=temporary-guided/);
  await financial
    .getByRole("link", { name: "Explore US company setup", exact: true })
    .click();
  await expect(page).toHaveURL(/company-formation\/us.*plan=temporary-guided/);
  await expect(page.locator(".service-inquiry").first()).toContainText(
    "This service has a different scope",
  );
  await page
    .getByRole("link", { name: "Discuss this structure", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/book\?service=us-company$/);
});

test("an existing US package stays selected when its structure is discussed", async ({
  page,
}) => {
  await page.goto("/en/company-formation/us?plan=us-business-setup");
  await page
    .getByRole("link", { name: "Discuss this structure", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/book.*plan=us-business-setup/);
});

test("the tax comparison leads to booking with the selected tax package", async ({
  page,
}) => {
  await page.goto("/en/tax-planning?plan=tax-planning");
  const action = page.locator(".tax-opportunities").getByRole("link", {
    name: "Discuss my tax planning options",
    exact: true,
  });
  await expect(action).toHaveAttribute("href", /book.*plan=tax-planning/);
  await action.click();
  await expect(page).toHaveURL(/book.*plan=tax-planning/);
});

for (const locale of supportedLocales) {
  test(`${locale} tax opportunities reflow and render before JavaScript`, async ({
    browser,
    request,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 844 },
    });
    const page = await context.newPage();
    await page.goto(`/${locale}/why-paraguay?plan=temporary-guided`);
    await expect(page.locator("[data-tax-structure]")).toHaveCount(2);
    await expect(
      page.locator('[data-tax-case="foreign-dividends"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-tax-case="services-from-paraguay"]'),
    ).toBeVisible();
    const scope = page.locator("#financial-planning");
    await expect(scope.locator('a[href*="irs.gov"]')).toHaveCount(6);
    await expect(scope.locator('a[href*="dnit.gov.py"]')).toHaveCount(4);
    await expect(scope.locator('a[href*="mic.gov.py"]')).toHaveCount(1);
    if (locale !== "en")
      await expect(scope).not.toContainText(
        "A US LLC for an international business",
      );
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      const size = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(size.content).toBeLessThanOrEqual(size.viewport);
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    const links = await scope
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
    for (const href of links)
      expect(new URL(href, page.url()).searchParams.get("plan")).toBe(
        "temporary-guided",
      );
    for (const [route, count] of [
      ["tax-planning", 2],
      ["company-formation/us", 1],
      ["company-formation/paraguay", 1],
    ] as const) {
      const response = await request.get(`/${locale}/${route}`);
      expect(response.status()).toBe(200);
      expect(
        (await response.text()).match(/data-tax-structure=/g),
      ).toHaveLength(count);
    }
    await context.close();
  });
}
