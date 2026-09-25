import { translate } from "../lib/i18n/common";
import { supportedLocales } from "../config/locales";
import type { Locale } from "../domain/types";
import { brand } from "../config/brand";

export const text = (locale: Locale, en: string) => translate(locale, en);
const englishUi = {
  preview:
    "Website preview. Offers are provisional and no real booking or message will be sent.",
  provisional: "Illustrative USD price. Subject to confirmation",
  plan: "Find my plan",
  compare: "Compare packages",
  book: "Book a consultation",
  discuss: "Discuss this plan",
  family: "Request a family quote",
  finderOrigin: "Recommended by your plan finder",
  skip: "Skip to booking",
  brand: brand.displayName,
  price: "Provisional service fee",
  unknown: "To be confirmed",
  english: "in English",
  contact: "Contact",
  privacy: "Privacy draft",
  terms: "Terms draft",
  disclaimer: "Disclaimer draft",
};
export const ui = Object.fromEntries(
  supportedLocales.map((locale) => [
    locale,
    Object.fromEntries(
      Object.entries(englishUi).map(([key, value]) => [
        key,
        key === "brand" ? value : translate(locale, value),
      ]),
    ),
  ]),
) as Record<Locale, Record<keyof typeof englishUi, string>>;

export const residencyFaqs = (locale: Locale) => [
  {
    question: text(locale, "Which documents should I prepare?"),
    answer: text(
      locale,
      "Start by making an inventory of identity, civil status and background records. A qualified provider must confirm the actual list, issue dates, translations and certification requirements for your circumstances before you order or send anything.",
    ),
  },
  {
    question: text(locale, "Will I need to travel to Paraguay?"),
    answer: text(
      locale,
      "Plan for required steps that require your presence. The number, duration and sequencing of visits depend on the route and current requirements. Confirm these before making travel arrangements that cannot be refunded.",
    ),
  },
  {
    question: text(locale, "What do the prices include?"),
    answer: text(
      locale,
      "These are illustrative service fees. Government charges, external professional fees, translations, travel and qualifying capital are separate or still to be confirmed. You would receive an agreed written scope before a real engagement.",
    ),
  },
  {
    question: text(locale, "How are couples and families priced?"),
    answer: text(
      locale,
      "Request a family quote. We do not multiply a fee for one applicant because shared costs, children’s needs and applicable discounts have not been agreed.",
    ),
  },
  {
    question: text(locale, "Can you guarantee approval or a completion date?"),
    answer: text(
      locale,
      "No. Government decisions, document checks and external processing are outside the service provider’s control. A higher support level changes coordination and personal assistance, never the government’s priority or decision.",
    ),
  },
  {
    question: text(locale, "What happens after filing?"),
    answer: text(
      locale,
      "The written scope will define follow up, communication and any aftercare. Renewals, additional applications and unrelated professional work need a separate confirmed scope.",
    ),
  },
];
