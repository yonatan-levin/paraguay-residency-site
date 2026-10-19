import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import skyline from "../../public/asuncion-skyline.webp";
import type { Locale } from "../domain/types";
import { brand } from "../config/brand";
import { packages } from "../content/catalog";
import { text, ui } from "../content/ui";
import {
  getBenefits,
  getMotivations,
  getServiceValues,
  getValueQuestions,
  homeSectionOrder,
  valueText,
} from "../content/value-first";
import { JourneyLink } from "./journey-provider";
import { FAQAccordion, PackageCard, ProcessSteps, Section } from "./primitives";
import { BenefitCards, ValueNextActions } from "./value-content";
import { DirectContactLinks } from "./direct-contact";

export function Home({ locale }: { locale: Locale }) {
  const v = (key: Parameters<typeof valueText>[1]) => valueText(locale, key);
  const sections: Record<(typeof homeSectionOrder)[number], ReactNode> = {
    hero: (
      <section className="hero value-hero container" data-home-section="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span lang="en" dir="ltr">
              {brand.displayName}
            </span>{" "}
            · {v("descriptor")}
          </p>
          <h1>{v("homeTitle")}</h1>
          <p className="lead">{v("homeIntro")}</p>
          <div className="button-row">
            <JourneyLink
              locale={locale}
              route="find-my-plan"
              className="button"
              cta="find-plan"
            >
              {ui[locale].plan}
            </JourneyLink>
            <JourneyLink
              locale={locale}
              route="pricing"
              className="button button-outline"
            >
              {v("compareResidency")}
            </JourneyLink>
          </div>
          <p className="hero-note">
            <JourneyLink
              locale={locale}
              route=""
              anchor="benefits"
              className="text-button"
              cta="explore-benefits"
            >
              {v("exploreBenefits")}
            </JourneyLink>
          </p>
          <p className="hero-note quiet-booking">
            <JourneyLink locale={locale} route="book">
              {v("quietBooking")}
            </JourneyLink>
          </p>
          <DirectContactLinks locale={locale} className="hero-contact" />
        </div>
        <figure className="hero-art skyline-art">
          <Image
            src={skyline}
            alt={text(
              locale,
              "Asunción skyline and Costanera waterfront in soft evening light",
            )}
            sizes="(max-width: 900px) 100vw, 50vw"
            fetchPriority="high"
            loading="eager"
          />
          <figcaption>
            <strong>{text(locale, "Asunción, Paraguay")}</strong>
            <span>
              <a
                href="https://commons.wikimedia.org/wiki/File:Costanera_aerial.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {text(locale, "Photo by Cmasi · AI edited")}
              </a>{" "}
              ·{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY SA 4.0
              </a>
            </span>
          </figcaption>
        </figure>
      </section>
    ),
    reassurance: (
      <div className="reassurance container" data-home-section="reassurance">
        <p>{text(locale, "Clear scope before you commit")}</p>
        <p>{text(locale, "Preparation, step by step")}</p>
        <p>{text(locale, "Support around your needs")}</p>
      </div>
    ),
    benefits: (
      <Section id="benefits" data-home-section="benefits">
        <div className="section-heading">
          <h2>{v("benefitsTitle")}</h2>
        </div>
        <BenefitCards locale={locale} benefits={getBenefits(locale)} />
      </Section>
    ),
    motivations: (
      <Section className="soft-section" data-home-section="motivations">
        <div className="section-heading">
          <h2>{v("motivationsTitle")}</h2>
          <p>{v("motivationsIntro")}</p>
        </div>
        <div className="goal-grid motivation-grid">
          {getMotivations(locale).map((item) => (
            <article className="goal-card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <JourneyLink
                locale={locale}
                route={item.route}
                anchor={item.anchor}
                motivationId={item.id}
              >
                {item.link}
              </JourneyLink>
            </article>
          ))}
        </div>
      </Section>
    ),
    "service-value": (
      <Section data-home-section="service-value">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{v("serviceValueEyebrow")}</p>
            <h2>{v("serviceValueTitle")}</h2>
          </div>
          <p>{v("serviceValueIntro")}</p>
        </div>
        <div className="service-value-grid">
          {getServiceValues(locale).map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <JourneyLink locale={locale} route={item.route}>
                {item.link}
              </JourneyLink>
            </article>
          ))}
        </div>
      </Section>
    ),
    process: (
      <Section className="soft-section" data-home-section="process">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text(locale, "How it works")}</p>
            <h2>{text(locale, "From questions to a considered plan.")}</h2>
          </div>
        </div>
        <ProcessSteps locale={locale} />
      </Section>
    ),
    packages: (
      <Section data-home-section="packages">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {text(locale, "Choose your level of support")}
            </p>
            <h2>{text(locale, "Clear options. A personal fit.")}</h2>
          </div>
          <p>{v("packagesIntro")}</p>
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
    ),
    evidence: (
      <Section className="people-section" data-home-section="evidence">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{text(locale, "Who helps you")}</p>
            <h2>{v("evidenceTitle")}</h2>
          </div>
          <p>{v("evidenceIntro")}</p>
        </div>
        <div className="two-column">
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
          <div className="deliverables">
            {[
              [
                "Document preparation outline",
                "What to gather, what to confirm, and who reviews it.",
              ],
              [
                "Local coordination plan",
                "Your required involvement and the support around it.",
              ],
              [
                "Written scope and cost breakdown",
                "Service fees, exclusions and decisions still to be made.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <strong>{text(locale, title)}</strong>
                <p>{text(locale, body)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    ),
    questions: (
      <Section className="soft-section" data-home-section="questions">
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
          <FAQAccordion locale={locale} items={getValueQuestions(locale)} />
        </div>
      </Section>
    ),
    "next-step": (
      <Section className="final-action" data-home-section="next-step">
        <div>
          <h2>{v("nextTitle")}</h2>
          <p>{v("nextIntro")}</p>
          <JourneyLink locale={locale} route="guides/residency-requirements">
            {text(locale, "Read the document preparation guide")}
          </JourneyLink>
        </div>
        <ValueNextActions locale={locale} light />
      </Section>
    ),
  };
  return homeSectionOrder.map((id) => (
    <Fragment key={id}>{sections[id]}</Fragment>
  ));
}
