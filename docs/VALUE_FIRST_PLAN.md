# Paraguay Next value first implementation contract

Tier: S1. This contract implements the approved update brief incrementally in the existing application. The original handoff remains authoritative outside the update's explicit overrides. Work status and acceptance live in GitHub issue 9; this document describes the system and the implementation boundaries.

## Scope and preserved behavior

Explain the opportunity of residency and life or business in Paraguay separately from the paid assistance offered by Paraguay Next. Retain direct access to packages and consultation, the existing catalog, provisional prices, five question finder, private in memory drafts, simulated submissions, receipt semantics and all five complete locales: English, Spanish, French, German and Hebrew.

Reuse Next.js, React, existing CSS, route dispatch, metadata, analytics and mock adapters. Do not rename routes, package IDs, repository, imports or Firebase projects. Do not alter dependencies, deployment configuration, provider settings or runtime approval flags. Do not push, deploy, send messages, collect payments or activate live services. No prices, legal operator, reviewer identities, promised outcomes or household budgets are invented.

The existing delayed navigation fix is a protected contract: an explicit selection, including an empty one, wins while its previous URL is pending; a different explicit URL regains authority on navigation and history traversal. Preserve `pendingFrom`, `useChooseSelection`, `CaptureJourneyEntry` and `JourneyLink`'s `onNavigate` behavior. Modified clicks must not change the originating tab.

## Existing architecture and bounded changes

`src/config/routes.ts` is the public route registry. `src/app/(site)/[locale]/[[...slug]]/page.tsx` dispatches page components; the locale layout supplies initial request HTML. Add only `why-paraguay`, available in all five locales, using existing locale prefixes and no trailing slash.

`home.tsx`, `content-pages.tsx`, `campaigns.tsx`, `shell.tsx`, `pricing.tsx` and `finder.tsx` own the affected presentation. Reuse `Section`, `PageIntro`, `PackageCard`, `ProcessSteps` and `FAQAccordion`. The catalog remains the single commercial source; new content references its service and package IDs and existing inclusion states.

There is no equivalent Why Paraguay route to reuse. Existing service and guide pages retain their own intent and substantive scope. The new route owns broad evaluation, not a duplicate pricing or residency assistance page.

## Visual and interaction contract

Retain the current editorial terrace artwork, subject to its existing honest illustration caption. The memorable element becomes the clear outcome headline. Do not add large badges, motion, new illustration downloads or stock claims. Retain the current visual tokens: background `#f7f8f5`, surface `#ffffff`, ink `#142b3b`, muted `#52636d`, action green `#12624c` and soft surface `#e7f0eb`. Keep the existing Arial/Helvetica stack, responsive heading scale, logical spacing and visible focus treatment. Body copy follows the locale's reading direction and stays at a readable line length.

Desktop hero retains text beside artwork. Mobile prioritizes eyebrow, full headline, supporting paragraph, the primary Find my plan action, package comparison, benefits link and quiet consultation link before optional artwork. This reflects the subsequent request to move the finder into the main content. Avoid fixed text heights. At 390 × 844, the first screen must expose the proposition and actions; the next reading section explains benefits after only compact reassurance. Use the existing button hierarchy without adding repeated promotional blocks.

Benefits use two columns on desktop and one column on narrow screens. Each visible card contains heading, concise benefit, material adjacent qualification and descriptive link. Motivations are explanatory cards with descriptive links, not form controls. Neither group hides its explanation in an accordion, carousel, tooltip or hover state. Service value uses a separate restrained section so it cannot be mistaken for residency rights.

Header order is Why Paraguay / Residency / Packages / Relocation & Business / Guides / About, plus locale selection. Find my plan belongs in the homepage hero rather than the shared header. Preserve direct booking in the hero and navigation. Use the existing native mobile disclosure when translations no longer fit; never shrink the six destinations into unreadable controls. Keep language and mobile menus operable without JavaScript. Preserve one persistent conversion bar, its safe area padding, and its existing absence on finder, booking and confirmation.

Native anchors must leave the targeted heading visible below the actual header. The existing header is not sticky; do not introduce sticky behavior merely for this update. Give targets adequate logical scroll margin and verify any effective header overlap at narrow widths and zoom. Do not replace anchor navigation with a modal or mandatory smooth scrolling. Preserve focus visibility and reduced motion behavior.

## Page composition

Keep ordered section keys in typed configuration and render the sections in that order. The intro contains each page's only H1. All benefit copy, source notes and ordinary links appear in the initial HTML.

Homepage section keys and responsibilities:

1. `hero`: supplied legal base headline, service descriptor, benefits anchor, pricing and quiet booking link. Render Paraguay Next and the descriptor with ordinary spacing or punctuation, without a decorative dash.
2. `reassurance`: compact existing truthful process and scope statements.
3. `benefits`: heading What could Paraguay offer you? Four cards with `id="benefits"` on the section.
4. `motivations`: heading What are you planning? Move, second base, local business and financial implications.
5. `service-value`: heading Turn the opportunity into a practical plan. Preparation, coordination, clear scope and costs, and defined follow through. Each points to an existing scope or package inclusion.
6. `process`: existing preparation, local steps, processing and aftercare presentation.
7. `packages`: unchanged catalog cards with provisional labels and contextual actions; transition explains choosing the amount of preparation and local support.
8. `evidence`: combine existing honest team placeholders and sample deliverables. Do not invent client evidence or credentials.
9. `questions`: useful benefits, suitability, commitments and practical objections, with necessary qualifications in the visible preceding content.
10. `next-step`: See whether Paraguay fits your plans. Find my starting point and Compare packages. Fold any useful preparation guide link into this section rather than adding a new trailing narrative block.

Why Paraguay has the supplied H1 and introductory paragraph, followed by exactly these substantive sections:

1. `at-a-glance`: four themes with readable section links and direct packages access.
2. `residency`: stage aware distinction between provisional status, temporary residency, identity documents and permanent residency; adjacent R1 source note, service and preparation guide links.
3. `second-base`: longer term planning, required presence questions, continuing obligations and conditional permanent route; R2 note. No assumed minimum stay or citizenship timeline.
4. `financial-planning`: source rules, payment location qualification, and distinction among immigration, personal tax questions and business setup; R3 note and tax service link.
5. `life-and-budget`: meaningful prompts for housing, utilities/internet, transport, healthcare, schooling when relevant, relocation and continuing professional or administrative costs. No sample amounts or calculator.
6. `local-business`: separate company formation, accounting and banking workstreams and service links.
7. `considerations`: preparation, local steps, language needs, household requirements, budget and continuing obligations.
8. `next-step`: finder, packages and contextual consultation without an email gate.

## Minimal typed contracts

Use the following exported seams, with implementation names kept consistent across owners. No additional application or state store is required.

| Module | Exports and responsibility |
|---|---|
| `src/domain/value-first.ts` | `benefitIds`, `motivationIds`, their literal ID types, route/anchor destination records and `resolveMotivation(id: unknown)`. Invalid IDs return no result. This module contains IDs and mapping, not long translated marketing copy. |
| `src/domain/selection.ts` | Extend `journeyHref(locale, route, selection, anchor?)` with a route bound anchor allowlist. Export `selectServiceContext(current, requestedServiceId)` returning sanitized selection and an optional `package-cleared` reason. Unknown services fail safely and never create navigation destinations. |
| `src/content/value-first.ts` | Typed benefits, motivations, homepage/Why section order, section content and localized accessors. Benefit records carry stable ID, title/body/qualification, route/anchor and claim IDs. Motivation records carry ID, title/body/link/destination and optional allowlisted topic only. Keep long content server only using the existing editorial translator. |
| `src/content/content-review.ts` | Pure review/source records plus page claim dependencies. Reuse `ContentReview`; express professional review and operator/commercial approval separately. Export `validatePageClaims(page, locale, reviews?)` and `validateContentLaunch(pages, locales, reviews?)` for metadata and launch validation. No component, server only translator or browser API dependencies. |
| `src/components/journey-provider.tsx` | `JourneyLink` accepts separate `anchor` and optional `inquiryServiceId` props. Anchor is never smuggled into `route`. Informational links preserve current selection. Explicit inquiry service actions apply `selectServiceContext` through the existing pending selection mechanism. |
| `src/lib/analytics/events.ts` | Extend existing typed route/CTA allowlists. If distinct benefit or motivation events are used, allow only registered `benefit_id` and `motivation_id`; strip all unknown fields. Preserve existing submission event semantics and memory adapter. |

Informational motivation clicks do not set nationality, household, stage, timing, support, answers or a recommendation. Do not add persisted motivation or topic state: the allowlisted explicit click IDs and informational destinations are sufficient for this update. They must not replace an existing compatible package or require the finder.

`selectServiceContext` keeps the selected package when its catalog service matches the explicitly requested service, preserves campaign context, and clears a package only when the user explicitly chooses an incompatible service. Show a localized explanation adjacent to the explicit inquiry action before the click when it will clear the old package. The helper's typed reason supplies that explanation; no cross route notice state machine, contact data or arbitrary URL text is needed. Explicit family campaign entry retains its existing editable family behavior; opening the general move motivation must not assign family status.

Native links without JavaScript must include valid selection and anchor context in their rendered href. Changing locale must retain the current equivalent route and valid selection. Anchor retention is needed when switching from an anchored evaluation section where practical, but must never invent a nonexistent target.

## Claim review, SEO and release contract

R1, R2 and R3 source records retain official URLs and the source inspection provenance. On September 26, 2026, the root directly retrieved R2 and the relevant R3 statutory text. Direct retrieval of R1 timed out; its limited stage aware statements are supported by the official search snapshot and the supplied brief's source check, not claimed as an independent full page retrieval. R1 distinguishes provisional processing status and its validity from the temporary resident's identity card access. R2 supports a conditional category transition and indefinite residence after the appropriate status is granted. R3 supports Paraguayan source rules, including activities in the Republic, assets/rights and specified services; a foreign payer alone does not establish a foreign source. Keep this detail bounded and do not add deadlines, thresholds or tax conclusions.

Source check dates record inspection only. Professional status remains draft with no invented reviewer, professional date or approval. Delivery statements retain operator approval requirements independently. Translation completeness and translation approval also remain separate.

Define an explicit dependency list for each affected page and its metadata/share assertions. Home and Why depend on the legal base, longer term route and income source claims, plus any delivery statements they display. Residency, permanent residency and tax pages depend on the legal claims they use. Other revised pages depend on their relevant outcome/scope statements. A missing claim record or required review fails closed. Do not let a page approved boolean override a draft claim. Source review dependencies may be absent only for unaffected historical pages; omitting them from a new affected page must not silently approve it.

`canIndex` retains all existing runtime, origin, locale, content and commercial conditions and also requires the page's claim dependencies to pass. Sitemap continues to use the same gate. The launch command checks content dependencies in addition to existing runtime prerequisites; keep its native Node execution supported by explicit `.ts` import paths where needed, without dragging server only translation modules into that command. Report concrete missing review/approval categories, not a misleading source checked approval.

Approved mode tests must supply genuinely complete per claim fixture reviews and operator approvals, not mutate production records or simply set page/global booleans true. Test each missing source/reviewer/date/status/operator/translation requirement independently where it is applicable. Source checked draft records must remain blocked. Production source records and page approvals remain unapproved; previews stay noindex and the demo sitemap remains empty.

Use the existing title/description and canonical mechanism. The supplied title drafts may use the repository's existing `|` brand separator to respect the no decorative dash preference. Every complete locale gets its own canonical and reciprocal alternates. Add no FAQ promises, review ratings, invented Organization facts or reviewer schema. Preserve any existing safe structured data; this update does not require inventing schema where none exists.

## Content, translations and assets

Focused edits strengthen current service introductions before scope, preserve included/excluded/optional/unknown states, and add Why/budget/tax links where relevant. Pricing receives only the short still deciding link. Finder results continue explaining support fit from actual answers, with no eligibility claims. Cost campaign keeps its direct cost answer and selected pricing action. Family campaign adds household outcome/budget context without an invented total.

The link hub contains exactly four destinations: Why Paraguay, Residency packages, Family relocation and Book a consultation. Campaign URLs remain direct entry points. WhatsApp stays contextual on destination/contact surfaces and remains a no send preview.

All new visible strings and metadata must be complete in ES/FR/DE/HE. Long body copy goes through the existing server only `editorialText`; short navigation, shared actions, metadata and client notices use common dictionaries. Do not duplicate the locale system or add English fallbacks. Keep brand spelling Paraguay Next unchanged and use no authored dash punctuation in any locale, including Hebrew maqaf. Paths, source URLs and code identifiers retain their valid punctuation.

Update `brand.ts`, obsolete About wording, footer/confirmations where needed, metadata and all existing social previews. Keep original artwork and route matched social text without prices or legal promises. `scripts/render-social-assets.mjs` currently regenerates campaign PNGs and localized defaults but not English `og-default.png`; ensure both the default SVG and English raster receive the brand/copy update. Review Hebrew glyph direction and clipping on the generated images. No new remote font or heavy media dependency is necessary.

## Ownership boundaries

| Owner | Files and responsibilities |
|---|---|
| Domain/content governance implementer | Domain types and value first IDs/mapping; `selection.ts`; pure review registry; route definitions; brand; metadata; analytics allowlist; launch command; unit/integration tests for these rules. Do not edit JSX, CSS or translation JSON. |
| FRONTEND implementer | Homepage, new Why component, shell, shared primitives, service/campaign/pricing/finder presentation, route dispatch, CSS, and narrow JourneyLink integration. Own new English long content and UI E2E tests. Coordinate shared exported types before editing. Do not alter catalog data or submission adapters. |
| Root, translations and assets | Exclusive ownership of all eight locale common/editorial JSON files after English keys stabilize, plus social asset script, default source SVG and generated social PNGs. Translate every new key with matching placeholders and no dash punctuation. Preserve prior keys unless their consuming owner confirms removal. No concurrent JSON writes. |
| Root, integration and evidence | Source verification, copied update brief, changed existing documentation, factual QA report and before/after evidence. Coordinate shared builds and the final complete regression run. |

All owners preserve peer changes. Do not run competing production builds in the same checkout. Verify the integration boundaries with targeted tests before the root's complete regression pass.

## Four phases and evidence contract

Phase A establishes baseline tests, route/content mapping and screenshots of home, pricing, finder result and one campaign. Tests for new route/anchor rules, motivation mapping, compatible service selection, claim release gates and sanitized events precede their implementation. Distinguish baseline failures from introduced ones.

Phase B implements the brand, complete homepage sequence, navigation, visible benefits and informational motivations. Phase C completes Why Paraguay, affected service/social content, all translations, metadata, assets and source/review dependencies. Both phases preserve the same catalog and journey implementation.

Phase D runs existing and additive tests, lint, typecheck and production build. Preserve existing assertions for prices, timezones, hydration, delayed selections, modified clicks, retries, receipt refresh, family edits, invalid IDs, no send previews, privacy, noindex, accessibility and RTL. New semantic tests cover V2-01 through V2-18; assert actual DOM order and initial HTML rather than arbitrary CSS classes.

Capture actual before/after first screens and benefits through packages at 390 × 844 and 1440 × 900. Check 360px, 768px, desktop, 320 CSS pixel reflow and 200% zoom. Exercise keyboard focus, native menus, anchors, no JavaScript links, reduced motion, safe areas and action visibility. Distinguish desktop emulation from unexecuted physical device/keyboard checks. Compare local production performance with the baseline using the same method and report measured variance without field performance or conversion claims.

`docs/VALUE_FIRST_QA.md` records actual commands, results, evidence paths, editorial review boundaries and checks not executed. Include a manual comprehension script asking what is offered, what the visitor could gain, what Paraguay Next would be paid to do and what to do next. No participant result is claimed without actual participants. Professional legal/tax review, operator approval and commercial/translation launch approval remain unresolved launch inputs; they do not hide the working draft content.
