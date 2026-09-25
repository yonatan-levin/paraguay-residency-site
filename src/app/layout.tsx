import { isLocale, localeDirections } from "../config/locales";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { JourneyProvider } from "../components/journey-provider";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const language = (await headers()).get("x-site-locale");
  const locale = isLocale(language) ? language : "en";
  // One root provider preserves private in-memory drafts across locale navigation.
  return (
    <html lang={locale} dir={localeDirections[locale]}>
      <body>
        <JourneyProvider>{children}</JourneyProvider>
      </body>
    </html>
  );
}
