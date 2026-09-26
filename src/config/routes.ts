import { supportedLocales } from "./locales";
import { localized } from "../lib/i18n/common";
import type { Locale, PageDefinition } from "../domain/types";
type RouteSeed = [
  string,
  PageDefinition["template"],
  string,
  string,
  string?,
  string?,
];
const routeSeeds: RouteSeed[] = [
  [
    "home",
    "home",
    "Your Paraguay residency, clearly planned",
    "Explore provisional residency packages, practical preparation and coordinated support for your next chapter.",
    "Tu residencia en Paraguay, con un plan claro",
    "Explora paquetes provisionales, preparación práctica y apoyo coordinado para tu próximo capítulo.",
  ],
  [
    "paraguay-residency",
    "service",
    "Paraguay Residency Assistance",
    "Understand preparation, local coordination, required visits and the limits of residency assistance.",
    "Asistencia para residencia en Paraguay",
    "Conoce la preparación, coordinación local, visitas necesarias y límites de la asistencia para residencia.",
  ],
  [
    "pricing",
    "pricing",
    "Paraguay Residency Packages & Costs",
    "Compare provisional support levels, included assistance and external costs before choosing a conversation.",
    "Paquetes y costos de residencia en Paraguay",
    "Compara niveles de apoyo provisionales, asistencia y costos externos antes de elegir una conversación.",
  ],
  [
    "find-my-plan",
    "finder",
    "Find your starting point",
    "Explore a short guide to support options based on your needs, without a contact gate or eligibility promise.",
    "Encuentra tu punto de partida",
    "Explora una guía breve de opciones de apoyo sin entregar datos de contacto ni promesas de elegibilidad.",
  ],
  [
    "book",
    "book",
    "Discuss your Paraguay plan",
    "Request a conversation or select a simulated consultation time with your chosen plan in view.",
    "Conversemos sobre tu plan en Paraguay",
    "Solicita una conversación o elige un horario simulado con tu plan seleccionado a la vista.",
  ],
  [
    "thank-you",
    "receipt",
    "Your demo request",
    "Review the context of your simulated request. No message or appointment is sent or booked.",
    "Tu solicitud de demostración",
    "Revisa tu solicitud simulada. No se envía ningún mensaje ni se reserva una cita.",
  ],
  [
    "services",
    "service",
    "Residency, Relocation & Business Services",
    "Explore scoped assistance for residency, settling in, business needs and related professional consultations.",
  ],
  [
    "permanent-residency",
    "service",
    "Permanent residency Upgrade Support",
    "Prepare questions about a future residency upgrade and agree the appropriate support scope.",
  ],
  [
    "investor-residency",
    "service",
    "Investment & Business Route Discussion",
    "Separate specialist route advice from qualifying capital, government charges and ongoing obligations.",
  ],
  [
    "relocation",
    "service",
    "Paraguay Relocation Support",
    "Plan arrival logistics, orientation and assistance with settling in with clearly scoped support.",
  ],
  [
    "tax-planning",
    "service",
    "Tax Consultation for Your Paraguay Plans",
    "Organize tax questions across jurisdictions for qualified professional review without automatic tax promises.",
  ],
  [
    "company-formation/paraguay",
    "service",
    "Paraguay Company Formation Support",
    "Discuss local company setup coordination, external professional fees and ongoing administration.",
  ],
  [
    "company-formation/us",
    "service",
    "U.S. Company Setup Coordination",
    "Explore a scoped setup discussion and questions about banking, tax and continuing obligations.",
  ],
  [
    "accounting",
    "service",
    "Accounting Support & Scope",
    "Clarify bookkeeping needs, reporting responsibilities and the basis of a scoped monthly engagement.",
  ],
  [
    "banking",
    "service",
    "Banking Application Assistance",
    "Prepare questions and application material for a bank’s independent review without guaranteed account opening.",
  ],
  [
    "real-estate",
    "service",
    "Paraguay Property Assistance",
    "Scope search coordination and viewing support while separating legal checks and property decisions.",
  ],
  [
    "driving-license",
    "service",
    "Driving license Assistance",
    "Discuss preparation of local documents and the requirements to confirm before arranging assistance.",
  ],
  [
    "retire-in-paraguay",
    "service",
    "Retirement Relocation Support",
    "Plan practical questions about everyday life, access to services and a supported move to Paraguay.",
  ],
  [
    "citizenship-guidance",
    "service",
    "Citizenship Guidance & Professional Review",
    "Organize questions for a qualified professional; no automatic eligibility or outcome is promised.",
  ],
  [
    "guides",
    "guide",
    "Practical Paraguay Preparation Guides",
    "Read useful preparation questions and identify what to confirm before planning travel or professional assistance.",
  ],
  [
    "guides/residency-requirements",
    "guide",
    "Preparing for Paraguay Residency",
    "Documents and questions to resolve before travel, with review boundaries and links to official sources.",
  ],
  [
    "about",
    "about",
    "About the Studio & Responsibilities",
    "Understand the working brand, provisional service responsibilities and the people details awaiting approval.",
  ],
  [
    "contact",
    "contact",
    "Start a Conversation",
    "Choose a simulated consultation or preview a contextual message while contact details await approval.",
    "Inicia una conversación",
    "Elige una consulta simulada o previsualiza un mensaje contextual mientras se aprueban los datos de contacto.",
  ],
  [
    "lp/residency-cost",
    "campaign",
    "Understand the Cost Before You Plan Your Move",
    "Compare support fees, external costs and open questions before planning your Paraguay residency journey.",
    "Comprende los costos antes de planificar tu mudanza",
    "Compara honorarios, costos externos y preguntas pendientes antes de planificar tu residencia en Paraguay.",
  ],
  [
    "lp/family-relocation",
    "campaign",
    "Plan Your Family’s Move to Paraguay with Clarity",
    "Explore coordinated family preparation and relocation assistance with a tailored household quote.",
    "Planifica la mudanza de tu familia a Paraguay con claridad",
    "Explora preparación familiar coordinada y asistencia para la mudanza con un presupuesto personalizado.",
  ],
  [
    "links",
    "links",
    "Your Next Step in Paraguay",
    "Choose residency packages, family relocation, a consultation or a local message preview.",
    "Tu próximo paso en Paraguay",
    "Elige paquetes de residencia, mudanza familiar, una consulta o una vista previa de mensaje.",
  ],
  [
    "privacy",
    "policy",
    "Privacy Notice: Preview Draft",
    "Understand how this local prototype handles test details and which privacy decisions remain for launch.",
  ],
  [
    "terms",
    "policy",
    "Terms: Preview Draft",
    "Read the provisional terms boundary for this website demonstration, which does not create a contract.",
  ],
  [
    "disclaimer",
    "policy",
    "Service Disclaimer: Preview Draft",
    "Understand the limits of general information, provisional offers and independent professional decisions.",
  ],
  [
    "internal/rtl",
    "fixture",
    "Internal RTL Layout Check",
    "A layout fixture for direction and mixed scripts that is excluded from indexing, for prototype verification.",
  ],
];
const noindexTemplates = new Set<PageDefinition["template"]>([
  "finder",
  "book",
  "receipt",
  "campaign",
  "links",
  "policy",
  "fixture",
]);
export const pages: PageDefinition[] = routeSeeds.map(
  ([key, template, title, description]) => ({
    key,
    path: key === "home" ? "" : key,
    locales: template === "fixture" ? ["en"] : [...supportedLocales],
    template,
    title:
      template === "fixture"
        ? { en: title, es: title, fr: title, de: title, he: title }
        : localized(title),
    description:
      template === "fixture"
        ? {
            en: description,
            es: description,
            fr: description,
            de: description,
            he: description,
          }
        : localized(description),
    indexable: !noindexTemplates.has(template),
    approved: false,
    commercialApproved: false,
    requiresCommercialApproval: [
      "home",
      "service",
      "pricing",
      "campaign",
    ].includes(template),
    contentReviewed: false,
    cta: { routeKey: "book" },
  }),
);
export function getPage(
  key: string,
  locale?: Locale,
): PageDefinition | undefined {
  return pages.find(
    (page) =>
      (page.key === key || page.path === key) &&
      (!locale || page.locales.includes(locale)),
  );
}
export function routePath(locale: Locale, key: string): string {
  const page = getPage(key, locale);
  if (!page)
    throw new Error(`No published ${locale} equivalent for route ${key}`);
  return `/${locale}${page.path ? `/${page.path}` : ""}`;
}
