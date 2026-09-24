import { localized, localizedList } from "../lib/i18n/common";
import type {
  Localized,
  Package,
  Price,
  PriceBasis,
  Service,
} from "../domain/types";

const sourceCheckedAt = "2026-09-23"; // Date supplied by the benchmark handoff; not a legal review date.
const externalCosts: Localized<string[]> = localizedList([
  "Government charges and external professional fees are not confirmed.",
  "Travel, translations and document legalization are separate unless agreed.",
]);
const serviceSeeds: [string, string, Service["category"], string, string][] = [
  [
    "temporary-residency",
    "paraguay-residency",
    "residency",
    "First residency",
    "Primera residencia",
  ],
  [
    "permanent-residency",
    "permanent-residency",
    "residency",
    "Permanent residency upgrade",
    "Cambio a residencia permanente",
  ],
  [
    "investor-residency",
    "investor-residency",
    "residency",
    "Investment route discussion",
    "Consulta sobre vía de inversión",
  ],
  [
    "business-route",
    "investor-residency",
    "business",
    "Business route discussion",
    "Consulta sobre vía empresarial",
  ],
  [
    "relocation",
    "relocation",
    "relocation",
    "Relocation support",
    "Apoyo para la mudanza",
  ],
  [
    "us-company",
    "company-formation/us",
    "business",
    "U.S. company setup",
    "Creación de empresa en EE. UU.",
  ],
  [
    "paraguay-company",
    "company-formation/paraguay",
    "business",
    "Paraguay company setup",
    "Creación de empresa en Paraguay",
  ],
  [
    "accounting",
    "accounting",
    "business",
    "Accounting support",
    "Apoyo contable",
  ],
  [
    "tax-planning",
    "tax-planning",
    "business",
    "Tax consultation",
    "Consulta fiscal",
  ],
  [
    "property-assistance",
    "real-estate",
    "support",
    "Property assistance",
    "Asistencia inmobiliaria",
  ],
  [
    "banking",
    "banking",
    "support",
    "Banking assistance",
    "Asistencia bancaria",
  ],
  [
    "driving-license",
    "driving-license",
    "support",
    "Driving license assistance",
    "Asistencia para licencia de conducir",
  ],
  [
    "retirement",
    "retire-in-paraguay",
    "relocation",
    "Retirement relocation support",
    "Apoyo para mudanza por jubilación",
  ],
  [
    "citizenship-guidance",
    "citizenship-guidance",
    "support",
    "Citizenship guidance",
    "Orientación sobre ciudadanía",
  ],
];
export const services: Service[] = serviceSeeds.map(
  ([id, routeKey, category, en]) => ({
    id,
    routeKey,
    category,
    name: localized(en),
    relatedServices:
      id === "temporary-residency"
        ? ["relocation", "permanent-residency"]
        : ["temporary-residency"],
    scope: localizedList([
      "An initial scope discussion and a preparation plan to confirm.",
    ]),
    exclusions: externalCosts,
    approved: false,
    review: { sourceUrls: [], status: "draft" },
  }),
);

function fixed(
  amountMinor: number,
  basis: PriceBasis = "per-engagement",
): Price {
  return {
    type: "fixed",
    amountMinor,
    currency: "USD",
    basis,
    provisional: true,
    inclusions: {
      service: "included",
      government: "unknown",
      travel: "excluded",
      professional: "unknown",
      aftercare: "unknown",
    },
  };
}
function range(minMinor: number, maxMinor: number, basis: PriceBasis): Price {
  return { ...fixed(minMinor, basis), type: "range", minMinor, maxMinor };
}
function quote(): Price {
  return {
    type: "quote",
    currency: "USD",
    basis: "per-engagement",
    provisional: true,
    inclusions: { government: "unknown", professional: "unknown" },
  };
}
const firstFeatures: Record<string, Localized<string[]>> = {
  essential: localizedList([
    "Guidance on document organization",
    "Preparation checklist",
    "Questions before local steps",
  ]),
  guided: localizedList([
    "Support with document organization",
    "Appointment coordination",
    "Guidance through local steps",
    "Aftercare scope agreed in advance",
  ]),
  concierge: localizedList([
    "Dedicated coordination plan",
    "Local logistical assistance",
    "More personal communication",
    "Personalized aftercare scope",
  ]),
};
function pkg(
  id: string,
  serviceId: string,
  tier: string,
  en: string,
  _es: string,
  price: Price,
  features?: Localized<string[]>,
): Package {
  const localizedFeatures =
    features ??
    localizedList([
      "Scope and preparation discussion",
      "Coordination responsibilities agreed before engagement",
      "External costs identified separately",
    ]);
  return {
    id,
    serviceId,
    tier,
    name: localized(en),
    price,
    featureIds: localizedFeatures.en.map(
      (_, index) => `${id}-feature-${index + 1}`,
    ),
    features: localizedFeatures,
    dependencies: externalCosts,
    commercialApproved: false,
  };
}
export const packages: Package[] = [
  pkg(
    "temporary-essential",
    "temporary-residency",
    "essential",
    "Essential",
    "Esencial",
    fixed(220000, "per-applicant"),
    firstFeatures.essential,
  ),
  pkg(
    "temporary-guided",
    "temporary-residency",
    "guided",
    "Guided",
    "Guiado",
    fixed(285000, "per-applicant"),
    firstFeatures.guided,
  ),
  pkg(
    "temporary-concierge",
    "temporary-residency",
    "concierge",
    "Concierge",
    "Concierge",
    fixed(450000, "per-applicant"),
    firstFeatures.concierge,
  ),
  pkg(
    "upgrade-basic",
    "permanent-residency",
    "basic",
    "Upgrade support",
    "Apoyo para el cambio",
    fixed(140000),
  ),
  pkg(
    "upgrade-premium",
    "permanent-residency",
    "premium",
    "Coordinated upgrade",
    "Cambio coordinado",
    fixed(240000),
  ),
  pkg(
    "investor-support",
    "investor-residency",
    "specialist",
    "Investor support",
    "Apoyo al inversor",
    fixed(450000),
  ),
  pkg(
    "business-route-support",
    "business-route",
    "specialist",
    "Business route support",
    "Apoyo a la vía empresarial",
    fixed(550000),
  ),
  pkg(
    "relocation-orientation",
    "relocation",
    "orientation",
    "Orientation",
    "Orientación",
    fixed(50000),
  ),
  pkg(
    "relocation-integration",
    "relocation",
    "integration",
    "Integration",
    "Integración",
    fixed(150000),
  ),
  pkg(
    "relocation-priority",
    "relocation",
    "priority",
    "Priority coordination",
    "Coordinación prioritaria",
    fixed(350000),
  ),
  pkg(
    "us-business-setup",
    "us-company",
    "setup",
    "U.S. business setup",
    "Creación de empresa en EE. UU.",
    fixed(150000),
  ),
  pkg(
    "paraguay-company-setup",
    "paraguay-company",
    "setup",
    "Paraguay company setup",
    "Creación de empresa en Paraguay",
    fixed(100000),
  ),
  pkg(
    "accounting",
    "accounting",
    "scoped",
    "Accounting",
    "Contabilidad",
    range(9000, 22000, "monthly"),
  ),
  pkg(
    "tax-planning",
    "tax-planning",
    "scoped",
    "Tax consultation",
    "Consulta fiscal",
    range(30000, 100000, "per-engagement"),
  ),
  pkg(
    "property-assistance",
    "property-assistance",
    "scoped",
    "Property assistance",
    "Asistencia inmobiliaria",
    fixed(150000),
  ),
  pkg(
    "banking-assistance",
    "banking",
    "quote",
    "Banking assistance",
    "Asistencia bancaria",
    quote(),
  ),
  pkg(
    "driving-license-assistance",
    "driving-license",
    "quote",
    "Driving license assistance",
    "Asistencia para licencia de conducir",
    quote(),
  ),
  pkg(
    "retirement-support",
    "retirement",
    "quote",
    "Retirement support",
    "Apoyo para la jubilación",
    quote(),
  ),
  pkg(
    "citizenship-guidance",
    "citizenship-guidance",
    "quote",
    "Citizenship guidance",
    "Orientación sobre ciudadanía",
    quote(),
  ),
];
export const priceBenchmarkReview = {
  sourceUrls: [
    "https://weparaguay.com/paraguay-residency-packages-pricing/",
    "https://weparaguay.com/local-concierge-paraguay/",
  ],
  sourceCheckedAt,
  status: "draft" as const,
};
export const getPackage = (id: string | undefined) =>
  packages.find((item) => item.id === id);
export const getService = (id: string | undefined) =>
  services.find((item) => item.id === id);
