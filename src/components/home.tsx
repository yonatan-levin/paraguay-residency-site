import { translate } from "../lib/i18n/common";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../domain/types";
import { packages } from "../content/catalog";
import { text, ui, residencyFaqs } from "../content/ui";
import { JourneyLink } from "./journey-provider";
import { WhatsAppButton } from "./shell";
import {
  FAQAccordion,
  FinalAction,
  PackageCard,
  ProcessSteps,
  Section,
} from "./primitives";

export function Home({ locale }: { locale: Locale }) {
  const goals = [
    [
      "Your first residency",
      "A clear starting point for documents, visits and support.",
      "paraguay-residency",
    ],
    [
      "Moving with your family",
      "Coordinate the move around the people who matter.",
      "lp/family-relocation",
    ],
    [
      "Business & tax questions",
      "Start with the right professional conversation.",
      "services",
    ],
    [
      "Already a resident",
      "Discuss your next stage and what needs checking.",
      "permanent-residency",
    ],
  ];
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            {text(locale, "A new beginning, thoughtfully planned")}
          </p>
          <h1>{text(locale, "Make Paraguay your next chapter.")}</h1>
          <p className="lead">
            {text(
              locale,
              "Residency support, clear packages, and local coordination to help you prepare your documents, plan required visits, and settle in.",
            )}
          </p>
          <div className="button-row">
            <JourneyLink
              locale={locale}
              route="find-my-plan"
              className="button"
              cta="hero-primary"
            >
              {text(locale, "Find my residency plan")}
            </JourneyLink>
            <JourneyLink
              locale={locale}
              route="pricing"
              className="button button-outline"
            >
              {ui[locale].compare}
            </JourneyLink>
          </div>
          <WhatsAppButton locale={locale} />
          <p className="hero-note">
            {text(locale, "Understand your options. Move at your pace.")}
          </p>
        </div>
        <figure className="hero-art">
          <Image
            src={
              locale === "en"
                ? "/hero-editorial.svg"
                : `/hero-editorial-${locale}.svg`
            }
            alt={text(
              locale,
              "Original editorial illustration of a shaded terrace and greenery in Paraguay",
            )}
            width={860}
            height={1000}
            fetchPriority="high"
            loading="eager"
          />
          <figcaption>
            {text(locale, "Editorial illustration · Location imagery pending")}
          </figcaption>
          <div className="art-note">
            <span aria-hidden="true">✳</span>
            <p>{text(locale, "A place for your plans to take root.")}</p>
          </div>
        </figure>
      </section>
      <div className="reassurance container">
        <p>{text(locale, "Clear scope before you commit")}</p>
        <p>{text(locale, "Preparation, step by step")}</p>
        <p>{text(locale, "Support around your needs")}</p>
      </div>
      <Section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text(locale, "Start where you are")}</p>
            <h2>{text(locale, "What brings you to Paraguay?")}</h2>
          </div>
          <p>
            {text(
              locale,
              "Every move has a different starting point. Choose yours.",
            )}
          </p>
        </div>
        <div className="goal-grid">
          {goals.map(([title, body, route], index) => (
            <Link
              key={route}
              href={`/${locale}/${route}`}
              className="goal-card"
            >
              <span className="goal-icon" aria-hidden="true">
                {["⌂", "♧", "▤", "↗"][index]}
              </span>
              <h3>{translate(locale, title)}</h3>
              <p>{translate(locale, body)}</p>
              <span className="round-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <Section className="soft-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {text(locale, "Choose your level of support")}
            </p>
            <h2>{text(locale, "Clear options. A personal fit.")}</h2>
          </div>
          <p>
            {text(
              locale,
              "The same careful preparation, with different levels of coordination. All offers remain provisional.",
            )}
          </p>
        </div>
        <div className="package-grid">
          {packages
            .filter((item) => item.serviceId === "temporary-residency")
            .map((item) => (
              <PackageCard key={item.id} item={item} locale={locale} compact />
            ))}
        </div>
        <div className="center-link">
          <JourneyLink locale={locale} route="pricing">
            {text(locale, "See the full comparison and exclusions")}
          </JourneyLink>
        </div>
      </Section>
      <Section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text(locale, "How it works")}</p>
            <h2>{text(locale, "From questions to a considered plan.")}</h2>
          </div>
        </div>
        <ProcessSteps locale={locale} />
      </Section>
      <Section className="people-section">
        <div className="two-column">
          <div>
            <p className="eyebrow">{text(locale, "Who helps you")}</p>
            <h2>
              {text(locale, "People and responsibilities, clearly defined.")}
            </h2>
            <p>
              {text(
                locale,
                "The right support starts with knowing who does what. Before a real engagement, the operator and any external professionals must be named in your agreed scope.",
              )}
            </p>
          </div>
          <div className="role-list">
            <article>
              <span className="profile-placeholder" aria-hidden="true">
                ○
              </span>
              <div>
                <p className="eyebrow">{text(locale, "Profile placeholder")}</p>
                <h3>{text(locale, "Your coordination contact")}</h3>
                <p>
                  {text(
                    locale,
                    "Document organization, practical questions and agreed logistics. Team member details pending.",
                  )}
                </p>
              </div>
            </article>
            <article>
              <span className="profile-placeholder" aria-hidden="true">
                ◇
              </span>
              <div>
                <p className="eyebrow">
                  {text(locale, "External role placeholder")}
                </p>
                <h3>{text(locale, "Qualified professional review")}</h3>
                <p>
                  {text(
                    locale,
                    "Legal, tax or specialist advice must come from an appropriately qualified provider. No credentials are claimed here.",
                  )}
                </p>
              </div>
            </article>
          </div>
        </div>
      </Section>
      <Section>
        <div className="two-column">
          <div>
            <p className="eyebrow">
              {text(locale, "Know what you will receive")}
            </p>
            <h2>{text(locale, "A practical plan you can follow.")}</h2>
            <p>
              {text(
                locale,
                "These sample deliverables show the kind of clarity to agree before proceeding. They are examples, not past client results.",
              )}
            </p>
          </div>
          <div className="deliverables">
            <div>
              <strong>{text(locale, "Document preparation outline")}</strong>
              <p>
                {text(
                  locale,
                  "What to gather, what to confirm, and who reviews it.",
                )}
              </p>
            </div>
            <div>
              <strong>{text(locale, "Local coordination plan")}</strong>
              <p>
                {text(
                  locale,
                  "Your required involvement and the support around it.",
                )}
              </p>
            </div>
            <div>
              <strong>
                {text(locale, "Written scope and cost breakdown")}
              </strong>
              <p>
                {text(
                  locale,
                  "Service fees, exclusions and decisions still to be made.",
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="soft-section">
        <div className="two-column">
          <div>
            <p className="eyebrow">{text(locale, "Before you decide")}</p>
            <h2>{text(locale, "Practical questions, honest answers.")}</h2>
            <p>
              {text(
                locale,
                "A move is a meaningful decision. Take the time to understand the details.",
              )}
            </p>
          </div>
          <FAQAccordion locale={locale} items={residencyFaqs(locale)} />
        </div>
      </Section>
      <FinalAction locale={locale} />
      <Section className="guide-preview">
        <p>{text(locale, "Preparing for your first conversation?")}</p>
        <Link href={`/${locale}/guides/residency-requirements`}>
          {text(locale, "Read the document preparation guide")}
        </Link>
      </Section>
    </>
  );
}
