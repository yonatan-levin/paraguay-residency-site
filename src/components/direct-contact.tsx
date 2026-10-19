"use client";

import type { ReactNode } from "react";
import type { Locale } from "../domain/types";
import { contactLinks } from "../domain/contact-links";
import { text } from "../content/ui";
import { useJourney, useLeadContext } from "./journey-provider";

type ContactLinkProps = {
  locale: Locale;
  className?: string;
  children?: ReactNode;
};

export function WhatsAppLink({
  locale,
  className = "button button-outline",
  children,
}: ContactLinkProps) {
  const context = useLeadContext(locale);
  const { analytics } = useJourney();
  return (
    <a
      href={contactLinks(context).whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${text(locale, "WhatsApp")}: ${text(locale, "Talk to Yonatan")}. ${text(locale, "Opens in a new tab")}`}
      onClick={() => {
        analytics.emit({
          eventId: "whatsapp_clicked",
          routeKey: context.entryPageKey,
          locale,
          serviceId: context.serviceId,
          planId: context.packageId,
          is_demo: true,
        });
      }}
    >
      {children ?? text(locale, "WhatsApp")}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export function CalendlyLink({
  locale,
  className = "button button-outline",
  children,
}: ContactLinkProps) {
  const context = useLeadContext(locale);
  return (
    <a
      href={contactLinks(context).calendly}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${text(locale, "Book a 30 minute call")}. ${text(locale, "Opens in a new tab")}`}
    >
      {children ?? text(locale, "Book a 30 minute call")}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export function DirectContactLinks({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={`direct-contact-links ${className}`.trim()}>
      <div className="button-row contact-actions">
        <WhatsAppLink locale={locale} />
        <CalendlyLink locale={locale} />
      </div>
      <p className="small direct-contact-note">
        {text(
          locale,
          "External contact links are live. Website forms remain simulated.",
        )}
      </p>
    </div>
  );
}
