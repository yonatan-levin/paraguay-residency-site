# Prototype decisions

This document records product and architecture decisions for the demo prototype, not approval to operate a live service. The source is `CODEX_HANDOFF_PARAGUAY_SITE.md` supplied by the owner. Its commercial benchmark snapshot is dated September 23, 2026; those amounts have not become approved business prices through implementation.

## Defaults used

| Decision | Prototype default | Reason / boundary |
|---|---|---|
| Application location | Standalone `paraguay-residency-site` beneath the inspected workspace | No existing application was present; preserve the source handoff and unrelated workspace files |
| Stack | Next.js App Router, React, strict TypeScript, npm, small CSS component system | Follows the source handoff for an empty workspace; keep content server-rendered and interactions isolated |
| Content storage | Typed local content, no database or CMS | The prototype needs reviewable fixtures and deterministic editing, not an operating backend |
| Brand | Paraguay Residency Studio | Explicitly provisional; no assumption that Este a Oeste is the legal provider |
| Operating mode | Demo with local mocks, publicly accessible team preview authorized | No real booking, lead delivery, messaging, payment or analytics; hosting does not approve business operation |
| Currency | USD integer minor units, shared formatter | No exchange-rate service, duplicated display amounts, or floating-point business arithmetic |
| Languages | Complete English, Spanish, French, German and Hebrew across all public pages | User requested full language parity, including Hebrew and the previously missing Spanish pages |
| Hebrew direction | Server and client use RTL at `/he`; logical CSS and isolated mixed text preserve reading order | Language is available in the prototype; professional publication review and staffed support remain unapproved |
| GitHub publication | Public owner repository, implementation on a review branch and open pull request | Owner requested public team access; default branch merge remains separate |
| Demo hosting | Firebase App Hosting in the separate `paraguay-residency-site` project | Preserve the existing Next.js architecture and keep the owner's other Firebase project untouched; setup is in `FIREBASE_HOSTING.md` |
| Hosting capacity | `us-central1`, Node.js 24, editable minimum 0 and maximum 2 instances | Selected region supports the documented local source storage allowance; scale to zero between reviews, with modest burst capacity. This is not a billing cap |
| Hosting origin | Verified backend HTTPS `uri`, configured as `SITE_URL` at build and runtime | Do not infer Firebase hostnames; backend creation requires Blaze billing authorization before the origin can be retrieved |
| Root route | Deterministic redirect to `/en` | No inferred language or IP-based routing |
| URL convention | No trailing slash on page routes | One canonical URL per page; canonical URLs omit selection and tracking parameters |
| Demo consultation | 20 minutes, configurable | Demonstration choice only, not a staffing or delivery commitment |
| Team timezone | Configurable `America/Asuncion` | Team configuration is distinct from visitor timezone |
| Visitor timezone | Browser-detected IANA zone, visible and changeable | Store selected instants in UTC and preserve the instant when the display zone changes |
| Appointment data | Future mock slots relative to an injected clock | No stale dates or real calendar integration |
| Contact collection | First name, chosen contact channel and its required detail; notes optional | Email for appointment, phone with country code for WhatsApp callback; never require both without cause |
| Personal state | Memory only, reset on full reload | No notes, contact details, nationality/country answers, or booking payload in URL/storage/events/logs |
| Public context | Stable allowlisted service, package, and campaign IDs | Deep links can preserve non-personal selection safely |
| Tracking | Typed local/no-op event adapter | No external SDK, session replay, click IDs, fingerprinting, or unnecessary consent banner |
| Consent | Optional marketing consent separate and unchecked | The preview does not assert a lawful basis for a later operating business |
| Missing business facts | Honest pending/unavailable labels | No fabricated team biographies, addresses, review stars, credentials, office, support hours, or regulatory guarantees |
| Imagery | Original neutral editorial artwork / explicit placeholders | No stock person represented as staff and no copied competitor assets |
| Website wording | No hyphens or dash punctuation in authored copy | Use natural sentence punctuation and wording; price ranges use localized connecting words. Technical identifiers and URLs retain their required spelling. |
| SEO | Every preview page noindex; no preview URLs in sitemap | Public demo access is authorized; robots directives are not access protection, and only test data belongs in the demo |
| Live readiness | Fail closed with missing-input errors | Passing a build never approves launch or automatically enables providers |

## Commercial fixture policy

All displayed prices are **illustrative USD amounts, subject to confirmation**. The central catalog is the only amount source for cards, comparison, finder, selected-plan summary, and receipt. Metadata and social images must not contain unapproved amounts. Stable fixture IDs and their meanings are part of the prototype contract.

| Package/service ID | Fixture amount (USD) | Display basis |
|---|---:|---|
| `temporary-essential` | 2,200 | Per applicant |
| `temporary-guided` | 2,850 | Per applicant |
| `temporary-concierge` | 4,500 | Per applicant |
| `upgrade-basic` | 1,400 | Service price; scope to confirm |
| `upgrade-premium` | 2,400 | Service price; scope to confirm |
| `investor-support` | 4,500 | Service fee; qualifying capital separate |
| `business-route-support` | 5,500 | Service fee; qualifying capital separate |
| `relocation-orientation` | 500 | Package fee |
| `relocation-integration` | 1,500 | Package fee |
| `relocation-priority` | 3,500 | Package fee |
| `us-business-setup` | 1,500 | Setup scope to confirm |
| `paraguay-company-setup` | 1,000 | Setup fee; recurring obligations separate |
| `accounting` | 90–220 | Monthly range; scope-dependent |
| `tax-planning` | 300–1,000 | Scope-dependent range |
| `property-assistance` | 1,500 | Engagement fee; scope to confirm |

Other services use a quote request. The fixed source snapshot above documents why catalog fixtures exist; edit actual fixture values only in the catalog and update this snapshot if the business baseline changes. No computed household total, middle-tier tax price, package discount, or percentage property-management fee is authorized.

Inclusion values distinguish **included**, **excluded**, **optional**, and **unknown**. Unknown external charges say “To be confirmed”; they never imply zero cost or included service. Guided may be described as “More hands-on support,” never “Most popular” without evidence. Support tiers alter coordination scope, never government priority or approval prospects.

## Journey and privacy decisions

- Selection is explicit. First-residency users can compare Essential, Guided, and Concierge; no tier is silently preselected or upsold.
- The finder advises on support scope, not legal eligibility. Existing temporary residents receive the upgrade route, investment users a specialist discussion, and business/tax/property-only users skip irrelevant residency questions.
- Family/couple context is editable. Family applications are quote-only even when a per-applicant fixture exists; no household price is inferred.
- Finder results appear before any contact gate. Back preserves relevant answers; changing a goal clears incompatible answers and package selections.
- All public routes are available in English, Spanish, French, German and Hebrew. A language change preserves the same route, service/package selection, family quote context, finder origin and the current in memory draft. Appointment mode, time zone and selected UTC instant also remain in the root journey state; they clear on refresh like the contact draft. No public secondary destination falls back to English.
- Mock submissions are accepted once per unchanged payload. Retrying reuses that payload’s idempotency key; changing the payload starts a new key. Pending state disables duplicate attempts.
- Local receipts are available only from an accepted mock request in the current memory session. Refresh or direct visit shows recovery, with no fresh success event.
- Demo WhatsApp displays a contextual intended message and says sending is disabled. It never opens a competitor number or sends personal finder answers.
- Event properties are an allowlist. They may include stable route/service/package/CTA/campaign categories and `is_demo`; they may not include names, contact details, free text, raw URLs, nationality, or full answers.
- No provider or tracker is activated by changing a display setting. Future live integration requires separate reviewed implementation and business approval.

## Unresolved business inputs

These inputs do not block a local demonstration. They block the corresponding claims or live capability until the named owner supplies genuine evidence. Owner labels are responsibilities to assign, not invented people.

| Input | Responsible owner | Prototype handling | Needed before launch |
|---|---|---|---|
| Approved name, domain, operator and legal relationship | Business owner | Working brand; operator unconfirmed | Explicit signed-off identity and approved production origin |
| Address, email, phone, support hours, languages staffed | Operations owner | Unavailable or pending; demo contact paths | Verified contact endpoints and achievable response commitments |
| Team and professional responsibilities | Business owner / professional lead | Explicit editorial profile placeholders | Real approved profiles, credentials and role boundaries |
| Final prices, taxes and fee inclusions | Commercial owner | Provisional fixture amounts and unknown exclusions | Signed catalog and recurring/third-party fee disclosures |
| Family/child pricing and shared fees | Commercial owner | Request a family quote | Documented policy; no implicit multiplication |
| Package delivery, duration and aftercare | Operations owner | Provisional deliverables; no guaranteed timing | Service scope, dependency boundaries, support commitments |
| Residency, investor, company, tax, banking, property and citizenship statements | Qualified professional reviewers | General preparation and scoped assistance only | Route-by-route factual review with real names/dates where published |
| Cancellation, refund, privacy and terms | Legal/privacy owner | Clearly labeled policy drafts | Jurisdiction-specific reviewed policies and consent/lawful-basis decisions |
| Photos, people imagery, testimonials and author/reviewer attribution | Content owner | Original neutral artwork; no invented proof | Rights/permissions and factual approvals |
| English, Spanish, French, German and Hebrew publication review | Language/content owner | All public pages and conversion journeys translated; Hebrew uses right to left layouts | Native language and qualified professional review for intended markets; confirm staffed languages separately |
| Real leads, calendar, WhatsApp, CRM and monitoring | Operations / engineering owner | Local mocks and no-op events | Approved providers, ownership, credentials process, security controls and integration tests |
| Production analytics and attribution policy | Privacy / marketing owner | Sanitized mock events only | Consent review, retention policy and defined operational conversion stages |

## Evidence and review boundaries

No legal thresholds, document validity periods, eligibility decisions, passport-access counts, pension-tax claims, or approval timelines are inferred from a competitor. The preparatory guide names questions to confirm and clearly separates supplied official sources from actual professional review. Source links alone do not establish that the website’s wording was reviewed.

Production performance targets in the handoff are future field targets. Local Lighthouse results are a laboratory baseline only; native iOS/Android behavior requires separate device checks. Actual executed evidence belongs in `QA_REPORT.md`; unresolved public-launch conditions belong in `LAUNCH_CHECKLIST.md`.
