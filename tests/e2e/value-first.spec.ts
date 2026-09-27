import { expect, test } from "@playwright/test";
import { supportedLocales } from "../../src/config/locales";

test("home explains benefits before assistance and keeps direct actions", async ({
  page,
  request,
}) => {
  const response = await request.get("/en?plan=temporary-guided");
  const html = await response.text();
  expect(html).toContain(
    "A base in Paraguay. A smarter plan for your income.",
  );
  expect(html).toContain(
    "Payment from abroad does not by itself establish that income is foreign source",
  );
  await page.goto("/en?plan=temporary-guided");
  await expect(page.locator("h1")).toHaveCount(1);
  const order = await page
    .locator("main [data-home-section]")
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-home-section")),
    );
  expect(order).toEqual([
    "hero",
    "reassurance",
    "benefits",
    "motivations",
    "service-value",
    "process",
    "packages",
    "evidence",
    "questions",
    "next-step",
  ]);
  await expect(page.locator("#benefits article")).toHaveCount(4);
  await expect(page.locator("#benefits")).toContainText("Payment from abroad");
  await page
    .getByRole("link", { name: "Explore the benefits", exact: true })
    .click();
  await expect(page).toHaveURL(/plan=temporary-guided.*#benefits/);
  await expect(
    page.getByRole("link", { name: "Compare residency packages", exact: true }),
  ).toHaveAttribute("href", /pricing.*plan=temporary-guided/);
  await expect(
    page.getByRole("link", {
      name: "Already know what you need? Book a consultation",
      exact: true,
    }),
  ).toHaveAttribute("href", /book.*plan=temporary-guided/);
});

test("informational motivations preserve a chosen package and do not imply family entry", async ({
  page,
}) => {
  await page.goto("/en?plan=temporary-guided");
  await page
    .getByRole("link", { name: "Explore moving and settling in", exact: true })
    .click();
  await expect(page).toHaveURL(/relocation.*plan=temporary-guided/);
  expect(new URL(page.url()).searchParams.has("campaign")).toBe(false);
  await expect(
    page
      .getByText(
        "This service has a different scope. Continuing will replace your selected package with this service.",
      )
      .first(),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Discuss this service", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/book\?service=relocation/);
  expect(new URL(page.url()).searchParams.has("plan")).toBe(false);
});

test("compatible service inquiry retains the selected package", async ({
  page,
}) => {
  await page.goto("/en/paraguay-residency?plan=temporary-guided");
  await page
    .getByRole("link", { name: "Discuss this service", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/book.*plan=temporary-guided/);
});

for (const ctaIndex of [0, 1]) {
  test(`cost campaign action ${ctaIndex + 1} preserves a compatible package in its link and navigation`, async ({
    page,
  }) => {
    await page.goto("/en/lp/residency-cost?plan=temporary-guided");
    const action = page
      .getByRole("link", { name: "Compare my options", exact: true })
      .nth(ctaIndex);
    await expect(action).toHaveAttribute(
      "href",
      /pricing\?service=temporary-residency&plan=temporary-guided&campaign=residency-cost$/,
    );
    await action.click();
    await expect(page).toHaveURL(
      /pricing\?service=temporary-residency&plan=temporary-guided&campaign=residency-cost$/,
    );
  });
  test(`cost campaign action ${ctaIndex + 1} explains replacing an incompatible package`, async ({
    page,
  }) => {
    await page.goto("/en/lp/residency-cost?plan=upgrade-premium");
    const inquiry = page.locator(".service-inquiry").nth(ctaIndex);
    await expect(inquiry).toContainText(
      "This service has a different scope. Continuing will replace your selected package with this service.",
    );
    const action = inquiry.getByRole("link", {
      name: "Compare my options",
      exact: true,
    });
    await expect(action).toHaveAttribute(
      "href",
      "/en/pricing?service=temporary-residency&campaign=residency-cost",
    );
    await action.click();
    await expect(page).toHaveURL(
      /pricing\?service=temporary-residency&campaign=residency-cost$/,
    );
  });
}

test("Why Paraguay is substantive and usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en/why-paraguay?plan=temporary-guided");
  await expect(page.locator("h1")).toHaveText(
    "Why consider Paraguay for your next chapter?",
  );
  await expect(page.locator("main [data-why-section]")).toHaveCount(8);
  await expect(page.locator("#financial-planning")).toContainText(
    "using a US LLC or receiving payment abroad does not by itself make the income foreign source",
  );
  await expect(page.locator("#life-and-budget li")).toHaveCount(8);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page
    .locator("#next-step")
    .getByRole("link", { name: "Compare packages", exact: true })
    .click();
  await expect(page).toHaveURL(/pricing.*plan=temporary-guided/);
  await context.close();
});

test("link hub exposes four clear destinations", async ({ page }) => {
  await page.goto("/en/links");
  await expect(page.locator(".link-choices a")).toHaveCount(4);
  await expect(
    page
      .locator(".link-choices")
      .getByRole("link", { name: "Why Paraguay", exact: true }),
  ).toHaveAttribute("href", "/en/why-paraguay");
});

for (const locale of supportedLocales) {
  test(`${locale} home reflows and exposes its mobile consultation link`, async ({
    page,
  }) => {
    for (const width of [320, 360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}`);
      const size = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(
        size.content,
        `${locale} home overflows at ${width}px`,
      ).toBeLessThanOrEqual(size.viewport);
      if (width === 390) {
        const booking = await page.locator(".quiet-booking a").boundingBox();
        const persistent = await page
          .locator(".mobile-conversion")
          .boundingBox();
        expect(booking).not.toBeNull();
        expect(persistent).not.toBeNull();
        expect(booking!.y + booking!.height).toBeLessThanOrEqual(persistent!.y);
      }
    }
  });
  test(`${locale} evaluation content and links are complete in initial HTML`, async ({
    page,
    request,
  }) => {
    const response = await request.get(`/${locale}`);
    const html = await response.text();
    for (const id of [
      "legal-base",
      "longer-term",
      "tax-planning",
      "life-and-budget",
    ]) {
      expect(html).toContain(`data-benefit-id="${id}"`);
    }
    await page.goto(`/${locale}/why-paraguay?plan=temporary-guided`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-why-section]")).toHaveCount(8);
    await expect(page.locator(".source-note")).toHaveCount(3);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`/${locale}/why-paraguay$`),
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      supportedLocales.length + 1,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    if (locale !== "en")
      await expect(page.locator("h1")).not.toHaveText(
        "Why consider Paraguay for your next chapter?",
      );
    const hrefs = await page
      .locator('main a[href^="/"]')
      .evaluateAll((links) => [
        ...new Set(links.map((link) => link.getAttribute("href")!)),
      ]);
    for (const href of hrefs) {
      const destination = new URL(href, page.url());
      expect(destination.searchParams.get("plan")).toBe("temporary-guided");
      const result = await request.get(
        destination.pathname + destination.search,
      );
      expect(result.status(), href).toBe(200);
      if (destination.hash)
        expect(await result.text(), href).toContain(
          `id="${destination.hash.slice(1)}"`,
        );
    }
  });
}
