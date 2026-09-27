import type { Locale } from "../domain/types";
import { getBenefits, valueText } from "../content/value-first";
import { regulatorySources } from "../content/content-review";
import { JourneyLink } from "./journey-provider";

export function BenefitCards({
  locale,
  benefits,
}: {
  locale: Locale;
  benefits: ReturnType<typeof getBenefits>;
}) {
  return (
    <div className="benefit-grid">
      {benefits.map((item) => (
        <article
          className="benefit-card"
          key={item.id}
          data-benefit-id={item.id}
        >
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.qualification && (
            <p className="benefit-qualification">{item.qualification}</p>
          )}
          <JourneyLink
            locale={locale}
            route={item.route}
            anchor={item.anchor}
            benefitId={item.id}
          >
            {item.link}
          </JourneyLink>
        </article>
      ))}
    </div>
  );
}

export function SourceNote({
  locale,
  source,
}: {
  locale: Locale;
  source: "R1" | "R2" | "R3";
}) {
  return (
    <p className="source-note">
      <a href={regulatorySources[source].url}>
        {valueText(locale, `source${source}`)}
      </a>
      <br />
      {valueText(locale, "draftNote")}
    </p>
  );
}

export function ValueNextActions({
  locale,
  light = false,
}: {
  locale: Locale;
  light?: boolean;
}) {
  return (
    <div className="button-row value-next-actions">
      <JourneyLink
        locale={locale}
        route="find-my-plan"
        className={light ? "button button-light" : "button"}
        cta="find-plan"
      >
        {valueText(locale, "startingPoint")}
      </JourneyLink>
      <JourneyLink locale={locale} route="pricing">
        {valueText(locale, "comparePackages")}
      </JourneyLink>
    </div>
  );
}
