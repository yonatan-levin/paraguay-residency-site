import { editorialText } from "../lib/i18n/editorial";
import type { Locale } from "../domain/types";
export const guide = {
  title:
    "Preparing for Paraguay residency: documents and questions to resolve before travel.",
  summary:
    "A practical way to organize your first conversation, document inventory, and travel questions. This is a preparation guide, not a definitive legal checklist or an eligibility assessment.",
  sections: [
    {
      id: "define-your-starting-point",
      title: "Start with the decision you are trying to make",
      paragraphs: [
        "Write a short description of your intended move: who is considering it, your current stage, and what you need to understand before proceeding. Separate a first residency inquiry from an upgrade question, business plan, or request only for relocation. This helps the first conversation focus on the right service.",
        "List the decisions that depend on an answer, such as whether to arrange an exploratory visit, obtain replacement records, or coordinate a family move. Treat an intended travel month as a planning preference, not an approval deadline.",
        "The plan finder can suggest a support level from your preferences. It cannot assess legal eligibility or replace an individual review by the professional responsible for your case.",
      ],
    },
    {
      id: "build-a-document-inventory",
      title: "Make an inventory before ordering documents",
      paragraphs: [
        "Start with what you already hold. Organize your private notes into broad categories such as identity, civil or family records, current residency records, and other background evidence a professional may ask about. These categories are conversation prompts; they are not a statement that every item is required.",
        "For each existing record, note its issuing authority, language, issue date, and whether you hold an original or copy. Flag differences in spelling or personal details for the reviewer to assess. Avoid trying to correct or replace records based only on an online checklist.",
        "Ask which exact documents apply to each person, where they should be obtained, and whether timing affects acceptance. Confirm the answer before paying for new copies. This guide does not specify validity periods, national exceptions, or a universal document list.",
      ],
    },
    {
      id: "confirm-document-handling",
      title: "Confirm format, translation, and handling",
      paragraphs: [
        "Have the responsible professional explain the accepted version of each document, any translation or legalization process, who may perform it, and the sequence in which work should happen. A document being available in one format does not establish that it will be accepted for your intended process.",
        "Ask who needs to see the original, who keeps a copy, how it will be shared, and how it will be returned or deleted. Keep personal records under your control until the live provider and secure handover process are confirmed.",
        "This preview does not collect passports, records, or financial documents. Use test contact details in the inquiry and do not put identification numbers, medical information, or document contents into the notes field.",
      ],
    },
    {
      id: "plan-travel-around-confirmed-steps",
      title: "Plan travel around confirmed steps",
      paragraphs: [
        "Ask which steps require your presence, what must be ready before an appointment can be arranged, and which parts may depend on a third party. Do not treat a proposed coordination schedule as a guaranteed government timetable.",
        "Keep required time in the country separate from total elapsed processing. Ask what happens if an appointment moves, a document needs further review, or you need to leave before an external decision is available.",
        "Before making arrangements that cannot be refunded, confirm the assumptions behind the proposed visit and consider a contingency budget. A higher support package can change the assistance you receive; it does not buy a different official decision or privileged processing.",
      ],
    },
    {
      id: "coordinate-a-family-move",
      title: "Give each family member a place in the plan",
      paragraphs: [
        "Create a separate question list for each person and another for shared logistics. Ask the professional to confirm the treatment of each family member’s circumstances and records instead of assuming that one person’s preparation list applies to everyone.",
        "Consider everyday planning questions alongside the application discussion: arrival arrangements, housing needs, routines, accessibility, and the external services you want to investigate. School, healthcare, insurance, and housing suitability should be checked with the relevant providers.",
        "Request a family quote with individual and shared items explained. A displayed service price for one applicant should not be multiplied into a household total when dependent pricing, external charges, and shared work have not been agreed.",
      ],
    },
    {
      id: "separate-the-costs",
      title: "Separate the service fee from the full move budget",
      paragraphs: [
        "Ask for a written scope that distinguishes the provider’s assistance from government charges, translations, legalization, travel, accommodation, and external professional fees. For each item, identify whether it is included, excluded, optional, or still to be confirmed.",
        "Record work performed once separately from recurring support. Clarify what follow up is included, when the engagement ends, and how extra work would be quoted. A preview price is illustrative and is not an approved offer or a complete relocation budget.",
        "If an investment or business route is being discussed, keep coordination charges separate from capital, business operating costs, and continuing obligations. Ask the appropriate professionals to review those questions before making commitments.",
      ],
    },
    {
      id: "agree-responsibilities",
      title: "Leave the first conversation with clear responsibilities",
      paragraphs: [
        "Ask who coordinates your case, who provides any regulated advice, and which decisions belong to an authority or other provider. Request the actual names, responsibilities, and professional credentials where relevant before entering a live engagement.",
        "Agree the next actions: which questions remain unanswered, who will resolve each one, and how you will receive updates. Clarify the contact method, availability, handling of unexpected changes, and any cancellation or refund terms.",
        "Your useful next step may be a preparation review, a family quote, a permanent residency discussion, or a separate tax or relocation consultation. Choose the service that answers the immediate question; you do not need to settle every part of a move in one inquiry.",
      ],
    },
    {
      id: "check-current-information",
      title: "Check official information and obtain individual review",
      paragraphs: [
        "Use official sources as starting points for current information, then ask the responsible professional to explain how the applicable instructions relate to your circumstances. Save the relevant source and the date of the advice you actually receive.",
        "The reference links below identify official organizations. They have not been used here to establish a document list, eligibility test, processing deadline, or legal conclusion. No qualified reviewer or review date is claimed for this draft.",
        "If information appears inconsistent, ask for clarification before ordering documents, paying a third party, or booking travel. This guide is intended to make that conversation more useful, not to replace it.",
      ],
    },
  ],
  sources: [
    {
      label: "Dirección Nacional de Migraciones: official reference website",
      url: "https://migraciones.gov.py/",
    },
    {
      label: "Ministerio de Relaciones Exteriores: official reference website",
      url: "https://www.mre.gov.py/",
    },
  ],
  reviewNote:
    "Draft preview content. No qualified legal review has been completed and no reviewer or review date is asserted. Official links are reference starting points only; confirm current instructions and individual requirements before relying on them.",
};

export function getGuide(locale: Locale) {
  const t = (key: string) => editorialText(locale, key);
  return {
    ...guide,
    title: t(guide.title),
    summary: t(guide.summary),
    reviewNote: t(guide.reviewNote),
    sections: guide.sections.map((section) => ({
      ...section,
      title: t(section.title),
      paragraphs: section.paragraphs.map(t),
    })),
    sources: guide.sources.map((source) => ({
      ...source,
      label: t(source.label),
    })),
  };
}
