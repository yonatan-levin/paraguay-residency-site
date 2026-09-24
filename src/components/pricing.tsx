"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "../domain/types";
import { localeDirections } from "../config/locales";
import { packages } from "../content/catalog";
import {
  formatPrice,
  inclusionLabel,
  priceBasisLabel,
} from "../domain/pricing";
import { journeyHref } from "../domain/selection";
import { text, ui } from "../content/ui";
import { JourneyLink, useJourney, useSelection } from "./journey-provider";
import { PackageCard, PageIntro, Section } from "./primitives";

export function Pricing({ locale }: { locale: Locale }) {
  const selection = useSelection();
  const router = useRouter();
  const { setSelection, setFinderResult } = useJourney();
  const [journey, setJourney] = useState(
    selection.serviceId === "permanent-residency"
      ? "upgrade"
      : ["investor-residency", "business-route"].includes(
            selection.serviceId ?? "",
          )
        ? "investment"
        : "first",
  );
  function changeJourney(value: string) {
    const nextSelection = {
      serviceId:
        value === "upgrade"
          ? "permanent-residency"
          : value === "investment"
            ? "investor-residency"
            : "temporary-residency",
      campaign: selection.campaign,
    };
    setJourney(value);
    setSelection(nextSelection);
    setFinderResult(undefined);
    router.replace(journeyHref(locale, "pricing", nextSelection), {
      scroll: false,
    });
  }
  const relevant = packages.filter((item) =>
    journey === "first"
      ? item.serviceId === "temporary-residency"
      : journey === "upgrade"
        ? item.serviceId === "permanent-residency"
        : ["investor-residency", "business-route"].includes(item.serviceId),
  );
  const rows = [
    {
      label: text(locale, "Service fee"),
      value: (id: string) =>
        formatPrice(packages.find((item) => item.id === id)!.price, locale),
    },
    {
      label: text(locale, "Billing basis"),
      value: (id: string) =>
        priceBasisLabel(packages.find((item) => item.id === id)!.price, locale),
    },
    {
      label: text(locale, "Government charges"),
      value: (id: string) =>
        inclusionLabel(
          packages.find((item) => item.id === id)!.price.inclusions.government,
          locale,
        ),
    },
    {
      label: text(locale, "Travel & accommodation"),
      value: () => text(locale, "Separate cost"),
    },
    {
      label: text(locale, "Required visits & elapsed processing"),
      value: () => text(locale, "Depends on the route; to be confirmed"),
    },
    {
      label: text(locale, "Renewals & recurring obligations"),
      value: () => text(locale, "Not assumed included"),
    },
  ];
  return (
    <>
      <PageIntro
        title={text(locale, "Find the support that fits your plans.")}
        eyebrow={text(locale, "Packages & provisional costs")}
      >
        <p>
          {text(
            locale,
            "Start with your journey. Then compare what each level of support would cover.",
          )}
        </p>
      </PageIntro>
      <Section className="pricing-section">
        <fieldset className="journey-tabs">
          <legend>{text(locale, "Choose your journey")}</legend>
          {[
            ["first", text(locale, "First residency")],
            ["upgrade", text(locale, "Permanent residency upgrade")],
            ["investment", text(locale, "Investment or business route")],
          ].map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="journey"
                value={value}
                checked={journey === value}
                onChange={() => changeJourney(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <p className="notice">
          {text(
            locale,
            "Service fees are provisional. No package changes government eligibility, priority or approval. External costs and precise delivery scope must be confirmed.",
          )}
        </p>
        {journey === "investment" && (
          <p className="notice">
            {text(
              locale,
              "Qualifying capital, government charges, professional fees and ongoing obligations are separate from our illustrative service fee.",
            )}
          </p>
        )}
        <h2 className="visually-hidden">
          {text(locale, "Compare support packages for your journey")}
        </h2>
        <div
          className={`package-grid ${relevant.length === 2 ? "two-packages" : ""}`}
        >
          {relevant.map((item) => (
            <PackageCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
        <div className="family-callout">
          <div>
            <h2>{text(locale, "Planning for more than one person?")}</h2>
            <p>
              {text(
                locale,
                "Family pricing depends on your circumstances. We never invent a household total.",
              )}
            </p>
          </div>
          <JourneyLink
            locale={locale}
            route="find-my-plan"
            selection={{ campaign: "family-relocation" }}
            className="button button-outline"
          >
            {ui[locale].family}
          </JourneyLink>
        </div>
      </Section>
      <Section className="soft-section">
        <h2>{text(locale, "The details behind the price.")}</h2>
        <p>{ui[locale].provisional}</p>
        <div className="comparison-desktop">
          <table>
            <caption>{text(locale, "Support and cost comparison")}</caption>
            <thead>
              <tr>
                <th scope="col">{text(locale, "What to compare")}</th>
                {relevant.map((item) => (
                  <th scope="col" key={item.id}>
                    {item.name[locale]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {relevant.map((item) => (
                    <td key={item.id}>
                      <bdi dir={localeDirections[locale]}>
                        {row.value(item.id)}
                      </bdi>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="comparison-mobile">
          {relevant.map((item) => (
            <article key={item.id}>
              <h3>{item.name[locale]}</h3>
              <dl>
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>
                      <bdi dir={localeDirections[locale]}>
                        {row.value(item.id)}
                      </bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="two-column">
          <div>
            <h2>{text(locale, "Settling in is a separate conversation.")}</h2>
            <p>
              {text(
                locale,
                "Arrival orientation, practical local coordination and other services are optional. They are not silently added to a residency package.",
              )}
            </p>
          </div>
          <div className="button-row">
            <JourneyLink
              locale={locale}
              route="relocation"
              className="button button-outline"
            >
              {text(locale, "Explore relocation support")}
            </JourneyLink>
            <JourneyLink locale={locale} route="book">
              {text(locale, "Talk through your options")}
            </JourneyLink>
          </div>
        </div>
      </Section>
    </>
  );
}
