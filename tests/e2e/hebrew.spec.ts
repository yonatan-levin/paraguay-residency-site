import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const hebrewCopy = () =>
  JSON.parse(
    readFileSync(
      new URL("../../src/content/translations/he-common.json", import.meta.url),
      "utf8",
    ),
  ) as Record<string, string>;

test("a language menu opened from server HTML stays open through hydration", async ({
  page,
}) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route("**/_next/static/**/*.js", async (route) => {
    await scriptsReady;
    await route.continue();
  });
  try {
    await page.goto("/he/book", { waitUntil: "commit" });
    await page.locator(".language-switcher summary").click();
    await expect(
      page.getByRole("link", { name: "Deutsch", exact: true }),
    ).toBeVisible();
    releaseScripts();
    await page.waitForLoadState("load");
    // The translated validation error proves React event handling is active.
    await page.getByTestId("submit-request").click();
    await expect(page.locator("#firstName-error")).toBeVisible();
    await expect(page.locator(".language-switcher")).toHaveAttribute(
      "open",
      "",
    );
    await expect(
      page.getByRole("link", { name: "Deutsch", exact: true }),
    ).toBeVisible();
  } finally {
    releaseScripts();
  }
});

test("Hebrew missing pages and direct receipt recover in Hebrew", async ({
  page,
}) => {
  const copy = hebrewCopy();
  expect((await page.goto("/he/not-a-real-service"))?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    copy["This page is not available."],
  );
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.goto("/he/thank-you?plan=temporary-guided");
  await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
    copy["Demo request complete."],
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
});

test("appointment draft survives language changes without changing the UTC instant", async ({
  page,
}) => {
  await page.goto("/en/book?plan=temporary-concierge");
  await page
    .getByRole("radio", { name: "Choose a demo time", exact: true })
    .check();
  const slot = page.locator('input[name="slotUtc"]').first();
  await slot.check();
  const instant = await slot.inputValue();
  await page.locator("#timeZone").selectOption("Asia/Jerusalem");
  await page.locator("#firstName").fill("בדיקה Preview");
  await page.locator("#email").fill("preview@example.test");
  for (const [locale, name] of [
    ["fr", "Français"],
    ["he", "עברית"],
    ["en", "English"],
  ]) {
    await page.locator(".language-switcher summary").click();
    await page.getByRole("link", { name, exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute(
      "dir",
      locale === "he" ? "rtl" : "ltr",
    );
    await expect(page.locator('input[name="mode"]').nth(1)).toBeChecked();
    await expect(page.locator("#timeZone")).toHaveValue("Asia/Jerusalem");
    await expect(page.locator('input[name="slotUtc"]:checked')).toHaveValue(
      instant,
    );
    await expect(page.locator("#firstName")).toHaveValue("בדיקה Preview");
    await expect(page.locator("#email")).toHaveValue("preview@example.test");
  }
});

test("Hebrew mixed direction details keep their meaning through a simulated appointment", async ({
  page,
  baseURL,
}) => {
  const copy = hebrewCopy();
  const siteOrigin = new URL(baseURL!).origin;
  const external: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== siteOrigin)
      external.push(request.url());
  });
  await page.goto("/he/book?plan=temporary-guided");
  await expect(page.locator("#firstName")).toHaveAttribute("dir", "auto");
  await expect(page.locator("#notes")).toHaveAttribute("dir", "auto");
  await expect(page.locator("#email")).toHaveAttribute("dir", "ltr");
  await page.locator("#channel").selectOption("whatsapp");
  await expect(page.locator("#phone")).toHaveAttribute("dir", "ltr");
  await page.locator("#phone").fill("+595 981 000000");
  await page.locator("#firstName").fill("בדיקה Test");
  await page.locator('input[name="mode"]').nth(1).check();
  await page.locator("#email").fill("preview@example.test");
  await expect(page.locator("#timeZone")).toHaveAttribute("dir", "ltr");
  await page.locator("#timeZone").selectOption("Asia/Jerusalem");
  await page.locator('input[name="slotUtc"]').first().check();
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/he\/thank-you/);
  const receipt = page.getByTestId("selected-package");
  await expect(receipt).toContainText(copy.Guided);
  await expect(receipt).toContainText("2,850");
  await expect(receipt.locator('bdi[dir="ltr"]')).toContainText(
    "Asia/Jerusalem",
  );
  await expect(receipt).toContainText(copy["Simulated appointment"]);
  expect(external).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});

for (const width of [320, 390, 768, 1440]) {
  test(`Hebrew layout, language picker and navigation fit ${width}px`, async ({
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
      await page.goto(`/he${route ? `/${route}` : ""}`);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await page.locator(".language-switcher summary").click();
      await expect(
        page.getByRole("link", { name: "עברית", exact: true }),
      ).toHaveAttribute("aria-current", "page");
      await expect(
        page.getByRole("link", { name: "Deutsch", exact: true }),
      ).toBeInViewport();
      expect
        .soft(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route,
        )
        .toBe(true);
    }
  });
}
