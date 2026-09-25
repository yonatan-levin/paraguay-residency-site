import { isLocale } from "../../../../config/locales";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPage } from "../../../../config/routes";
import { pageMetadata } from "../../../../lib/seo/metadata";
import type { Locale } from "../../../../domain/types";
import { Home } from "../../../../components/home";
import {
  Booking,
  ThankYou,
  PlanFinder,
  Pricing,
} from "../../../../components/journey-pages";
import { CampaignPage, LinksHub } from "../../../../components/campaigns";
import {
  AboutPage,
  ContactPage,
  GuidesIndex,
  PolicyPage,
  ResidencyGuide,
  RtlFixture,
  ServicePage,
  ServicesIndex,
} from "../../../../components/content-pages";

type PageProps = { params: Promise<{ locale: string; slug?: string[] }> };
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = getPage(slug?.join("/") || "home", locale);
  if (!page) notFound();
  return pageMetadata(page, locale);
}
export default async function SitePage({ params }: PageProps) {
  const { locale: value, slug } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const route = slug?.join("/") || "home";
  if (!getPage(route, locale)) notFound();
  if (route === "home") return <Home locale={locale} />;
  if (route === "pricing") return <Pricing locale={locale} />;
  if (route === "book") return <Booking locale={locale} />;
  if (route === "thank-you") return <ThankYou locale={locale} />;
  if (route === "find-my-plan") return <PlanFinder locale={locale} />;
  if (route === "lp/residency-cost" || route === "lp/family-relocation")
    return (
      <CampaignPage locale={locale} family={route === "lp/family-relocation"} />
    );
  if (route === "links") return <LinksHub locale={locale} />;
  if (route === "contact") return <ContactPage locale={locale} />;
  if (route === "services") return <ServicesIndex locale={locale} />;
  if (route === "guides") return <GuidesIndex locale={locale} />;
  if (route === "guides/residency-requirements")
    return <ResidencyGuide locale={locale} />;
  if (route === "about") return <AboutPage locale={locale} />;
  if (["privacy", "terms", "disclaimer"].includes(route))
    return <PolicyPage locale={locale} route={route} />;
  if (route === "internal/rtl") return <RtlFixture />;
  if (getPage(route, locale)?.template === "service")
    return <ServicePage locale={locale} route={route} />;
  notFound();
}
