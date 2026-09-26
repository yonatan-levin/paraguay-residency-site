import Image from "next/image";
import type { Locale } from "../domain/types";
import { packages } from "../content/catalog";
import { text, ui, residencyFaqs } from "../content/ui";
import { JourneyLink } from "./journey-provider";
import { WhatsAppButton } from "./shell";
import { FAQAccordion, PackageCard, Section } from "./primitives";

export function CampaignPage({
  locale,
  family,
}: {
  locale: Locale;
  family: boolean;
}) {
  const campaign = family ? "family-relocation" : "residency-cost";
  const action = text(locale, family ? "Plan our move" : "Compare my options");
  return (
    <>
      <section className="campaign-hero container">
        <div>
          <p className="eyebrow">
            {text(
              locale,
              family
                ? "A considered move, together"
                : "Start with a clear picture",
            )}
          </p>
          <h1>
            {text(
              locale,
              family
                ? "Plan your family's move to Paraguay with clarity."
                : "Understand the cost before you plan your move.",
            )}
          </h1>
          <p className="lead">
            {text(
              locale,
              family
                ? "Bring document preparation, required visits and questions about settling in into one coordinated discussion. Each family member’s needs deserve their own review."
                : "Separate the service fee from the costs around it. Compare support levels, ask better questions and decide what to confirm before you commit.",
            )}
          </p>
          <JourneyLink
            locale={locale}
            route={family ? "find-my-plan" : "pricing"}
            selection={{
              campaign,
              ...(family ? {} : { serviceId: "temporary-residency" }),
            }}
            className="button"
            cta={family ? "family-plan" : "compare-options"}
          >
            {action}
          </JourneyLink>
          <p className="hero-note">
            {text(
              locale,
              family
                ? "Family quote only. No invented household total."
                : "Illustrative USD offers. All costs require confirmation.",
            )}
          </p>
        </div>
        <figure className="campaign-art">
          <Image
            src={
              locale === "en"
                ? "/hero-editorial.svg"
                : `/hero-editorial-${locale}.svg`
            }
            width={860}
            height={1000}
            fetchPriority="high"
            loading="eager"
            alt={text(
              locale,
              "Editorial illustration of a peaceful shaded terrace",
            )}
          />
          <figcaption>{text(locale, "Editorial placeholder")}</figcaption>
        </figure>
      </section>
      <Section className="soft-section">
        <div className="two-column">
          <div>
            <h2>
              {text(
                locale,
                family
                  ? "Make room for everyone’s questions."
                  : "A service fee is one part of the budget.",
              )}
            </h2>
            <p>
              {text(
                locale,
                family
                  ? "A shared move does not mean identical documents, priorities or obligations. Confirm each person’s needs, then coordinate the practical work that can be shared."
                  : "Ask for an itemized scope so you can distinguish business assistance from government, professional and personal costs.",
              )}
            </p>
          </div>
          <div className="deliverables">
            {(family
              ? [
                  text(locale, "Document planning for each applicant"),
                  text(locale, "Travel and arrival coordination"),
                  text(
                    locale,
                    "Schooling, housing and questions about settling in",
                  ),
                ]
              : [
                  text(
                    locale,
                    "Service fee: compare support and delivery scope",
                  ),
                  text(
                    locale,
                    "External costs: official charges and professional work",
                  ),
                  text(
                    locale,
                    "Personal costs: travel, accommodation and future obligations",
                  ),
                ]
            ).map((item) => (
              <div key={item}>
                <strong>{item}</strong>
                <p>
                  {text(
                    locale,
                    "Confirm the scope, responsibility and costs before proceeding.",
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <div className="section-heading">
          <div>
            <h2>{text(locale, "Explore the support options.")}</h2>
          </div>
          <p>
            {family
              ? text(
                  locale,
                  "Individual benchmark fees below are not family quotes. Shared costs and individual needs must be reviewed.",
                )
              : ui[locale].provisional}
          </p>
        </div>
        <div className="package-grid">
          {packages
            .filter((item) => item.serviceId === "temporary-residency")
            .map((item) => (
              <PackageCard
                key={item.id}
                item={item}
                locale={locale}
                campaign={campaign}
                compact
              />
            ))}
        </div>
      </Section>
      <Section className="soft-section">
        <div className="two-column">
          <h2>{text(locale, "Questions worth asking first.")}</h2>
          <FAQAccordion
            locale={locale}
            items={residencyFaqs(locale).filter((_, index) =>
              family ? [1, 3, 4].includes(index) : [2, 3, 4].includes(index),
            )}
          />
        </div>
      </Section>
      <Section>
        <div className="campaign-close">
          <h2>{text(locale, "Leave with a clearer starting point.")}</h2>
          <JourneyLink
            locale={locale}
            route={family ? "find-my-plan" : "pricing"}
            selection={{
              campaign,
              ...(family ? {} : { serviceId: "temporary-residency" }),
            }}
            className="button"
            cta={family ? "family-plan" : "compare-options"}
          >
            {action}
          </JourneyLink>
        </div>
      </Section>
    </>
  );
}

export function LinksHub({ locale }: { locale: Locale }) {
  return (
    <Section>
      <div className="links-hub">
        <p className="eyebrow">{text(locale, "Choose your next step")}</p>
        <h1>{text(locale, "Your plans. A clear starting point.")}</h1>
        <p>
          {text(
            locale,
            "Residency, relocation and practical support in Paraguay.",
          )}
        </p>
        <div className="link-choices">
          <JourneyLink locale={locale} route="pricing" className="button">
            {text(locale, "Residency packages")}
          </JourneyLink>
          <JourneyLink
            locale={locale}
            route="lp/family-relocation"
            selection={{ campaign: "family-relocation" }}
            className="button button-outline"
          >
            {text(locale, "Family relocation")}
          </JourneyLink>
          <JourneyLink
            locale={locale}
            route="book"
            className="button button-outline"
          >
            {ui[locale].book}
          </JourneyLink>
          <WhatsAppButton locale={locale} className="button button-outline">
            {text(locale, "WhatsApp preview")}
          </WhatsAppButton>
        </div>
      </div>
    </Section>
  );
}
