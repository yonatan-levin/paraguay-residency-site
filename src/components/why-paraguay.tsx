import type { ReactNode } from "react";
import type { Locale } from "../domain/types";
import {
  getBenefits,
  whySectionOrder,
  valueText,
} from "../content/value-first";
import { JourneyLink } from "./journey-provider";
import { PageIntro, Section } from "./primitives";
import { SourceNote, ValueNextActions } from "./value-content";
import { TaxOpportunities } from "./tax-opportunities";

export function WhyParaguay({ locale }: { locale: Locale }) {
  const v = (key: Parameters<typeof valueText>[1]) => valueText(locale, key);
  const overviewAnchors = [
    "residency",
    "second-base",
    "financial-planning",
    "life-and-budget",
  ] as const;
  const sections: Record<(typeof whySectionOrder)[number], ReactNode> = {
    "at-a-glance": (
      <>
        <h2>{v("glanceTitle")}</h2>
        <p>{v("glanceIntro")}</p>
        <ul className="why-overview">
          {getBenefits(locale).map((item, index) => (
            <li key={item.id}>
              <JourneyLink
                locale={locale}
                route="why-paraguay"
                anchor={overviewAnchors[index]}
              >
                {item.title}
              </JourneyLink>
            </li>
          ))}
        </ul>
        <JourneyLink locale={locale} route="pricing">
          {v("compareResidency")}
        </JourneyLink>
      </>
    ),
    residency: (
      <>
        <h2>{v("residencyTitle")}</h2>
        <p>{v("residencyBody")}</p>
        <p>{v("residencyStages")}</p>
        <p>{v("residencyLimits")}</p>
        <SourceNote locale={locale} source="R1" />
        <div className="resource-links">
          <JourneyLink
            locale={locale}
            route="paraguay-residency"
            anchor="benefits"
          >
            {v("residencyLink")}
          </JourneyLink>
          <JourneyLink locale={locale} route="guides/residency-requirements">
            {v("guideLink")}
          </JourneyLink>
        </div>
      </>
    ),
    "second-base": (
      <>
        <h2>{v("secondTitle")}</h2>
        <p>{v("secondBody")}</p>
        <p>{v("secondRoute")}</p>
        <p>{v("secondQuestions")}</p>
        <SourceNote locale={locale} source="R2" />
        <JourneyLink locale={locale} route="permanent-residency">
          {v("permanentLink")}
        </JourneyLink>
      </>
    ),
    "financial-planning": (
      <>
        <h2>{v("financialTitle")}</h2>
        <TaxOpportunities locale={locale} />
        <div className="resource-links">
          <JourneyLink
            locale={locale}
            route="why-paraguay"
            anchor="life-and-budget"
          >
            {v("budgetLink")}
          </JourneyLink>
        </div>
      </>
    ),
    "life-and-budget": (
      <>
        <h2>{v("budgetTitle")}</h2>
        <p>{v("budgetIntro")}</p>
        <ul className="budget-list">
          {(
            [
              "housing",
              "utilities",
              "transport",
              "healthcare",
              "schooling",
              "relocation",
              "professionalCosts",
              "ongoingCosts",
            ] as const
          ).map((key) => (
            <li key={key}>{v(key)}</li>
          ))}
        </ul>
        <p>{v("budgetPrompt")}</p>
        <JourneyLink locale={locale} route="relocation">
          {v("relocationLink")}
        </JourneyLink>
      </>
    ),
    "local-business": (
      <>
        <h2>{v("businessTitle")}</h2>
        <p>{v("businessBody")}</p>
        <p>{v("businessSeparate")}</p>
        <div className="resource-links">
          <JourneyLink locale={locale} route="company-formation/paraguay">
            {v("companyLink")}
          </JourneyLink>
          <JourneyLink locale={locale} route="accounting">
            {v("accountingLink")}
          </JourneyLink>
          <JourneyLink locale={locale} route="banking">
            {v("bankingLink")}
          </JourneyLink>
        </div>
      </>
    ),
    considerations: (
      <>
        <h2>{v("considerationsTitle")}</h2>
        <p>{v("considerationsBody")}</p>
        <p>{v("considerationsEnd")}</p>
      </>
    ),
    "next-step": (
      <>
        <h2>{v("nextTitle")}</h2>
        <p>{v("nextIntro")}</p>
        <ValueNextActions locale={locale} />
        <p>
          <JourneyLink locale={locale} route="book">
            {v("quietBooking")}
          </JourneyLink>
        </p>
      </>
    ),
  };
  return (
    <>
      <PageIntro title={v("whyTitle")} eyebrow={v("descriptor")}>
        <p>{v("whyIntro")}</p>
      </PageIntro>
      <div className="why-content">
        {whySectionOrder.map((id) => (
          <Section
            key={id}
            id={id}
            data-why-section={id}
            className={id === "at-a-glance" ? "soft-section" : ""}
          >
            {sections[id]}
          </Section>
        ))}
      </div>
    </>
  );
}
