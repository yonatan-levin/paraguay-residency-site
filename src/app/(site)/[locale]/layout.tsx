import { isLocale } from "../../../config/locales";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SiteShell } from "../../../components/shell";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // Request rendering keeps query-aware islands and marketing content in the HTML response.
  await connection();
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
