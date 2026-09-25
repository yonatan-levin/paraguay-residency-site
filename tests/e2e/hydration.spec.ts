import { expect, test, type Page } from "@playwright/test";

async function holdScripts(page: Page) {
  let release!: () => void;
  const ready = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/_next/static/**/*.js", async (route) => {
    await ready;
    await route.continue();
  });
  return release;
}

test("booking cannot accept changes or submit before hydration", async ({
  page,
}) => {
  const release = await holdScripts(page);
  try {
    await page.goto("/en/book?plan=temporary-guided", { waitUntil: "commit" });
    const fields = page.locator(
      "form input, form select, form textarea, form button",
    );
    await expect(fields.first()).toBeVisible();
    for (const field of await fields.all()) await expect(field).toBeDisabled();
    const originalUrl = page.url();
    await page
      .getByTestId("submit-request")
      .evaluate((button: HTMLButtonElement) => button.click());
    expect(page.url()).toBe(originalUrl);
    // Native disclosure navigation remains available while application JS is held.
    await page.locator(".language-switcher summary").click();
    await expect(
      page.getByRole("link", { name: "עברית", exact: true }),
    ).toHaveAttribute("href", /\/he\/book\?.*plan=temporary-guided/);
    release();
    await page.getByTestId("submit-request").click();
    await expect(page.locator("#firstName-error")).toBeVisible();
    await expect(page).toHaveURL(originalUrl);
    await page.locator("#channel").selectOption("whatsapp");
    await expect(page.locator("#phone")).toBeVisible();
    await page.locator('input[name="mode"][value="appointment"]').check();
    const slot = page.locator('input[name="slotUtc"]').first();
    await slot.check();
    await expect(slot).toBeChecked();
    await page.locator("#firstName").fill("Preview");
    await page.locator("#email").fill("preview@example.test");
    await page.getByTestId("submit-request").click();
    await expect(page).toHaveURL(/\/en\/thank-you\?.*plan=temporary-guided/);
    await expect(page.getByTestId("selected-package")).toContainText(
      "Simulated appointment",
    );
  } finally {
    release();
  }
});

test("pricing waits for hydration before changing package context", async ({
  page,
}) => {
  const release = await holdScripts(page);
  try {
    await page.goto("/en/pricing?plan=temporary-guided", {
      waitUntil: "commit",
    });
    const upgrade = page.locator('input[name="journey"][value="upgrade"]');
    await expect(upgrade).toBeDisabled();
    await expect(page.getByTestId("package-temporary-guided")).toBeVisible();
    release();
    await upgrade.check();
    await expect(page).toHaveURL(/service=permanent-residency/);
    expect(new URL(page.url()).searchParams.has("plan")).toBe(false);
    await expect(page.getByTestId("package-temporary-guided")).toHaveCount(0);
  } finally {
    release();
  }
});

test("finder waits for hydration before accepting an answer", async ({
  page,
}) => {
  const release = await holdScripts(page);
  try {
    await page.goto("/en/find-my-plan?plan=temporary-guided", {
      waitUntil: "commit",
    });
    const residency = page.locator('input[name="goal"][value="residency"]');
    await expect(residency).toBeDisabled();
    await expect(page.getByTestId("finder-next")).toBeDisabled();
    release();
    await residency.check();
    await page.getByTestId("finder-next").click();
    await expect(page.locator('input[name="stage"]').first()).toBeVisible();
    await expect(page).toHaveURL((url) => !url.searchParams.has("plan"));
  } finally {
    release();
  }
});

test("WhatsApp preview waits for hydration without disabling native navigation", async ({
  page,
}) => {
  const release = await holdScripts(page);
  try {
    await page.goto("/en/contact?plan=temporary-guided", {
      waitUntil: "commit",
    });
    const whatsapp = page.getByRole("button", { name: /WhatsApp/i }).first();
    await expect(whatsapp).toBeDisabled();
    await expect(
      page.getByRole("link", { name: "Packages", exact: true }).first(),
    ).toHaveAttribute("href", /pricing/);
    release();
    await whatsapp.click();
    await expect(page.getByRole("dialog")).toContainText("Guided");
  } finally {
    release();
  }
});

test("without JavaScript booking cannot submit contact data or navigate natively", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  try {
    await page.goto("/es/book?plan=temporary-guided");
    const originalUrl = page.url();
    for (const field of await page
      .locator("form input, form select, form textarea, form button")
      .all()) {
      await expect(field).toBeDisabled();
    }
    // A disabled submit button has no native default action, including keyboard activation.
    await page.getByTestId("submit-request").click({ force: true });
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(originalUrl);
    await page.locator(".language-switcher summary").click();
    await page.getByRole("link", { name: "Deutsch", exact: true }).click();
    await expect(page).toHaveURL(/\/de\/book\?.*plan=temporary-guided/);
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
  } finally {
    await context.close();
  }
});
