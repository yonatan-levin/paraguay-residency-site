# Paraguay Residency & Relocation Website
## Codex implementation handoff

**Version:** 1.0 | **Date:** September 23, 2026  
**Deliverable:** A working, responsive, conversion-focused website prototype.  
**Primary reference:** https://weparaguay.com  
**Working brand:** Paraguay Residency Studio - a replaceable placeholder, not an approved business name.  
**Implementation authority:** Follow this brief for product behavior. Follow the target repository's existing instructions for engineering conventions.

> Build the website, not another proposal. Deliver complete customer journeys, realistic content, reusable components, and passing tests. Start with the assumptions below; record unresolved business inputs without blocking the prototype. Do not launch publicly or connect live services.

## 1. Product direction and execution rules

Create an original customer-facing website for a business offering Paraguay residency assistance, relocation support, and related business services. Use the reference site's commercial categories and package structure as a benchmark, not its brand, page design, proprietary copy, photographs, reviews, contact details, or claimed credentials.

The positioning is **professional, transparent, approachable, and hands-on**. Compete through understandable scope and local coordination, not an unsupported lowest-price claim. Residency is the primary entry product. Relocation, business formation, tax consultation, and property support are secondary journeys.

The central promise is: **"Your Paraguay residency, clearly planned and personally supported."** No claims of automatic eligibility, guaranteed approval, guaranteed banking, guaranteed returns, or automatic zero-tax status. Higher support tiers must not imply privileged government processing.

### Starting instructions for Codex

1. Inspect the repository, existing instructions, package manager, application entry points, and tests. Preserve unrelated changes. Do not place this work inside an unrelated product repository.
2. Reuse a suitable existing application. For an empty workspace, create a standalone application named `paraguay-residency-site`. Do not restructure an unrelated repository.
3. Write a short implementation plan in `docs/IMPLEMENTATION_PLAN.md`, then implement. Keep defaults and unresolved commercial inputs in `docs/DECISIONS.md`.
4. Build the first end-to-end journey before expanding the catalog: homepage -> pricing -> selected-package inquiry -> simulated confirmation.
5. Work test-first on routing rules, price formatting, state preservation, metadata, and submission behavior. Complete the remaining phases in Section 15.
6. Deliver a runnable local application and a factual completion report. Do not stop after scaffolding or a static homepage. Do not publish, purchase assets, register domains, send messages, or provision paid services.

### Defaults that unblock development

Use English for the complete first version. Implement Spanish for the core conversion journey as specified in Section 11. Prepare layout primitives for Hebrew/right-to-left support, but do not publish an incomplete Hebrew locale. Use USD with no live currency conversion. Consultations last **20 minutes in demo mode**; this is a configurable prototype choice, not an operating commitment.

Keep the business name, legal entity, domain, contacts, people, credentials, pricing, support hours, and provider configuration replaceable. Do not automatically present Este a Oeste as the legal service provider; its relationship to this new brand needs owner approval.

## 2. Scope and release boundary

### In the prototype

- A complete residency sales journey: homepage, service overview, pricing, optional plan finder, inquiry/booking, and confirmation.
- Two social landing-page variants, a link-in-bio hub, a guide hub, one substantive guide, and an About/contact experience.
- Shared service templates covering permanent-residency upgrades, investor/business routes, relocation, tax consultation, company formation, accounting, banking assistance, property support, driving-license assistance, retirement support, and citizenship-guidance inquiries.
- Data-driven packages, multilingual routing, technical SEO, social metadata, accessible mobile behavior, mock integrations, event instrumentation, and automated tests.

### Not in the prototype

No customer portal, document upload, passport collection, payment processing, legal eligibility engine, AI chatbot, live CRM, live calendar, live WhatsApp sending, newsletter automation, investment marketplace, property listings feed, or production CMS. Do not add unrelated specialist or regulated services simply because the reference site lists them.

### Prototype versus public launch

The default runtime is **demo mode**. Every page has a discreet but clear banner: **"Website preview - offers are provisional and no real booking or message will be sent."** Prices also have a nearby **"Illustrative USD price - subject to confirmation"** label. Forms ask reviewers to use test details.

All preview pages are `noindex`. A publicly hosted review deployment must be access-controlled; robots directives are not access control. No external tracking or service-provider requests are enabled. A deployable build is not permission to launch.

## 3. Information architecture and routes

Use locale-prefixed routes. The paths below show English; equivalent Spanish routes may initially keep the same slugs. `/` redirects predictably to `/en`, without IP-based redirection. Choose one trailing-slash convention and enforce it consistently.

**P0** means the first complete customer journey. **P1** means required before this prototype is finished, not an indefinite future backlog. The last column describes *eventual production* indexing; the preview remains entirely `noindex`.

| Route | Purpose and main action | Priority / production SEO |
|---|---|---|
| `/en` | Explain offer; find a plan or compare | P0 / index |
| `/en/paraguay-residency` | Residency overview; compare plans | P0 / index |
| `/en/pricing` | Route selection and package comparison | P0 / index |
| `/en/find-my-plan` | Optional needs-based recommendation | P0 / noindex |
| `/en/book` | Selected-plan inquiry or demo booking | P0 / noindex |
| `/en/thank-you` | Valid submission receipt only | P0 / noindex |
| `/en/services` | Browse all relevant service categories | P1 / index when approved |
| `/en/permanent-residency` | Upgrade discussion | P1 / index when approved |
| `/en/investor-residency` | Specialist route discussion | P1 / index when approved |
| `/en/relocation` | Arrival and settling-in packages | P1 / index when approved |
| `/en/tax-planning` | Professionally reviewed consultation offer | P1 / index when approved |
| `/en/company-formation/paraguay` | Local company setup inquiry | P1 / index when approved |
| `/en/company-formation/us` | U.S. setup inquiry | P1 / index when approved |
| `/en/accounting` and `/en/banking` | Support services; scoped inquiry | P1 / index when approved |
| `/en/real-estate` | Property assistance inquiry | P1 / index when approved |
| `/en/driving-license` | Local-document assistance inquiry | P1 / index when approved |
| `/en/retire-in-paraguay` | Retirement-focused relocation support | P1 / index when approved |
| `/en/citizenship-guidance` | Professional review inquiry; no guarantees | P1 / index when approved |
| `/en/guides` | Useful educational content hub | P1 / index |
| `/en/guides/residency-requirements` | Preparation guide; residency CTA | P1 / index when approved |
| `/en/about` and `/en/contact` | People, responsibilities, contact paths | P1 / index |
| `/en/lp/residency-cost` | Cost-focused social campaign | P1 / noindex |
| `/en/lp/family-relocation` | Family-focused social campaign | P1 / noindex |
| `/en/links` | Three or four link-in-bio choices | P1 / noindex |
| `/en/privacy`, `/en/terms`, `/en/disclaimer` | Clearly marked policy drafts | P1 / noindex until approved |

Navigation: **Residency / Packages / Relocation & Business / Guides / About**, followed by language selection and **Find my plan**. Keep **Book a consultation** accessible through the menu/contact paths without forcing the questionnaire. The footer contains services, contact, and policy links. Do not use dead `#` links.

## 4. Visual system and responsive behavior

Build an original professional-services identity with warm, human presentation. Do not imitate a government portal, luxury investment scheme, generic travel-booking engine, or dashboard.

| Token | Initial design value |
|---|---|
| Background / surface | Warm off-white `#F7F8F5` / white `#FFFFFF` |
| Main text / muted text | Deep navy `#142B3B` / slate `#52636D` |
| Primary action | Deep green `#12624C` with white text |
| Borders / soft emphasis | `#D8E2DC` / `#E7F0EB` |
| Layout width | Maximum 1200px; mobile gutters 20px |
| Type | Locally available or bundled licensed sans-serif; system fallback |
| Body / small text | 16-18px body; essential disclosures never below 14px |
| Heading / spacing | Responsive H1 around 36-56px; 8px spacing rhythm |
| Controls / shape | At least 44px high primary controls; 12-16px card radius |

These are starting tokens, not a substitute for contrast testing. Aim for WCAG 2.2 AA: normal text at least 4.5:1 contrast, large text at least 3:1, visible focus, and suitable control contrast. Our 44px control target intentionally exceeds the 24px minimum target-size criterion and its exceptions. [S7][S8]

Desktop: two-column hero, three-column package comparison, restrained navigation. Mobile: single-column reading flow, stacked package cards, and a sticky bottom action where useful. At 360px width, the headline, short explanation, and primary action should appear before the hero image pushes them far down the screen.

Use one persistent conversion control at a time. On general pages the bottom bar can pair **Find my plan** with a lower-emphasis WhatsApp action. On pricing it follows the selected package. Hide it on finder, booking, and confirmation screens. Respect safe-area insets, the virtual keyboard, footer visibility, cookie controls, and modal focus.

Use authentic owner-supplied or properly licensed imagery. Do not label stock people as the team. Until assets exist, use attractive neutral image treatments with explicit editorial placeholders. No fabricated testimonials, review stars, press logos, success counts, or professional badges. Avoid autoplay, carousels, fake scarcity, countdowns, and unnecessary animation. Honor reduced-motion preferences.

## 5. Page-by-page UX contracts

### 5.1 Homepage

Use this section order:

1. **Hero:** H1 "Make Paraguay your next chapter." Supporting copy: "Residency support, clear packages, and local coordination to help you prepare your documents, plan required visits, and settle in." Primary: **Find my residency plan**. Secondary: **Compare packages**. Quiet text action: **Ask us on WhatsApp**.
2. **Reassurance:** show process clarity and transparent scope. Use actual credentials only when supplied and approved. Do not imply a staffed local office or multilingual team without evidence.
3. **Choose your goal:** first residency; moving with family; business/tax support; already a resident. Each card links to the correct journey.
4. **Package preview:** Essential, Guided, Concierge; three meaningful differences and visible provisional price. All amounts come from shared data.
5. **How it works:** initial discussion -> preparation -> required local steps -> processing and aftercare. Distinguish the work the business controls from external decisions.
6. **Who helps you:** configurable team and responsibilities. In demo mode, show explicitly labeled profile placeholders; never invent biographies.
7. **Proof:** verified client stories only. With no real stories, omit the testimonial component and use a sample process/deliverables section instead.
8. **Practical questions:** documents, required visits, inclusions, exclusions, family pricing, timing uncertainty, and support after filing. Answers must be appropriately qualified.
9. **Final action:** explain what the first conversation covers; repeat the primary action. Optional small guide preview comes near the bottom, not before the offer.

### 5.2 Residency and shared service pages

Every service page contains: plain-language outcome; intended customer; included assistance; exclusions/dependencies; process; relevant package or scoped quote; practical questions; and one contextual inquiry action. The residency overview also links to the requirements guide and full comparison.

Secondary service pages must have useful original content, not identical text with a replaced title. Do not fabricate legal procedures to fill space. In the preview, label unapproved details. For production, an unapproved route stays unpublished rather than becoming a thin indexable placeholder.

For business and investor routes, visibly separate service charges from qualifying capital, government charges, professional fees, and ongoing obligations. Do not insert legal thresholds from competitor marketing. Tax and banking pages describe assistance and review, not automatic outcomes. Driving-license, retirement, and citizenship-guidance pages use the same scoped inquiry template and quote-only pricing. Do not copy passport-access counts, pension-tax claims, eligibility rules, or approval timelines from marketing content.

### 5.3 Pricing

First select the journey: **First residency / Permanent-residency upgrade / Investment or business route**. Only then compare relevant support levels. Relocation and other add-ons appear separately below or on their service pages.

Each card shows: plan name, suitable customer, price basis, three to five distinguishing deliverables, personal involvement, support scope, exclusions, and **Discuss this plan**. Highlight Guided with **More hands-on support**, not an unverified "Most popular" badge. Do not preselect or silently upsell it.

The expanded comparison uses semantic table markup on desktop and readable labeled groups on mobile. Essential distinctions: service fee versus external costs; one-time versus recurring; required travel versus total elapsed processing; included assistance versus optional extras. Unknowns say **To be confirmed**, not zero or included.

Family applications use **Request a family quote**. Do not automatically multiply a per-applicant price when child pricing, shared fees, or discounts are unknown. Choosing a package must preserve its stable ID into inquiry and confirmation.

### 5.4 Optional plan finder

Title: **Find your starting point**. Supporting line: **"A short guide to the support that may suit you - not a legal eligibility decision."** Allow a visible skip to booking or pricing.

Use a branching flow with no more than five required questions: goal; current residency stage; individual/couple/family; intended timing; preferred support level. Skip irrelevant residency questions for business/tax/property-only inquiries. Optional passport nationality and current country belong after the preliminary result, if useful for a later professional review; they are not required to see it.

Support preferences map to Essential / Guided / Concierge only for first-residency users. Existing temporary residents receive the upgrade path. Investment interest receives a specialist route, not a finding of eligibility. Family users get a family-quote flag without a computed household total. Urgency never implies accelerated approval.

The result appears **before** any contact gate and includes: possible starting point; reasons based on the user's chosen needs; provisional price or quote requirement; unconfirmed items; **Discuss this plan**; and **Compare alternatives**. Keep answers on Back and allow editing. On goal changes, clear incompatible downstream answers and package selections.

### 5.5 Inquiry, booking, and confirmation

Support two user choices: **Request a conversation** or **Choose a demo time**. Keep the selected service/plan visible above the form and in the confirmation. Users may edit that selection.

Request only first name, preferred contact channel, and the contact detail needed for that channel. An appointment requires email; a WhatsApp callback requires a phone number with country code. Do not require both. Notes are optional and length-limited. Include a contextual privacy notice; optional marketing consent is separate and unchecked. Do not treat a privacy-policy checkbox as a universal substitute for a lawful processing basis.

Demo availability is generated relative to an injected clock so the mock never offers past dates. Store selected instants in UTC, display the viewer's detected IANA timezone, and allow changing it. Display the zone explicitly. Browser timezone is the default for the visitor; `America/Asuncion` is the configurable team's zone, not every customer's zone.

Submission states: idle, invalid, pending, simulated success, simulated failure, unavailable time, and retry. Use a local adapter with controllable responses; no provider calls. Prevent double submission and reuse an idempotency key for retries of the same payload. Changed payloads get a new key.

Confirmation copy: **"Demo request complete. No appointment has been booked and no message has been sent."** A simulated appointment may display its chosen time, labeled as a demo. Do not claim an email was delivered. A fresh visit to `/thank-you` without a valid in-memory receipt shows a neutral recovery action, not a fabricated success. Refreshing must not emit another conversion event.

### 5.6 Social landing pages and link-in-bio

`/lp/residency-cost`: headline **"Understand the cost before you plan your move."** Show a concise cost breakdown, provisional packages, clear exclusions, and **Compare my options** leading to pricing with the intended route selected.

`/lp/family-relocation`: headline **"Plan your family's move to Paraguay with clarity."** Explain coordinated preparation and relocation assistance, show relevant support options, and use **Plan our move** to open the finder with family context. Let users edit that context.

Use a compact branded header, language control, one dominant action, optional image/video placeholder, relevant proof, and focused FAQs. Preserve access to contact and policies. A campaign's language, promise, and offer must match its destination. Do not construct headlines directly from arbitrary query parameters.

The `/links` page has no more than four choices: residency packages, family relocation, consultation, and WhatsApp. Campaign links bypass this hub. Create route-specific social titles, descriptions, and original 1200 x 630 preview assets without unapproved prices embedded in the image. Implement metadata through the framework's server-side metadata facilities. [S3]

### 5.7 Guides, About, and contact

The first guide is **"Preparing for Paraguay residency: documents and questions to resolve before travel."** Make it useful without pretending to be a definitive legal checklist. Include general preparation categories, questions to confirm with a qualified provider, source/review fields, and links to the relevant services. No invented validity periods, national exceptions, apostille acceptance rules, or processing guarantees.

Guide template: breadcrumbs, title, summary, linked contents, substantive sections, source links, reviewer/date when genuine, related service CTA, and related guides. Do not gate essential information. Additional guide cards appear only when their routes exist.

About: actual business story and responsibilities once supplied; clear distinction between the operator and external professionals. Contact: booking, contextual WhatsApp, and supplied contact details. Missing contact details produce an honest unavailable state in preview, never competitor details or invented addresses.

## 6. Commercial fixtures and content governance

### Reference-only price seeds

The following are competitor benchmark amounts, checked September 23, 2026. They are fixture values for comparison UI, **not approved prices, actual quotations, costs, or promises of equivalent delivery**. Core numbers come from the reference pricing page; relocation tier amounts also appear on its concierge page. [S1][S2]

| Internal package/service | Demo amount, USD | Display basis |
|---|---|---|
| `temporary-essential` | 2,200 | Per applicant; provisional |
| `temporary-guided` | 2,850 | Per applicant; provisional |
| `temporary-concierge` | 4,500 | Per applicant; provisional |
| `upgrade-basic` / `upgrade-premium` | 1,400 / 2,400 | Provisional service price |
| `investor-support` / `business-route-support` | 4,500 / 5,500 | Service fee; capital separate |
| `relocation-orientation` | 500 | Provisional package fee |
| `relocation-integration` | 1,500 | Provisional package fee |
| `relocation-priority` | 3,500 | Provisional package fee |
| `us-business-setup` | 1,500 | Setup scope to confirm |
| `paraguay-company-setup` | 1,000 | Setup fee; recurring separate |
| `accounting` | 90-220 monthly | Scope-dependent range |
| `tax-planning` | 300-1,000 | Scope-dependent range |
| `property-assistance` | 1,500 | Engagement fee; scope to confirm |

Do not implement a percentage-based property-management calculator: its contractual calculation basis is not established. Additional service prices use **Request a quote**. Do not invent middle-tier tax prices or fabricate a bundle discount.

Essential / Guided / Concierge are our provisional display names, corresponding broadly to entry / guided / high-touch positioning. The proposed differentiators are document-organization support, appointment coordination, local logistical assistance, communication level, and aftercare. Keep exact durations, included fees, delivery commitments, and professional responsibilities unapproved until supplied.

### Shared models

Store all prices as integer minor units. Do not hard-code amounts in components, metadata, images, guides, or translated text. Use a shared formatter and central catalog.

Required records:

- `BrandConfig`: display name, legal entity, approved contacts, timezone, support hours, logos, locale availability, and approval flags.
- `Service`: stable ID, category, localized copy, route key, related services, delivery scope, exclusions, and approval state.
- `Package`: stable ID, service ID, support tier, localized name, price type/basis, feature IDs, dependencies, and commercial approval.
- `Price`: fixed/range/quote; currency; minor-unit values; per-applicant/per-engagement/monthly basis; fee-inclusion states; provisional status.
- `ContentReview`: source URLs, source-check date, author/reviewer if real, review status, and approval timestamp. No automatic "reviewed today" labels.
- `PageDefinition`: locale, stable route key, template, SEO fields, approved/indexable flags, and related CTA configuration.
- `LeadContext`: selected service/package, entry page key, campaign key, locale, finder result, and an allowlisted attribution summary. Contact information is a separate object.

Inclusion states must distinguish **included / excluded / optional / unknown**. A missing value is never treated as a free included service. Keep content and commercial approval separate: reviewed wording does not approve the price.

## 7. State, routing, and mock integration contracts

Use stable IDs rather than translated display strings. Valid navigational parameters may include `service`, `plan`, and `campaign`, with controlled enumerated values. Reject or ignore unknown IDs and show a safe default. Never accept an arbitrary external return URL.

Keep finder answers and contact drafts in browser memory for this prototype. No contact details, passport/country answers, notes, or booking payloads in URLs, analytics, local storage, session storage, console logs, or screenshots. Non-personal service/plan selection may be represented in the URL for useful deep links. Reloading can reset the questionnaire while preserving a valid linked plan.

Separate UI from integration details with small interfaces: `LeadGateway`, `BookingGateway`, `MessagingGateway`, and `AnalyticsAdapter`. Provide local mock/no-op implementations. Future providers must be swappable without rewriting pages or recommendation rules. Do not build a generalized integration platform.

WhatsApp in demo mode opens a preview of the intended message and states **"Sending is disabled in this preview."** Later live mode requires an approved number and explicit user action. The message may identify the selected service and package, never sensitive finder answers. Do not redirect a user to the reference site's phone numbers.

If booking fails, preserve the non-sensitive selection, keep form fields in memory, explain that nothing was confirmed, and offer retry or a callback request. Loading states must not shift the page or trap focus.

## 8. Technical architecture

### Default stack for a new repository

Use **Next.js App Router, React, and strict TypeScript** with a small reusable component system. Prefer Tailwind CSS plus accessible primitives if compatible with the repository; otherwise CSS Modules are acceptable. Use the existing package manager, defaulting to npm in an empty repo. Choose supported stable dependency versions at implementation time and commit the lockfile; do not rely on an unpinned `latest` for reproducible installs.

Pre-render marketing content where possible. Restrict client components to interactions such as menus, comparisons, finder, forms, and consent controls. Server-rendered or pre-rendered content makes the core offer and links available independently of client execution. Google documents benefits of prerendering/server rendering for crawlers and users. [S5]

Use local typed content or MDX; no database or CMS is necessary. Keep a small domain layer for recommendations and pricing, application functions for user actions, and adapter implementations at the edges. Avoid unnecessary backend services, authentication scaffolding, or deep abstraction.

### Suggested module layout

```text
src/
  app/[locale]/             # Routes and server page composition
  components/ui/            # Accessible primitives
  components/marketing/     # Hero, pricing, process, FAQs
  features/plan-finder/      # Questions, rules, result components
  features/inquiry/          # Form, booking states, receipts
  domain/                   # Catalog types and pure functions
  application/              # Submission and recommendation use cases
  infrastructure/mock/      # Local adapters, controllable responses
  content/                  # Catalog, translations, guides, reviews
  lib/seo/                  # Canonical, alternates, schema, sitemap
  lib/analytics/            # Typed, sanitized event adapter
  config/                   # Brand, route map, runtime mode
public/                     # Owned/licensed local assets
tests/                      # Unit, integration, and E2E tests
docs/                       # Decisions, QA, launch checklist
```

Adapt this organization to an existing codebase rather than mechanically duplicating it.

Required reusable components include `SiteHeader`, `MobileActionBar`, `Hero`, `GoalSelector`, `PackageCard`, `PriceBreakdown`, `PackageComparison`, `ProcessSteps`, `ReviewableContent`, `FAQAccordion`, `PlanFinder`, `PlanResult`, `InquiryForm`, `DemoScheduler`, `SubmissionReceipt`, and `SourceNotes`. Names can follow repository conventions.

Use explicit schema validation at data boundaries. Keep credentials server-only and out of source control. Provide `.env.example` with safe defaults and no usable secrets. Add `SITE_MODE=demo`, a non-live site URL default, and analytics/messaging/booking disabled by default.

## 9. SEO and discoverability requirements

### Search intent ownership

The residency overview owns the commercial residency-assistance intent. Pricing owns cost/package intent. The requirements guide owns document/preparation questions. Permanent-residency, relocation, tax, and company-formation pages own their specific intents. This is an editorial starting map, **not verified keyword-volume research**.

Do not produce doorway pages, duplicated nationality pages, spun articles, or multiple competing pages for the same cost question. Country-specific content can be added later only with materially distinct, reviewed information.

Example title patterns: **"Paraguay Residency Assistance | [Brand]"** and **"Paraguay Residency Packages & Costs | [Brand]"**. Write distinct descriptions explaining actual page value. Never place unapproved prices or tax promises into metadata.

### Implementation requirements

- Render title, description, canonical, language, social metadata, main text, and crawlable links using server-side page data. Use the framework metadata API; do not patch essential metadata only after hydration. [S3]
- Generate a sitemap from approved, indexable, canonical routes only. Exclude forms, results, campaign variants, draft translations, and thank-you pages.
- Canonical URLs omit tracking and plan-selection parameters. Equivalent campaign pages are deliberately `noindex`; canonical tags are not a substitute for that instruction. Translated pages use their own canonicals, not an English canonical for every locale. [S6]
- Add reciprocal `hreflang` only for real equivalent translations. Include self-reference and an appropriate `x-default`. Do not advertise a translation that redirects to an unrelated homepage. [S4]
- Use ordinary anchor links, meaningful headings, descriptive link text, and contextual internal links. Return a real 404 for unknown service or guide routes.
- Support accurate Organization and BreadcrumbList structured data when the necessary facts are approved. Article data may describe genuine guide authorship. No fake reviews, ratings, addresses, affiliations, or government schema identity.
- FAQs exist to help visitors. Do not promise rich-result eligibility or search rankings. No meta-keywords field or keyword-stuffing requirements.
- Verify meaningful marketing content and navigation remain readable with JavaScript disabled; interactive paths offer a clear fallback to the contact page.

### Release-safe indexing

Define one `canIndex(page, environment)` function. It returns true only for live mode on the approved production origin, an indexable route, reviewed content, approved required commercial information, and a complete locale. Otherwise emit `noindex` metadata and a matching HTTP robots header where supported. Do not block crawler access and then expect the crawler to discover a `noindex` tag. Public preview access protection is a separate deployment control. [S12]

## 10. Social traffic, analytics, and privacy

### Attribution

Use an allowlist for campaign IDs, sources, mediums, and content variants. Unrecognized or malformed values become `unknown`; arbitrary raw query strings never enter analytics or logs. Strip query strings from referrers. Do not collect click IDs, fingerprinting data, or session replay in this prototype.

Preserve in-memory entry attribution while moving through the journey. A direct visit does not overwrite an already captured campaign. Attribution is not a contact detail and must not silently expand into a general tracking system.

### Event contract

Implement typed events through a mock/no-op adapter; no live analytics SDK is needed.

| Event | Emit when |
|---|---|
| `primary_cta_clicked` | A genuine user action on a named CTA |
| `package_selected` | A valid plan is chosen |
| `finder_started` / `finder_completed` | First answer / valid result shown |
| `inquiry_started` | First meaningful interaction, once per attempt |
| `lead_submitted` | Adapter accepts a submission, not on button click |
| `booking_confirmed` | Booking adapter confirms; demo flag mandatory |
| `whatsapp_clicked` | The user selects that contact action |
| `submission_failed` | A sanitized failure category is returned |

Allow only event ID, timestamp, route key, locale, service/plan ID, campaign category, CTA ID, step number, outcome category, and `is_demo`. No names, emails, phone numbers, free text, raw URLs, nationalities, or full questionnaire answers. Google Analytics prohibits sending personally identifiable information through ordinary collection. [S10]

A WhatsApp click is not a conversation, and a submitted inquiry is not an attended consultation. Do not invent downstream success. Future CRM-only stages are qualified lead, consultation attended, proposal, paid client, and cancellation/refund, with actual operational data.

After launch, evaluate **qualified consultations attended per relevant visitor**, paid-client conversion, and acquisition cost by source, locale, device, and service. The prototype reports event correctness, not a promised conversion lift. Do not build A/B infrastructure until traffic and measurement justify it.

### Consent and operational safeguards

No nonessential trackers run in the prototype, so do not display a deceptive consent banner claiming trackers are already active. Provide a consent integration boundary for future activation; applicable jurisdictions and legal basis need review before live collection. Necessary service inquiries must remain separate from optional marketing consent.

Production forms later require server validation, rate limiting, anti-spam measures, secure storage, access controls, a retention/deletion policy, and processor review. Record these as launch gates, not as already solved by a frontend mock. Never log submitted bodies.

## 11. Language and accessibility

Complete English across all specified routes. Complete Spanish across the homepage, residency overview, pricing, finder, book, thank-you, both social landing pages, link-in-bio, and contact, including errors and metadata. Translate the full experience, not just navigation.

Secondary pages may remain English-only initially. Link labels must make this explicit rather than presenting an English page as Spanish. The language switcher offers only genuine equivalents and preserves valid service/plan context. Draft translations do not enter `hreflang` or the sitemap. Separate language URLs align with Google's multilingual guidance. [S4]

Prepare RTL using logical CSS properties and direction-aware navigation. Add an internal, non-indexable RTL fixture or component test with realistic Hebrew text and mixed Latin numbers, email, prices, and phone fields. Do not publish a Hebrew menu option until the core journey is translated and reviewed.

Accessibility acceptance: semantic landmarks, one descriptive H1 per page, keyboard-operable navigation, labeled inputs, accessible error summaries, announced results, focus management on step changes, escape/dismiss behavior, and no keyboard traps. Accordions use buttons with expanded state. Validation does not rely on color alone. Compare plans without horizontal overflow at 360px. Test 200% zoom and 320 CSS-pixel reflow. Automated accessibility checks supplement, not replace, manual review. [S7][S8]

## 12. Performance and asset requirements

Use responsive images with explicit dimensions. Prioritize the actual hero/LCP image; defer below-fold images. Do not autoplay video, block the hero on an external embed, or ship a large animation library for decoration. Load scheduler/media providers only after deliberate interaction in any future integration.

Use locally hosted or licensed bundled fonts where appropriate and good system fallbacks. Avoid unnecessary third-party requests. Public marketing pages should render useful content before interactive widgets initialize.

Targets: LCP at or below 2.5 seconds, INP at or below 200ms, and CLS at or below 0.1 at the 75th percentile once field data exists. Local Lighthouse results cannot prove field INP or production performance. [S9]

For the prototype, record a production-build Lighthouse baseline on homepage, pricing, and one campaign page. Aim for at least 90 performance and at least 95 accessibility/SEO on representative marketing pages; measure production-like SEO fixtures separately because preview `noindex` is intentional. Report the browser, viewport, test method, and remaining issues. No claim of a perfect score without a report.

## 13. Automated tests and acceptance criteria

Use the repository's test tools. In a new application, prefer Vitest plus Testing Library for pure logic/components and Playwright for end-to-end journeys. Test server-rendered behavior through integration/E2E tests where unit tools are unsuitable; Next.js documents its supported testing approaches. [S11]

Create tests before implementation for the following contracts:

| ID | Scenario | Required result |
|---|---|---|
| AC-01 | Search visitor chooses Guided | Correct plan and same price survive pricing -> book -> receipt |
| AC-02 | Family campaign opens finder | Family context prefilled, editable, and no invented family total |
| AC-03 | Existing temporary resident | Upgrade route, not first-residency tier recommendation |
| AC-04 | Business/tax-only goal | Irrelevant residency questions skipped; correct service inquiry |
| AC-05 | User changes goal or goes Back | Relevant answers preserved; incompatible state cleared |
| AC-06 | Invalid/missing plan ID | Safe fallback; no crash, wrong price, or open redirect |
| AC-07 | Finder completes | Result visible without contact details or marketing consent |
| AC-08 | Submit twice / retry failure | One accepted receipt/event; no premature success |
| AC-09 | Timezone and past-date cases | Same instant displayed accurately; no past slots offered |
| AC-10 | Unavailable slot or provider failure | Honest status, preserved inputs, retry/callback route |
| AC-11 | Missing or refreshed receipt | No false booking confirmation or duplicate conversion |
| AC-12 | Demo WhatsApp and submit | No external provider or tracking requests; explicit demo feedback |
| AC-13 | Malicious query/notes input | Treated as data, never executable markup or raw analytics |
| AC-14 | Catalog price changes | Cards, comparison, finder, and receipt remain consistent |
| AC-15 | Preview environment | All routes noindex; production sitemap excludes draft routes |
| AC-16 | Production-like SEO fixture | Self canonical, valid metadata, valid translated alternates |
| AC-17 | Locale switch / RTL fixture | Equivalent page and context retained; no broken reading flow |
| AC-18 | Keyboard, zoom, mobile | Operable flows, visible focus/errors, no obscured primary action |
| AC-19 | JavaScript disabled | Core marketing content and ordinary navigation remain useful |
| AC-20 | Unapproved live configuration | Launch validation fails closed instead of publishing claims |

Unit tests also cover minor-unit currency formatting, price ranges, unknown inclusion states, recommendation rules, allowed attribution, event redaction, and indexability. Use an injected clock, deterministic fixtures, and explicit mock failures. Test `noindex` behavior and approved-mode SEO behavior separately.

E2E: run Chromium across desktop and mobile viewports and a WebKit smoke suite. Capture key pages at 390 x 844 and 1440 x 900; check 360px and 768px layouts as well. Use an accessibility scanner and manual keyboard review. Native iOS/Android in-app browsers require a separate manual device checklist; desktop emulation is not proof of native compatibility.

All visible primary buttons must navigate, update meaningful state, or explain the unavailable action. No dead links, broken images, serious console errors, hydration errors, or misleading success screens. Do not weaken assertions to get green tests.

## 14. Content and live-launch gates

The prototype can be completed with placeholders. Public launch cannot. Create `docs/LAUNCH_CHECKLIST.md` with owner, approval status, and evidence for each gate:

- Approved brand/domain, legal operator, ownership/contact details, actual team, and any professional credentials used.
- Signed-off catalog: delivery scope, fees, taxes, exclusions, family pricing, recurring obligations, third-party costs, cancellation/refund terms, and support boundaries.
- Qualified review of residency, tax, company formation, banking, property, and citizenship-related statements. Do not sell citizenship as a guaranteed package.
- Genuine licensed/owned imagery and permission for testimonials; verified authors/reviewers where shown.
- Complete translations for the intended markets and approved privacy, terms, disclaimer, and consent approach.
- Real lead ownership, approved WhatsApp/calendar/CRM endpoints, operational response expectations, secure handling, retention, monitoring, and successful integration tests.
- Approved production origin, redirect map, metadata, crawl/index rules, source-of-truth sitemap, analytics consent setup, and search-console verification plan.

Do not add deployment credentials, enable live messaging, or turn off demo safeguards just to pass the build. A live-mode readiness check should fail with actionable missing-input errors. The owner must explicitly approve deployment.

## 15. Build sequence and definition of done

### Phase 1 - Foundation and first vertical slice

Inspect the repo; scaffold only if necessary; establish tokens, shell, typed catalog, runtime mode, and test setup. Implement homepage -> pricing -> inquiry -> simulated receipt with preserved package selection. Exit only when AC-01, AC-08, AC-11, AC-12, and basic responsive checks pass.

### Phase 2 - Guided and social acquisition

Implement the rule-based finder, family/cost landing pages, and link hub. Add deterministic branching, back/edit behavior, UTM allowlisting, and mock events. Pass AC-02 through AC-07 and attribution/redaction tests.

### Phase 3 - Service breadth and SEO

Complete the service templates, guide, About/contact, policy drafts, metadata, sitemap, indexability gate, and source-review fields. Complete all P1 routes without thin or duplicate production content. Add Spanish core flows and internal RTL validation. Pass AC-14 through AC-17, AC-19, and AC-20.

### Phase 4 - Hardening and delivery

Complete failure states, accessibility, performance checks, WebKit/mobile tests, screenshot review, and documentation. Verify every route and CTA. Report what was actually executed and anything that remains blocked by the environment.

Provide standard scripts or their repository equivalents: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`, and `test:a11y`. Document Windows/PowerShell-compatible setup; no assumption that the developer uses Bash. CI must run type checking, linting, tests, and build. Keep real credentials out of CI fixtures.

### Required repository deliverables

`README.md` explains setup, commands, demo behavior, architecture, and editing content. `docs/DECISIONS.md` records assumptions. `docs/ROUTES_AND_SEO.md` records route ownership and metadata/indexing rules. `docs/QA_REPORT.md` contains actual commands/results and evidence paths. `docs/LAUNCH_CHECKLIST.md` separates remaining business approvals from engineering work. Preserve this handoff under `docs/`.

Finish with a completion report containing implemented routes, working journeys, commands and test outcomes, screenshots, known limitations, and the exact next launch decisions. Do not report tests as passed if they were not run. No live deployment is part of completion.

**Definition of done:** A reviewer can browse the site on desktop or mobile, understand provisional packages, enter from search-style or social-style pages, receive a relevant plan suggestion without a contact gate, submit a clearly simulated inquiry, and see the correct context in a truthful receipt. The code is maintainable, the tests pass, and nothing implies that unapproved offers or real integrations are already live.

## 16. Sources and review boundaries

Sources checked September 23, 2026. They inform the benchmark and technical requirements, not the approval of this business's delivery capacity or legal claims. UX choices, page order, visual tokens, scope, and acceptance criteria are project decisions to validate through testing; they are not claimed conversion guarantees.

[S1] WeParaguay, Packages & Pricing - competitor price benchmark only.  
https://weparaguay.com/paraguay-residency-packages-pricing/

[S2] WeParaguay, Local Concierge & Integration Support - relocation tier benchmark only.  
https://weparaguay.com/local-concierge-paraguay/

[S3] Next.js, Metadata and OG images - server metadata and social previews.  
https://nextjs.org/docs/app/getting-started/metadata-and-og-images

[S4] Google Search Central, Managing multi-regional and multilingual sites.  
https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites  
https://developers.google.com/search/docs/specialty/international/localized-versions

[S5] Google Search Central, JavaScript SEO basics.  
https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

[S6] Google Search Central, Canonicalization methods.  
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

[S7] W3C, WCAG 2.2 Target Size (Minimum).  
https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

[S8] W3C, WCAG 2.2 Contrast (Minimum).  
https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

[S9] web.dev, Web Vitals - field thresholds and measurement context.  
https://web.dev/articles/vitals

[S10] Google Analytics, Avoid sending personally identifiable information.  
https://support.google.com/analytics/answer/6366371?hl=en

[S11] Next.js, Testing - framework-specific testing guidance.  
https://nextjs.org/docs/app/guides/testing

[S12] Google Search Central, Block search indexing with noindex.  
https://developers.google.com/search/docs/crawling-indexing/block-indexing

## 17. Paste this instruction into Codex

```text
Read docs/CODEX_HANDOFF_PARAGUAY_SITE.md and the repository instructions.
Implement the working website prototype described in the handoff.
Inspect the existing project before choosing or changing the stack.
Use the documented defaults; log unresolved business inputs instead of
blocking the prototype. Start with Phase 1, then complete Phases 2-4.
Keep prices provisional, integrations mocked, and previews noindex.
Preserve selected-package context throughout each conversion journey.
Use test-first development for business rules and state transitions.
Do not stop at a proposal, scaffold, or static homepage. Run the tests,
build, and responsive checks. Deliver the code, setup instructions,
QA evidence, decisions log, and launch checklist. Do not deploy live.
```
