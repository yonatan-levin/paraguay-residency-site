"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import type {
  ContactDraft,
  FinderAnswers,
  FinderResult,
  LeadContext,
  Locale,
  Receipt,
  Selection,
  SubmissionPayload,
} from "../domain/types";
import { journeyHref, resolveSelection } from "../domain/selection";
import { captureAttribution } from "../domain/attribution";
import { createMemoryAnalytics, type ctaIds } from "../lib/analytics/events";

const emptyDraft: ContactDraft = {
  firstName: "",
  channel: "email",
  marketingConsent: false,
};
function useJourneyState() {
  const [selection, setSelection] = useState<Selection>({});
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [finderResult, setFinderResult] = useState<FinderResult>();
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft);
  // Appointment choices survive locale route remounts alongside the contact draft.
  const [bookingMode, setBookingMode] =
    useState<SubmissionPayload["mode"]>("conversation");
  const [bookingTimeZone, setBookingTimeZone] = useState<string>();
  const [bookingSlotUtc, setBookingSlotUtc] = useState("");
  const [receipt, setReceipt] = useState<Receipt>();
  const [attribution, setAttribution] = useState<LeadContext["attribution"]>();
  const [entryPageKey, setEntryPageKey] = useState<string>();
  const [analytics] = useState(() => createMemoryAnalytics());
  return {
    selection,
    setSelection,
    answers,
    setAnswers,
    finderResult,
    setFinderResult,
    draft,
    setDraft,
    bookingMode,
    setBookingMode,
    bookingTimeZone,
    setBookingTimeZone,
    bookingSlotUtc,
    setBookingSlotUtc,
    receipt,
    setReceipt,
    attribution,
    setAttribution,
    entryPageKey,
    setEntryPageKey,
    analytics,
  };
}
const JourneyContext = createContext<ReturnType<typeof useJourneyState> | null>(
  null,
);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const value = useJourneyState();
  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

export function useJourney() {
  const value = useContext(JourneyContext);
  if (!value) throw new Error("JourneyProvider is required");
  return value;
}

export function useSelection(): Selection {
  const params = useSearchParams();
  const { selection } = useJourney();
  const hasSelection = params.has("plan") || params.has("service");
  const parsed = resolveSelection({
    plan: params.get("plan") ?? undefined,
    service: params.get("service") ?? undefined,
    campaign: params.get("campaign") ?? undefined,
  });
  return hasSelection
    ? parsed
    : {
        ...selection,
        ...(parsed.campaign ? { campaign: parsed.campaign } : {}),
      };
}

export function useLeadContext(locale: Locale): LeadContext {
  const selection = useSelection();
  const { attribution, answers, entryPageKey, finderResult } = useJourney();
  const pathname = usePathname();
  return {
    ...selection,
    locale,
    entryPageKey:
      entryPageKey ?? (pathname.split("/").slice(2).join("/") || "home"),
    attribution,
    finderResult:
      finderResult?.serviceId === selection.serviceId &&
      finderResult?.packageId === selection.packageId
        ? finderResult
        : undefined,
    familyQuote: answers.household
      ? answers.household !== "individual"
      : selection.campaign === "family-relocation",
  };
}

export function CaptureJourneyEntry() {
  const pathname = usePathname();
  const params = useSearchParams();
  const { setEntryPageKey, setAttribution, setSelection, setFinderResult } =
    useJourney();
  useEffect(() => {
    setEntryPageKey(
      (previous) =>
        previous ?? (pathname.split("/").slice(2).join("/") || "home"),
    );
    setAttribution((previous) =>
      captureAttribution(previous, Object.fromEntries(params.entries())),
    );
    const selection = resolveSelection({
      plan: params.get("plan") ?? undefined,
      service: params.get("service") ?? undefined,
      campaign: params.get("campaign") ?? undefined,
    });
    if (params.has("plan") || params.has("service")) {
      setSelection(selection);
      setFinderResult((previous) =>
        previous?.serviceId === selection.serviceId &&
        previous?.packageId === selection.packageId
          ? previous
          : undefined,
      );
    } else if (selection.campaign)
      setSelection((previous) => ({
        ...previous,
        campaign: selection.campaign,
      }));
  }, [
    pathname,
    params,
    setEntryPageKey,
    setAttribution,
    setSelection,
    setFinderResult,
  ]);
  return null;
}

export function JourneyLink({
  locale,
  route,
  selection,
  children,
  className,
  cta,
  ...props
}: {
  locale: Locale;
  route: string;
  selection?: Selection;
  children: ReactNode;
  className?: string;
  cta?: (typeof ctaIds)[number];
  "aria-label"?: string;
  "data-testid"?: string;
  lang?: string;
  hrefLang?: string;
  "aria-current"?: "page";
}) {
  const context = useSelection();
  const pathname = usePathname();
  const routeKey = pathname.split("/").slice(2).join("/") || "home";
  const journey = useJourney();
  const params = useSearchParams();
  const chosen = selection
    ? { campaign: context.campaign, ...selection }
    : context;
  const href = journeyHref(locale, route, chosen);
  return (
    <Link
      {...props}
      href={href}
      className={className}
      onClick={() => {
        journey.setSelection(chosen);
        if (
          selection &&
          (selection.serviceId !== journey.finderResult?.serviceId ||
            selection.packageId !== journey.finderResult?.packageId)
        )
          journey.setFinderResult(undefined);
        journey.setAttribution(
          captureAttribution(
            journey.attribution,
            Object.fromEntries(params.entries()),
          ),
        );
        if (selection?.packageId)
          journey.analytics.emit({
            eventId: "package_selected",
            routeKey,
            locale,
            planId: selection.packageId,
            serviceId: selection.serviceId,
            campaign: chosen.campaign,
            is_demo: true,
          });
        if (cta)
          journey.analytics.emit({
            eventId: "primary_cta_clicked",
            routeKey,
            locale,
            ctaId: cta,
            planId: chosen.packageId,
            serviceId: chosen.serviceId,
            campaign: chosen.campaign,
            is_demo: true,
          });
      }}
    >
      {children}
    </Link>
  );
}
