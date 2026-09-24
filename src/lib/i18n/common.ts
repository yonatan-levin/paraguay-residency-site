import type { Locale, Localized } from "../../domain/types";
import { supportedLocales } from "../../config/locales";
import es from "../../content/translations/es-common.json";
import fr from "../../content/translations/fr-common.json";
import de from "../../content/translations/de-common.json";
import he from "../../content/translations/he-common.json";

const dictionaries: Record<Exclude<Locale, "en">, Record<string, string>> = {
  es,
  fr,
  de,
  he,
};
export type TranslationValues = Record<string, string | number>;

export function interpolate(
  template: string,
  values: TranslationValues = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in values))
      throw new Error(`Missing translation value: ${name}`);
    return String(values[name]);
  });
}

export function translate(
  locale: Locale,
  key: string,
  values?: TranslationValues,
): string {
  const translated = locale === "en" ? key : dictionaries[locale][key];
  if (!translated?.trim())
    throw new Error(`Missing ${locale} translation: ${key}`);
  return interpolate(translated, values);
}

export function localized(key: string): Localized<string> {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, translate(locale, key)]),
  ) as Localized<string>;
}

export function localizedList(keys: string[]): Localized<string[]> {
  return Object.fromEntries(
    supportedLocales.map((locale) => [
      locale,
      keys.map((key) => translate(locale, key)),
    ]),
  ) as Localized<string[]>;
}
