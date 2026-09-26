import { describe, expect, it } from "vitest";
import {
  createSubmissionController,
  validateSubmission,
} from "../../src/application/submission";
import {
  createMockLeadGateway,
  createMockBookingGateway,
  createMockMessagingGateway,
  generateDemoSlots,
  formatSlot,
} from "../../src/infrastructure/mock/gateways";
import {
  createMemoryAnalytics,
  sanitizeEvent,
} from "../../src/lib/analytics/events";
import type { SubmissionPayload } from "../../src/domain/types";

const now = new Date("2026-09-24T12:00:00Z");
const clock = () => new Date(now);
const payload: SubmissionPayload = {
  mode: "conversation",
  context: {
    locale: "en",
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
};

describe("minimal contact validation", () => {
  it("accepts only the requested contact channel", () => {
    expect(validateSubmission(payload).success).toBe(true);
    expect(
      validateSubmission({
        ...payload,
        contact: {
          firstName: "Test",
          channel: "whatsapp",
          phone: "+595 981 123456",
          marketingConsent: false,
        },
      }).success,
    ).toBe(true);
    expect(
      validateSubmission({
        ...payload,
        contact: { ...payload.contact, email: "" },
      }).success,
    ).toBe(false);
    expect(
      validateSubmission({
        ...payload,
        contact: {
          ...payload.contact,
          channel: "whatsapp",
          phone: "981123456",
        },
      }).success,
    ).toBe(false);
  });
  it.each([
    "+1------",
    "+595 ()----",
    "+123456",
    "+1234567890123456",
    "+0 981 123456",
    "+595abc981123456",
  ])(
    "rejects a WhatsApp number without meaningful international digits: %s",
    (phone) => {
      const result = validateSubmission({
        ...payload,
        contact: {
          firstName: "Test",
          channel: "whatsapp",
          phone,
          marketingConsent: false,
        },
      });
      expect(result.success).toBe(false);
      expect(result.errors["contact.phone"]).toBe(
        "phone-country-code-required",
      );
    },
  );
  it.each([
    "+595 981 123456",
    "+1 (202) 555-0123",
    "+44 20 7946 0958",
    "+123456789012345",
  ])("accepts digits with permitted international formatting: %s", (phone) => {
    expect(
      validateSubmission({
        ...payload,
        contact: {
          firstName: "Test",
          channel: "whatsapp",
          phone,
          marketingConsent: false,
        },
      }).success,
    ).toBe(true);
  });
  it("requires email for appointments and bounds notes", () => {
    expect(
      validateSubmission({
        ...payload,
        mode: "appointment",
        slotUtc: "2026-09-25T12:00:00Z",
        contact: {
          ...payload.contact,
          channel: "whatsapp",
          email: undefined,
          phone: "+595981123456",
        },
      }).success,
    ).toBe(false);
    expect(
      validateSubmission({
        ...payload,
        contact: { ...payload.contact, notes: "a".repeat(1001) },
      }).success,
    ).toBe(false);
  });
  it("never requires phone and email together for an appointment", () => {
    expect(
      validateSubmission({
        ...payload,
        mode: "appointment",
        slotUtc: "2026-09-25T13:00:00Z",
        contact: { ...payload.contact, channel: "whatsapp", phone: undefined },
      }).success,
    ).toBe(true);
  });
  it("rejects forged context and a malformed instant at the boundary", () => {
    expect(
      validateSubmission({
        ...payload,
        context: { ...payload.context, packageId: "attacker" },
      }).success,
    ).toBe(false);
    expect(
      validateSubmission({
        ...payload,
        mode: "appointment",
        slotUtc: "not-a-date",
      }).success,
    ).toBe(false);
  });
});

describe("submission state transitions and idempotency", () => {
  it("accepts one receipt and event for concurrent identical submissions", async () => {
    const analytics = createMemoryAnalytics(clock);
    const controller = createSubmissionController({
      leadGateway: createMockLeadGateway(),
      bookingGateway: createMockBookingGateway({ clock }),
      analytics,
      clock,
    });
    const [first, second] = await Promise.all([
      controller.submit(payload),
      controller.submit(payload),
    ]);
    expect(first.status).toBe("success");
    expect(second).toEqual(first);
    expect(
      analytics.events.filter((event) => event.eventId === "lead_submitted"),
    ).toHaveLength(1);
    expect(controller.readReceipt()?.context.packageId).toBe(
      "temporary-guided",
    );
    expect(controller.readReceipt()?.price).toMatchObject({
      amountMinor: 285000,
    });
  });
  it("retains a key for a failed attempt retry and changes it with a changed payload", async () => {
    const keys: string[] = [];
    let calls = 0;
    const controller = createSubmissionController({
      leadGateway: {
        async submit(_payload, key) {
          keys.push(key);
          calls++;
          return calls === 1
            ? { status: "failure", category: "simulated-failure" }
            : { status: "success", id: "demo-lead" };
        },
      },
      bookingGateway: createMockBookingGateway({ clock }),
      clock,
    });
    expect((await controller.submit(payload)).status).toBe("failure");
    expect(controller.readReceipt()).toBeUndefined();
    expect((await controller.submit(payload)).status).toBe("success");
    expect(
      (
        await controller.submit({
          ...payload,
          contact: { ...payload.contact, notes: "Changed" },
        })
      ).status,
    ).toBe("success");
    expect(keys[0]).toBe(keys[1]);
    expect(keys[2]).not.toBe(keys[1]);
  });
  it("reports unavailable time honestly without a receipt or success event", async () => {
    const analytics = createMemoryAnalytics(clock);
    const controller = createSubmissionController({
      leadGateway: createMockLeadGateway(),
      bookingGateway: createMockBookingGateway({
        clock,
        outcome: "unavailable",
      }),
      analytics,
      clock,
    });
    expect(
      (
        await controller.submit({
          ...payload,
          mode: "appointment",
          slotUtc: generateDemoSlots(clock)[0],
        })
      ).status,
    ).toBe("unavailable");
    expect(controller.readReceipt()).toBeUndefined();
    expect(analytics.events.map((event) => event.eventId)).toEqual([
      "submission_failed",
    ]);
  });
  it("starts empty and reading or clearing a receipt does not emit conversions", async () => {
    const analytics = createMemoryAnalytics(clock);
    const controller = createSubmissionController({
      leadGateway: createMockLeadGateway(),
      bookingGateway: createMockBookingGateway({ clock }),
      analytics,
      clock,
    });
    expect(controller.readReceipt()).toBeUndefined();
    await controller.submit(payload);
    controller.readReceipt();
    controller.readReceipt();
    controller.clearReceipt();
    expect(controller.readReceipt()).toBeUndefined();
    expect(analytics.events).toHaveLength(1);
  });
  it("restores the correct accepted receipt when revisiting an earlier payload", async () => {
    const controller = createSubmissionController({
      leadGateway: createMockLeadGateway(),
      bookingGateway: createMockBookingGateway({ clock }),
      clock,
    });
    const first = await controller.submit(payload);
    await controller.submit({
      ...payload,
      context: { ...payload.context, packageId: "temporary-essential" },
    });
    expect(await controller.submit(payload)).toEqual(first);
    expect(controller.readReceipt()?.context.packageId).toBe(
      "temporary-guided",
    );
    expect(controller.getState()).toBe("success");
  });
  it("exposes pending while the adapter is running and never accepts a second changed payload simultaneously", async () => {
    let complete!: () => void;
    const pending = new Promise<void>((resolve) => {
      complete = resolve;
    });
    const controller = createSubmissionController({
      leadGateway: {
        async submit() {
          await pending;
          return { status: "success", id: "demo-pending" };
        },
      },
      bookingGateway: createMockBookingGateway({ clock }),
      clock,
    });
    const first = controller.submit(payload);
    expect(controller.getState()).toBe("pending");
    expect(controller.readReceipt()).toBeUndefined();
    expect(
      (
        await controller.submit({
          ...payload,
          contact: { ...payload.contact, email: "" },
        })
      ).status,
    ).toBe("invalid");
    expect(controller.getState()).toBe("pending");
    expect(
      (
        await controller.submit({
          ...payload,
          contact: { ...payload.contact, notes: "Another draft" },
        })
      ).status,
    ).toBe("failure");
    complete();
    expect((await first).status).toBe("success");
    expect(controller.getState()).toBe("success");
  });
  it("records exactly one accepted lead and booking event for a simulated appointment", async () => {
    const analytics = createMemoryAnalytics(clock);
    const controller = createSubmissionController({
      leadGateway: createMockLeadGateway(),
      bookingGateway: createMockBookingGateway({ clock }),
      analytics,
      clock,
    });
    const request = {
      ...payload,
      mode: "appointment" as const,
      slotUtc: generateDemoSlots(clock)[0],
      timeZone: "America/Asuncion",
    };
    await controller.submit(request);
    await controller.submit(request);
    expect(analytics.events.map((event) => event.eventId)).toEqual([
      "lead_submitted",
      "booking_confirmed",
    ]);
    expect(analytics.events.every((event) => event.is_demo)).toBe(true);
    expect(controller.readReceipt()).not.toHaveProperty("contact");
    expect(controller.readReceipt()?.slotUtc).toBe(request.slotUtc);
  });
  it("converts thrown provider errors into a sanitized failure", async () => {
    const controller = createSubmissionController({
      leadGateway: {
        async submit() {
          throw new Error("private@example.test");
        },
      },
      bookingGateway: createMockBookingGateway({ clock }),
      clock,
    });
    expect(await controller.submit(payload)).toMatchObject({
      status: "failure",
      category: "adapter-error",
    });
  });
});

describe("mock time and messaging", () => {
  it("offers future UTC slots based on injected time and displays the same instant in chosen zones", () => {
    const slots = generateDemoSlots(clock);
    expect(slots.length).toBeGreaterThan(0);
    expect(
      slots.every((slot) => new Date(slot) > now && slot.endsWith("Z")),
    ).toBe(true);
    const instant = "2026-09-25T15:00:00Z";
    expect(formatSlot(instant, "UTC", "en")).toContain("15:00");
    expect(formatSlot(instant, "America/Asuncion", "en")).toContain("12:00");
  });
  it("refuses stale appointment slots", async () => {
    const controller = createSubmissionController({
      leadGateway: createMockLeadGateway(),
      bookingGateway: createMockBookingGateway({ clock }),
      clock,
    });
    expect(
      (
        await controller.submit({
          ...payload,
          mode: "appointment",
          slotUtc: "2026-09-23T15:00:00Z",
        })
      ).status,
    ).toBe("unavailable");
  });
  it("returns a local unsent preview with selected plan", () => {
    const preview = createMockMessagingGateway().preview(payload.context);
    expect(preview.sent).toBe(false);
    expect(preview.message).toContain("Guided");
    expect(preview.notice).toBe("Sending is disabled in this preview.");
  });
});

describe("strict event redaction", () => {
  it("drops contact data, free text, raw URLs and arbitrary IDs", () => {
    expect(
      sanitizeEvent(
        {
          eventId: "package_selected",
          routeKey: "pricing",
          locale: "en",
          planId: "temporary-guided",
          is_demo: true,
          email: "secret@example.test",
          notes: "secret",
          url: "https://x?secret=1",
          campaign: "private@example.test",
        },
        clock,
      ),
    ).toEqual({
      eventId: "package_selected",
      timestamp: now.toISOString(),
      routeKey: "pricing",
      locale: "en",
      planId: "temporary-guided",
      is_demo: true,
    });
    expect(
      sanitizeEvent({ eventId: "fake", is_demo: true }, clock),
    ).toBeUndefined();
  });
});
