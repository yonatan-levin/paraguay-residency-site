"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale } from "../../../config/locales";
import { translate } from "../../../lib/i18n/common";
export default function NotFound() {
  const params = useParams();
  const locale = isLocale(params.locale) ? params.locale : "en";
  return (
    <div className="container page-intro">
      <p className="eyebrow">404</p>
      <h1>{translate(locale, "This page is not available.")}</h1>
      <p>{translate(locale, "Check the address or return to the homepage.")}</p>
      <Link className="button" href={`/${locale}`}>
        {translate(locale, "Return to the homepage")}
      </Link>
    </div>
  );
}
