"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "../domain/types";
import { getPackage } from "../content/catalog";
import { brand } from "../config/brand";
import { text, ui } from "../content/ui";
import {
  localeDirections,
  localeNames,
  supportedLocales,
} from "../config/locales";
import { translate } from "../lib/i18n/common";
import { createMockMessagingGateway } from "../infrastructure/mock/gateways";
import {
  CaptureJourneyEntry,
  JourneyLink,
  useJourney,
  useLeadContext,
  useSelection,
} from "./journey-provider";

function BrandSymbol() {
  return (
    <svg
      className="brand-symbol"
      viewBox="0 0 36 44"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 38V6h13a10 10 0 0 1 0 20H5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="29" cy="36" r="3" fill="#b77f47" />
    </svg>
  );
}

export function WhatsAppButton({
  locale,
  className = "text-button",
  children,
}: {
  locale: Locale;
  className?: string;
  children?: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const context = useLeadContext(locale);
  const { analytics } = useJourney();
  const preview = createMockMessagingGateway().preview(context);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          analytics.emit({
            eventId: "whatsapp_clicked",
            routeKey: context.entryPageKey,
            locale,
            serviceId: context.serviceId,
            planId: context.packageId,
            is_demo: true,
          });
          dialog.current?.showModal();
        }}
      >
        {children ?? text(locale, "Ask us on WhatsApp")}
      </button>
      <dialog ref={dialog} className="message-dialog" aria-labelledby={titleId}>
        <div className="dialog-top">
          <span className="eyebrow">{text(locale, "Local preview only")}</span>
          <button
            type="button"
            className="icon-button"
            aria-label={text(locale, "Close message preview")}
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        <h2 id={titleId}>
          {text(locale, "Preview your conversation starter")}
        </h2>
        <p className="message-bubble">{preview.message}</p>
        <p role="status">
          {text(
            locale,
            "Sending is disabled in this preview. No message has been sent. An approved business phone number has not been supplied.",
          )}
        </p>
        <button
          type="button"
          className="button"
          onClick={() => dialog.current?.close()}
        >
          {text(locale, "Return to the website")}
        </button>
      </dialog>
    </>
  );
}

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const route = pathname.split("/").slice(2).join("/");
  const compact = route.startsWith("lp/") || route === "links";
  const [footerVisible, setFooterVisible] = useState(false);
  const footer = useRef<HTMLElement>(null);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const languageMenu = useRef<HTMLDetailsElement>(null);
  const previousPathname = useRef(pathname);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirections[locale];
  }, [locale]);
  useEffect(() => {
    // Hydration must preserve disclosures opened from the server rendered page.
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (mobileMenu.current) mobileMenu.current.open = false;
    if (languageMenu.current) languageMenu.current.open = false;
  }, [pathname]);
  const selection = useSelection();
  const selected = getPackage(selection.packageId);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setFooterVisible(entry.isIntersecting),
    );
    if (footer.current) observer.observe(footer.current);
    return () => observer.disconnect();
  }, []);
  const nav = (
    <>
      <JourneyLink locale={locale} route="paraguay-residency">
        {text(locale, "Residency")}
      </JourneyLink>
      <JourneyLink locale={locale} route="pricing">
        {text(locale, "Packages")}
      </JourneyLink>
      <Link href={`/${locale}/services`} lang={locale}>
        {text(locale, "Relocation & business")}
      </Link>
      <Link href={`/${locale}/guides`} lang={locale}>
        {text(locale, "Guides")}
      </Link>
      <Link href={`/${locale}/about`} lang={locale}>
        {text(locale, "About")}
      </Link>
    </>
  );
  return (
    <>
      <CaptureJourneyEntry />
      <a className="skip-link" href="#main">
        {text(locale, "Skip to content")}
      </a>
      <div className="preview-banner">{ui[locale].preview}</div>
      <header className={`site-header ${compact ? "compact-header" : ""}`}>
        <div className="container header-inner">
          <JourneyLink locale={locale} route="" className="brand">
            <BrandSymbol />
            <span lang="en" dir="ltr">
              {brand.displayName.split(" ")[0]}{" "}
              <span className="brand-sub">
                {brand.displayName.split(" ").slice(1).join(" ")}
              </span>
            </span>
          </JourneyLink>
          {!compact && (
            <nav
              className="desktop-nav"
              aria-label={text(locale, "Main navigation")}
            >
              {nav}
            </nav>
          )}
          <div className="header-actions">
            {route !== "internal/rtl" && (
              <details
                ref={languageMenu}
                className="language-switcher"
                onToggle={(event) => {
                  if (event.currentTarget.open && mobileMenu.current)
                    mobileMenu.current.open = false;
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && languageMenu.current) {
                    languageMenu.current.open = false;
                    languageMenu.current.querySelector("summary")?.focus();
                  }
                }}
              >
                <summary
                  aria-label={`${translate(locale, "Select language")}: ${locale.toUpperCase()}`}
                >
                  <bdi dir="ltr">{locale.toUpperCase()}</bdi>
                </summary>
                <nav aria-label={translate(locale, "Language")}>
                  {supportedLocales.map((language) => (
                    <JourneyLink
                      key={language}
                      locale={language}
                      route={route}
                      lang={language}
                      hrefLang={language}
                      aria-current={language === locale ? "page" : undefined}
                    >
                      <bdi dir={localeDirections[language]}>
                        {localeNames[language]}
                      </bdi>
                    </JourneyLink>
                  ))}
                </nav>
              </details>
            )}
            {!compact && (
              <JourneyLink
                locale={locale}
                route="find-my-plan"
                className="button header-cta"
                cta="find-plan"
              >
                {ui[locale].plan}
              </JourneyLink>
            )}
          </div>
          {!compact && (
            <details
              ref={mobileMenu}
              className="mobile-menu"
              onToggle={(event) => {
                if (event.currentTarget.open && languageMenu.current)
                  languageMenu.current.open = false;
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape" && mobileMenu.current) {
                  mobileMenu.current.open = false;
                  mobileMenu.current.querySelector("summary")?.focus();
                }
              }}
            >
              <summary aria-label={text(locale, "Open navigation")}>☰</summary>
              <nav aria-label={text(locale, "Mobile navigation")}>
                {nav}
                <JourneyLink locale={locale} route="book">
                  {ui[locale].book}
                </JourneyLink>
                <JourneyLink locale={locale} route="contact">
                  {ui[locale].contact}
                </JourneyLink>
              </nav>
            </details>
          )}
        </div>
      </header>
      <main id="main">
        {children}
        <noscript>
          <div className="container notice">
            {text(
              locale,
              "Interactive recommendations and demo forms need JavaScript. Read our packages and contact options without it.",
            )}{" "}
            <a href={`/${locale}/contact`}>{ui[locale].contact}</a>
          </div>
        </noscript>
      </main>
      <footer ref={footer} className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand footer-brand">
                <BrandSymbol />
                <span lang="en" dir="ltr">
                  {brand.displayName.split(" ")[0]}{" "}
                  <span className="brand-sub">
                    {brand.displayName.split(" ").slice(1).join(" ")}
                  </span>
                </span>
              </div>
              <p>
                {text(
                  locale,
                  "Your Paraguay residency, clearly planned and personally supported.",
                )}
              </p>
              <p className="small">
                {text(
                  locale,
                  "Working brand. Legal operator and business contacts pending owner approval.",
                )}
              </p>
            </div>
            <nav aria-label={text(locale, "Explore")}>
              <h2>{text(locale, "Your next step")}</h2>
              <JourneyLink locale={locale} route="pricing">
                {ui[locale].compare}
              </JourneyLink>
              <JourneyLink locale={locale} route="book">
                {ui[locale].book}
              </JourneyLink>
              <JourneyLink locale={locale} route="contact">
                {ui[locale].contact}
              </JourneyLink>
              <Link href={`/${locale}/services`}>
                {text(locale, "All services")}
              </Link>
            </nav>
            <nav aria-label={text(locale, "Resources and policies")}>
              <h2>{text(locale, "Useful information")}</h2>
              <Link href={`/${locale}/guides/residency-requirements`}>
                {text(locale, "Preparation guide")}
              </Link>
              <Link href={`/${locale}/privacy`}>{ui[locale].privacy}</Link>
              <Link href={`/${locale}/terms`}>{ui[locale].terms}</Link>
              <Link href={`/${locale}/disclaimer`}>
                {ui[locale].disclaimer}
              </Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>
              {text(locale, "A considered move begins with clear information.")}
            </span>
            <span>{text(locale, "Demo website · USD · No live services")}</span>
          </div>
        </div>
      </footer>
      {!["find-my-plan", "book", "thank-you"].includes(route) &&
        !footerVisible && (
          <aside
            className="mobile-conversion"
            aria-label={text(locale, "Next step")}
          >
            <JourneyLink
              locale={locale}
              route={route === "pricing" && selected ? "book" : "find-my-plan"}
              className="button"
              cta="mobile-primary"
            >
              {route === "pricing" && selected
                ? `${ui[locale].discuss}: ${selected.name[locale]}`
                : ui[locale].plan}
            </JourneyLink>
          </aside>
        )}
    </>
  );
}
