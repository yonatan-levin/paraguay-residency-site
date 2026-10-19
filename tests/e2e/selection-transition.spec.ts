import { expect, test, type Page } from "@playwright/test";

// Hold same-page URL synchronization, while allowing the next destination to load.
async function holdSelectionNavigation(page: Page, pathname: string) {
  let release!: () => void;
  const ready = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === pathname && url.searchParams.has("_rsc")) await ready;
    await route.continue();
  });
  return release;
}

for (const width of [1440, 390]) {
  test(`pricing uses the newly chosen service before URL synchronization at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en/pricing?plan=temporary-guided");
    const release = await holdSelectionNavigation(page, "/en/pricing");
    try {
      await page.locator('input[name="journey"][value="upgrade"]').check();
      const booking = page.getByRole("link", {
        name: "Talk through your options",
        exact: true,
      });
      await expect(booking).toHaveAttribute(
        "href",
        "/en/book?service=permanent-residency",
      );
      await booking.click();
      await expect(page).toHaveURL(/\/en\/book\?service=permanent-residency$/);
      await expect(page.getByTestId("selected-package")).not.toContainText(
        "Guided",
      );
    } finally {
      release();
    }
  });
}

for (const campaign of ["", "family-relocation"]) {
  test(`finder immediately clears the old package with ${campaign || "no campaign"}`, async ({
    page,
  }) => {
    const campaignQuery = campaign ? `&campaign=${campaign}` : "";
    await page.goto(
      `/en/find-my-plan?plan=temporary-concierge${campaignQuery}`,
    );
    const release = await holdSelectionNavigation(page, "/en/find-my-plan");
    try {
      await page.locator('input[name="goal"][value="business"]').check();
      const booking = page.getByRole("link", {
        name: "Skip to booking",
        exact: true,
      });
      await expect(booking).toHaveAttribute(
        "href",
        `/en/book${campaign ? `?campaign=${campaign}` : ""}`,
      );
      await booking.click();
      await expect(page).toHaveURL(
        (url) =>
          url.pathname === "/en/book" &&
          !url.searchParams.has("plan") &&
          !url.searchParams.has("service"),
      );
      expect(new URL(page.url()).searchParams.get("campaign")).toBe(
        campaign || null,
      );
      await expect(page.getByTestId("selected-package")).not.toContainText(
        "Concierge",
      );
    } finally {
      release();
    }
  });
}

test("pending choice reaches language and navigation links, then history restores explicit URLs", async ({
  page,
}) => {
  await page.goto("/en/book?plan=temporary-guided");
  await page.locator("#firstName").fill("Preview");
  await page.locator("#email").fill("preview@example.test");
  await page
    .getByRole("link", { name: "Edit your selection", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/pricing\?/);
  const originalPricing = page.url();
  const release = await holdSelectionNavigation(page, "/en/pricing");
  try {
    await page.locator('input[name="journey"][value="upgrade"]').check();
    await expect(page.locator(".brand").first()).toHaveAttribute(
      "href",
      "/en?service=permanent-residency",
    );
    await page.locator(".language-switcher summary").click();
    const hebrew = page.getByRole("link", { name: "עברית", exact: true });
    await expect(hebrew).toHaveAttribute(
      "href",
      "/he/pricing?service=permanent-residency",
    );
    await hebrew.click();
    await expect(page).toHaveURL(/\/he\/pricing\?service=permanent-residency$/);
    release();
    await page.goBack();
    await expect(page).toHaveURL(originalPricing);
    await expect(
      page.locator('input[name="journey"][value="first"]'),
    ).toBeChecked();
    await expect(
      page.getByRole("link", {
        name: "Talk through your options",
        exact: true,
      }),
    ).toHaveAttribute("href", /plan=temporary-guided/);
    await page.goForward();
    await expect(page).toHaveURL(/\/he\/pricing\?service=permanent-residency$/);
    await expect(
      page.locator('input[name="journey"][value="upgrade"]'),
    ).toBeChecked();
    await page
      .locator('main a[href="/he/book?service=permanent-residency"]')
      .first()
      .click();
    await expect(page.locator("#firstName")).toHaveValue("Preview");
    await expect(page.locator("#email")).toHaveValue("preview@example.test");
  } finally {
    release();
  }
});

test("the latest journey choice wins while earlier URL changes are pending", async ({
  page,
}) => {
  await page.goto("/en/pricing?plan=temporary-guided");
  const release = await holdSelectionNavigation(page, "/en/pricing");
  try {
    await page.locator('input[name="journey"][value="upgrade"]').check();
    await page.locator('input[name="journey"][value="investment"]').check();
    const booking = page.getByRole("link", {
      name: "Talk through your options",
      exact: true,
    });
    await expect(booking).toHaveAttribute(
      "href",
      "/en/book?service=investor-residency",
    );
    release();
    await expect(page).toHaveURL(/\/en\/pricing\?service=investor-residency$/);
    await expect(
      page.locator('input[name="journey"][value="investment"]'),
    ).toBeChecked();
    await expect(booking).toHaveAttribute(
      "href",
      "/en/book?service=investor-residency",
    );
    await booking.click();
    await expect(page).toHaveURL(/\/en\/book\?service=investor-residency$/);
    await expect(page.getByTestId("selected-package")).not.toContainText(
      "Guided",
    );
  } finally {
    release();
  }
});

test("direct deep links retain package and family context without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  try {
    await page.goto(
      "/en/pricing?plan=temporary-guided&campaign=family-relocation",
    );
    await page.locator(".language-switcher summary").click();
    await page.getByRole("link", { name: "עברית", exact: true }).click();
    await expect(page).toHaveURL(
      (url) =>
        url.pathname === "/he/pricing" &&
        url.searchParams.get("plan") === "temporary-guided" &&
        url.searchParams.get("campaign") === "family-relocation",
    );
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  } finally {
    await context.close();
  }
});

test("modified package clicks preserve the current tab's selection", async ({
  page,
}) => {
  await page.goto("/en/pricing?plan=temporary-guided");
  await expect(page.locator('input[name="journey"]').first()).toBeEnabled();
  await page
    .getByTestId("package-temporary-concierge")
    .getByRole("link", { name: "Discuss this plan", exact: true })
    .click({ modifiers: ["Control"] });
  await expect(page).toHaveURL(/\/en\/pricing\?plan=temporary-guided$/);
  await expect(
    page.getByRole("link", { name: "Talk through your options", exact: true }),
  ).toHaveAttribute(
    "href",
    "/en/book?service=temporary-residency&plan=temporary-guided",
  );
});
