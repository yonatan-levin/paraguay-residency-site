import type {
  BookingGateway,
  Clock,
  LeadGateway,
  Locale,
  MessagingGateway,
  MockOutcome,
} from "../../domain/types";
import { getPackage, getService } from "../../content/catalog";
import { translate } from "../../lib/i18n/common";
import { localeFormats } from "../../config/locales";
export const DEMO_CALENDAR = {
  days: 3,
  hoursUtc: [13, 16],
  consultationMinutes: 20,
  teamTimeZone: "America/Asuncion",
} as const;
export function createMockLeadGateway({
  outcome = "success",
}: { outcome?: MockOutcome } = {}): LeadGateway {
  return {
    async submit(_payload, key) {
      return outcome === "success"
        ? { status: "success", id: `demo-lead-${key}` }
        : { status: "failure", category: "simulated-failure" };
    },
  };
}
export function createMockBookingGateway({
  outcome = "success",
  clock = () => new Date(),
}: { outcome?: MockOutcome; clock?: Clock } = {}): BookingGateway {
  return {
    async book(payload, key) {
      if (
        !payload.slotUtc ||
        new Date(payload.slotUtc) <= clock() ||
        !generateDemoSlots(clock).includes(payload.slotUtc) ||
        outcome === "unavailable"
      )
        return { status: "unavailable", category: "unavailable-time" };
      return outcome === "failure"
        ? { status: "failure", category: "simulated-failure" }
        : { status: "success", id: `demo-booking-${key}` };
    },
  };
}
export function createMockMessagingGateway(): MessagingGateway {
  return {
    preview(context) {
      const locale = context.locale;
      const plan = getPackage(context.packageId);
      const service = getService(context.serviceId);
      const selection =
        plan?.name[locale] ??
        service?.name[locale] ??
        translate(locale, "a consultation");
      return {
        message: translate(
          locale,
          "I would like to discuss {selection}. I understand this is a preview.",
          { selection },
        ),
        notice: translate(locale, "Sending is disabled in this preview."),
        sent: false,
      };
    },
  };
}
export function generateDemoSlots(
  clock: Clock = () => new Date(),
  settings: { days: number; hoursUtc: readonly number[] } = DEMO_CALENDAR,
): string[] {
  const now = clock();
  const slots: string[] = [];
  for (let day = 1; day <= settings.days; day++)
    for (const hour of settings.hoursUtc) {
      const date = new Date(now);
      date.setUTCDate(now.getUTCDate() + day);
      date.setUTCHours(hour, 0, 0, 0);
      if (date > now) slots.push(date.toISOString());
    }
  return slots;
}
export function formatSlot(
  slotUtc: string,
  timeZone: string,
  locale: Locale = "en",
): string {
  return new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : localeFormats[locale],
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone,
      hour12: false,
    },
  ).format(new Date(slotUtc));
}
export function detectTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}
