import "server-only";
import type { Locale } from "../../domain/types";
import { interpolate, type TranslationValues } from "./common";
import es from "../../content/translations/es-editorial.json";
import fr from "../../content/translations/fr-editorial.json";
import de from "../../content/translations/de-editorial.json";
import he from "../../content/translations/he-editorial.json";

const dictionaries: Record<Exclude<Locale, "en">, Record<string, string>> = {
  es,
  fr,
  de,
  he,
};

export function editorialText(
  locale: Locale,
  key: string,
  values?: TranslationValues,
): string {
  const translated = locale === "en" ? key : dictionaries[locale][key];
  if (!translated?.trim())
    throw new Error(`Missing ${locale} editorial translation: ${key}`);
  return interpolate(translated, values);
}
