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
      "Official law retrieved directly; Articles 6, 21, 43, 47 through 49 and 57 inspected.",
  },
  R4: {
    url: "https://www.dnit.gov.py/documents/20123/422352/IRP%2BRGC-Alcance%2Bde%2Brentas%2Bgeneradas%2Ben%2Bel%2Bextranjero-N%C2%B0380%2BCNV.pdf/763e7d5f-e4ce-3a3a-bbcd-573661a2a19f?t=1691614729127.pdf",
    checkedAt: "2026-09-26",
    inspection:
      "Official nonbinding consultation 380 retrieved directly; foreign dividend treatment is fact specific.",
  },
  R5: {
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/single-member-limited-liability-companies",
    checkedAt: "2026-09-26",
    inspection:
      "Official IRS page inspected for single member LLC federal classification and corporate elections.",
  },
  R6: {
    url: "https://www.irs.gov/individuals/international-taxpayers/nonresident-aliens-exclusions-from-income",
    checkedAt: "2026-09-26",
    inspection:
      "Official IRS page inspected for foreign source income of nonresident aliens and the effectively connected income exception.",
  },
  R7: {
    url: "https://www.irs.gov/individuals/international-taxpayers/source-of-income-personal-service-income",
    checkedAt: "2026-09-26",
    inspection:
      "Official IRS page inspected for sourcing personal service income by where work is performed.",
  },
  R8: {
    url: "https://www.irs.gov/individuals/international-taxpayers/effectively-connected-income-eci",
    checkedAt: "2026-09-26",
    inspection:
      "Official IRS page inspected for US trade or business connections and foreign source income that may be effectively connected.",
  },
  R9: {
    url: "https://www.irs.gov/instructions/i5472",
    checkedAt: "2026-09-26",
    inspection:
      "Official Form 5472 instructions inspected for foreign owned US disregarded entities, reportable transactions and pro forma Form 1120 filing.",
  },
  R10: {
    url: "https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-about-international-individual-tax-matters",
    checkedAt: "2026-09-26",
    inspection:
      "Official IRS international individual tax questions inspected for worldwide income obligations of US citizens and residents.",
  },
  R11: {
    url: "https://www.mic.gov.py/eas-sa-y-srl-en-que-se-diferencian-estas-tres-constituciones-de-empresas/",
    checkedAt: "2026-09-26",
    inspection:
      "Official MIC company form comparison retrieved directly for EAS, SA and SRL distinctions.",
  },
  R12: {
    url: "https://www.dnit.gov.py/en/web/portal-institucional/certificado-de-residencia-fiscal-para-fines-tributarios",
    checkedAt: "2026-09-26",
    inspection:
      "Official DNIT fiscal residence certificate page retrieved directly for the separate certification process.",
  },
  R13: {
    url: "https://www.dnit.gov.py/documents/20123/202522/Resoluci%C3%B3n%2BGeneral%2BN%C2%B065-2020.pdf/e5fb7814-34fc-4744-96c8-d99aee6d9d54?t=1684165234838",
    checkedAt: "2026-09-26",
    inspection:
      "Official DNIT General Resolution 65/2020 retrieved directly; certificate purpose and supporting documentation inspected.",
  },
} as const;

export const claimDefinitions = {
  "legal-base": { sourceIds: ["R1"], professional: true, operator: false },
  "longer-term": { sourceIds: ["R2"], professional: true, operator: false },
  "income-source": { sourceIds: ["R3"], professional: true, operator: false },
  "foreign-dividends": {
    sourceIds: ["R3", "R4"],
    professional: true,
    operator: false,
  },
  "us-llc-income": {
    sourceIds: ["R5", "R6", "R7", "R8", "R9", "R10"],
    professional: true,
    operator: false,
  },
  "paraguay-company-tax": {
    sourceIds: ["R3", "R11"],
    professional: true,
    operator: false,
  },
  "tax-residency-boundary": {
    sourceIds: ["R10", "R12", "R13"],
    professional: true,
    operator: false,
  },
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
    "foreign-dividends",
    "us-llc-income",
    "tax-residency-boundary",
    "life-planning",
    "business-planning",
    "service-delivery",
  ],
  "why-paraguay": [
    "legal-base",
    "longer-term",
    "income-source",
    "foreign-dividends",
    "us-llc-income",
    "paraguay-company-tax",
    "tax-residency-boundary",
    "life-planning",
    "business-planning",
    "service-delivery",
  ],
  "paraguay-residency": ["legal-base", "service-delivery"],
  "permanent-residency": ["longer-term", "service-delivery"],
  "tax-planning": [
    "income-source",
    "foreign-dividends",
    "us-llc-income",
    "paraguay-company-tax",
    "tax-residency-boundary",
    "service-delivery",
  ],
  relocation: ["life-planning", "service-delivery"],
  "company-formation/us": [
    "income-source",
    "us-llc-income",
    "tax-residency-boundary",
    "service-delivery",
  ],
  "company-formation/paraguay": [
    "business-planning",
    "paraguay-company-tax",
    "tax-residency-boundary",
    "service-delivery",
  ],
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
