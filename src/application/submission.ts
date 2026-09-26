import { supportedLocales } from "../config/locales";
import type { AnalyticsAdapter } from "../lib/analytics/events";
import type {
  BookingGateway,
  Clock,
  LeadGateway,
  Receipt,
  SubmissionPayload,
  SubmissionResult,
  SubmissionStatus,
} from "../domain/types";
import { z } from "zod";
import { getPackage, getService } from "../content/catalog";

export const CONTACT_LIMITS = {
  firstName: 80,
  email: 254,
  phone: 32,
  notes: 1000,
} as const;
// Seven digits is a prototype plausibility floor, not a country-specific validity rule.
// The fifteen-digit ceiling follows ITU-T E.164, including the country code.
export const PHONE_DIGIT_LIMITS = { min: 7, max: 15 } as const;
function hasInternationalPhoneDigits(phone: string): boolean {
  const normalized = phone.replace(/[ ()-]/g, "");
  const digitCount = normalized.length - 1;
  return (
    /^\+[1-9]\d*$/.test(normalized) &&
    digitCount >= PHONE_DIGIT_LIMITS.min &&
    digitCount <= PHONE_DIGIT_LIMITS.max
  );
}
const textOptional = (max: number) => z.string().trim().max(max).optional();
const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "first-name-required")
    .max(CONTACT_LIMITS.firstName, "first-name-too-long"),
  channel: z.enum(["email", "whatsapp"]),
  email: textOptional(CONTACT_LIMITS.email),
  phone: textOptional(CONTACT_LIMITS.phone),
  notes: textOptional(CONTACT_LIMITS.notes),
  marketingConsent: z.boolean(),
});
const contextSchema = z.object({
  serviceId: z.string().optional(),
  packageId: z.string().optional(),
  entryPageKey: z.string().max(80),
  campaign: z.enum(["residency-cost", "family-relocation"]).optional(),
  locale: z.enum(supportedLocales),
  familyQuote: z.boolean().optional(),
  finderResult: z
    .object({
      serviceId: z.string(),
      packageId: z.string().optional(),
      familyQuote: z.boolean(),
      reasons: z.array(z.string()),
      unconfirmed: z.array(z.string()),
    })
    .optional(),
  attribution: z
    .object({
      source: z.string(),
      medium: z.string(),
      campaign: z.string(),
      content: z.string(),
      referrer: z.string().optional(),
    })
    .optional(),
});
export const submissionSchema = z
  .object({
    mode: z.enum(["conversation", "appointment"]),
    context: contextSchema,
    contact: contactSchema,
    slotUtc: z.string().datetime().optional(),
    timeZone: z.string().optional(),
  })
  .superRefine((payload, ctx) => {
    const { contact, context } = payload;
    const emailRequired =
      payload.mode === "appointment" || contact.channel === "email";
    if (emailRequired && !z.email().safeParse(contact.email).success)
      ctx.addIssue({
        code: "custom",
        message: "email-required",
        path: ["contact", "email"],
      });
    if (
      payload.mode === "conversation" &&
      contact.channel === "whatsapp" &&
      !hasInternationalPhoneDigits(contact.phone ?? "")
    )
      ctx.addIssue({
        code: "custom",
        message: "phone-country-code-required",
        path: ["contact", "phone"],
      });
    if (payload.mode === "appointment" && !payload.slotUtc)
      ctx.addIssue({
        code: "custom",
        message: "time-required",
        path: ["slotUtc"],
      });
    const plan = getPackage(context.packageId);
    if (
      (context.packageId && !plan) ||
      (context.serviceId && !getService(context.serviceId)) ||
      (plan && context.serviceId && plan.serviceId !== context.serviceId)
    )
      ctx.addIssue({
        code: "custom",
        message: "selection-invalid",
        path: ["context"],
      });
    if (payload.timeZone) {
      try {
        new Intl.DateTimeFormat("en", { timeZone: payload.timeZone });
      } catch {
        ctx.addIssue({
          code: "custom",
          message: "timezone-invalid",
          path: ["timeZone"],
        });
      }
    }
  });
function validationErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path.join("."), issue.message]),
  );
}
export function validateSubmission(payload: unknown): {
  success: boolean;
  errors: Record<string, string>;
} {
  const parsed = submissionSchema.safeParse(payload);
  return parsed.success
    ? { success: true, errors: {} }
    : { success: false, errors: validationErrors(parsed.error) };
}
export function createSubmissionController({
  leadGateway,
  bookingGateway,
  analytics,
  clock = () => new Date(),
}: {
  leadGateway: LeadGateway;
  bookingGateway: BookingGateway;
  analytics?: AnalyticsAdapter;
  clock?: Clock;
}) {
  let state: SubmissionStatus = "idle";
  let receipt: Receipt | undefined;
  const attempts = new Map<
    string,
    {
      key: string;
      pending?: Promise<SubmissionResult>;
      accepted?: SubmissionResult;
    }
  >();
  async function submit(input: SubmissionPayload): Promise<SubmissionResult> {
    const parsed = submissionSchema.safeParse(input);
    if (!parsed.success) {
      if (state !== "pending") state = "invalid";
      return { status: "invalid", errors: validationErrors(parsed.error) };
    }
    // Canonical schema output includes contact values only inside this in-memory key map.
    // It is never serialized to the URL, storage, analytics, or a provider.
    const payload: SubmissionPayload = parsed.data;
    const fingerprint = JSON.stringify(payload);
    let attempt = attempts.get(fingerprint);
    if (attempt?.pending) return attempt.pending;
    if (state === "pending")
      return { status: "failure", category: "submission-in-progress" };
    if (attempt?.accepted?.status === "success") {
      receipt = attempt.accepted.receipt;
      state = "success";
      return attempt.accepted;
    }
    if (!attempt) {
      attempt = { key: globalThis.crypto.randomUUID() };
      attempts.set(fingerprint, attempt);
    }
    state = "pending";
    receipt = undefined;
    const current = attempt;
    current.pending = (async () => {
      try {
        const result =
          payload.mode === "appointment"
            ? await bookingGateway.book(payload, current.key)
            : await leadGateway.submit(payload, current.key);
        if (result.status !== "success") {
          state = result.status;
          analytics?.emit({
            eventId: "submission_failed",
            routeKey: "book",
            locale: payload.context.locale,
            planId: payload.context.packageId,
            serviceId: payload.context.serviceId,
            outcome: result.category,
            is_demo: true,
          });
          return result;
        }
        const plan = getPackage(payload.context.packageId);
        receipt = {
          id: result.id,
          context: structuredClone(payload.context),
          mode: payload.mode,
          ...(payload.mode === "appointment"
            ? { slotUtc: payload.slotUtc, timeZone: payload.timeZone }
            : {}),
          ...(plan ? { price: structuredClone(plan.price) } : {}),
          createdAt: clock().toISOString(),
          isDemo: true,
        };
        state = "success";
        const eventBase = {
          routeKey: "book",
          locale: payload.context.locale,
          planId: payload.context.packageId,
          serviceId: payload.context.serviceId,
          campaign: payload.context.campaign,
          is_demo: true,
        };
        analytics?.emit({ ...eventBase, eventId: "lead_submitted" });
        if (payload.mode === "appointment")
          analytics?.emit({ ...eventBase, eventId: "booking_confirmed" });
        current.accepted = { status: "success", receipt };
        return current.accepted;
      } catch {
        state = "failure";
        analytics?.emit({
          eventId: "submission_failed",
          routeKey: "book",
          locale: payload.context.locale,
          outcome: "adapter-error",
          is_demo: true,
        });
        return { status: "failure", category: "adapter-error" } as const;
      } finally {
        current.pending = undefined;
      }
    })();
    return current.pending;
  }
  return {
    submit,
    getState: () => state,
    readReceipt: () => receipt,
    clearReceipt() {
      receipt = undefined;
    },
  };
}
