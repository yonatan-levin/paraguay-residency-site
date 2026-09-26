import type { ContentReview, Locale } from "../domain/types.ts";

export const regulatorySources = {
  R1: {
    url: "https://migraciones.gov.py/residencia-temporal/",
    checkedAt: "2026-09-26",
    inspection:
      "Official search snapshot and supplied brief; direct page retrieval timed out.",
  },
  R2: {
    url: "https://migraciones.gov.py/residencia-permanente-para-el-cambio-de-categoria-de-residente-temporal/",
    checkedAt: "2026-09-26",
    inspection: "Official page retrieved directly.",
  },
  R3: {
    url: "https://www.dnit.gov.py/en/web/portal-institucional/w/ley-n-6380-19",
    checkedAt: "2026-09-26",
    inspection:
      "Official law retrieved directly; Articles 47 through 49 inspected.",
  },
} as const;

export const claimDefinitions = {
  "legal-base": { sourceIds: ["R1"], professional: true, operator: false },
  "longer-term": { sourceIds: ["R2"], professional: true, operator: false },
  "income-source": { sourceIds: ["R3"], professional: true, operator: false },
  "service-delivery": { sourceIds: [], professional: false, operator: true },
  "life-planning": { sourceIds: [], professional: false, operator: true },
  "business-planning": { sourceIds: [], professional: false, operator: true },
} as const;
export type ClaimId = keyof typeof claimDefinitions;
export interface ClaimApproval {
  status: "draft" | "approved";
  reviewer?: string;
  approvedAt?: string;
}
export interface ClaimReview {
  content: ContentReview;
  operator: ClaimApproval;
  translations: Partial<Record<Locale, ClaimApproval>>;
}
export type ClaimReviews = Partial<Record<ClaimId, ClaimReview>>;

// Source inspection is evidence for a draft, not professional or operator approval.
export const claimReviews: ClaimReviews = Object.fromEntries(
  Object.entries(claimDefinitions).map(([id, definition]) => [
    id,
    {
      content: {
        sourceUrls: definition.sourceIds.map(
          (sourceId) => regulatorySources[sourceId].url,
        ),
        ...(definition.sourceIds.length
          ? {
              sourceCheckedAt:
                regulatorySources[definition.sourceIds[0]!].checkedAt,
            }
          : {}),
        status: "draft",
      },
      operator: { status: "draft" },
      translations: {},
    },
  ]),
);

// This independent list prevents deleting a page's declaration from bypassing review.
export const pageClaimDependencies: Record<string, readonly ClaimId[]> = {
  home: [
    "legal-base",
    "longer-term",
    "income-source",
    "life-planning",
    "business-planning",
    "service-delivery",
  ],
  "why-paraguay": [
    "legal-base",
    "longer-term",
    "income-source",
    "life-planning",
    "business-planning",
    "service-delivery",
  ],
  "paraguay-residency": ["legal-base", "service-delivery"],
  "permanent-residency": ["longer-term", "service-delivery"],
  "tax-planning": ["income-source", "service-delivery"],
  relocation: ["life-planning", "service-delivery"],
  "company-formation/paraguay": ["business-planning", "service-delivery"],
  pricing: ["service-delivery"],
  "find-my-plan": ["service-delivery"],
  "lp/residency-cost": ["legal-base", "service-delivery"],
  "lp/family-relocation": ["life-planning", "service-delivery"],
  "guides/residency-requirements": ["legal-base", "service-delivery"],
  guides: ["service-delivery"],
  services: ["service-delivery"],
  about: ["service-delivery"],
  links: ["service-delivery"],
};
type ClaimPage = { key: string; claimIds?: readonly string[] };

function present(value: string | undefined): boolean {
  return Boolean(value?.trim());
}
function dated(value: string | undefined): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function validatePageClaims(
  page: ClaimPage,
  locale: Locale,
  reviews: ClaimReviews = claimReviews,
): string[] {
  const expected = pageClaimDependencies[page.key];
  if (expected && !page.claimIds)
    return [`${page.key}: claim dependencies are missing.`];
  const errors: string[] = [];
  for (const id of expected ?? []) {
    if (!page.claimIds?.includes(id))
      errors.push(`${id}: page dependency is missing.`);
  }
  for (const id of new Set(page.claimIds ?? [])) {
    if (!Object.hasOwn(claimDefinitions, id)) {
      errors.push(`${id}: claim is not registered.`);
      continue;
    }
    const definition = claimDefinitions[id as ClaimId];
    const record = reviews[id as ClaimId];
    if (!record) {
      errors.push(`${id}: review record is missing.`);
      continue;
    }
    const review = record.content;
    if (definition.sourceIds.length) {
      if (
        !definition.sourceIds.every((sourceId) =>
          review.sourceUrls.includes(regulatorySources[sourceId].url),
        )
      )
        errors.push(`${id}: official source is missing.`);
      if (!dated(review.sourceCheckedAt))
        errors.push(`${id}: source check date is missing or invalid.`);
    }
    const reviewKind = definition.professional ? "professional" : "editorial";
    if (review.status !== "reviewed")
      errors.push(`${id}: ${reviewKind} review is pending.`);
    if (!present(review.author)) errors.push(`${id}: author is missing.`);
    if (!present(review.reviewer))
      errors.push(`${id}: ${reviewKind} reviewer is missing.`);
    if (!dated(review.approvedAt))
      errors.push(`${id}: ${reviewKind} review date is missing or invalid.`);
    if (definition.operator) {
      if (record.operator.status !== "approved")
        errors.push(`${id}: operator approval is pending.`);
      if (!present(record.operator.reviewer))
        errors.push(`${id}: operator approver is missing.`);
      if (!dated(record.operator.approvedAt))
        errors.push(`${id}: operator approval date is missing or invalid.`);
    }
    const translation = record.translations[locale];
    if (translation?.status !== "approved")
      errors.push(`${id}: ${locale} translation approval is pending.`);
    if (!present(translation?.reviewer))
      errors.push(`${id}: ${locale} translation reviewer is missing.`);
    if (!dated(translation?.approvedAt))
      errors.push(
        `${id}: ${locale} translation approval date is missing or invalid.`,
      );
  }
  return errors;
}

export function validateContentLaunch(
  pages: readonly ClaimPage[],
  locales: readonly Locale[],
  reviews: ClaimReviews = claimReviews,
): string[] {
  return [
    ...new Set(
      pages.flatMap((page) =>
        locales.flatMap((locale) => validatePageClaims(page, locale, reviews)),
      ),
    ),
  ];
}
