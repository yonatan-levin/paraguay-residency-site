"use client";

import {
  createContext,
  useCallback,
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
type SelectionState = { value: Selection; pendingFrom?: string };

function useJourneyState() {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    value: {},
  });
  const setSelection = useCallback((value: Selection) => {
    setSelectionState({ value });
  }, []);
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
    selectionState,
    setSelectionState,
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
  const pathname = usePathname();
  const params = useSearchParams();
  const { selectionState } = useJourney();
  const selection = selectionState.value;
  // An explicit choice, including an empty one, wins while its old URL is loading.
  if (selectionState.pendingFrom === `${pathname}?${params}`) return selection;
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

export function useChooseSelection() {
  const pathname = usePathname();
  const params = useSearchParams();
  const { setSelectionState } = useJourney();
  return (value: Selection) => {
    setSelectionState({ value, pendingFrom: `${pathname}?${params}` });
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
  const {
    setEntryPageKey,
    setAttribution,
    setSelectionState,
    selectionState,
    setFinderResult,
  } = useJourney();
  const pendingFrom = selectionState.pendingFrom;
  const sourceUrl = `${pathname}?${params}`;
  useEffect(() => {
    setEntryPageKey(
      (previous) =>
        previous ?? (pathname.split("/").slice(2).join("/") || "home"),
    );
    setAttribution((previous) =>
      captureAttribution(previous, Object.fromEntries(params.entries())),
    );
    if (pendingFrom === sourceUrl) return;
    const selection = resolveSelection({
      plan: params.get("plan") ?? undefined,
      service: params.get("service") ?? undefined,
      campaign: params.get("campaign") ?? undefined,
    });
    const hasSelection = params.has("plan") || params.has("service");
    setSelectionState((previous) => {
      // A stale URL effect must not replace a newer explicit choice. Leaving its
      // source URL permanently retires the override, including Back/Forward.
      if (previous.pendingFrom === sourceUrl) return previous;
      return {
        value: hasSelection
          ? selection
          : selection.campaign
            ? { ...previous.value, campaign: selection.campaign }
            : previous.value,
      };
    });
    if (hasSelection) {
      setFinderResult((previous) =>
        previous?.serviceId === selection.serviceId &&
        previous?.packageId === selection.packageId
          ? previous
          : undefined,
      );
    }
  }, [
    pathname,
    params,
    setEntryPageKey,
    setAttribution,
    setSelectionState,
    setFinderResult,
    pendingFrom,
    sourceUrl,
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
  const chooseSelection = useChooseSelection();
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
      // Next excludes modified clicks so another tab cannot change this journey.
      onNavigate={() => {
        chooseSelection(chosen);
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
