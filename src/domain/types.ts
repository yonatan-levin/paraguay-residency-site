export type Locale = "en" | "es" | "fr" | "de" | "he";
export type Localized<T> = Record<Locale, T>;
export type InclusionState = "included" | "excluded" | "optional" | "unknown";
export type PriceBasis = "per-applicant" | "per-engagement" | "monthly";
type PriceBase = {
  currency: "USD";
  basis: PriceBasis;
  provisional: boolean;
  inclusions: Record<string, InclusionState>;
};
export type Price = PriceBase &
  (
    | { type: "fixed"; amountMinor: number }
    | { type: "range"; minMinor: number; maxMinor: number }
    | { type: "quote" }
  );
export interface ContentReview {
  sourceUrls: string[];
  sourceCheckedAt?: string;
  author?: string;
  reviewer?: string;
  status: "draft" | "reviewed";
  approvedAt?: string;
}
export interface Service {
  id: string;
  category: "residency" | "relocation" | "business" | "support";
  name: Localized<string>;
  routeKey: string;
  relatedServices: string[];
  scope: Localized<string[]>;
  exclusions: Localized<string[]>;
  approved: boolean;
  review: ContentReview;
}
export interface Package {
  id: string;
  serviceId: string;
  tier: string;
  name: Localized<string>;
  price: Price;
  featureIds: string[];
  features: Localized<string[]>;
  dependencies: Localized<string[]>;
  commercialApproved: boolean;
}
export interface BrandConfig {
  displayName: string;
  legalEntity?: string;
  contacts: { email?: string; phone?: string; address?: string };
  timezone: string;
  supportHours?: string;
  logo?: string;
  locales: Locale[];
  approved: boolean;
  contactsApproved: boolean;
}
export interface PageDefinition {
  key: string;
  path: string;
  locales: Locale[];
  template:
    | "home"
    | "service"
    | "pricing"
    | "finder"
    | "book"
    | "receipt"
    | "campaign"
    | "links"
    | "guide"
    | "about"
    | "contact"
    | "policy"
    | "fixture";
  title: Localized<string>;
  description: Localized<string>;
  indexable: boolean;
  approved: boolean;
  commercialApproved: boolean;
  requiresCommercialApproval: boolean;
  contentReviewed: boolean;
  cta: { routeKey: string; serviceId?: string };
}
export type Campaign = "residency-cost" | "family-relocation";
export interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  referrer?: string;
}
export interface Selection {
  packageId?: string;
  serviceId?: string;
  campaign?: Campaign;
  invalid?: boolean;
}
export interface FinderAnswers {
  goal?:
    "residency" | "relocation" | "business" | "tax" | "property" | "investment";
  stage?: "new" | "temporary" | "permanent";
  household?: "individual" | "couple" | "family";
  timing?: "soon" | "this-year" | "exploring";
  support?: "essential" | "guided" | "concierge";
}
export type FinderQuestion = keyof FinderAnswers;
export interface FinderResult {
  serviceId: string;
  packageId?: string;
  familyQuote: boolean;
  reasons: string[];
  unconfirmed: string[];
}
export interface LeadContext {
  serviceId?: string;
  packageId?: string;
  entryPageKey: string;
  campaign?: Campaign;
  locale: Locale;
  finderResult?: FinderResult;
  attribution?: Attribution;
  familyQuote?: boolean;
}
export interface ContactDraft {
  firstName: string;
  channel: "email" | "whatsapp";
  email?: string;
  phone?: string;
  notes?: string;
  marketingConsent: boolean;
}
export interface SubmissionPayload {
  mode: "conversation" | "appointment";
  context: LeadContext;
  contact: ContactDraft;
  slotUtc?: string;
  timeZone?: string;
}
export type Clock = () => Date;
export type MockOutcome = "success" | "failure" | "unavailable";
export type GatewayResult =
  | { status: "success"; id: string }
  | {
      status: "failure" | "unavailable";
      category: "simulated-failure" | "unavailable-time" | "adapter-error";
    };
export interface LeadGateway {
  submit(
    payload: SubmissionPayload,
    idempotencyKey: string,
  ): Promise<GatewayResult>;
}
export interface BookingGateway {
  book(
    payload: SubmissionPayload,
    idempotencyKey: string,
  ): Promise<GatewayResult>;
}
export interface MessagePreview {
  message: string;
  notice: string;
  sent: false;
}
export interface MessagingGateway {
  preview(context: LeadContext): MessagePreview;
}
export interface Receipt {
  id: string;
  context: LeadContext;
  mode: SubmissionPayload["mode"];
  slotUtc?: string;
  timeZone?: string;
  price?: Price;
  createdAt: string;
  isDemo: true;
}
export type SubmissionResult =
  | { status: "success"; receipt: Receipt }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "failure" | "unavailable"; category: string };
export type SubmissionStatus =
  "idle" | "invalid" | "pending" | "success" | "failure" | "unavailable";
