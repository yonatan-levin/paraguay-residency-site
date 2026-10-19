import type { InclusionState, Locale, Price } from "./types";
import { localeFormats } from "../config/locales";
import { translate } from "../lib/i18n/common";
const MINOR_UNITS_PER_USD = 100;
export function formatPrice(price: Price, locale: Locale = "en"): string {
  if (price.type === "quote") return translate(locale, "Request a quote");
  const format = (value: number) =>
    new Intl.NumberFormat(localeFormats[locale], {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: value % MINOR_UNITS_PER_USD === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value / MINOR_UNITS_PER_USD);
  return price.type === "range"
    ? `${format(price.minMinor)} ${translate(locale, "to")} ${format(price.maxMinor)}`
    : format(price.amountMinor);
}
export function inclusionLabel(
  state: InclusionState | undefined,
  locale: Locale = "en",
): string {
  const labels = {
    included: "Included",
    excluded: "Excluded",
    optional: "Optional",
    unknown: "To be confirmed",
  };
  return translate(locale, labels[state ?? "unknown"]);
}
export function priceBasisLabel(price: Price, locale: Locale = "en"): string {
  return translate(
    locale,
    {
      "per-applicant": "per applicant",
      "per-engagement": "per engagement",
      monthly: "per month",
    }[price.basis],
  );
}
