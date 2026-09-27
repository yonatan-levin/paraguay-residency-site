import { describe, expect, it } from "vitest";
import { pages, getPage, routePath } from "../../src/config/routes";
import { approvedClaimReviews } from "../helpers/content-review";
import type { ClaimId } from "../../src/content/content-review";
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
      "why-paraguay",
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
  it.each([
    ["foreign-dividends", ["home", "why-paraguay", "tax-planning"]],
    [
      "us-llc-income",
      ["home", "why-paraguay", "tax-planning", "company-formation/us"],
    ],
    [
      "paraguay-company-tax",
      ["why-paraguay", "tax-planning", "company-formation/paraguay"],
    ],
    [
      "tax-residency-boundary",
      [
        "home",
        "why-paraguay",
        "tax-planning",
        "company-formation/us",
        "company-formation/paraguay",
      ],
    ],
  ] as const)(
    "keeps all pages asserting %s out of indexing until that claim is approved",
    (id, keys) => {
      for (const key of keys) {
        const page = {
          ...getPage(key)!,
          approved: true,
          commercialApproved: true,
          contentReviewed: true,
        };
        const claimId = id as ClaimId;
        const reviews = approvedClaimReviews();
        expect(reviews[claimId]).toBeDefined();
        expect(canIndex(page, approvedRuntime, "en", reviews)).toBe(true);
        reviews[claimId]!.content.status = "draft";
        expect(canIndex(page, approvedRuntime, "en", reviews)).toBe(false);
        expect(
          pageMetadata(page, "en", approvedRuntime, reviews).robots,
        ).toMatchObject({
          index: false,
        });
        expect(buildSitemap([page], approvedRuntime, reviews)).toEqual([]);
        delete reviews[claimId];
        expect(canIndex(page, approvedRuntime, "en", reviews)).toBe(false);
      }
    },
  );
  it("blocks new claims even when page and global approval flags are true", () => {
    const page = {
      ...getPage("home")!,
      approved: true,
      commercialApproved: true,
      contentReviewed: true,
    };
    expect(canIndex(page, approvedRuntime, "en")).toBe(false);
    expect(pageMetadata(page, "en", approvedRuntime).robots).toMatchObject({
      index: false,
    });
    expect(buildSitemap([page], approvedRuntime)).toEqual([]);
  });
  const approvedPage = () => ({
    ...getPage("pricing")!,
    approved: true,
    commercialApproved: true,
    contentReviewed: true,
  });
  it("requires matching approved production origin, content, commercial status, and locale", () => {
    const page = approvedPage();
    expect(canIndex(page, approvedRuntime, "en", approvedClaimReviews())).toBe(
      true,
    );
    expect(
      canIndex(
        page,
        { ...approvedRuntime, siteUrl: "https://preview.example" },
        "en",
        approvedClaimReviews(),
      ),
    ).toBe(false);
    expect(
      canIndex(
        { ...page, contentReviewed: false },
        approvedRuntime,
        "en",
        approvedClaimReviews(),
      ),
    ).toBe(false);
    expect(
      canIndex(
        { ...page, commercialApproved: false },
        approvedRuntime,
        "en",
        approvedClaimReviews(),
      ),
    ).toBe(false);
    expect(
      canIndex(
        page,
        { ...approvedRuntime, completeLocales: ["en"] },
        "es",
        approvedClaimReviews(),
      ),
    ).toBe(false);
    expect(
      canIndex(
        { ...page, indexable: false },
        approvedRuntime,
        "en",
        approvedClaimReviews(),
      ),
    ).toBe(false);
  });
  it("never includes form, campaign, receipt or draft pages in live sitemap", () => {
    const approved = pages.map((page) => ({
      ...page,
      approved: true,
      commercialApproved: true,
      contentReviewed: true,
    }));
    const sitemap = buildSitemap(
      approved,
      approvedRuntime,
      approvedClaimReviews(),
    );
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
    const metadata = pageMetadata(
      approvedPage(),
      "es",
      approvedRuntime,
      approvedClaimReviews(),
    );
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
    const why = pageMetadata(getPage("why-paraguay")!, "he");
    expect(why.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/og-why-paraguay-he.png" }),
    ]);
    expect(why.alternates?.canonical).toBe(
      `${runtime.siteUrl}/he/why-paraguay`,
    );
    expect(why.title).toContain("Paraguay Next");
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
