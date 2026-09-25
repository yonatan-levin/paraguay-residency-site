import { isLocale } from "../../config/locales";
import type { Clock } from "../../domain/types";
import { getPackage, getService } from "../../content/catalog";
import { campaignIds } from "../../domain/selection";
export interface AnalyticsEvent {
  eventId: string;
  timestamp: string;
  routeKey?: string;
  locale?: string;
  serviceId?: string;
  planId?: string;
  campaign?: string;
  ctaId?: string;
  step?: number;
  outcome?: string;
  is_demo: boolean;
}
export interface AnalyticsAdapter {
  emit(input: Record<string, unknown>): void;
}
export const eventIds = [
  "primary_cta_clicked",
  "package_selected",
  "finder_started",
  "finder_completed",
  "inquiry_started",
  "lead_submitted",
  "booking_confirmed",
  "whatsapp_clicked",
  "submission_failed",
] as const;
export const ctaIds = [
  "find-plan",
  "compare-packages",
  "discuss-plan",
  "book-consultation",
  "whatsapp",
  "family-plan",
  "compare-options",
  "submit-inquiry",
  "contact",
  "pricing",
  "finder",
  "hero-primary",
  "hero-secondary",
  "package-inquiry",
  "service-inquiry",
  "guide-inquiry",
  "footer-contact",
  "mobile-primary",
] as const;
const routeIds = [
  "home",
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
const failureCategories = [
  "simulated-failure",
  "unavailable-time",
  "adapter-error",
  "invalid",
  "success",
  "submission-in-progress",
];
const MAX_FINDER_STEPS = 5;
export function sanitizeEvent(
  input: Record<string, unknown>,
  clock: Clock = () => new Date(),
): AnalyticsEvent | undefined {
  if (
    typeof input.eventId !== "string" ||
    !(eventIds as readonly string[]).includes(input.eventId)
  )
    return undefined;
  const event: AnalyticsEvent = {
    eventId: input.eventId,
    timestamp: clock().toISOString(),
    is_demo: true,
  };
  if (typeof input.routeKey === "string" && routeIds.includes(input.routeKey))
    event.routeKey = input.routeKey;
  if (isLocale(input.locale)) event.locale = input.locale;
  if (typeof input.serviceId === "string" && getService(input.serviceId))
    event.serviceId = input.serviceId;
  if (typeof input.planId === "string" && getPackage(input.planId))
    event.planId = input.planId;
  if (
    typeof input.campaign === "string" &&
    (campaignIds as readonly string[]).includes(input.campaign)
  )
    event.campaign = input.campaign;
  if (
    typeof input.ctaId === "string" &&
    (ctaIds as readonly string[]).includes(input.ctaId)
  )
    event.ctaId = input.ctaId;
  if (
    typeof input.step === "number" &&
    Number.isInteger(input.step) &&
    input.step >= 1 &&
    input.step <= MAX_FINDER_STEPS
  )
    event.step = input.step;
  if (
    typeof input.outcome === "string" &&
    failureCategories.includes(input.outcome)
  )
    event.outcome = input.outcome;
  return event;
}
export function createMemoryAnalytics(
  clock: Clock = () => new Date(),
): AnalyticsAdapter & { events: AnalyticsEvent[] } {
  const events: AnalyticsEvent[] = [];
  return {
    events,
    emit(input) {
      const event = sanitizeEvent(input, clock);
      if (event) events.push(event);
    },
  };
}
