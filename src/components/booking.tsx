"use client";
import { translate } from "../lib/i18n/common";
import { localeDirections } from "../config/locales";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  ContactDraft,
  Locale,
  MockOutcome,
  SubmissionPayload,
  SubmissionStatus,
} from "../domain/types";
import { getPackage, getService } from "../content/catalog";
import { formatPrice, priceBasisLabel } from "../domain/pricing";
import { journeyHref } from "../domain/selection";
import {
  CONTACT_LIMITS,
  createSubmissionController,
} from "../application/submission";
import {
  DEMO_CALENDAR,
  createMockBookingGateway,
  createMockLeadGateway,
  generateDemoSlots,
  detectTimeZone,
  formatSlot,
} from "../infrastructure/mock/gateways";
import { text, ui } from "../content/ui";
import {
  JourneyLink,
  useJourney,
  useLeadContext,
  useSelection,
} from "./journey-provider";
import { PageIntro, Section } from "./primitives";

function SelectionSummary({ locale }: { locale: Locale }) {
  const selection = useSelection();
  const { finderResult } = useLeadContext(locale);
  const { answers } = useJourney();
  const item = getPackage(selection.packageId);
  const service = getService(selection.serviceId);
  return (
    <aside
      id="context"
      tabIndex={-1}
      className="selection-summary"
      data-testid="selected-package"
    >
      <p className="eyebrow">{text(locale, "Your starting point")}</p>
      <h2>
        {item?.name[locale] ??
          service?.name[locale] ??
          text(locale, "Let’s discuss your options")}
      </h2>
      {finderResult && (
        <p className="small" data-testid="finder-origin">
          {ui[locale].finderOrigin}
        </p>
      )}
      {selection.invalid && (
        <p className="notice">
          {text(
            locale,
            "That plan link was not recognized. Choose a package or ask a general question below.",
          )}
        </p>
      )}
      {item && (
        <>
          <p>{service?.name[locale]}</p>
          <p className="price small-price">
            <bdi dir={localeDirections[locale]}>
              {(
                answers.household
                  ? answers.household !== "individual"
                  : selection.campaign === "family-relocation"
              )
                ? ui[locale].family
                : formatPrice(item.price, locale)}
            </bdi>
          </p>
          <p className="small">{priceBasisLabel(item.price, locale)}</p>
          <p className="price-notice">{ui[locale].provisional}</p>
          <ul className="check-list">
            {item.features[locale].map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </>
      )}
      <JourneyLink locale={locale} route="pricing">
        {text(locale, "Edit your selection")}
      </JourneyLink>
      <hr />
      <p className="small">
        {text(
          locale,
          "This preview uses test details only. No appointment, payment or message is sent.",
        )}
      </p>
    </aside>
  );
}

export function Booking({ locale }: { locale: Locale }) {
  const router = useRouter();
  const journey = useJourney();
  const context = useLeadContext(locale);
  const {
    bookingMode: mode,
    setBookingMode: setMode,
    bookingTimeZone,
    setBookingTimeZone: setTimeZone,
    bookingSlotUtc: slotUtc,
    setBookingSlotUtc: setSlotUtc,
  } = journey;
  const timeZone = bookingTimeZone ?? "UTC";
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<MockOutcome>("success");
  const outcomeRef = useRef(outcome);
  outcomeRef.current = outcome;
  const started = useRef(false);
  const summary = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [controller] = useState(() =>
    createSubmissionController({
      leadGateway: {
        submit: (payload, key) =>
          createMockLeadGateway({ outcome: outcomeRef.current }).submit(
            payload,
            key,
          ),
      },
      bookingGateway: {
        book: (payload, key) =>
          createMockBookingGateway({ outcome: outcomeRef.current }).book(
            payload,
            key,
          ),
      },
      analytics: journey.analytics,
    }),
  );
  useEffect(() => {
    setTimeZone((current) => current ?? detectTimeZone());
    setSlots(generateDemoSlots(() => new Date()));
  }, [setTimeZone]);
  const channel = mode === "appointment" ? "email" : journey.draft.channel;
  function updateDraft(change: Partial<ContactDraft>) {
    if (!started.current) {
      journey.analytics.emit({
        eventId: "inquiry_started",
        routeKey: "book",
        locale,
        planId: context.packageId,
        serviceId: context.serviceId,
        is_demo: true,
      });
      started.current = true;
    }
    journey.setDraft({ ...journey.draft, ...change });
  }
  const errorText = (field: string) =>
    text(
      locale,
      (
        {
          firstName: "Enter your first name.",
          email: "Enter a valid email address.",
          phone: "Enter a phone number with a + country code.",
          notes: "Keep your notes within 1,000 characters.",
          slotUtc: "Choose a future demo time.",
          timeZone: "Choose a valid time zone.",
          context: "Choose a valid service or package.",
        } as Record<string, string>
      )[field] ?? "Check this field.",
    );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    setErrors({});
    setStatus("pending");
    const { firstName, notes, marketingConsent, email, phone } = journey.draft;
    const payload: SubmissionPayload = {
      mode,
      context,
      contact: {
        firstName,
        channel,
        notes,
        marketingConsent,
        ...(channel === "email" ? { email } : { phone }),
      },
      ...(mode === "appointment" ? { slotUtc, timeZone } : {}),
    };
    const result = await controller.submit(payload);
    setStatus(result.status);
    if (result.status === "success") {
      journey.setReceipt(result.receipt);
      journey.setSelection(context);
      router.push(journeyHref(locale, "thank-you", context));
    } else {
      if (result.status === "invalid")
        setErrors(
          Object.fromEntries(
            Object.entries(result.errors).map(([key, value]) => [
              key.replace(/^contact\./, ""),
              value,
            ]),
          ),
        );
      requestAnimationFrame(() => summary.current?.focus());
    }
  }
  const fieldError = (field: string) =>
    errors[field] ? (
      <p className="field-error" id={`${field}-error`}>
        {errorText(field)}
      </p>
    ) : null;
  return (
    <>
      <PageIntro
        title={text(locale, "Your next step starts with a conversation.")}
        eyebrow={text(locale, "Demo inquiry")}
      >
        <p>
          {text(
            locale,
            "Share a little about your plans. Use test details while exploring this preview.",
          )}
        </p>
      </PageIntro>
      <Section className="booking-section">
        <div className="booking-grid">
          <SelectionSummary locale={locale} />
          <form onSubmit={submit} noValidate className="inquiry-form">
            <fieldset className="mode-selector">
              <legend>{text(locale, "How would you like to start?")}</legend>
              {(["conversation", "appointment"] as const).map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="mode"
                    value={value}
                    checked={mode === value}
                    onChange={() => {
                      setMode(value);
                      setStatus("idle");
                      setErrors({});
                    }}
                  />
                  <span>
                    {value === "conversation"
                      ? text(locale, "Request a conversation")
                      : text(locale, "Choose a demo time")}
                  </span>
                </label>
              ))}
            </fieldset>
            {mode === "appointment" && (
              <fieldset id="slotUtc" tabIndex={-1} className="scheduler">
                <legend>
                  {translate(
                    locale,
                    "Choose a demo conversation of {minutes} minutes",
                    { minutes: DEMO_CALENDAR.consultationMinutes },
                  )}
                </legend>
                <label htmlFor="timeZone">
                  {text(locale, "Your time zone")}
                </label>
                <select
                  id="timeZone"
                  dir="ltr"
                  value={timeZone}
                  onChange={(event) => setTimeZone(event.target.value)}
                >
                  {Array.from(
                    new Set([
                      timeZone,
                      "UTC",
                      "America/Asuncion",
                      "America/New_York",
                      "Europe/London",
                      "Europe/Madrid",
                      "Asia/Jerusalem",
                    ]),
                  ).map((zone) => (
                    <option key={zone}>{zone}</option>
                  ))}
                </select>
                <p className="small">
                  {text(locale, "All times shown in")}{" "}
                  <strong>
                    <bdi dir="ltr">{timeZone}</bdi>
                  </strong>
                  . {text(locale, "Demo availability only.")}
                </p>
                <div className="slot-grid">
                  {slots.map((slot) => (
                    <label key={slot}>
                      <input
                        type="radio"
                        name="slotUtc"
                        value={slot}
                        checked={slotUtc === slot}
                        onChange={() => setSlotUtc(slot)}
                      />
                      <span>
                        <bdi dir={localeDirections[locale]}>
                          {formatSlot(slot, timeZone, locale)}
                        </bdi>
                      </span>
                    </label>
                  ))}
                </div>
                {fieldError("slotUtc")}
              </fieldset>
            )}
            {(status === "invalid" ||
              status === "failure" ||
              status === "unavailable") && (
              <div
                ref={summary}
                className="error-summary"
                role="alert"
                tabIndex={-1}
              >
                <h2>
                  {status === "invalid"
                    ? text(locale, "Please check the form")
                    : status === "unavailable"
                      ? text(locale, "That demo time is unavailable")
                      : text(locale, "The demo request could not be completed")}
                </h2>
                {status === "invalid" ? (
                  <ul>
                    {Object.keys(errors).map((field) => (
                      <li key={field}>
                        <a href={`#${field}`}>{errorText(field)}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    {text(
                      locale,
                      "Your details are still here. Change the demo outcome to success and retry, choose another time, or request a conversation.",
                    )}
                  </p>
                )}
              </div>
            )}
            <div className="form-field">
              <label htmlFor="firstName">{text(locale, "First name")}</label>
              <input
                id="firstName"
                dir="auto"
                autoComplete="given-name"
                value={journey.draft.firstName}
                onChange={(event) =>
                  updateDraft({ firstName: event.target.value })
                }
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                required
              />
              {fieldError("firstName")}
            </div>
            {mode === "conversation" && (
              <div className="form-field">
                <label htmlFor="channel">
                  {text(locale, "Preferred contact channel")}
                </label>
                <select
                  id="channel"
                  value={channel}
                  onChange={(event) =>
                    updateDraft({
                      channel: event.target.value as ContactDraft["channel"],
                    })
                  }
                >
                  <option value="email">{text(locale, "Email")}</option>
                  <option value="whatsapp" dir="ltr">
                    WhatsApp
                  </option>
                </select>
              </div>
            )}
            {channel === "email" ? (
              <div className="form-field">
                <label htmlFor="email">{text(locale, "Email")}</label>
                <input
                  id="email"
                  dir="ltr"
                  type="email"
                  autoComplete="email"
                  value={journey.draft.email ?? ""}
                  onChange={(event) =>
                    updateDraft({ email: event.target.value })
                  }
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {fieldError("email")}
              </div>
            ) : (
              <div className="form-field">
                <label htmlFor="phone">
                  {text(locale, "Phone number with country code")}
                </label>
                <input
                  id="phone"
                  dir="ltr"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+595 …"
                  value={journey.draft.phone ?? ""}
                  onChange={(event) =>
                    updateDraft({ phone: event.target.value })
                  }
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  required
                />
                {fieldError("phone")}
              </div>
            )}
            <div className="form-field">
              <label htmlFor="notes">
                {text(locale, "Anything you would like to discuss? (optional)")}
              </label>
              <textarea
                id="notes"
                dir="auto"
                rows={4}
                maxLength={CONTACT_LIMITS.notes}
                value={journey.draft.notes ?? ""}
                onChange={(event) => updateDraft({ notes: event.target.value })}
                aria-describedby="notes-help"
              />
              <p id="notes-help" className="small muted">
                {text(
                  locale,
                  "Up to 1,000 characters. Do not include passport numbers or sensitive documents.",
                )}
              </p>
              {fieldError("notes")}
            </div>
            <p className="privacy-note">
              {text(
                locale,
                "Test details remain in this browser’s memory and disappear on refresh. No request is sent to a provider.",
              )}{" "}
              <Link href={`/${locale}/privacy`}>
                {text(locale, "Read the privacy draft")}
              </Link>
              .
            </p>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={journey.draft.marketingConsent}
                onChange={(event) =>
                  updateDraft({ marketingConsent: event.target.checked })
                }
              />
              <span>
                {text(
                  locale,
                  "I would also like occasional updates (optional; no subscription is created in demo mode).",
                )}
              </span>
            </label>
            <details className="demo-controls">
              <summary>{text(locale, "Preview testing options")}</summary>
              <label htmlFor="demo-outcome">
                {text(locale, "Simulated response")}
              </label>
              <select
                id="demo-outcome"
                data-testid="demo-outcome"
                value={outcome}
                onChange={(event) =>
                  setOutcome(event.target.value as MockOutcome)
                }
              >
                <option value="success">{text(locale, "Success")}</option>
                <option value="failure">{text(locale, "Failure")}</option>
                <option value="unavailable">
                  {text(locale, "Unavailable time")}
                </option>
              </select>
            </details>
            <button
              data-testid="submit-request"
              className="button"
              disabled={status === "pending"}
              type="submit"
            >
              {status === "pending"
                ? text(locale, "Simulating your request…")
                : status === "failure" || status === "unavailable"
                  ? text(locale, "Retry demo request")
                  : text(locale, "Complete demo request")}
            </button>
            <p aria-live="polite" className="small">
              {status === "pending"
                ? text(locale, "Please wait. Nothing is being sent externally.")
                : text(
                    locale,
                    "No appointment will be booked and no message will be sent.",
                  )}
            </p>
          </form>
        </div>
      </Section>
    </>
  );
}

export function ThankYou({ locale }: { locale: Locale }) {
  const { receipt } = useJourney();
  if (!receipt)
    return (
      <Section>
        <div className="receipt-panel">
          <p className="eyebrow">{text(locale, "No active demo receipt")}</p>
          <h1>{text(locale, "Let’s find your next step.")}</h1>
          <p>
            {text(
              locale,
              "There is no completed request in this browser session. Refreshing clears demo receipts. No booking or message is implied.",
            )}
          </p>
          <JourneyLink locale={locale} route="book" className="button">
            {text(locale, "Start a demo inquiry")}
          </JourneyLink>
        </div>
      </Section>
    );
  const item = getPackage(receipt.context.packageId);
  const service = getService(receipt.context.serviceId);
  return (
    <Section>
      <div className="receipt-panel">
        <span className="success-icon" aria-hidden="true">
          ✓
        </span>
        <h1>{text(locale, "Demo request complete.")}</h1>
        <p className="lead">
          {text(
            locale,
            "No appointment has been booked and no message has been sent.",
          )}
        </p>
        <div data-testid="selected-package" className="receipt-summary">
          <p className="eyebrow">
            {text(locale, "Your selected starting point")}
          </p>
          <h2>
            {item?.name[locale] ??
              service?.name[locale] ??
              text(locale, "General conversation")}
          </h2>
          {receipt.context.finderResult && (
            <p className="small" data-testid="finder-origin">
              {ui[locale].finderOrigin}
            </p>
          )}
          {item && receipt.price && (
            <>
              <p className="price">
                <bdi dir={localeDirections[locale]}>
                  {receipt.context.familyQuote
                    ? ui[locale].family
                    : formatPrice(receipt.price, locale)}
                </bdi>
              </p>
              <p>{ui[locale].provisional}</p>
            </>
          )}
          {receipt.slotUtc && (
            <p>
              <strong>{text(locale, "Simulated appointment")}: </strong>
              <bdi dir={localeDirections[locale]}>
                {formatSlot(receipt.slotUtc, receipt.timeZone ?? "UTC", locale)}
              </bdi>{" "}
              · <bdi dir="ltr">{receipt.timeZone}</bdi>
            </p>
          )}
        </div>
        <p>
          {text(
            locale,
            "In a live service, the next conversation would clarify your situation, the written scope and any outstanding professional review. This prototype stops here.",
          )}
        </p>
        <div className="button-row">
          <JourneyLink
            locale={locale}
            route="pricing"
            className="button button-outline"
          >
            {text(locale, "Review your options")}
          </JourneyLink>
          <JourneyLink locale={locale} route="">
            {text(locale, "Back to the homepage")}
          </JourneyLink>
        </div>
      </div>
    </Section>
  );
}
