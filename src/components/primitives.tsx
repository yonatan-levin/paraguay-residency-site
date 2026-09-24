import { translate } from "../lib/i18n/common";
import type { ReactNode } from "react";
import type { Campaign, Locale, Package } from "../domain/types";
import { formatPrice, priceBasisLabel } from "../domain/pricing";
import { localeDirections } from "../config/locales";
import { text, ui } from "../content/ui";
import { JourneyLink } from "./journey-provider";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}
export function PageIntro({
  title,
  children,
  eyebrow,
}: {
  title: string;
  children?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="page-intro container">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <div className="lead">{children}</div>}
    </div>
  );
}
export function FAQAccordion({
  items,
  locale,
}: {
  items: { question: string; answer: string }[];
  locale: Locale;
}) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
      <p className="small muted">
        {text(
          locale,
          "Information is provisional and must be checked for your circumstances.",
        )}
      </p>
    </div>
  );
}
export function PackageCard({
  item,
  locale,
  compact = false,
  campaign,
}: {
  item: Package;
  locale: Locale;
  compact?: boolean;
  campaign?: Campaign;
}) {
  const guided = item.id === "temporary-guided";
  return (
    <article
      className={`package-card ${guided ? "package-guided" : ""}`}
      data-testid={`package-${item.id}`}
    >
      {guided && (
        <p className="plan-badge">{text(locale, "More personal support")}</p>
      )}
      <h3>{item.name[locale]}</h3>
      <p className="package-fit">
        {text(
          locale,
          item.tier === "essential"
            ? "For independent planners who want a clear starting point."
            : item.tier === "guided"
              ? "For people who value help connecting each step."
              : item.tier === "concierge"
                ? "For people seeking closer logistical coordination."
                : "Discuss a scope that fits your circumstances.",
        )}
      </p>
      <div className="price">
        <bdi dir={localeDirections[locale]}>
          {formatPrice(item.price, locale)}
        </bdi>
      </div>
      <p className="small">{priceBasisLabel(item.price, locale)}</p>
      <p className="price-notice">{ui[locale].provisional}</p>
      <ul className="check-list">
        {item.features[locale].map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {!compact && (
        <div className="package-boundaries">
          <p>
            <strong>{text(locale, "Your involvement")}: </strong>
            {text(
              locale,
              "Provide accurate documents and attend required steps.",
            )}
          </p>
          <p>
            <strong>{text(locale, "Scope & exclusions")}: </strong>
            {item.dependencies[locale].join(" ")}
          </p>
        </div>
      )}
      <JourneyLink
        locale={locale}
        route="book"
        selection={{
          packageId: item.id,
          serviceId: item.serviceId,
          ...(campaign ? { campaign } : {}),
        }}
        className={guided ? "button" : "button button-outline"}
        cta="package-inquiry"
      >
        {ui[locale].discuss}
      </JourneyLink>
    </article>
  );
}
export function ProcessSteps({ locale }: { locale: Locale }) {
  const steps = [
    [
      "Start with a conversation",
      "Clarify your goal, current position and questions. No eligibility promise.",
    ],
    [
      "Prepare with a clear plan",
      "Organize documents and confirm requirements before making commitments.",
    ],
    [
      "Complete required local steps",
      "Coordinate the agreed assistance around steps that need your presence.",
    ],
    [
      "Stay informed along the way",
      "Agree communication and aftercare while authorities handle their decisions.",
    ],
  ];
  return (
    <ol className="process-grid">
      {steps.map(([title, description], index) => (
        <li key={translate(locale, title)}>
          <span className="step-number" aria-hidden="true">
            0{index + 1}
          </span>
          <h3>{translate(locale, title)}</h3>
          <p>{translate(locale, description)}</p>
        </li>
      ))}
    </ol>
  );
}
export function FinalAction({ locale }: { locale: Locale }) {
  return (
    <Section className="final-action">
      <div>
        <p className="eyebrow">{text(locale, "A useful first conversation")}</p>
        <h2>{text(locale, "Start with your questions.")}</h2>
        <p>
          {text(
            locale,
            "Talk through your plans, what needs confirming, and the support that would make your next step clearer.",
          )}
        </p>
      </div>
      <JourneyLink
        locale={locale}
        route="find-my-plan"
        className="button button-light"
        cta="find-plan"
      >
        {ui[locale].plan}
      </JourneyLink>
    </Section>
  );
}
