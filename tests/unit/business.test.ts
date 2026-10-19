import { describe, expect, it } from "vitest";
import { getPackage, packages } from "../../src/content/catalog";
import { formatPrice, inclusionLabel } from "../../src/domain/pricing";
import { resolveSelection, journeyHref } from "../../src/domain/selection";
import {
  getFinderQuestions,
  recommendPlan,
  updateFinderAnswer,
} from "../../src/domain/finder";
import {
  captureAttribution,
  sanitizeAttribution,
} from "../../src/domain/attribution";

describe("central commercial fixtures", () => {
  it("stores exact provisional minor-unit prices and never substitutes a family total", () => {
    expect(packages).toHaveLength(19);
    expect(getPackage("temporary-guided")?.price).toMatchObject({
      type: "fixed",
      amountMinor: 285000,
      provisional: true,
    });
    expect(getPackage("accounting")?.price).toMatchObject({
      type: "range",
      minMinor: 9000,
      maxMinor: 22000,
      basis: "monthly",
    });
    expect(getPackage("invalid")).toBeUndefined();
  });
  it("formats fixed, range, quote and zero decimals from minor units", () => {
    expect(
      formatPrice(
        {
          type: "fixed",
          amountMinor: 285050,
          currency: "USD",
          basis: "per-applicant",
          provisional: true,
          inclusions: {},
        },
        "en",
      ),
    ).toBe("$2,850.50");
    expect(
      formatPrice(
        {
          type: "range",
          minMinor: 9000,
          maxMinor: 22000,
          currency: "USD",
          basis: "monthly",
          provisional: true,
          inclusions: {},
        },
        "en",
      ),
    ).toBe("$90 to $220");
    expect(
      formatPrice(
        {
          type: "quote",
          currency: "USD",
          basis: "per-engagement",
          provisional: true,
          inclusions: {},
        },
        "es",
      ),
    ).toBe("Solicitar presupuesto");
  });
  it("does not equate missing inclusion with included", () => {
    expect(inclusionLabel(undefined, "en")).toBe("To be confirmed");
    expect(inclusionLabel("included", "es")).toBe("Incluido");
  });
});

describe("safe navigation and preservation", () => {
  it("resolves the package owning service and preserves a valid campaign", () => {
    expect(
      resolveSelection({
        plan: "temporary-guided",
        service: "tax-planning",
        campaign: "residency-cost",
      }),
    ).toEqual({
      packageId: "temporary-guided",
      serviceId: "temporary-residency",
      campaign: "residency-cost",
      invalid: false,
    });
  });
  it("ignores invalid IDs instead of returning arbitrary paths", () => {
    expect(
      resolveSelection({
        plan: "https://evil.example",
        service: "<script>",
        campaign: "x",
      }),
    ).toEqual({ invalid: true });
    expect(
      journeyHref("es", "book", {
        packageId: "temporary-guided",
        serviceId: "temporary-residency",
      }),
    ).toBe("/es/book?service=temporary-residency&plan=temporary-guided");
  });
});

describe("finder branching and recommendations", () => {
  it("asks at most five questions and skips residency for business/tax/property", () => {
    expect(getFinderQuestions({ goal: "residency" })).toEqual([
      "goal",
      "stage",
      "household",
      "timing",
      "support",
    ]);
    for (const goal of ["business", "tax", "property"] as const)
      expect(getFinderQuestions({ goal })).not.toContain("stage");
  });
  it("recommends Guided for new residency without using contact details", () => {
    expect(
      recommendPlan({
        goal: "residency",
        stage: "new",
        household: "individual",
        timing: "soon",
        support: "guided",
      }),
    ).toMatchObject({
      serviceId: "temporary-residency",
      packageId: "temporary-guided",
      familyQuote: false,
    });
  });
  it("routes a temporary resident to upgrade regardless of requested support", () => {
    expect(
      recommendPlan({
        goal: "residency",
        stage: "temporary",
        support: "concierge",
      }),
    ).toMatchObject({
      serviceId: "permanent-residency",
      packageId: "upgrade-basic",
    });
  });
  it("flags family as quote only and routes investment for specialist discussion", () => {
    expect(
      recommendPlan({
        goal: "residency",
        stage: "new",
        household: "family",
        support: "guided",
      }),
    ).toMatchObject({ packageId: "temporary-guided", familyQuote: true });
    expect(recommendPlan({ goal: "investment" })).toMatchObject({
      serviceId: "investor-residency",
      packageId: "investor-support",
    });
    expect(recommendPlan({ goal: "tax" })).toMatchObject({
      serviceId: "tax-planning",
      packageId: "tax-planning",
    });
  });
  it("preserves relevant answers when editing, but clears incompatible answers on goal change", () => {
    const original = {
      goal: "residency",
      stage: "new",
      household: "family",
      timing: "soon",
      support: "guided",
    } as const;
    expect(updateFinderAnswer(original, "timing", "exploring")).toEqual({
      ...original,
      timing: "exploring",
    });
    expect(updateFinderAnswer(original, "goal", "tax")).toEqual({
      goal: "tax",
      household: "family",
      timing: "soon",
    });
  });
});

describe("attribution privacy", () => {
  it("allowlists campaign values and never carries raw parameters or referrer queries", () => {
    expect(
      sanitizeAttribution({
        utm_source: "instagram",
        utm_medium: "social",
        utm_campaign: "family-relocation",
        utm_content: "family",
        email: "private@example.com",
        referrer: "https://example.com/article?email=private@example.com",
      }),
    ).toEqual({
      source: "instagram",
      medium: "social",
      campaign: "family-relocation",
      content: "family",
      referrer: "https://example.com/article",
    });
    expect(
      sanitizeAttribution({
        utm_source: "private@example.com",
        utm_medium: "<script>",
        utm_campaign: "unknown-value",
      }),
    ).toMatchObject({
      source: "unknown",
      medium: "unknown",
      campaign: "unknown",
    });
  });
  it("retains first campaign when a later navigation is direct", () => {
    const first = sanitizeAttribution({
      utm_campaign: "family-relocation",
      utm_source: "instagram",
    });
    expect(captureAttribution(first, {})).toEqual(first);
  });
});
