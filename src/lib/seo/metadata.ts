import { localeFormats } from "../../config/locales";
import type { Metadata } from "next";
import type { Locale, PageDefinition } from "../../domain/types";
import { runtime, type RuntimeEnvironment } from "../../config/runtime";
import { validateLiveConfiguration } from "../../config/runtime";
import { brand } from "../../config/brand";
import {
  validatePageClaims,
  type ClaimReviews,
} from "../../content/content-review";
export function canIndex(
  page: PageDefinition,
  environment: RuntimeEnvironment,
  locale: Locale = "en",
  reviews?: ClaimReviews,
): boolean {
  return (
    environment.mode === "live" &&
    validateLiveConfiguration(environment).length === 0 &&
    page.indexable &&
    page.approved &&
    page.contentReviewed &&
    (!page.requiresCommercialApproval || page.commercialApproved) &&
    page.locales.includes(locale) &&
    environment.completeLocales.includes(locale) &&
    validatePageClaims(page, locale, reviews).length === 0
  );
}
function canonical(
  page: PageDefinition,
  locale: Locale,
  environment: RuntimeEnvironment,
): string {
  return new URL(
    `/${locale}${page.path ? `/${page.path}` : ""}`,
    environment.siteUrl,
  ).toString();
}
export function buildSitemap(
  pages: PageDefinition[],
  environment: RuntimeEnvironment = runtime,
  reviews?: ClaimReviews,
): { url: string }[] {
  return pages.flatMap((page) =>
    page.locales
      .filter((locale) => canIndex(page, environment, locale, reviews))
      .map((locale) => ({ url: canonical(page, locale, environment) })),
  );
}
export function pageMetadata(
  page: PageDefinition,
  locale: Locale,
  environment: RuntimeEnvironment = runtime,
  reviews?: ClaimReviews,
): Metadata {
  const url = canonical(page, locale, environment);
  const languages: Record<string, string> = {};
  for (const equivalent of page.locales.filter((value) =>
    environment.completeLocales.includes(value),
  ))
    languages[equivalent] = canonical(page, equivalent, environment);
  if (languages.en) languages["x-default"] = languages.en;
  const title = `${page.title[locale]} | ${brand.displayName}`;
  const description = page.description[locale];
  const imagePath =
    page.key === "why-paraguay"
      ? `/og-why-paraguay-${locale}.png`
      : page.key.startsWith("lp/")
        ? `/og-${page.key.slice("lp/".length)}-${locale}.png`
        : locale === "en"
          ? "/og-default.png"
          : `/og-default-${locale}.png`;
  return {
    title,
    description,
    metadataBase: new URL(environment.siteUrl),
    alternates: { canonical: url, languages },
    robots: {
      index: canIndex(page, environment, locale, reviews),
      follow: true,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: brand.displayName,
      locale: localeFormats[locale].replace("-", "_"),
      images: [
        { url: imagePath, width: 1200, height: 630, alt: page.title[locale] },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}
