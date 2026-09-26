import { editorialText } from "../lib/i18n/editorial";
import type { Locale } from "../domain/types";
export interface ServiceDetail {
  intro: string;
  audience: string;
  included: string[];
  dependencies: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
}

// These are proposed coordination scopes, pending operator and qualified professional review.
export const serviceDetails: Record<string, ServiceDetail> = {
  "paraguay-residency": {
    intro:
      "Turn an unfamiliar process into a preparation plan: understand the support available, organize questions about your documents, and coordinate the local steps that apply to your situation.",
    audience:
      "People exploring a first residency application, whether moving alone, as a couple, or with family. If you already hold temporary residency, start with the upgrade discussion instead.",
    included: [
      "A preparation discussion to map your goals, current stage, and questions for professional review.",
      "Guidance on document organization within the selected support level; the final requirements must be confirmed for your circumstances.",
      "A clear division of responsibilities for preparation, any appointment coordination, and agreed follow up.",
    ],
    dependencies: [
      "Residency eligibility, required documents, visits, and government decisions require individual confirmation.",
      "Travel, translations, legalization, government charges, and external professional fees must be scoped separately.",
      "Family pricing and aftercare are agreed before engagement; a preview amount for one applicant is not a household quote.",
    ],
    steps: [
      "Discuss your intended move and choose how much coordination you want.",
      "Confirm the appropriate route and a personalized preparation list with the responsible professional.",
      "Plan any required visits and local steps only after the dependencies are clear.",
      "Agree how progress updates, external decisions, and aftercare will be communicated.",
    ],
    faqs: [
      {
        question: "Which support level should I choose?",
        answer:
          "Essential starts with preparation guidance. Guided adds more coordination. Concierge proposes more individual logistical support. Compare the specific deliverables and confirm the scope before choosing; the tier does not change the government decision.",
      },
      {
        question: "Can you tell me which documents to obtain now?",
        answer:
          "Start by making an inventory of what you already hold. Ask the responsible professional to confirm the exact documents, accepted formats, translations, and timing before paying for new copies or making travel commitments.",
      },
      {
        question: "Does a higher support level mean faster approval?",
        answer:
          "No. Support levels describe assistance and communication. They do not provide privileged processing, establish eligibility, or guarantee an approval date.",
      },
      {
        question: "How does this work for a family?",
        answer:
          "We use a family scope discussion so each person’s preparation needs and shared logistics can be considered. Request a family quote rather than multiplying an individual illustrative price.",
      },
    ],
  },
  "permanent-residency": {
    intro:
      "Make your next residency conversation specific to the status you already hold. Upgrade support begins with a review of your current stage and the questions to settle before taking further steps.",
    audience:
      "Current temporary residents exploring a possible permanent residency route. This is a separate scope from first residency preparation.",
    included: [
      "An intake discussion covering your current status, prior process, and intended next step.",
      "Organization of outstanding questions and existing records for professional review.",
      "A proposed plan for coordination and follow up for the confirmed upgrade scope.",
    ],
    dependencies: [
      "The applicable route, eligibility, submission window, documents, and visits must be confirmed individually.",
      "Existing documents may need review; this preview does not determine whether they remain acceptable.",
      "External charges, document work, and any unrelated residency matter are outside the proposed service fee unless agreed.",
    ],
    steps: [
      "Describe the residency status you currently hold and the question you need answered.",
      "Arrange professional review of the applicable next step and its dependencies.",
      "Agree the preparation responsibilities and any local coordination required.",
      "Set a follow up plan for outstanding actions and external updates.",
    ],
    faqs: [
      {
        question: "Should I choose a first residency package?",
        answer:
          "If you already hold temporary residency, use this upgrade discussion so your inquiry is routed to the right starting point. A professional must still confirm the appropriate route.",
      },
      {
        question: "Can you confirm that I am ready to upgrade?",
        answer:
          "The prototype cannot make that determination. Your existing status and circumstances need review before any application plan or timing can be confirmed.",
      },
      {
        question: "What should I prepare for the first conversation?",
        answer:
          "Prepare a short summary of your current stage and any questions or unresolved actions from your earlier process. Do not upload or send identity documents through this preview.",
      },
    ],
  },
  "investor-residency": {
    intro:
      "Explore an investment or residency route related to business through a scoped professional discussion. Begin by separating your commercial objective from the residency questions it may raise.",
    audience:
      "People considering an investment or business activity who need to understand which professional reviews and coordination tasks may be relevant.",
    included: [
      "A discussion of your proposed activity, location, and reason for exploring this route.",
      "A list of questions for the appropriate residency, legal, tax, and business professionals.",
      "A coordination proposal distinguishing service work from the investment or business itself.",
    ],
    dependencies: [
      "Any qualifying capital, capital evidence, permitted structure, and route requirements need qualified review; no threshold is asserted here.",
      "The service fee does not represent qualifying capital, an investment purchase, government charges, or professional fees.",
      "Company operation, accounting, tax, reporting, and other continuing obligations require separate scoping.",
    ],
    steps: [
      "Describe the activity you are considering without committing capital through the inquiry.",
      "Identify the professional questions that must be resolved before choosing a route.",
      "Receive a proposed service scope and a separate list of capital and questions about external costs.",
      "Proceed only after the responsible professionals and terms are agreed.",
    ],
    faqs: [
      {
        question: "Does the displayed service fee include the investment?",
        answer:
          "No. The catalog describes provisional coordination fees. Any capital commitment, government charge, professional work, and ongoing obligation must be considered separately.",
      },
      {
        question: "Will an investment guarantee residency?",
        answer:
          "No approval, eligibility, investment return, or processing outcome is promised. An individual review is needed before relying on a route.",
      },
      {
        question:
          "I want a business, but I am not seeking residency. Where do I start?",
        answer:
          "Use the company formation or tax consultation service that matches your question. Business setup and residency are separate scopes and do not need to be bundled.",
      },
    ],
  },
  relocation: {
    intro:
      "Plan the practical side of arriving and settling in: your priorities, local coordination needs, and the decisions that should happen before you move.",
    audience:
      "Individuals, couples, and families looking for logistical support around a move, with or without a separate residency engagement.",
    included: [
      "A relocation priorities discussion covering arrival, everyday routines, and the kind of local orientation you want.",
      "A proposed sequence for agreed logistical tasks and introductions.",
      "Clear responsibilities and communication boundaries for your chosen level of support.",
    ],
    dependencies: [
      "Accommodation, transport, schools, healthcare providers, and other external services are separately chosen and paid for.",
      "Availability and suitability of any external option must be confirmed directly.",
      "Residency applications, property transactions, and professional advice require their own agreed scope.",
    ],
    steps: [
      "Prioritize what you need before arrival, during your visit, and after moving.",
      "Choose an orientation, integration, or scope for priority coordination.",
      "Confirm the tasks, provider responsibilities, and external budget before booking.",
      "Review the next practical actions as your plans become more definite.",
    ],
    faqs: [
      {
        question: "Can relocation support be separate from residency?",
        answer:
          "Yes. It is a distinct logistical discussion. Tell us which tasks you need so a proposed scope can be prepared without assuming you also need an application package.",
      },
      {
        question: "Can you help us compare family priorities?",
        answer:
          "The discussion can cover questions such as routines, location preferences, access needs, and arrival logistics. Specific school, medical, or accommodation suitability must be checked with the relevant provider.",
      },
      {
        question: "Does priority coordination guarantee provider availability?",
        answer:
          "No. It describes a proposed level of coordination. External availability, government decisions, and external timelines remain outside that promise.",
      },
    ],
  },
  "tax-planning": {
    intro:
      "Prepare for a focused tax conversation by organizing the countries, activities, and planned changes that a qualified adviser will need to consider.",
    audience:
      "People or business owners whose move, work, assets, or company plans raise questions across one or more tax systems.",
    included: [
      "An initial discussion to define the question and the jurisdictions that may need attention.",
      "A preparation brief for a qualified tax professional, with the scope of the consultation agreed in advance.",
      "Coordination of next questions and a clear distinction between advice, filings, and continuing support.",
    ],
    dependencies: [
      "This preview does not determine tax residence, liability, exemptions, reporting duties, or the treatment of any income.",
      "Advice in other jurisdictions, filings, accounting, and implementation are separately scoped.",
      "The assigned professional, qualifications, consultation deliverables, and fee must be confirmed before engagement.",
    ],
    steps: [
      "Explain the decision you are considering and which countries are involved.",
      "Agree what the consultation will answer and which records the adviser may later need.",
      "Obtain advice from the qualified professional responsible for the relevant jurisdiction.",
      "Separate any later filing or implementation work into a clear engagement.",
    ],
    faqs: [
      {
        question: "Does becoming a resident resolve my tax position?",
        answer:
          "Do not assume that a residency application answers your tax questions. Ask a qualified adviser to assess your circumstances and the countries involved.",
      },
      {
        question: "Can you promise a particular tax saving?",
        answer:
          "No. The proposed service is a scoped consultation. It does not promise a saving, an outcome with no tax due, or a particular treatment of income.",
      },
      {
        question: "Should I put financial details in the inquiry?",
        answer:
          "No. Use test contact details in this preview and keep notes general. A secure process for any necessary records must be agreed with the responsible professional before live work begins.",
      },
    ],
  },
  "company-formation/paraguay": {
    intro:
      "Give a proposed Paraguay business a clear starting brief: what it will do, who will be involved, and which formation and operating questions require professional review.",
    audience:
      "Founders and business owners considering a Paraguay entity who want to scope formation assistance and understand the separate work involved in running it.",
    included: [
      "A discussion of business purpose and ownership to prepare questions for legal and accounting review.",
      "Coordination of the proposed formation tasks and responsibilities once the structure is confirmed.",
      "A handover discussion covering the ongoing support that should be quoted separately.",
    ],
    dependencies: [
      "Entity type, ownership arrangements, registration requirements, permits, and tax treatment need qualified review.",
      "Government charges, capital, external legal work, accounting, banking, and recurring compliance are separate unless expressly included.",
      "Formation does not itself guarantee residency, a bank account, or permission for every business activity.",
    ],
    steps: [
      "Describe the proposed business activity and the people involved.",
      "Confirm the appropriate structure and required work with the responsible professionals.",
      "Agree the formation scope, exclusions, and process for handling information.",
      "Arrange a handover for the operating and reporting responsibilities that follow.",
    ],
    faqs: [
      {
        question: "Which company structure should I choose?",
        answer:
          "That decision needs a review of your activity, ownership, liability concerns, and tax circumstances. The prototype does not recommend a legal structure.",
      },
      {
        question: "Is accounting included after formation?",
        answer:
          "Do not assume it is. Recurring accounting and other operating work need a separate scope with named responsibilities and confirmed fees.",
      },
      {
        question: "Can I arrange banking at the same time?",
        answer:
          "Banking assistance can be discussed separately. The institution sets its own requirements and makes its own decision.",
      },
    ],
  },
  "company-formation/us": {
    intro:
      "Scope a U.S. company setup inquiry around your business model and questions across jurisdictions before selecting a structure or paying for formation work.",
    audience:
      "International founders and business owners considering a U.S. entity who need coordinated questions for the relevant legal, tax, and operating advisers.",
    included: [
      "A preliminary brief describing the activity, owners, customers, and jurisdictions involved.",
      "Coordination questions for the professionals responsible for formation and tax review.",
      "A proposed setup scope separating work performed once from recurring responsibilities.",
    ],
    dependencies: [
      "Jurisdiction, entity choice, registrations, tax reporting, and ongoing requirements need individual professional confirmation.",
      "Government fees, external professional fees, continuing services, and any address or agent arrangements must be priced separately where applicable.",
      "The service does not establish U.S. immigration rights or guarantee banking, payment processing, or tax outcomes.",
    ],
    steps: [
      "Explain why you are considering a U.S. entity and where the business will operate.",
      "Resolve structure and jurisdiction questions with qualified advisers.",
      "Agree the setup deliverables and who will hold the resulting records.",
      "Confirm the responsibilities for continuing service and reporting before handover.",
    ],
    faqs: [
      {
        question: "Will you choose a state or entity type for me here?",
        answer:
          "No. The appropriate choice depends on professional review of your intended activity and circumstances. The initial inquiry helps define those questions.",
      },
      {
        question: "Does a company guarantee a account with a payment provider?",
        answer:
          "No. Banks and payment providers carry out their own review and can set requirements independently of company formation.",
      },
      {
        question: "Is the setup fee the full lifetime cost?",
        answer:
          "No. The provisional setup amount is only a starting point for the proposed engagement. Ask for a separate outline of external charges and recurring responsibilities.",
      },
    ],
  },
  accounting: {
    intro:
      "Define the records, reporting work, and communication your business needs so an accounting engagement can be sized around its actual activity.",
    audience:
      "Business owners seeking a scoped accounting discussion, including people planning the handover after company formation.",
    included: [
      "A discussion of business activity, record readiness, transaction patterns, and current accounting arrangements.",
      "A proposed schedule for sharing records and reviewing open questions.",
      "A clear scope distinguishing routine work from work to bring records up to date or specialist advice.",
    ],
    dependencies: [
      "The responsible accounting professional, applicable duties, deliverables, and deadlines must be confirmed.",
      "The illustrative monthly range is not a quote for every business or every type of filing.",
      "Historical corrections, payroll, audit work, legal advice, and work in other countries are not assumed included.",
    ],
    steps: [
      "Describe the business and the records currently available.",
      "Agree which recurring tasks belong in the engagement and which need separate review.",
      "Confirm a secure records process, responsibilities, and communication schedule.",
      "Review the scope when the business activity changes.",
    ],
    faqs: [
      {
        question: "Why is the preview price a range?",
        answer:
          "The proposed workload depends on the business and the agreed deliverables. The range is illustrative; a professional must confirm the scope and recurring fee.",
      },
      {
        question: "Can you take over incomplete historical records?",
        answer:
          "That needs a separate assessment. Explain that records need work to bring them up to date during the first conversation rather than assuming it is covered by routine monthly support.",
      },
      {
        question: "Does this include tax advice?",
        answer:
          "The boundary between bookkeeping, filings, and advice must be agreed. A complex tax question or one involving multiple jurisdictions can be scoped as a separate consultation.",
      },
    ],
  },
  banking: {
    intro:
      "Prepare a banking inquiry around your intended account use and the questions to ask the institution before committing time to an application.",
    audience:
      "Individuals and businesses who want help organizing a banking discussion, including people coordinating a move or a new company.",
    included: [
      "An initial scope discussion distinguishing personal and business account needs.",
      "Preparation of questions about the institution’s current application process and expected records.",
      "Coordination assistance within an agreed scope, without submitting through this preview.",
    ],
    dependencies: [
      "Each institution controls its requirements, checks, availability, fees, and approval decision.",
      "No particular institution, account type, currency access, card, or transfer capability is promised.",
      "Bank charges, translations, external advice, and document preparation require separate confirmation.",
    ],
    steps: [
      "Describe the practical account use you need to discuss.",
      "Confirm the institution’s current process and questions for your circumstances.",
      "Agree what coordination assistance is appropriate and request a quote.",
      "Use the institution’s approved channel for any application or sensitive records.",
    ],
    faqs: [
      {
        question: "Can you guarantee that a bank will open my account?",
        answer:
          "No. Assistance does not replace the bank’s review or influence its decision. Account availability and approval remain with the institution.",
      },
      {
        question:
          "Should I share account statements or identity documents here?",
        answer:
          "No. This preview has no function for uploading documents or applying for a bank account. Do not put financial records or identity details in its notes field.",
      },
      {
        question: "Why is a quote required?",
        answer:
          "Personal and business inquiries can involve different coordination needs. The proposed scope and external costs need to be understood before a fee can be confirmed.",
      },
    ],
  },
  "real-estate": {
    intro:
      "Organize the practical side of a property search or inquiry while keeping legal checks, transaction decisions, and external fees clearly separate.",
    audience:
      "People exploring a home or business property who want a more clearly defined brief and coordination support, rather than a live listings feed or investment recommendation.",
    included: [
      "A property brief covering intended use, location preferences, practical requirements, and the questions you want answered.",
      "A proposed scope for introductions or viewing coordination when suitable options are available.",
      "A list of transaction and questions about due diligence to take to independent professionals.",
    ],
    dependencies: [
      "Listings, availability, asking prices, and property representations must be checked with the relevant parties.",
      "Title, contracts, taxes, inspections, valuation, and transaction advice require appropriately qualified professionals.",
      "Property purchase or rent, deposits, commissions, professional fees, and ongoing management are separate from coordination assistance.",
    ],
    steps: [
      "Define the intended use and your essential practical requirements.",
      "Agree the search or coordination scope and how options will be assessed.",
      "Arrange independent review of legal and technical questions before a commitment.",
      "Confirm transaction responsibilities and any separate assistance after the move.",
    ],
    faqs: [
      {
        question: "Does this site offer verified properties to buy?",
        answer:
          "No. The prototype has no property listings or transaction service. It demonstrates a way to scope inquiries about property assistance.",
      },
      {
        question: "Is this an assessment of investment returns?",
        answer:
          "No. No rental yield, capital gain, occupancy, or resale result is promised. Independent advice and due diligence are separate from coordination support.",
      },
      {
        question: "Is ongoing property management included?",
        answer:
          "No ongoing management scope or charge based on a percentage is established in this preview. Discuss it separately before relying on any future service.",
      },
    ],
  },
  "driving-license": {
    intro:
      "Clarify the questions about driving licenses connected to your move and the local coordination you may need before assuming that an existing license can be used or exchanged.",
    audience:
      "People moving to or spending time in Paraguay who need an individual discussion about the appropriate authority and process to consult.",
    included: [
      "A preliminary discussion of your question and the type of logistical assistance sought.",
      "A preparation list of questions to confirm with the competent authority.",
      "A quote for any agreed appointment or local coordination support.",
    ],
    dependencies: [
      "Recognition, exchange, testing, documents, fees, and the right to drive must be confirmed by the relevant authority for your situation.",
      "No license category, outcome, appointment availability, or completion date is promised.",
      "Government fees, medical or other assessments, translations, transport, and external services are separately confirmed where relevant.",
    ],
    steps: [
      "Identify the driving question you need resolved before making arrangements.",
      "Confirm which authority and current process apply to your circumstances.",
      "Agree the coordination scope and obtain a quote.",
      "Follow the authority’s instructions for any required application or appointment.",
    ],
    faqs: [
      {
        question: "Can I drive on my existing license?",
        answer:
          "This page cannot confirm that. Check with the competent authority and any relevant insurer before driving; the applicable conditions require individual confirmation.",
      },
      {
        question: "Can the service guarantee an exchange without a test?",
        answer:
          "No. This preview makes no claim about exchange rights or testing requirements. Those questions must be confirmed through the applicable official process.",
      },
      {
        question: "What does the quote cover?",
        answer:
          "It should identify the agreed coordination tasks and separate them from authority charges, assessments, document work, and other external costs.",
      },
    ],
  },
  "retire-in-paraguay": {
    intro:
      "Build a retirement relocation plan around everyday life: where you want to live, the support you value, and the professional questions to resolve before making a move.",
    audience:
      "People considering retirement in Paraguay, including couples and those coordinating plans with family members elsewhere.",
    included: [
      "A priorities discussion covering location preferences, access needs, routines, and practical arrival support.",
      "A proposed sequence for residency, housing, and other separate service conversations.",
      "A scoped relocation quote with responsibilities and communication arrangements.",
    ],
    dependencies: [
      "Residency eligibility and any pension or tax treatment require qualified individual review.",
      "Healthcare, insurance, care arrangements, accessibility, and property suitability need confirmation with the relevant providers.",
      "Housing, living expenses, provider charges, travel, and specialist advice are not included in a quote for relocation support unless agreed.",
    ],
    steps: [
      "Describe the daily life and practical support you want your move to enable.",
      "Identify questions that need residency, tax, healthcare, or other professional input.",
      "Plan any exploratory visit around the decisions still to be made.",
      "Agree a relocation scope when the key dependencies are clear.",
    ],
    faqs: [
      {
        question: "Is this a special residency entitlement for retirees?",
        answer:
          "No. The page describes relocation support for a life stage. It does not establish a particular eligibility route or make a promise about the treatment of pension income.",
      },
      {
        question: "Can we plan before choosing a home?",
        answer:
          "Yes. An initial discussion can help organize priorities and the questions to investigate during a visit. Property commitments should follow their own checks and advice.",
      },
      {
        question: "Can family members be involved in the conversation?",
        answer:
          "You can discuss who should be involved and what information may be shared when agreeing a live service. In this preview, use test details and avoid medical or other sensitive information.",
      },
    ],
  },
  "citizenship-guidance": {
    intro:
      "Take a citizenship question to an appropriately qualified professional with a clear account of what you want to understand. The starting point is review, not a promised outcome.",
    audience:
      "People seeking an individual discussion about questions about citizenship, including those who need to distinguish them from residency support.",
    included: [
      "A preliminary discussion to identify the question and arrange an appropriate scope for professional review.",
      "Organization of the questions and background categories the professional may need to assess.",
      "A quote for agreed coordination, with representation and other professional work clearly distinguished.",
    ],
    dependencies: [
      "Eligibility, procedure, required evidence, timing, and decisions need qualified review of the individual circumstances.",
      "No citizenship, passport, travel access, processing time, or successful outcome is guaranteed.",
      "Professional representation, official charges, translations, records, and any related residency matter are separate unless expressly agreed.",
    ],
    steps: [
      "Explain the question you want a qualified professional to assess.",
      "Confirm the reviewer’s role and the scope of that assessment.",
      "Agree a secure process for any records needed in a future live engagement.",
      "Consider further steps only after the professional has explained the applicable position.",
    ],
    faqs: [
      {
        question: "Does a residency package include citizenship?",
        answer:
          "No. Residency assistance and citizenship questions are separate scopes. No package on this preview offers citizenship as an included or guaranteed result.",
      },
      {
        question: "Can you estimate when I would receive a passport?",
        answer:
          "The preview cannot establish eligibility or a timeline. Do not make travel or financial commitments based on an assumed citizenship outcome.",
      },
      {
        question: "What happens after an inquiry?",
        answer:
          "Here, only a simulated receipt is produced. A future live service would first confirm the qualified professional, review scope, terms, and secure information process before any substantive work.",
      },
    ],
  },
};

export const serviceDetailsEs: Record<string, ServiceDetail> = {
  "paraguay-residency": {
    intro:
      "Convierte un proceso desconocido en un plan de preparación: conoce el apoyo disponible, organiza tus preguntas sobre documentos y coordina los pasos locales que correspondan a tu situación.",
    audience:
      "Personas que exploran una primera solicitud de residencia, solas, en pareja o en familia. Si ya tienes residencia temporal, empieza por una consulta sobre el cambio de categoría.",
    included: [
      "Una conversación inicial para entender tus objetivos, tu situación actual y las preguntas que requieren revisión profesional.",
      "Orientación para organizar documentos según el nivel de apoyo elegido; los requisitos definitivos deben confirmarse para tu caso.",
      "Responsabilidades claras para la preparación, la coordinación de citas que se acuerde y el seguimiento.",
    ],
    dependencies: [
      "La elegibilidad, los documentos, las visitas y las decisiones de las autoridades requieren confirmación individual.",
      "Viajes, traducciones, legalización, cargos públicos y honorarios profesionales externos se deben presupuestar por separado.",
      "El precio familiar y el seguimiento se acuerdan antes de contratar; un importe ilustrativo por solicitante no es un presupuesto familiar.",
    ],
    steps: [
      "Habla sobre tu mudanza y elige cuánto apoyo de coordinación necesitas.",
      "Confirma la vía adecuada y una lista de preparación personalizada con el profesional responsable.",
      "Organiza las visitas y los pasos locales necesarios cuando las dependencias estén claras.",
      "Acuerda cómo se comunicarán los avances, las decisiones externas y el seguimiento.",
    ],
    faqs: [
      {
        question: "¿Qué nivel de apoyo debo elegir?",
        answer:
          "Esencial comienza con orientación para la preparación. Guiado añade más coordinación. Concierge propone más apoyo logístico individual. Compara los entregables y confirma el alcance antes de elegir; el nivel de apoyo no cambia la decisión de las autoridades.",
      },
      {
        question: "¿Pueden decirme qué documentos debo obtener ahora?",
        answer:
          "Empieza con un inventario de los documentos que ya tienes. Antes de pagar por nuevas copias o comprometer un viaje, pide al profesional responsable que confirme los documentos exactos, los formatos aceptados, las traducciones y los plazos aplicables.",
      },
      {
        question:
          "¿Un nivel de apoyo superior significa una aprobación más rápida?",
        answer:
          "No. Los niveles describen la asistencia y la comunicación. No ofrecen tramitación privilegiada, no determinan la elegibilidad ni garantizan una fecha de aprobación.",
      },
      {
        question: "¿Cómo funciona para una familia?",
        answer:
          "La consulta familiar permite considerar la preparación de cada persona y la logística compartida. Solicita un presupuesto familiar en lugar de multiplicar un precio individual ilustrativo.",
      },
    ],
  },
};

export function getServiceDetail(
  route: string,
  locale: Locale,
): ServiceDetail | undefined {
  const detail = serviceDetails[route];
  if (!detail) return undefined;
  const t = (key: string) => editorialText(locale, key);
  return {
    intro: t(detail.intro),
    audience: t(detail.audience),
    included: detail.included.map(t),
    dependencies: detail.dependencies.map(t),
    steps: detail.steps.map(t),
    faqs: detail.faqs.map(({ question, answer }) => ({
      question: t(question),
      answer: t(answer),
    })),
  };
}
