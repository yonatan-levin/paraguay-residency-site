import { expect, test } from "@playwright/test";
import { supportedLocales } from "../../src/config/locales";

const whatsapp = 'a[href^="https://wa.me/"]';
const calendar = 'a[href^="https://calendly.com/"]';
const selection =
  "?service=temporary-residency&plan=temporary-guided&campaign=family-relocation";

test("Paraguay homepage shows a real skyline and flag colored actions", async ({
  page,
}) => {
  await page.goto("/en");
  const hero = page.locator('[data-home-section="hero"]');
  const photo = hero.locator('img[src*="asuncion-skyline"]');
  await expect(photo).toBeVisible();
  await expect
    .poll(() =>
      photo.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(hero).toContainText("AI");
  await expect(hero.locator('a[href*="commons.wikimedia.org"]')).toBeVisible();
  const primary = hero.getByRole("link", { name: "Find my plan", exact: true });
  const color = await primary.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  const [red, green, blue] = color.match(/\d+/g)!.map(Number);
  expect(red).toBeGreaterThan(green);
  expect(red).toBeGreaterThan(blue);
  await expect(hero.locator(whatsapp)).toBeVisible();
  await expect(hero.locator(calendar)).toBeVisible();
});

for (const locale of supportedLocales) {
  test(`Direct contact preserves selected package in ${locale}`, async ({
    page,
    baseURL,
  }) => {
    const external: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).origin !== new URL(baseURL!).origin)
        external.push(request.url());
    });
    await page.goto(`/${locale}/contact${selection}`);
    const wa = page.locator("main").locator(whatsapp).first();
    const cal = page.locator("main").locator(calendar).first();
    await expect(wa).toBeVisible();
    await expect(cal).toBeVisible();
    const waUrl = new URL((await wa.getAttribute("href"))!);
    expect(waUrl.pathname).toBe("/972544941176");
    expect(waUrl.searchParams.get("text")).toBeTruthy();
    const calUrl = new URL((await cal.getAttribute("href"))!);
    expect(calUrl.origin + calUrl.pathname).toBe(
      "https://calendly.com/yonatanlevin-esteaoeste/30min",
    );
    expect(calUrl.searchParams.get("utm_content")).toBe("temporary-guided");
    expect(calUrl.searchParams.get("utm_term")).toBe("temporary-residency");
    expect(calUrl.searchParams.get("utm_campaign")).toBe("family-relocation");
    for (const link of [wa, cal]) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
    expect(external).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("Direct contact excludes private drafts and retains the website when opened", async ({
  page,
  context,
}) => {
  await page.goto(
    `/en/book${selection}&utm_source=private@example.test&notes=do-not-forward`,
  );
  await page.getByLabel("First name", { exact: true }).fill("Private Visitor");
  await page.getByLabel("Email", { exact: true }).fill("private@example.test");
  const cal = page.locator("main").locator(calendar).first();
  const wa = page.locator("main").locator(whatsapp).first();
  for (const link of [cal, wa]) {
    await expect(link).toBeVisible();
    const href = decodeURIComponent((await link.getAttribute("href"))!);
    expect(href).not.toMatch(/Private Visitor|private@example|do-not-forward/);
  }
  await context.route("https://calendly.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<h1>Intercepted calendar destination</h1>",
    }),
  );
  const popupEvent = page.waitForEvent("popup");
  await cal.click();
  const popup = await popupEvent;
  await expect(popup.getByRole("heading")).toHaveText(
    "Intercepted calendar destination",
  );
  await expect(page.getByLabel("First name", { exact: true })).toHaveValue(
    "Private Visitor",
  );
  await expect(page.getByTestId("selected-package")).toContainText("Guided");
  await popup.close();
});

test("Contact links and skyline remain usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto(`/he${selection}`);
  const hero = page.locator('[data-home-section="hero"]');
  await expect(hero.locator('img[src*="asuncion-skyline"]')).toBeVisible();
  await expect(hero.locator(whatsapp)).toBeVisible();
  await expect(hero.locator(calendar)).toHaveAttribute(
    "href",
    /utm_content=temporary-guided/,
  );
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await context.close();
});

test("Direct contact follows a package choice and language switch", async ({
  page,
}) => {
  await page.goto("/en/pricing?campaign=family-relocation");
  await page
    .getByTestId("package-temporary-guided")
    .getByRole("link", { name: /Discuss this plan/i })
    .click();
  await expect(page).toHaveURL(/plan=temporary-guided/);
  await page.getByLabel("First name", { exact: true }).fill("Local Draft");
  await page.locator(".language-switcher summary").click();
  await page
    .locator(".language-switcher")
    .getByRole("link", { name: "עברית", exact: true })
    .click();
  await expect(page).toHaveURL(/\/he\/book/);
  const cal = new URL(
    (await page
      .locator("main")
      .locator(calendar)
      .first()
      .getAttribute("href"))!,
  );
  expect(cal.searchParams.get("utm_content")).toBe("temporary-guided");
  expect(cal.searchParams.get("utm_medium")).toBe("website_family_quote");
  expect(cal.searchParams.get("utm_campaign")).toBe("family-relocation");
  const message = new URL(
    (await page
      .locator("main")
      .locator(whatsapp)
      .first()
      .getAttribute("href"))!,
  ).searchParams.get("text")!;
  expect(message).toMatch(/[\u0590-\u05ff]/);
  expect(message).not.toContain("Local Draft");
  await expect(page.locator("#firstName")).toHaveValue("Local Draft");
});

test("Direct contact rejects arbitrary query context and resolves incompatible service choices", async ({
  page,
}) => {
  await page.goto(
    "/en/contact?plan=untrusted-person@example.test&service=untrusted-service&campaign=untrusted-campaign&text=override-message",
  );
  for (const selector of [whatsapp, calendar]) {
    const href = decodeURIComponent(
      (await page
        .locator("main")
        .locator(selector)
        .first()
        .getAttribute("href"))!,
    );
    expect(href).not.toMatch(/untrusted|override-message/);
  }
  await page.goto("/en/contact?plan=temporary-guided&service=tax-planning");
  const cal = new URL(
    (await page
      .locator("main")
      .locator(calendar)
      .first()
      .getAttribute("href"))!,
  );
  expect(cal.searchParams.get("utm_term")).toBe("temporary-residency");
  expect(cal.searchParams.get("utm_content")).toBe("temporary-guided");
  expect(cal.searchParams.get("utm_campaign")).toBeNull();
});
