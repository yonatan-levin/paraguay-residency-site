import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const copy = JSON.parse(
  readFileSync(
    new URL("../../src/content/translations/ru-common.json", import.meta.url),
    "utf8",
  ),
) as Record<string, string>;

async function changeLanguage(page: Page, locale: "ru" | "he" | "en") {
  await page.locator(".language-switcher summary").click();
  await page
    .getByRole("link", {
      name: { ru: "Русский", he: "עברית", en: "English" }[locale],
      exact: true,
    })
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
  await expect(page.locator("html")).toHaveAttribute(
    "dir",
    locale === "he" ? "rtl" : "ltr",
  );
}

test("Russian and Hebrew preserve family finder answers, private draft, campaign and accepted receipt", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan?campaign=family-relocation");
  await changeLanguage(page, "ru");
  for (const [field, value] of [
    ["goal", "residency"],
    ["stage", "new"],
    ["household", "family"],
    ["timing", "exploring"],
    ["support", "guided"],
  ]) {
    await page.locator(`input[name="${field}"][value="${value}"]`).check();
    await page.getByTestId("finder-next").click();
  }
  await expect(page.getByTestId("finder-result")).toBeVisible();
  await page.getByTestId("finder-result").locator('a[href*="/book"]').click();
  await page.locator("#firstName").fill("Анна Preview");
  await page.locator("#email").fill("private@example.test");
  await page.locator("#notes").fill("Личная заметка");
  for (const locale of ["he", "ru"] as const) {
    await changeLanguage(page, locale);
    const url = new URL(page.url());
    expect(url.searchParams.get("plan")).toBe("temporary-guided");
    expect(url.searchParams.get("service")).toBe("temporary-residency");
    expect(url.searchParams.get("campaign")).toBe("family-relocation");
    await expect(page.locator("#firstName")).toHaveValue("Анна Preview");
    await expect(page.locator("#email")).toHaveValue("private@example.test");
    await expect(page.locator("#notes")).toHaveValue("Личная заметка");
    await expect(page.getByTestId("finder-origin")).toBeVisible();
    expect(decodeURIComponent(page.url())).not.toMatch(
      /Анна|Личная|private@example/,
    );
  }
  await expect(page.getByTestId("selected-package")).toContainText(
    copy["Request a family quote"],
  );
  await expect(page.getByTestId("selected-package")).not.toContainText("850");
  let submissions = 0;
  await page.exposeFunction("recordSubmission", () => {
    submissions += 1;
  });
  await page.evaluate(() => {
    document.addEventListener(
      "submit",
      () => {
        void (
          window as unknown as { recordSubmission: () => Promise<void> }
        ).recordSubmission();
      },
      true,
    );
  });
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/ru\/thank-you/);
  for (const locale of ["he", "ru"] as const) {
    await changeLanguage(page, locale);
    await expect(page.getByTestId("selected-package")).toBeVisible();
    await expect(page.getByTestId("finder-origin")).toBeVisible();
    expect(new URL(page.url()).searchParams.get("campaign")).toBe(
      "family-relocation",
    );
  }
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    copy["Demo request complete."],
  );
  await expect(page.getByTestId("selected-package")).toContainText(
    copy["Request a family quote"],
  );
  expect(submissions).toBe(1);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});

test("Russian appointment retains its UTC instant across Hebrew and recovers from unavailable time", async ({
  page,
}) => {
  await page.goto("/ru/book?plan=temporary-concierge&campaign=residency-cost");
  await page.locator('input[name="mode"][value="appointment"]').check();
  const slot = page.locator('input[name="slotUtc"]').first();
  await slot.check();
  const instant = await slot.inputValue();
  await page.locator("#timeZone").selectOption("Asia/Jerusalem");
  await page.locator("#firstName").fill("Иван Preview");
  await page.locator("#email").fill("preview@example.test");
  for (const locale of ["he", "ru"] as const) {
    await changeLanguage(page, locale);
    await expect(page.locator('input[name="slotUtc"]:checked')).toHaveValue(
      instant,
    );
    await expect(page.locator("#timeZone")).toHaveValue("Asia/Jerusalem");
    await expect(page.locator("#firstName")).toHaveValue("Иван Preview");
    await expect(page.locator("#email")).toHaveValue("preview@example.test");
  }
  await page.locator(".demo-controls summary").click();
  await page.getByTestId("demo-outcome").selectOption("unavailable");
  await page.getByTestId("submit-request").click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    copy["That demo time is unavailable"],
  );
  await expect(page.locator('input[name="slotUtc"]:checked')).toHaveValue(
    instant,
  );
  await page.getByTestId("demo-outcome").selectOption("success");
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/ru\/thank-you/);
  const expectedTime = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
    hour12: false,
  }).format(new Date(instant));
  await expect(page.getByTestId("selected-package")).toContainText(
    expectedTime,
  );
  for (const locale of ["he", "ru"] as const)
    await changeLanguage(page, locale);
  await expect(page.getByTestId("selected-package")).toContainText(
    expectedTime,
  );
  await expect(page.getByTestId("selected-package")).toContainText(
    copy["Simulated appointment"],
  );
  await expect(page.getByTestId("selected-package")).toContainText(
    "Asia/Jerusalem",
  );
});

test("Russian missing pages and empty receipts recover without implying success", async ({
  page,
}) => {
  for (const route of ["not-a-real-service", "internal/rtl"]) {
    expect((await page.goto(`/ru/${route}`))?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      copy["This page is not available."],
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  }
  await page.goto("/ru/thank-you?plan=temporary-guided");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    copy["Let’s find your next step."],
  );
  await expect(
    page
      .locator("main")
      .getByRole("link", { name: copy["Start a demo inquiry"], exact: true }),
  ).toHaveAttribute("href", /\/ru\/book\?.*plan=temporary-guided/);
});

test("Russian WhatsApp opens a localized family draft at the approved destination", async ({
  page,
  context,
  baseURL,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== new URL(baseURL!).origin)
      external.push(request.url());
  });
  await page.goto(
    "/ru/contact?plan=temporary-guided&campaign=family-relocation",
  );
  const link = page
    .locator("main")
    .getByRole("link", { name: /WhatsApp/i })
    .first();
  const destination = new URL((await link.getAttribute("href"))!);
  expect(destination.origin + destination.pathname).toBe(
    "https://wa.me/972544941176",
  );
  expect(destination.searchParams.get("text")).toContain(copy.Guided);
  expect(destination.searchParams.get("text")).toContain(
    copy["I would like to request a family quote."],
  );
  await expect(link).toHaveAttribute("target", "_blank");
  expect(external).toEqual([]);
  await context.route("https://wa.me/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<h1>WhatsApp destination intercepted</h1>",
    }),
  );
  await link.focus();
  const popupEvent = page.waitForEvent("popup");
  await link.press("Enter");
  const popup = await popupEvent;
  await expect(popup.getByRole("heading")).toHaveText(
    "WhatsApp destination intercepted",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await popup.close();
});
