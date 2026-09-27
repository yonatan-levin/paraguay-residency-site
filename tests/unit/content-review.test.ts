import { describe, expect, it } from "vitest";
import {
  claimDefinitions,
  claimReviews,
  regulatorySources,
  pageClaimDependencies,
  validatePageClaims,
  validateContentLaunch,
  type ClaimReviews,
  type ClaimId,
} from "../../src/content/content-review";
import { supportedLocales } from "../../src/config/locales";
import { approvedClaimReviews } from "../helpers/content-review";

const home = { key: "home", claimIds: pageClaimDependencies.home };
// This acceptance matrix is independent of the production dependency map.
const taxClaimPages = {
  "foreign-dividends": ["home", "why-paraguay", "tax-planning"],
  "us-llc-income": [
    "home",
    "why-paraguay",
    "tax-planning",
    "company-formation/us",
  ],
  "paraguay-company-tax": [
    "why-paraguay",
    "tax-planning",
    "company-formation/paraguay",
  ],
  "tax-residency-boundary": [
    "home",
    "why-paraguay",
    "tax-planning",
    "company-formation/us",
    "company-formation/paraguay",
  ],
} as const;
const taxClaimIds = Object.keys(
  taxClaimPages,
) as (keyof typeof taxClaimPages)[];
describe("claim approval boundaries", () => {
  it("blocks source checked drafts but permits fully reviewed test claims", () => {
    expect(validatePageClaims(home, "en")).toContain(
      "legal-base: professional review is pending.",
    );
    expect(validatePageClaims(home, "en", approvedClaimReviews())).toEqual([]);
  });

  it.each([
    [
      "source URLs",
      (r: ClaimReviews) => {
        r["legal-base"]!.content.sourceUrls = [];
      },
      "official source",
    ],
    [
      "source date",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.content.sourceCheckedAt;
      },
      "source check date",
    ],
    [
      "invalid source date",
      (r: ClaimReviews) => {
        r["legal-base"]!.content.sourceCheckedAt = "yesterday";
      },
      "source check date",
    ],
    [
      "out of range source date",
      (r: ClaimReviews) => {
        r["legal-base"]!.content.sourceCheckedAt = "2026-99-99";
      },
      "source check date",
    ],
    [
      "author",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.content.author;
      },
      "author",
    ],
    [
      "professional",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.content.reviewer;
      },
      "reviewer",
    ],
    [
      "professional approval date",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.content.approvedAt;
      },
      "review date",
    ],
    [
      "professional status",
      (r: ClaimReviews) => {
        r["legal-base"]!.content.status = "draft";
      },
      "professional review",
    ],
    [
      "operator status",
      (r: ClaimReviews) => {
        r["service-delivery"]!.operator.status = "draft";
      },
      "operator approval",
    ],
    [
      "operator identity",
      (r: ClaimReviews) => {
        delete r["service-delivery"]!.operator.reviewer;
      },
      "operator approver",
    ],
    [
      "operator date",
      (r: ClaimReviews) => {
        delete r["service-delivery"]!.operator.approvedAt;
      },
      "operator approval date",
    ],
    [
      "translation record",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.translations.he;
      },
      "he translation approval",
    ],
    [
      "translation status",
      (r: ClaimReviews) => {
        r["legal-base"]!.translations.he!.status = "draft";
      },
      "he translation approval",
    ],
    [
      "translation reviewer",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.translations.he!.reviewer;
      },
      "he translation reviewer",
    ],
    [
      "translation date",
      (r: ClaimReviews) => {
        delete r["legal-base"]!.translations.he!.approvedAt;
      },
      "he translation approval date",
    ],
  ] as const)("fails closed with missing %s", (_label, mutate, expected) => {
    const reviews = approvedClaimReviews();
    mutate(reviews);
    expect(validatePageClaims(home, "he", reviews).join("\n")).toContain(
      expected,
    );
  });

  it("cannot approve an affected page by removing its dependency declarations", () => {
    expect(
      validatePageClaims({ key: "home" }, "en", approvedClaimReviews()),
    ).toContain("home: claim dependencies are missing.");
    expect(
      validatePageClaims(
        { key: "home", claimIds: ["service-delivery"] },
        "en",
        approvedClaimReviews(),
      ).join("\n"),
    ).toContain("legal-base: page dependency is missing.");
    expect(validatePageClaims({ key: "privacy" }, "en")).toEqual([]);
  });

  it("rejects unknown claims and missing reviews without treating them as approved", () => {
    expect(
      validatePageClaims(
        { key: "privacy", claimIds: ["invented"] },
        "en",
        approvedClaimReviews(),
      ),
    ).toEqual(["invented: claim is not registered."]);
    const reviews = approvedClaimReviews();
    delete reviews["legal-base"];
    expect(validatePageClaims(home, "en", reviews)).toContain(
      "legal-base: review record is missing.",
    );
  });

  it("checks every required locale and page while allowing an approved fixture", () => {
    const pages = Object.entries(pageClaimDependencies).map(
      ([key, claimIds]) => ({ key, claimIds }),
    );
    expect(
      validateContentLaunch(pages, supportedLocales, approvedClaimReviews()),
    ).toEqual([]);
    const reviews = approvedClaimReviews();
    delete reviews["income-source"]!.translations.de;
    expect(
      validateContentLaunch(pages, supportedLocales, reviews).join("\n"),
    ).toContain("de translation approval");
    expect(Object.keys(claimDefinitions)).toContain("income-source");
  });
});

describe("tax opportunity release dependencies", () => {
  it.each(taxClaimIds)(
    "keeps %s source inspection separate from professional approval",
    (id) => {
      const claimId = id as ClaimId;
      expect(claimDefinitions[claimId]).toMatchObject({
        professional: true,
        operator: false,
      });
      expect(claimReviews[claimId]).toMatchObject({
        content: { status: "draft" },
        operator: { status: "draft" },
        translations: {},
      });
      expect(claimReviews[claimId]!.content.sourceUrls.length).toBeGreaterThan(
        0,
      );
      expect(claimReviews[claimId]!.content.reviewer).toBeUndefined();
      expect(claimReviews[claimId]!.content.approvedAt).toBeUndefined();
    },
  );

  it.each(taxClaimIds)(
    "blocks every dependent page if %s is draft or its review is absent",
    (id) => {
      const claimId = id as ClaimId;
      const reviews = approvedClaimReviews();
      expect(reviews[claimId]).toBeDefined();
      for (const key of taxClaimPages[id]) {
        const page = { key, claimIds: pageClaimDependencies[key] };
        expect(validatePageClaims(page, "en", reviews)).toEqual([]);
        const draft = structuredClone(reviews);
        draft[claimId]!.content.status = "draft";
        expect(validatePageClaims(page, "en", draft)).toContain(
          `${id}: professional review is pending.`,
        );
        const missing = structuredClone(reviews);
        delete missing[claimId];
        expect(validatePageClaims(page, "en", missing)).toContain(
          `${id}: review record is missing.`,
        );
      }
    },
  );

  it.each(taxClaimIds)(
    "cannot bypass %s by deleting a page declaration",
    (id) => {
      for (const key of taxClaimPages[id]) {
        const page = {
          key,
          claimIds: pageClaimDependencies[key]?.filter((claim) => claim !== id),
        };
        expect(
          validatePageClaims(page, "en", approvedClaimReviews()),
        ).toContain(`${id}: page dependency is missing.`);
      }
    },
  );

  it.each(["R5", "R6", "R7", "R8", "R9", "R10"])(
    "requires US supporting source %s even when every review is approved",
    (sourceId) => {
      const reviews = approvedClaimReviews();
      const claimId = "us-llc-income" as ClaimId;
      expect(reviews[claimId]).toBeDefined();
      const source =
        regulatorySources[sourceId as keyof typeof regulatorySources];
      expect(source).toBeDefined();
      reviews[claimId]!.content.sourceUrls = reviews[
        claimId
      ]!.content.sourceUrls.filter((url) => url !== source.url);
      expect(
        validatePageClaims(
          {
            key: "company-formation/us",
            claimIds: pageClaimDependencies["company-formation/us"],
          },
          "en",
          reviews,
        ),
      ).toContain("us-llc-income: official source is missing.");
    },
  );

  it.each(supportedLocales)(
    "requires %s approval for every new tax claim before launch",
    (locale) => {
      const pages = Object.entries(pageClaimDependencies).map(
        ([key, claimIds]) => ({ key, claimIds }),
      );
      for (const id of taxClaimIds) {
        const reviews = approvedClaimReviews();
        const claimId = id as ClaimId;
        expect(reviews[claimId]).toBeDefined();
        delete reviews[claimId]!.translations[locale];
        expect(
          validateContentLaunch(pages, supportedLocales, reviews),
        ).toContain(`${id}: ${locale} translation approval is pending.`);
      }
      expect(
        validateContentLaunch(pages, supportedLocales, approvedClaimReviews()),
      ).toEqual([]);
    },
  );

  it.each([
    ["foreign-dividends", ["R3", "R4"]],
    ["paraguay-company-tax", ["R3", "R11"]],
    ["tax-residency-boundary", ["R10", "R12", "R13"]],
  ] as const)(
    "requires every official supporting source for %s",
    (id, sourceIds) => {
      for (const sourceId of sourceIds) {
        const reviews = approvedClaimReviews();
        reviews[id]!.content.sourceUrls = reviews[
          id
        ]!.content.sourceUrls.filter(
          (url) => url !== regulatorySources[sourceId].url,
        );
        expect(
          validatePageClaims(
            {
              key: "why-paraguay",
              claimIds: pageClaimDependencies["why-paraguay"],
            },
            "en",
            reviews,
          ),
        ).toContain(`${id}: official source is missing.`);
      }
    },
  );
});
