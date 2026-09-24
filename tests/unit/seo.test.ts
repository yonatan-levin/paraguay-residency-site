import { describe, expect, it } from "vitest";
import { pages, getPage, routePath } from "../../src/config/routes";
import {
  runtime,
  validateLiveConfiguration,
  type RuntimeEnvironment,
} from "../../src/config/runtime";
import {
  canIndex,
  buildSitemap,
  pageMetadata,
} from "../../src/lib/seo/metadata";

const approvedRuntime: RuntimeEnvironment = {
  ...runtime,
  mode: "live",
  siteUrl: "https://approved.example",
  productionOrigin: "https://approved.example",
  productionOriginApproved: true,
  approvals: {
    brand: true,
    legalOperator: true,
    contacts: true,
    commercial: true,
    content: true,
    privacy: true,
    providers: true,
    translation: true,
  },
  integrations: { analytics: false, messaging: false, booking: false },
};

describe("route inventory and actual translations", () => {
  it("contains all handoff routes and complete translated counterparts", () => {
    for (const key of [
      "home",
      "pricing",
      "book",
      "thank-you",
      "guides/residency-requirements",
      "citizenship-guidance",
      "lp/residency-cost",
      "lp/family-relocation",
      "privacy",
    ])
      expect(getPage(key, "en")).toBeDefined();
    expect(getPage("pricing", "es")).toBeDefined();
    expect(getPage("accounting", "es")).toBeDefined();
    expect(getPage("evil", "en")).toBeUndefined();
    expect(routePath("es", "pricing")).toBe("/es/pricing");
    expect(routePath("en", "home")).toBe("/en");
  });
  it("keeps all demo routes noindex and demo sitemap empty", () => {
    expect(
      pages.every((page) =>
        page.locales.every((locale) => !canIndex(page, runtime, locale)),
      ),
    ).toBe(true);
    expect(buildSitemap(pages, runtime)).toEqual([]);
  });
});

describe("single fail-closed indexing gate", () => {
  const approvedPage = () => ({
    ...getPage("pricing")!,
    approved: true,
    commercialApproved: true,
    contentReviewed: true,
  });
  it("requires matching approved production origin, content, commercial status, and locale", () => {
    const page = approvedPage();
    expect(canIndex(page, approvedRuntime, "en")).toBe(true);
    expect(
      canIndex(
        page,
        { ...approvedRuntime, siteUrl: "https://preview.example" },
        "en",
      ),
    ).toBe(false);
    expect(
      canIndex({ ...page, contentReviewed: false }, approvedRuntime, "en"),
    ).toBe(false);
    expect(
      canIndex({ ...page, commercialApproved: false }, approvedRuntime, "en"),
    ).toBe(false);
    expect(
      canIndex(page, { ...approvedRuntime, completeLocales: ["en"] }, "es"),
    ).toBe(false);
    expect(canIndex({ ...page, indexable: false }, approvedRuntime, "en")).toBe(
      false,
    );
  });
  it("never includes form, campaign, receipt or draft pages in live sitemap", () => {
    const approved = pages.map((page) => ({
      ...page,
      approved: true,
      commercialApproved: true,
      contentReviewed: true,
    }));
    const sitemap = buildSitemap(approved, approvedRuntime);
    expect(
      sitemap.some(
        (entry) => entry.url === "https://approved.example/en/pricing",
      ),
    ).toBe(true);
    expect(
      sitemap.some((entry) =>
        /book|thank-you|find-my-plan|\/lp\/|privacy/.test(entry.url),
      ),
    ).toBe(false);
    expect(
      sitemap.some(
        (entry) => entry.url === "https://approved.example/es/accounting",
      ),
    ).toBe(true);
  });
  it("builds self canonical and reciprocal alternates only for real complete translations", () => {
    const metadata = pageMetadata(approvedPage(), "es", approvedRuntime);
    expect(metadata.alternates?.canonical).toBe(
      "https://approved.example/es/pricing",
    );
    expect(metadata.alternates?.languages).toEqual({
      en: "https://approved.example/en/pricing",
      es: "https://approved.example/es/pricing",
      fr: "https://approved.example/fr/pricing",
      de: "https://approved.example/de/pricing",
      he: "https://approved.example/he/pricing",
      "x-default": "https://approved.example/en/pricing",
    });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    const single = pageMetadata(getPage("accounting")!, "en", runtime);
    expect(single.alternates?.languages).toHaveProperty("es");
    expect(single.robots).toMatchObject({ index: false });
  });
  it("gives each route distinct social text with a local 1200 by 630 preview", () => {
    const cost = pageMetadata(getPage("lp/residency-cost")!, "en");
    const family = pageMetadata(getPage("lp/family-relocation")!, "en");
    expect(cost.title).not.toEqual(family.title);
    expect(cost.openGraph?.images).toEqual([
      expect.objectContaining({ width: 1200, height: 630 }),
    ]);
    expect(JSON.stringify(cost)).not.toContain("2,850");
  });
});

describe("unapproved launch configuration", () => {
  it("returns actionable missing approvals while allowing a complete policy fixture", () => {
    const errors = validateLiveConfiguration(runtime);
    expect(errors).toContain("Approve the legal operator.");
    expect(errors).toContain("Set and approve an HTTPS production origin.");
    expect(validateLiveConfiguration(approvedRuntime)).toEqual([]);
    expect(
      validateLiveConfiguration({
        ...approvedRuntime,
        productionOrigin: "javascript:alert(1)",
      }).length,
    ).toBeGreaterThan(0);
  });
});
