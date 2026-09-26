import { describe, expect, it } from "vitest";
import {
  claimDefinitions,
  pageClaimDependencies,
  validatePageClaims,
  validateContentLaunch,
  type ClaimReviews,
} from "../../src/content/content-review";
import { supportedLocales } from "../../src/config/locales";
import { approvedClaimReviews } from "../helpers/content-review";

const home = { key: "home", claimIds: pageClaimDependencies.home };
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
