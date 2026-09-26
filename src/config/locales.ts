import type { Locale } from "../domain/types";

export const supportedLocales = ["en", "es", "fr", "de", "he"] as const;
export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  he: "עברית",
};
export const localeFormats: Record<Locale, string> = {
  en: "en-US",
  es: "es-PY",
  fr: "fr-FR",
  de: "de-DE",
  he: "he-IL",
};
export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  es: "ltr",
  fr: "ltr",
  de: "ltr",
  he: "rtl",
};
export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" &&
    supportedLocales.some((locale) => locale === value)
  );
}
