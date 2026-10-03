import { describe, expect, it } from "vitest";
import { pages, getPage, routePath } from "../../src/config/routes";
import { getPackage } from "../../src/content/catalog";
import {
  validateSubmission,
  createSubmissionController,
} from "../../src/application/submission";
import { sanitizeEvent } from "../../src/lib/analytics/events";
import { pageMetadata } from "../../src/lib/seo/metadata";
import { formatPrice } from "../../src/domain/pricing";
import {
  createMockLeadGateway,
  createMockBookingGateway,
  createMockMessagingGateway,
  formatSlot,
} from "../../src/infrastructure/mock/gateways";
import type { Locale, SubmissionPayload } from "../../src/domain/types";
import {
  localeDirections,
  localeFormats,
  localeNames,
} from "../../src/config/locales";

// Independent acceptance list: adding a locale to the registry alone is not proof.
const requestedLocales = ["en", "es", "fr", "de", "he", "ru"] as const;
const clock = () => new Date("2026-09-24T12:00:00Z");
const request = (locale: string): SubmissionPayload => ({
  mode: "conversation",
  context: {
    locale: locale as Locale,
    entryPageKey: "pricing",
    serviceId: "temporary-residency",
    packageId: "temporary-guided",
  },
  contact: {
    firstName: "Test",
    channel: "email",
    email: "reviewer@example.test",
    marketingConsent: false,
  },
});

describe("complete public language journeys", () => {
  it("registers native Russian presentation without changing Hebrew direction", () => {
    expect(localeNames.ru).toBe("Русский");
    expect(localeFormats.ru).toBe("ru-RU");
    expect(localeDirections.ru).toBe("ltr");
    expect(localeDirections.he).toBe("rtl");
    expect(getPage("internal/rtl", "ru")).toBeUndefined();
  });
  it("formats the same appointment instant in Russian without changing its time zone", () => {
    const instant = "2026-09-25T15:00:00Z";
    for (const timeZone of ["UTC", "Asia/Jerusalem"]) {
      expect(formatSlot(instant, timeZone, "ru")).toBe(
        new Intl.DateTimeFormat("ru-RU", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone,
          hour12: false,
        }).format(new Date(instant)),
      );
    }
  });
  it.each(requestedLocales)(
    "publishes every public route in %s with reciprocal metadata",
    (language) => {
      const locale = language as Locale;
      for (const page of pages.filter(
        (item) => !item.key.startsWith("internal/"),
      )) {
        expect(
          getPage(page.key, locale),
          `${locale}/${page.key}`,
        ).toBeDefined();
        expect(routePath(locale, page.key)).toBe(
          `/${locale}${page.path ? `/${page.path}` : ""}`,
        );
        const meta = pageMetadata(page, locale);
        expect(meta.description).toBeTruthy();
        expect(meta.robots).toMatchObject({ index: false });
        for (const counterpart of requestedLocales)
          expect(meta.alternates?.languages).toHaveProperty(counterpart);
        expect(meta.openGraph).toHaveProperty(
          "locale",
          {
            en: "en_US",
            es: "es_PY",
            fr: "fr_FR",
            de: "de_DE",
            he: "he_IL",
            ru: "ru_RU",
          }[language],
        );
      }
    },
  );
  it.each(requestedLocales)(
    "accepts %s submissions and preserves selected package in an unsent receipt",
    async (locale) => {
      const payload = request(locale);
      expect(validateSubmission(payload).success).toBe(true);
      const controller = createSubmissionController({
        leadGateway: createMockLeadGateway(),
        bookingGateway: createMockBookingGateway({ clock }),
        clock,
      });
      expect((await controller.submit(payload)).status).toBe("success");
      expect(controller.readReceipt()?.context).toMatchObject({
        locale,
        packageId: "temporary-guided",
        serviceId: "temporary-residency",
      });
      expect(controller.readReceipt()?.price).toMatchObject({
        amountMinor: 285000,
        currency: "USD",
      });
      expect(
        sanitizeEvent(
          {
            eventId: "package_selected",
            routeKey: "pricing",
            locale,
            planId: "temporary-guided",
            is_demo: true,
          },
          clock,
        )?.locale,
      ).toBe(locale);
    },
  );
  it("rejects unsupported languages instead of silently converting them to English", () => {
    expect(validateSubmission(request("xx")).success).toBe(false);
    expect(
      sanitizeEvent(
        { eventId: "package_selected", locale: "xx", is_demo: true },
        clock,
      ),
    ).not.toHaveProperty("locale");
  });
  it.each(["es", "fr", "de", "he", "ru"] as const)(
    "localizes %s USD prices, time and selected package message",
    (language) => {
      const locale = language as Locale;
      const plan = getPackage("temporary-guided")!;
      expect(plan.name[locale]).toBeTruthy();
      expect(plan.name[locale]).not.toBe(plan.name.en);
      const expected = new Intl.NumberFormat(
        { es: "es-PY", fr: "fr-FR", de: "de-DE", he: "he-IL", ru: "ru-RU" }[
          language
        ],
        {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      ).format(2850);
      expect(formatPrice(plan.price, locale)).toBe(expected);
      expect(formatSlot("2026-09-25T15:00:00Z", "UTC", locale)).not.toBe(
        formatSlot("2026-09-25T15:00:00Z", "UTC", "en"),
      );
      const preview = createMockMessagingGateway().preview(
        request(locale).context,
      );
      expect(preview.sent).toBe(false);
      expect(preview.message).toContain(plan.name[locale]);
      expect(preview.message).not.toContain("I would like");
      expect(preview.notice).not.toBe("Sending is disabled in this preview.");
    },
  );
});
