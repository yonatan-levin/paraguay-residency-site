import { expect, test } from "@playwright/test";

// Independent acceptance inventory from the handoff, deliberately not generated
// from the application registry: an accidentally omitted route must fail here.
const englishRoutes = [
  "",
  "paraguay-residency",
  "pricing",
  "find-my-plan",
  "book",
  "thank-you",
  "services",
  "permanent-residency",
  "investor-residency",
  "relocation",
  "tax-planning",
  "company-formation/paraguay",
  "company-formation/us",
  "accounting",
  "banking",
  "real-estate",
  "driving-license",
  "retire-in-paraguay",
  "citizenship-guidance",
  "guides",
  "guides/residency-requirements",
  "about",
  "contact",
  "lp/residency-cost",
  "lp/family-relocation",
  "links",
  "privacy",
  "terms",
  "disclaimer",
];
for (const locale of ["en", "es", "fr", "de", "he"] as const) {
  for (const route of englishRoutes) {
    test(`route ${locale}/${route || "(home)"} has preview SEO, one H1, and no render errors`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(`/${locale}${route ? `/${route}` : ""}`);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"]).toContain("noindex");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "he" ? "rtl" : "ltr",
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /\S/,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`/${locale}${route ? `/${route}` : ""}$`),
      );
      for (const equivalent of ["en", "es", "fr", "de", "he"]) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${equivalent}"]`),
        ).toHaveAttribute(
          "href",
          new RegExp(`/${equivalent}${route ? `/${route}` : ""}$`),
        );
      }
      expect(await page.locator('a[href="#"]').count()).toBe(0);
      expect(errors).toEqual([]);
    });
  }
}

test("all rendered internal link destinations resolve", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  for (const route of englishRoutes) {
    await page.goto(`/en${route ? `/${route}` : ""}`);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href") ?? ""),
      )) {
      if (href.startsWith("/") && !href.startsWith("//"))
        links.add(href.split("#")[0]);
    }
  }
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), `Broken internal destination ${href}`).toBe(200);
  }
});

test("root and trailing slash convention redirect; demo sitemap contains no drafts", async ({
  request,
}) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect([307, 308]).toContain(root.status());
  expect(root.headers().location).toMatch(/\/en$/);
  const slash = await request.get("/en/pricing/", { maxRedirects: 0 });
  expect(slash.status()).toBe(308);
  expect(slash.headers().location).toBe("/en/pricing");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("<url>");
});
