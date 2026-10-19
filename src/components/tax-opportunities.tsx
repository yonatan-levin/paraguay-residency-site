import type { ReactNode } from "react";
import type { Locale } from "../domain/types";
import { regulatorySources } from "../content/content-review";
import { taxText } from "../content/tax-opportunities";
import { valueText } from "../content/value-first";
import { JourneyLink } from "./journey-provider";

type TaxVariant = "overview" | "us" | "paraguay";
const sourceIds = {
  dividends: ["R4"],
  us: ["R5", "R6", "R7", "R8", "R9"],
  paraguay: ["R3", "R11"],
  services: ["R3"],
  residence: ["R10", "R12", "R13"],
} as const;
type TaxSourceId = (typeof sourceIds)[keyof typeof sourceIds][number];

export function TaxOpportunities({
  locale,
  variant = "overview",
  primaryAction,
}: {
  locale: Locale;
  variant?: TaxVariant;
  primaryAction?: ReactNode;
}) {
  const t = (key: Parameters<typeof taxText>[1]) => taxText(locale, key);
  const sources = (ids: readonly TaxSourceId[]) => (
    <ul className="plain-list tax-sources">
      {ids.map((id) => (
        <li key={id}>
          <a href={regulatorySources[id].url}>{t(`source${id}`)}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="tax-opportunities">
      {variant === "overview" && (
        <>
          <p>{t("intro")}</p>
          <article
            className="benefit-card tax-dividend"
            data-tax-case="foreign-dividends"
          >
            <h3>{t("dividendTitle")}</h3>
            <p>{t("dividendBody")}</p>
            <p className="benefit-qualification">{t("dividendLimit")}</p>
            {sources(sourceIds.dividends)}
          </article>
          <h3>{t("structuresTitle")}</h3>
        </>
      )}
      <div className={variant === "overview" ? "benefit-grid" : undefined}>
        {variant !== "paraguay" && (
          <article className="benefit-card" data-tax-structure="us">
            <h3>{t("usTitle")}</h3>
            <p>{t("usBody")}</p>
            <p>{t("usOpportunity")}</p>
            <p className="benefit-qualification">{t("usExample")}</p>
            <p>{t("usObligations")}</p>
            {sources(sourceIds.us)}
          </article>
        )}
        {variant !== "us" && (
          <article className="benefit-card" data-tax-structure="paraguay">
            <h3>{t("paraguayTitle")}</h3>
            <p>{t("paraguayBody")}</p>
            <p>{t("paraguayOpportunity")}</p>
            <p>{t("paraguayObligations")}</p>
            {sources(sourceIds.paraguay)}
          </article>
        )}
      </div>
      {variant !== "paraguay" && (
        <div data-tax-case="services-from-paraguay">
          <h3>{t("counterTitle")}</h3>
          <p>{t("counterBody")}</p>
          {variant === "us" && sources(sourceIds.services)}
        </div>
      )}
      <div>
        <h3>{t("residenceTitle")}</h3>
        <p>{t("residenceBody")}</p>
        <p>{t("conclusion")}</p>
        {sources(sourceIds.residence)}
      </div>
      <div className="resource-links">
        {variant === "overview" ? (
          <>
            {primaryAction ?? (
              <JourneyLink
                locale={locale}
                route="tax-planning"
                className="button"
              >
                {t("taxLink")}
              </JourneyLink>
            )}
            <JourneyLink locale={locale} route="company-formation/us">
              {t("usLink")}
            </JourneyLink>
            <JourneyLink locale={locale} route="company-formation/paraguay">
              {t("paraguayLink")}
            </JourneyLink>
          </>
        ) : (
          <JourneyLink
            locale={locale}
            route="why-paraguay"
            anchor="financial-planning"
          >
            {t("compareLink")}
          </JourneyLink>
        )}
      </div>
      <div className="source-note">
        <p>{valueText(locale, "draftNote")}</p>
      </div>
    </div>
  );
}
