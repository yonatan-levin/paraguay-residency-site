import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";

const names = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  he: "עברית",
} as const;
const dictionary = (locale: "es" | "fr" | "de" | "he") =>
  JSON.parse(
    readFileSync(
      new URL(
        `../../src/content/translations/${locale}-common.json`,
        import.meta.url,
      ),
      "utf8",
    ),
  ) as Record<string, string>;
async function changeLanguage(page: Page, locale: keyof typeof names) {
  await page.locator(".language-switcher summary").click();
  await page.getByRole("link", { name: names[locale], exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
  await expect(page.locator("html")).toHaveAttribute(
    "dir",
    locale === "he" ? "rtl" : "ltr",
  );
}

for (const locale of ["fr", "de", "he"] as const) {
  test(`${locale} translated form and policy have no automated accessibility violations`, async ({
    page,
  }) => {
    for (const route of ["book", "privacy"]) {
      await page.goto(`/${locale}/${route}`);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations, `${locale}/${route}`).toEqual([]);
    }
  });
  test(`${locale} localized validation, mock failure, retry and receipt retain the selected package`, async ({
    page,
  }) => {
    const copy = dictionary(locale);
    await page.goto(`/${locale}/book?plan=temporary-guided`);
    await page.getByTestId("submit-request").click();
    await expect(page.locator("#firstName-error")).toHaveText(
      copy["Enter your first name."],
    );
    await expect(page.locator("#email-error")).toHaveText(
      copy["Enter a valid email address."],
    );
    await page.locator("#firstName").fill("Preview");
    await page.locator("#email").fill("preview@example.test");
    await page
      .locator("details")
      .filter({ has: page.getByTestId("demo-outcome") })
      .locator("summary")
      .click();
    await page.getByTestId("demo-outcome").selectOption("failure");
    await page.getByTestId("submit-request").click();
    await expect(page.locator("form").getByRole("alert")).toBeVisible();
    await expect(page.locator("#firstName")).toHaveValue("Preview");
    await page.getByTestId("demo-outcome").selectOption("success");
    await page.getByTestId("submit-request").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/thank-you`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      copy["Demo request complete."],
    );
    await expect(page.getByTestId("selected-package")).toContainText(
      copy.Guided,
    );
    await expect(page.getByTestId("selected-package")).toContainText(
      locale === "de" ? "2.850" : locale === "he" ? "2,850" : "2\u202f850",
    );
    await changeLanguage(page, locale === "fr" ? "de" : "fr");
    await expect(page.getByTestId("selected-package")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
      copy["Demo request complete."],
    );
  });
}

test("all five language journeys preserve family finder context and private draft in memory", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan");
  for (const answer of [
    /^Residency assistance/,
    /^This would be my first residency/,
    /^My family/,
    /^I am just exploring/,
    /^Guided/,
  ]) {
    await page.getByRole("radio", { name: answer }).check();
    await page.getByTestId("finder-next").click();
  }
  await page
    .getByTestId("finder-result")
    .getByRole("link", { name: "Discuss this plan", exact: true })
    .click();
  await page.locator("#firstName").fill("Private Test");
  await page.locator("#email").fill("private@example.test");
  await page.locator("#notes").fill("Private note");
  for (const locale of ["fr", "he", "de", "es"] as const) {
    await changeLanguage(page, locale);
    const copy = dictionary(locale);
    expect(new URL(page.url()).searchParams.get("plan")).toBe(
      "temporary-guided",
    );
    expect(page.url()).not.toContain("Private");
    expect(page.url()).not.toContain("private@example");
    await expect(page.locator("#firstName")).toHaveValue("Private Test");
    await expect(page.locator("#email")).toHaveValue("private@example.test");
    await expect(page.locator("#notes")).toHaveValue("Private note");
    await expect(page.getByTestId("selected-package")).toContainText(
      copy["Request a family quote"],
    );
    await expect(page.getByTestId("finder-origin")).toBeVisible();
    await expect(page.getByTestId("selected-package")).not.toContainText("850");
  }
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/es\/thank-you/);
  await changeLanguage(page, "en");
  await expect(page.getByTestId("selected-package")).toContainText(
    "Request a family quote",
  );
  await expect(page.getByTestId("finder-origin")).toBeVisible();
});

test("language disclosure has native links, current language and keyboard recovery", async ({
  page,
}) => {
  await page.goto("/de/accounting?plan=temporary-guided");
  const trigger = page.locator(".language-switcher summary");
  await trigger.focus();
  await page.keyboard.press("Enter");
  for (const locale of ["en", "es", "fr", "de", "he"] as const) {
    const link = page.getByRole("link", { name: names[locale], exact: true });
    await expect(link).toHaveAttribute(
      "href",
      new RegExp(`^/${locale}/accounting`),
    );
    await expect(link).toHaveAttribute("lang", locale);
    await expect(link).toHaveAttribute("hreflang", locale);
  }
  await expect(
    page.getByRole("link", { name: "Deutsch", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.locator(".language-switcher")).not.toHaveAttribute("open");
});

test("all languages and translated editorial pages remain navigable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/es/services");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Apoyo práctico",
  );
  for (const locale of ["fr", "he", "de", "en", "es"] as const) {
    await changeLanguage(page, locale);
    await expect(page).toHaveURL(new RegExp(`/${locale}/services`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await context.close();
});

for (const width of [320, 390, 768, 1440]) {
  test(`German translated pages and language selector fit ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "",
      "pricing",
      "book",
      "services",
      "guides/residency-requirements",
      "privacy",
    ]) {
      await page.goto(`/de${route ? `/${route}` : ""}`);
      await page.locator(".language-switcher summary").click();
      expect
        .soft(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route,
        )
        .toBe(true);
      await expect(
        page.getByRole("link", { name: "Français", exact: true }),
      ).toBeInViewport();
    }
  });
}
