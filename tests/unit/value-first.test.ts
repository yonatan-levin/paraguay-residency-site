import { describe, expect, it } from "vitest";
import * as selectionRules from "../../src/domain/selection";
import { sanitizeEvent } from "../../src/lib/analytics/events";
import { resolveMotivation } from "../../src/domain/value-first";

const selected = {
  serviceId: "temporary-residency",
  packageId: "temporary-guided",
  campaign: "residency-cost" as const,
};

describe("evaluation links preserve selected context", () => {
  it("places an approved section after the complete selection query", () => {
    expect(
      selectionRules.journeyHref("he", "why-paraguay", selected, "second-base"),
    ).toBe(
      "/he/why-paraguay?service=temporary-residency&plan=temporary-guided&campaign=residency-cost#second-base",
    );
    expect(selectionRules.journeyHref("en", "", {}, "benefits")).toBe(
      "/en#benefits",
    );
  });

  it("rejects wrong-page anchors and URL fragments supplied as route data", () => {
    expect(selectionRules.journeyHref("en", "pricing", {}, "second-base")).toBe(
      "/en/pricing",
    );
    expect(
      selectionRules.journeyHref(
        "en",
        "why-paraguay#second-base",
        {},
        "second-base",
      ),
    ).toBe("/en/book");
    expect(
      selectionRules.journeyHref(
        "en",
        "why-paraguay",
        {},
        "email=private@example.com" as never,
      ),
    ).toBe("/en/why-paraguay");
  });

  it("keeps a compatible package for an explicit service inquiry", () => {
    expect(
      selectionRules.selectServiceContext(selected, "temporary-residency"),
    ).toEqual({ selection: { ...selected, invalid: false } });
  });

  it("explains clearing an incompatible package while retaining campaign", () => {
    expect(
      selectionRules.selectServiceContext(selected, "paraguay-company"),
    ).toEqual({
      selection: {
        serviceId: "paraguay-company",
        campaign: "residency-cost",
        invalid: false,
      },
      reason: "package-cleared",
    });
  });

  it("rejects unknown inquiry services and sanitizes stale context", () => {
    expect(
      selectionRules.selectServiceContext(selected, "https://private.example"),
    ).toEqual({ selection: { ...selected, invalid: false } });
    expect(
      selectionRules.selectServiceContext(
        { packageId: "bad", campaign: "family-relocation" },
        "tax-planning",
      ),
    ).toEqual({
      selection: {
        serviceId: "tax-planning",
        campaign: "family-relocation",
        invalid: false,
      },
    });
  });
});

describe("motivation destinations", () => {
  it.each([
    ["move", { id: "move", route: "relocation" }],
    [
      "second-base",
      { id: "second-base", route: "why-paraguay", anchor: "second-base" },
    ],
    [
      "local-business",
      { id: "local-business", route: "company-formation/paraguay" },
    ],
    [
      "financial-planning",
      {
        id: "financial-planning",
        route: "why-paraguay",
        anchor: "financial-planning",
      },
    ],
  ])(
    "%s browses information without assigning finder answers",
    (id, expected) => {
      expect(resolveMotivation(id)).toEqual(expected);
    },
  );
  it.each([
    "private@example.com",
    "family",
    "__proto__",
    undefined,
    { id: "move" },
  ])("rejects unknown motivation %s", (id) => {
    expect(resolveMotivation(id)).toBeUndefined();
  });
});

describe("bounded evaluation analytics", () => {
  it("records evaluation IDs without accepting personal or raw query data", () => {
    expect(
      sanitizeEvent({
        eventId: "motivation_selected",
        routeKey: "why-paraguay",
        motivation_id: "second-base",
        email: "private@example.com",
        rawQuery: "email=private@example.com",
      }),
    ).toMatchObject({
      eventId: "motivation_selected",
      routeKey: "why-paraguay",
      motivation_id: "second-base",
      is_demo: true,
    });
    expect(
      sanitizeEvent({
        eventId: "benefit_detail_opened",
        benefit_id: "tax-planning",
        motivation_id: "private@example.com",
        email: "private@example.com",
      }),
    ).toEqual({
      eventId: "benefit_detail_opened",
      benefit_id: "tax-planning",
      timestamp: expect.any(String),
      is_demo: true,
    });
  });
});
