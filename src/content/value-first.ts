import "server-only";
import type { Locale } from "../domain/types";
import {
  benefitDestinations,
  motivationDestinations,
  type BenefitId,
  type MotivationId,
} from "../domain/value-first";
import { editorialText } from "../lib/i18n/editorial";
import type { ClaimId } from "./content-review";

export const homeSectionOrder = [
  "hero",
  "reassurance",
  "benefits",
  "motivations",
  "service-value",
  "process",
  "packages",
  "evidence",
  "questions",
  "next-step",
] as const;
export const whySectionOrder = [
  "at-a-glance",
  "residency",
  "second-base",
  "financial-planning",
  "life-and-budget",
  "local-business",
  "considerations",
  "next-step",
] as const;

const benefitCopy: {
  id: BenefitId;
  title: string;
  body: string;
  qualification?: string;
  link: string;
  claimIds: ClaimId[];
}[] = [
  {
    id: "legal-base",
    title: "A legal base for life in Paraguay",
    body: "Residency can give you a legal basis to establish your life in Paraguay. Your status and documents determine the rights and obligations that apply.",
    link: "Understand residency and its stages",
    claimIds: ["legal-base"],
  },
  {
    id: "longer-term",
    title: "Plan beyond your first arrival",
    body: "A temporary residence can be a starting point for a longer term plan, with a route to permanent residency subject to the applicable requirements.",
    qualification:
      "A later status is not automatic. Confirm the process and your obligations before making commitments.",
    link: "Explore longer term residency planning",
    claimIds: ["longer-term"],
  },
  {
    id: "tax-planning",
    title: "Tax planning worth understanding",
    body: "Paraguay’s personal income tax focuses on Paraguayan source income. How your income is classified matters to the plan you make.",
    qualification:
      "Payment from abroad does not by itself establish that income is foreign source. Review your situation before making decisions.",
    link: "Explore individual tax questions",
    claimIds: ["income-source"],
  },
  {
    id: "life-and-budget",
    title: "Picture your life, not just your application",
    body: "Compare housing, healthcare, transport and schooling with the life you want to build. Plan for initial costs and the budget you will need over time.",
    link: "Plan your life and budget",
    claimIds: [],
  },
];
export function getBenefits(locale: Locale) {
  return benefitCopy.map((item) => ({
    ...item,
    ...benefitDestinations[item.id],
    title: editorialText(locale, item.title),
    body: editorialText(locale, item.body),
    qualification: item.qualification
      ? editorialText(locale, item.qualification)
      : undefined,
    link: editorialText(locale, item.link),
  }));
}

const motivationCopy: {
  id: MotivationId;
  title: string;
  body: string;
  link: string;
}[] = [
  {
    id: "move",
    title: "Move for myself or my family",
    body: "Explore what settling in could involve, from an arrival plan to the needs of each household member.",
    link: "Explore moving and settling in",
  },
  {
    id: "second-base",
    title: "Build a second base",
    body: "Understand the status, presence and continuing obligations to investigate before treating Paraguay as another base.",
    link: "Consider a second base",
  },
  {
    id: "local-business",
    title: "Start or operate a local business",
    body: "Separate company formation, accounting and banking questions from your personal residency decision.",
    link: "Explore a local business setup",
  },
  {
    id: "financial-planning",
    title: "Understand the financial implications",
    body: "Look at income source questions and the practical budget for your plans before choosing a service.",
    link: "Explore financial planning questions",
  },
];
export function getMotivations(locale: Locale) {
  return motivationCopy.map((item) => ({
    ...item,
    ...motivationDestinations[item.id],
    title: editorialText(locale, item.title),
    body: editorialText(locale, item.body),
    link: editorialText(locale, item.link),
  }));
}

const serviceValueCopy = [
  {
    title: "Preparation",
    body: "Organize the documents and questions to confirm before you travel or commit.",
    link: "See residency preparation support",
    route: "paraguay-residency",
  },
  {
    title: "Coordination",
    body: "Plan agreed local assistance around the steps that require your own involvement.",
    link: "Explore local coordination",
    route: "relocation",
  },
  {
    title: "Clear scope and costs",
    body: "Compare service fees, exclusions and external costs so you know what still needs a written quote.",
    link: "Compare package scope",
    route: "pricing",
  },
  {
    title: "Defined follow through",
    body: "Agree communication and aftercare responsibilities before proceeding, while authorities make their own decisions.",
    link: "Review support levels",
    route: "pricing",
  },
];
export function getServiceValues(locale: Locale) {
  return serviceValueCopy.map((item) => ({
    ...item,
    title: editorialText(locale, item.title),
    body: editorialText(locale, item.body),
    link: editorialText(locale, item.link),
  }));
}

const questions = [
  [
    "What could residency enable?",
    "Residency can provide a legal basis for life in Paraguay. Provisional status, temporary residency, identity documents and permanent residency are different stages with their own conditions. Confirm which rights and obligations apply to your actual status.",
  ],
  [
    "Is Paraguay the right fit for everyone?",
    "No destination fits every plan. Compare language needs, local steps, household priorities, income questions and an ongoing budget before deciding.",
  ],
  [
    "Can I use Paraguay as a second base?",
    "Start by confirming the presence and continuing obligations of the status you are considering. Do not assume that approval removes future responsibilities or creates a route to citizenship on a promised timeline.",
  ],
  [
    "Does receiving income from abroad settle my tax position?",
    "No. The payer’s location alone does not establish the income source. Activities, assets, rights and applicable rules matter. Immigration status and individual tax treatment require separate review.",
  ],
  [
    "What would I pay Paraguay Next to do?",
    "You would discuss an agreed scope of preparation and practical coordination. Compare the provisional packages and exclusions. Legal or tax advice requires an appropriately qualified provider; no authority decision is guaranteed.",
  ],
];
export function getValueQuestions(locale: Locale) {
  return questions.map(([question, answer]) => ({
    question: editorialText(locale, question),
    answer: editorialText(locale, answer),
  }));
}

export function getOutcomeIntro(route: string, locale: Locale) {
  const intros: Record<string, string> = {
    "paraguay-residency":
      "Build a legal base for life in Paraguay, with the rights and obligations of the status you obtain. Start by understanding the stages, then decide what preparation and local support you need.",
    "permanent-residency":
      "Plan for a longer term base in Paraguay. Moving from temporary to permanent residency depends on the applicable requirements and a separate process; it is not an automatic upgrade.",
    relocation:
      "Make the move work for your daily life. Explore housing, arrival logistics, healthcare and household priorities before choosing the practical support to coordinate.",
    "tax-planning":
      "Understand how your income and activities may fit Paraguay’s source rules before making financial decisions. A payment from abroad alone does not establish foreign source income, and immigration status does not settle your individual tax position.",
    "company-formation/paraguay":
      "Turn a local business idea into a set of decisions you can evaluate. Company formation, accounting, banking and personal residency are separate workstreams with their own requirements.",
  };
  return intros[route] ? editorialText(locale, intros[route]) : undefined;
}

export const valueFirstCopy = {
  descriptor: "Residency, Relocation & Business Setup",
  homeTitle: "A legal base in Paraguay. More options for your future.",
  homeIntro:
    "Considering a new home, a second base, or a local business? Explore what Paraguayan residency could offer, understand the costs and commitments, and get practical support to move forward.",
  exploreBenefits: "Explore the benefits",
  compareResidency: "Compare residency packages",
  quietBooking: "Already know what you need? Book a consultation",
  benefitsTitle: "What could Paraguay offer you?",
  motivationsTitle: "What are you planning?",
  motivationsIntro:
    "Explore the questions behind your plans. These starting points help you learn before choosing a service.",
  serviceValueEyebrow: "Why Paraguay Next",
  serviceValueTitle: "Turn the opportunity into a practical plan.",
  serviceValueIntro:
    "Understand the steps, prepare your questions and choose the level of practical support you need. Our proposed role is separate from the opportunities residency may offer.",
  packagesIntro: "Choose how much preparation and local support you need.",
  nextTitle: "See whether Paraguay fits your plans.",
  nextIntro:
    "Explore a starting point based on your needs, or go directly to the packages and their scope.",
  startingPoint: "Find my starting point",
  comparePackages: "Compare packages",
  whyTitle: "Why consider Paraguay for your next chapter?",
  whyIntro:
    "Paraguay may be worth considering if you are exploring a new home, a second base or a local business. Start with what residency could enable, then weigh the practical commitments, costs and questions that need individual review.",
  glanceTitle: "The opportunity at a glance",
  glanceIntro:
    "Consider a legal base, a longer term plan, the financial questions and the everyday life you want to build. None of these replaces a review of your circumstances.",
  residencyTitle: "What residency can enable",
  residencyBody:
    "Residency provides a legal basis to establish yourself in Paraguay under the conditions of the status granted. Provisional processing status, temporary residency and permanent residency are different; an application alone is not the same as approval.",
  residencyStages:
    "During a temporary residency application, the provisional status described by Migraciones can permit work, study and reentry while it remains valid. Temporary residency and access to an identity card have their own requirements and validity. Confirm the documents and conditions that apply to your stage.",
  residencyLimits:
    "Residency is distinct from citizenship. An identity document, a later residence category or any other right must not be assumed before its conditions are met.",
  residencyLink: "Explore residency support",
  guideLink: "Read the preparation guide",
  secondTitle: "Could Paraguay become a second base?",
  secondBody:
    "A second base is a practical commitment as well as a legal status. Ask what presence is required, which documents need keeping current and which responsibilities continue when you are elsewhere.",
  secondRoute:
    "Migraciones describes a route from temporary to permanent residency subject to its requirements. Permanent residency can permit indefinite residence once granted; the change of category requires its own process and decision.",
  secondQuestions:
    "Before planning around a status, confirm required local steps, continuing obligations and how a change in your circumstances would affect the plan. No minimum stay or citizenship timeline is promised here.",
  permanentLink: "Explore permanent residency planning",
  financialTitle: "Understand the financial implications",
  financialBody:
    "Paraguay’s personal income tax is based on Paraguayan source income. The classification can depend on where activities take place and how assets, rights or particular services relate to Paraguay.",
  financialQualification:
    "Payment from abroad does not by itself establish that income is foreign source. Review your situation before making decisions.",
  financialSeparate:
    "Keep three questions separate: your immigration status, your individual tax obligations, and the structure and obligations of any business. Other countries may also have rules relevant to you.",
  taxLink: "Discuss individual tax planning",
  budgetTitle: "Picture your life and budget",
  budgetIntro:
    "Build a budget around the places, people and routines that matter to you. Compare initial spending with recurring costs and confirm current options locally.",
  housing:
    "Housing: location, rent or purchase plans, deposits and the conditions of a contract.",
  utilities:
    "Utilities and internet: the services and reliability your household or work needs.",
  transport:
    "Transport: everyday journeys, vehicle needs and alternatives in your chosen area.",
  healthcare:
    "Healthcare: access, providers, coverage and ongoing needs for each person.",
  schooling:
    "Schooling, when relevant: location, language, admissions and the full cost of attendance.",
  relocation:
    "Relocation: travel, temporary accommodation, moving belongings and arrival logistics.",
  professionalCosts:
    "Professional and administrative costs: agreed service fees, official charges and document work.",
  ongoingCosts:
    "Ongoing obligations: renewals, maintenance and continuing professional or administrative support.",
  budgetPrompt:
    "Which costs recur? Which depend on each family member? Which decisions should wait until you have visited and checked the details?",
  relocationLink: "Explore practical relocation support",
  businessTitle: "Plan a local business as its own project",
  businessBody:
    "A business plan needs more than a company registration. Consider your intended activity, operating costs, records and professional responsibilities alongside your personal plans.",
  businessSeparate:
    "Company formation, accounting and banking are separate workstreams. Forming a company does not guarantee a bank account or determine your personal residence or tax treatment.",
  companyLink: "Explore company formation in Paraguay",
  accountingLink: "Review accounting support",
  bankingLink: "Review banking assistance",
  considerationsTitle: "What to weigh before deciding",
  considerationsBody:
    "Prepare documents before making commitments, confirm the steps requiring your presence, and decide how you will handle language needs. Review each household member’s circumstances and the budget for both arrival and ongoing life.",
  considerationsEnd:
    "A useful plan makes the unresolved questions visible. Confirm who will advise on legal or tax matters, who will coordinate practical work, and which responsibilities remain yours.",
  sourceR1: "Official source: Migraciones, temporary residency",
  sourceR2: "Official source: Migraciones, change to permanent residency",
  sourceR3: "Official source: DNIT, Law 6380/19, articles 47 to 49",
  draftNote:
    "Source linked for reference. Editorial draft; qualified professional review and approval are pending.",
  evidenceTitle: "Know who helps and what you would receive.",
  evidenceIntro:
    "The operator and any external professionals must be named in your agreed scope. These sample deliverables illustrate the proposed work, not past client results.",
  campaignPurpose:
    "Residency can provide a legal base for life in Paraguay, subject to your status and its conditions. Compare that purpose with the practical budget before choosing assistance.",
  familyOutcome:
    "A family move is about building daily life together. Consider housing, healthcare, schooling and language needs alongside each person’s documents and required local steps.",
  budgetLink: "Explore life and budget questions",
  whyLink: "Explore why Paraguay might fit your plans",
  aboutBrand:
    "Paraguay Next is the working brand for this website prototype. The business story, operating entity and people will be published once supplied and approved.",
} as const;

export function valueText(locale: Locale, key: keyof typeof valueFirstCopy) {
  return editorialText(locale, valueFirstCopy[key]);
}
