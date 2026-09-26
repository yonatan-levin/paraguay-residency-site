# Paraguay Next
## Benefits-first website update

**Codex change handoff | Version 2.0 | September 26, 2026**

**Target:** The existing website already built from `CODEX_HANDOFF_PARAGUAY_SITE.md` version 1.0. Apply an incremental update in the same repository. Do not restart the project.

### 1. The decision

The website must explain why someone would want Paraguayan residency or consider moving to Paraguay, not merely explain how our team handles documents. Many visitors will not already understand the product's value.

**New narrative:** What you could gain -> whether it fits your situation -> why trust Paraguay Next -> how we help -> packages and next steps.

Keep three ideas distinct: the benefits of residency, the broader reasons to consider life or business in Paraguay, and the benefits of hiring Paraguay Next. A lifestyle possibility is not an automatic legal entitlement; a service deliverable is not the underlying customer outcome.

**Brand:** Paraguay Next. Retain "Your next chapter starts here" as an optional tagline, not the entire value proposition. Use "Residency, Relocation & Business Setup" as the service descriptor. Do not imply brand/domain clearance or an approved legal operator.

### Change authority and boundaries

This document supersedes the old homepage order, general homepage CTA hierarchy, introductory messaging, navigation, and affected content requirements. Retain every non-conflicting engineering, catalog, privacy, accessibility, demo-mode, localization, and launch requirement from version 1.0. This is not a request to repeat its original build phases.

| Change now | Preserve |
|---|---|
| Explain product value before the full package preview. | Immediate links to pricing and consultation. |
| Add a substantive Why Paraguay page. | Existing service pages and stable routes. |
| Connect benefits to motivations and relevant next steps. | Finder rules, package IDs, prices and inquiry state. |
| Make tax-planning relevance visible, with accurate boundaries. | No automatic zero-tax or approval promises. |
| Update public-facing branding to Paraguay Next. | Repository structure, dependencies and deployment configuration. |

Inspect the actual implementation before changing files. Map these requirements to existing components; do not assume their filenames or current behavior. Protect unrelated/uncommitted work. Reuse existing visual tokens and components unless a focused change is necessary.

**Out of scope:** New services, price changes, a new design system, a framework migration, live integrations, payments, a customer portal, a tax calculator, domain registration or deployment. Do not modify unrelated projects or use unrelated attached documents as site content.

**Completion means implemented changes and regression evidence, not another proposal.**

## 2. Homepage: replace the narrative, not the application

### Hero copy to implement

**Eyebrow:** Paraguay Next - Residency, Relocation & Business Setup

**H1:** A legal base in Paraguay. More options for your future.

**Supporting copy:** Considering a new home, a second base, or a local business? Explore what Paraguayan residency could offer, understand the costs and commitments, and get practical support to move forward.

**Primary CTA:** Explore the benefits -> a real anchor to `#benefits` on this page.

**Secondary CTA:** Compare residency packages -> existing localized pricing route.

**Quiet text link:** Already know what you need? Book a consultation -> existing booking route.

Use the existing hero layout and an appropriate licensed/owner-provided image. Do not let a large image, an autoplay video or multiple badges displace the proposition and actions on mobile. The headline is positioning, not a promise that an application will be approved.

### Required section order

1. **Hero:** What the opportunity is, whom it may suit and where to start.
2. **Compact reassurance:** Existing truthful process/service proof only; no large intervening sales block.
3. **What could Paraguay offer you?** Four visible benefit summaries from Section 3, before any package cards. Give this section `id="benefits"`.
4. **What are you planning?** Four motivation paths from Section 4. Browsing does not require a questionnaire.
5. **Why Paraguay Next?** Explain the value of the paid assistance separately from the product benefits.
6. **How it works:** Reuse the current preparation, required local steps, processing and aftercare presentation.
7. **Choose the support that suits you:** Existing package preview with unchanged data, visible provisional labels and contextual actions.
8. **Who will help you / evidence:** Actual team and verified proof, or honest preview placeholders. Combine overlapping sections rather than repeat them.
9. **Questions before you decide:** Benefits, suitability, commitments and practical objections.
10. **Next step:** "See whether Paraguay fits your plans." Primary: Find my starting point. Secondary: Compare packages.

Keep the page scannable. Short benefit summaries belong here; detail belongs on Why Paraguay and the relevant service page. Do not insert a long guide, generic blog feed or several promotional videos before pricing.

### Dual journey, not compulsory education

New visitors can explore value first. Ready buyers can reach pricing or booking immediately from the header/hero and throughout the page. Do not require reading, scrolling, choosing a motivation, registering or finishing the finder to buy or inquire.

**Navigation:** Why Paraguay / Residency / Packages / Relocation & Business / Guides / About. Retain the locale control and a restrained Find my plan action. Group secondary links at narrower widths rather than crowding the header.

## 3. Benefits: visible, concrete and properly distinguished

Render all four cards in the initial HTML. Use a two-column desktop layout and stacked mobile cards. Do not hide the main explanation in a carousel, closed accordion, hover state, video or download. Each card needs a heading, a concise benefit, an adjacent qualification where material, and a descriptive link.

The copy below is the implementation draft. Its limited legal statements have the source references in Section 11; source checking is not professional or commercial approval.

### Card 1 - A legal base for life in Paraguay

**Body:** Paraguayan residency provides a legal basis to establish yourself in the country. The status and documents granted determine the rights and obligations that apply.

**Link:** See what residency can enable -> existing residency page, benefits section.

On the detail page, explain stage-specific work/study rights and access to a Paraguayan identity card only with their conditions. Do not merge provisional status, temporary residency, permanent residency and citizenship. [R1]

### Card 2 - Plan beyond your first arrival

**Body:** For people building a longer-term base, there is a route from temporary to permanent residency, subject to the applicable requirements.

**Link:** Understand the longer-term route -> permanent-residency page.

Keep approval and ongoing obligations explicit. Do not turn this into an automatic upgrade, citizenship promise or claim that maintaining residency never requires attention. [R2]

### Card 3 - Tax planning worth understanding

**Body:** Paraguay's personal income tax focuses on Paraguayan-source income. That can be relevant to your planning, but how your income is classified matters.

**Adjacent qualification:** Payment from abroad does not by itself establish that income is foreign-source. Review your situation before making decisions.

**Link:** Explore the tax-planning considerations -> existing tax-planning page. [R3]

Keep taxation on the homepage. Do not replace this card with a generic "Contact an expert" sentence, and do not promise a particular tax result. Separate source rules, immigration status and the individual's full cross-border position.

### Card 4 - Picture your life, not just your application

**Body:** Compare the housing, healthcare, transport and schooling choices that would shape your move, alongside the initial and ongoing costs.

**Link:** Explore lifestyle and budget considerations -> Why Paraguay, `#life-and-budget`.

This is a decision-support topic, not a verified savings claim. Do not invent a household budget, a percentage saving, safety ranking or guaranteed quality-of-life improvement.

### Business relevance

Keep the local-business motivation visible in Section 4 and on Why Paraguay. Explain that residency, forming a company, accounting and banking applications are separate workstreams. Do not imply buying a residency package automatically includes or approves the others.

**Writing rule:** State the meaningful benefit first; put a precise boundary next to it. Do not bury the benefit under disclaimers or remove it to avoid writing accurately.

## 4. Motivations and the value of hiring Paraguay Next

### Replace the homepage's generic goal selector

Use **What are you planning?** with four explanatory cards. These describe motivations, not legal eligibility or recommended packages.

| Motivation | Supporting line | Destination |
|---|---|---|
| A move for myself or my family | Connect residency preparation with the practical decisions around a move. | Existing relocation page; keep a family-quote path. |
| A second base | Understand what a legal base in Paraguay could involve, including its commitments. | Why Paraguay, `#second-base`. |
| A local business | Explore company setup and the ongoing support a local operation would need. | Existing Paraguay company-formation page. |
| The financial implications | Understand tax questions and lifestyle costs before deciding. | Why Paraguay, `#financial-planning`, with tax/budget links. |

Give each card a descriptive text link. On its destination, offer a relevant service inquiry and access to the optional finder. Do not launch a form merely because someone opened an informational card.

### Keep motivation separate from finder answers

A motivation may supply a non-sensitive inquiry topic, but must not silently answer nationality, family size, residency stage, timing or support preference. "A move for myself or my family" must not automatically classify everyone as a family.

Re-entering a journey must not overwrite an explicitly chosen compatible service/package. If the user explicitly changes to an incompatible service, clear the stale plan using existing rules and explain the change. Do not add a sixth required finder question or rebuild its recommendation engine.

### Separate section: Why Paraguay Next?

**Heading:** Turn the opportunity into a practical plan.

**Intro:** Understand the steps, prepare for the work ahead, and choose the level of support that suits your situation.

Reuse existing approved or clearly provisional scope to show four forms of service value:

- **Preparation:** Organize the document work before the relevant visits; avoid claiming guaranteed acceptance or a measured reduction in errors.
- **Coordination:** Know which steps need local action and what the team will help arrange; do not promise work that the package excludes.
- **Clear scope and costs:** Distinguish our service fee, outside charges, optional support and ongoing obligations.
- **Defined follow-through:** Explain who handles updates and what aftercare covers, without inventing response-time guarantees.

Each item should point to an actual package inclusion or scope statement. Existing disclaimers do not authorize new service promises. Keep the original included/excluded/optional/unknown states.

Use proof of delivery where available: real people, verified client evidence and accurate sample deliverables. Do not compensate for missing proof with invented reviews, office addresses, credentials, approval rates or customer counts.

**Transition to packages:** "Choose how much preparation and local support you need." This connects the fee to the work you undertake without confusing the package with the government decision.

## 5. Add one substantive Why Paraguay page

### Route and purpose

Add `/en/why-paraguay` and its complete Spanish equivalent using the repository's existing locale and trailing-slash conventions. If a truly equivalent route already exists, enhance it and record the route mapping instead of creating a duplicate.

This page owns the broad evaluation question: **Why consider residency or relocation in Paraguay, and what should I understand first?** It is not a copy of the homepage, a second pricing page or a collection of empty article links.

**H1:** Why consider Paraguay for your next chapter?

**Intro:** Explore the practical reasons to consider a base in Paraguay, what residency can enable, and the costs and commitments to assess before you decide.

### Required page sections

**1. At a glance.** Summarize the four benefit themes, with readable links to the detailed sections. Include direct access to residency packages.

**2. Residency: what the status can enable.** Expand Card 1. Include a stage-aware explanation of residency and identity documents; link to the service page and existing preparation guide. Keep a short source note adjacent to the legal explanation. [R1]

**3. A longer-term or second base (`#second-base`).** Expand Card 2 and provide questions to resolve about personal attendance, ongoing obligations and the permanent-residency route. Do not publish assumed minimum-stay rules or a passport timeline. [R2]

**4. Financial considerations (`#financial-planning`).** Explain why income-source rules deserve attention. Include a compact distinction between immigration arrangements, personal tax questions and business setup. Link to the tax service, without generating personalized tax conclusions. [R3]

**5. Life and budget (`#life-and-budget`).** Provide a useful planning framework now: housing, utilities/internet, transport, healthcare, schooling where relevant, relocation costs, and ongoing professional/administrative costs. Explain the choices affecting each category; link to relocation support.

**6. Establishing a local business.** Explain the separate questions around company formation, accounting and banking assistance. Reuse existing scope and route links; no invented returns, licensing entitlements or market statistics.

**7. What to weigh before deciding.** Balance the opportunity with actual planning questions: document preparation, required local steps, language needs, household requirements, budget and continuing obligations. Do not manufacture drawbacks or country rankings.

**8. Next step.** Find my starting point / Compare packages / contextual consultation.

### Budget data boundary

Do not show fabricated sample amounts as real Paraguay living costs. Until dated evidence exists, use meaningful categories and decision prompts, not an empty pricing widget. Any future comparison must identify location, household, period, currency, inclusions and source. Unknown costs are not zero. Build no live calculator in this change.

The page must be useful without an email gate. Reuse the existing guide/source components, but retain a marketing-page layout and clear service connections.

## 6. Update existing pages and social entry points

### Focused edits to current routes

| Existing page | Required change |
|---|---|
| Residency overview | Lead with what residency enables; follow with intended customer, process, requirements and support. Add a link to Why Paraguay. |
| Permanent-residency page | Explain the longer-term outcome before the upgrade service scope. Retain requirements and conditional language. |
| Relocation | Introduce the household decisions and desired outcome before transport/arrival logistics. Link to the budget framework. |
| Tax planning | Explain the underlying income-source topic before selling consultation. Keep personal tax conclusions out of the mock. |
| Paraguay company formation | Explain the purpose of establishing a local operation before listing setup deliverables. Keep banking, accounting and residency distinct. |
| Other service pages | Add or strengthen a short outcome-led introduction where needed; preserve their specific scope and inquiry actions. |
| Pricing | Keep comparison accessible immediately. Add only a short "Still deciding? Explore Why Paraguay" link; do not move a long explainer above the plans. |
| Finder result | Connect the selected support level to the user's stated needs, not to invented residency benefits or automatic eligibility. |
| Guides | Answer the actual question first; add relevant benefit/service links without turning every guide into the same sales page. |

### Social traffic: match the promise, not a stereotype

Keep the existing `/lp/residency-cost` and `/lp/family-relocation` routes. Do not assume all social visitors are uninformed or all search visitors are ready to buy. Match the explanation to the specific content they followed.

**Residency-cost landing:** Retain "Understand the cost before you plan your move." Add one compact paragraph explaining what the residency journey is for; keep the cost breakdown, inclusions/exclusions and route-selected pricing CTA prominent. Do not delay the answer to a cost-focused advertisement.

**Family-relocation landing:** Explain the outcome of coordinating a household move before listing logistics. Show relevant planning topics and a link to lifestyle/budget considerations. Keep Plan our move, editable family context and the no-invented-family-total rule.

**Link-in-bio:** Maximum four destinations: Why Paraguay; Residency packages; Family relocation; Book a consultation. Keep contextual WhatsApp on destinations and in contact navigation. Do not make this hub an extra step for campaign links.

### Optional campaigns are not mandatory new pages

A future lifestyle or tax campaign can link directly to the matching substantive section/page. Do not add tax or cost-of-living campaign pages with incomplete content just to populate a menu. Existing campaign pages remain `noindex` under the old contract.

Use original route-specific social previews with Paraguay Next branding and benefit-matched copy. Never introduce unapproved prices, tax promises or arbitrary query-string text into headlines or share assets.

## 7. SEO, language and mobile requirements

### Extend the existing search-intent map

Why Paraguay owns broad evaluation. The residency page still owns residency assistance; pricing owns costs/packages; the requirements guide owns preparation; tax and company pages own their specific service topics. Do not rename working routes for keywords or build near-identical "benefits" and "advantages" pages.

**Homepage title draft:** Paraguay Residency & Relocation - Paraguay Next

**Why Paraguay title draft:** Why Paraguay? Residency, Lifestyle & Planning - Paraguay Next

**Why Paraguay description draft:** Explore what Paraguayan residency can offer, the lifestyle and financial questions to assess, and practical next steps for your plans.

These are editorial choices, not keyword-volume findings or ranking guarantees. Preserve the repository's metadata mechanism and existing canonical conventions.

### Required SEO changes

Render the benefit copy, headings, links and source notes in the initial marketing HTML. Use one descriptive H1 per page. Add contextual links among Why Paraguay, residency, relocation, pricing, tax and company formation. Links must remain usable without JavaScript; interactive paths keep their existing fallback.

Update the route registry, navigation, breadcrumb and metadata configurations. Why Paraguay may enter the production sitemap only through the existing approval/indexability gate. Every preview stays `noindex`; no live deployment is authorized. Do not use canonicalization as a substitute for indexing decisions or point Spanish canonicals at English pages.

Add alternate-language links only for complete equivalent pages. Preserve the existing safe Organization/Breadcrumb schema; do not add fabricated ratings or promise FAQ rich results. Update social titles, descriptions and existing share assets without embedding unapproved numerical claims.

### Branding and languages

Replace obsolete public-facing placeholder names with **Paraguay Next** in configuration, headings, navigation, footer, metadata, share previews and demo confirmations. Keep the brand unchanged across locales. Do not rename the repository, package imports, stable plan IDs or deployment projects merely to change the brand.

Complete English and Spanish for the revised homepage, Why Paraguay, affected core flows, navigation and metadata. Use reviewed translation status consistently with the existing release gate. Preserve any already-complete supported locale. Maintain the internal RTL checks; do not expose an incomplete Hebrew locale. Do not add "By Este a Oeste" as an approved operator statement without authorization.

### Mobile and accessibility

Keep the main hero message/actions prominent at 390 x 844; the next reading section must explain benefits. Do not hard-code heights that clip translated or enlarged text. Check 360px, 768px and desktop layouts plus 320 CSS-pixel reflow and 200% zoom.

Use ordinary anchor behavior for Explore the benefits, offset for the sticky header, and respect reduced motion. Preserve accessible focus. One persistent conversion bar is enough; hide it on finder, booking and confirmation as before. Test safe-area padding, keyboard overlap, heading order and contrast. Keep benefits readable without playing media.

## 8. Implementation contracts: small, reversible changes

### Audit before editing

Read repository instructions and the original brief. Run existing checks and capture baseline screenshots of the homepage, pricing, finder result and one campaign page. Record pre-existing failures separately. Identify current routes, catalog, locale files, source-review model, analytics adapter and shared marketing components.

Use existing modules. Do not add a parallel design system, duplicate catalogs, a new CMS or a new analytics platform. Add tests before changing new routing/state logic. Never weaken old behavioral assertions to fit the revised layout.

### Minimal content model extension

Reuse or extend the current typed content records for:

- **Benefit:** stable ID, localized title/body/qualification, destination route/anchor, source references and review state.
- **Motivation:** stable ID, localized copy, destination and optional inquiry topic.
- **Page composition:** ordered section keys for the homepage and Why Paraguay, using existing configuration conventions.

Suggested benefit IDs: `legal-base`, `longer-term`, `tax-planning`, `life-and-budget`. Keep IDs independent of translated labels. Component names are implementation choices, not a requirement to duplicate equivalents.

Use the existing `ContentReview` model. Source-checked, professionally reviewed and commercially approved are separate states. A source-check date must not become a fictional "Reviewed by a lawyer" badge. Home, metadata and share text must not bypass claim approval simply because they are not guide pages.

### Review and launch behavior

Legal details require applicable source references and professional review before release; delivery promises require operator approval. For preview, show the supplied draft with the existing clear demo context. Do not blank out the benefit sections merely because live approval is pending.

Extend validation for newly added claims using the existing fail-closed approach. Affected live pages remain blocked until their required reviews are complete. Do not globally approve the site or disable demo controls to make tests pass.

### State and measurement

Preserve service/plan selection, allowed attribution, language, form retries and receipt semantics. Carry only an allowlisted non-personal motivation/topic when useful. Never put contact details, free text or sensitive finder answers into URLs or analytics.

Reuse `primary_cta_clicked` for new named actions. Add `benefit_detail_opened` and `motivation_selected` only if needed to distinguish these explicit clicks; extend the typed payload allowlist with `benefit_id` and `motivation_id`. Keep existing submission events unchanged. Use the mock/no-op adapter only.

Do not record a benefits click as a lead or a WhatsApp click as a conversation. Event counts are not evidence of comprehension or conversion uplift. The future commercial outcome remains qualified consultations attended and paid customers, measured from real operations.

Keep the update reviewable as focused commits or coherent diffs. Do not push or deploy unless separately instructed.

## 9. Acceptance tests: value, navigation and content

Implement the following update-specific checks alongside the original acceptance suite. The IDs below are additive; do not replace the old AC-01 through AC-20 contracts.

| ID | Scenario | Required result |
|---|---|---|
| V2-01 | Open the homepage. | Paraguay Next, service descriptor and outcome-led hero appear; old placeholder branding is absent from current UI. |
| V2-02 | Read the DOM and visual order. | Benefits precede motivations, service-value explanation and package preview. |
| V2-03 | Read the four benefit cards. | All summaries are visible without interaction; the tax qualification is adjacent, not hidden. |
| V2-04 | Select Explore the benefits. | A real `#benefits` target is reached, not a modal/form; header does not cover the heading. |
| V2-05 | Arrive ready to buy. | Pricing and booking are directly reachable without benefits interaction, login or finder completion. |
| V2-06 | Open each motivation. | Correct informational destination; no unsupported automatic answers or compulsory quiz. |
| V2-07 | Navigate Why Paraguay. | All eight planned sections, meaningful anchor links, service connections and source notes work. |
| V2-08 | Inspect mobile and enlarged text. | No clipped cards, horizontal page overflow, covered actions or layout-dependent hidden benefits. |
| V2-09 | Disable JavaScript. | Main benefit copy, navigation and relevant ordinary links remain usable. |
| V2-10 | Switch English/Spanish. | Equivalent revised page and valid context retained; complete copy/metadata with correct canonical and alternate behavior. |
| V2-11 | Inspect preview and approved-mode fixtures. | Preview noindex stays intact; new routes enter sitemap only when the existing release conditions are satisfied. |
| V2-12 | Inspect claims, budgets and reviews. | No automatic tax/approval promises, fabricated budget numbers, fake testimonials or invented reviewer identities. |

### Test implementation guidance

Use the current test runner and browser tools. Assert semantic content presence and section relationships rather than arbitrary CSS class names. Add unit tests for motivation mapping, invalid IDs and context compatibility. Add integration tests for metadata, content approval and initial-HTML content.

For V2-12, combine automated checks of known risky copy/fixtures with human editorial review; a keyword blacklist alone does not establish legal accuracy. Do not block necessary explanatory text just because it mentions tax or citizenship.

**Comprehension check:** Prepare a brief manual script asking a person unfamiliar with the service: What is offered? What could you gain? What would you pay Paraguay Next to do? What would you do next? Treat "they handle documents" as incomplete understanding. Do not report this test as completed without actual participants.

Capture screenshots at 390 x 844 and 1440 x 900, including both the first screen and the benefits-to-packages sequence. Visual evidence must show the implemented page, not an earlier mockup.

## 10. Regression, execution order and delivery

### Regression cases that must continue working

| ID | Scenario | Required result |
|---|---|---|
| V2-13 | Select Guided, book and view receipt. | Same valid plan ID, catalog price and provisional context throughout; no false real booking. |
| V2-14 | Open family campaign and change answers. | Context editable, no invented family total, old branching and stale-state clearing preserved. |
| V2-15 | Open business/tax path or an invalid ID. | Relevant inquiry path; no irrelevant required questions, crash or open redirect. |
| V2-16 | Retry/double-submit or refresh receipt. | Existing idempotency, failure recovery and no-duplicate-conversion behavior preserved. |
| V2-17 | Follow new benefit/motivation actions. | Typed sanitized mock events only; no PII, raw query data or external tracking requests. |
| V2-18 | Use social, WhatsApp and booking previews. | Honest demo behavior; existing adapters, source attribution and no-send safeguards retained. |

Re-run the complete existing suite, including timezones, price consistency, accessibility, indexability and RTL fixtures. New green tests do not excuse regressions in old ones.

### Implementation sequence

**Phase A - Baseline and map.** Record current state, affected files, route mapping and pre-existing test failures. Establish new tests. This is inspection of the built site, not scaffolding.

**Phase B - Homepage value layer.** Apply branding, hero, benefits, motivation cards, Why Paraguay navigation and section reordering. Preserve direct pricing/booking. Reuse the catalog unchanged.

**Phase C - Supporting journey.** Complete Why Paraguay, outcome-led service introductions, social updates, contextual links, Spanish copy, metadata and source-review wiring. Keep secondary route scope bounded.

**Phase D - Regression and QA.** Run type checking, lint, unit/integration/E2E tests and production build. Review responsive screenshots and keyboard behavior. Compare production-build performance with the baseline using the same method; investigate new heavy assets or layout shifts. Do not claim field performance or conversion results from local tests.

### Required repository deliverables

Save this brief as `docs/CODEX_UPDATE_PARAGUAY_NEXT_VALUE_FIRST.md`. Add a short update plan or extend the existing one. Update `docs/ROUTES_AND_SEO.md`, `docs/DECISIONS.md` and `docs/LAUNCH_CHECKLIST.md` only where changed.

Write `docs/VALUE_FIRST_QA.md` with actual commands, pass/fail results, pre-existing versus introduced failures, screenshots/evidence paths, editorial review status and unexecuted manual/device checks. Include the new legal-content approval items without claiming professional review occurred.

**Finish with:** Changed files/routes; working journeys; tests actually run; before/after evidence; unresolved content/operational approvals; and confirmation that deployment and live services were not activated. Continue implementing rather than stopping after the plan. Report genuine blockers without inventing results.

## 11. Reference notes and Codex continuation prompt

### Baseline and source boundaries

**B0 - Original implementation contract:** `CODEX_HANDOFF_PARAGUAY_SITE.md`, version 1.0, September 23, 2026. Relevant sections: 3 (routes), 5.1 (homepage), 5.2-5.7 (page contracts), 6-7 (catalog/state), 9-14 (SEO, privacy, languages, QA and launch). Preserve B0 unchanged as history; this update overrides only the conflicts explicitly named in Section 1.

The new narrative, copy hierarchy, page sequence and acceptance criteria are product decisions from the Paraguay Next discussion. They are not measured conversion findings. The references below support limited factual explanations, not delivery capacity, tax advice or a legal opinion.

**R1 - Temporary residency:** [Direccion Nacional de Migraciones: Residencia Temporal](https://migraciones.gov.py/residencia-temporal/). Official content checked September 26, 2026. Supports the purpose of the status, provisional work/study/re-entry rights during its validity, and access to an identity card. Keep stage and validity distinctions. Do not copy government contact details as business contacts.

**R2 - Permanent-residency transition:** [Direccion Nacional de Migraciones: Cambio de categoria](https://migraciones.gov.py/residencia-permanente-para-el-cambio-de-categoria-de-residente-temporal/). Official content checked September 26, 2026. Supports the conditional temporary-to-permanent route and indefinite residence after the appropriate status is granted. Detailed filing deadlines and documents are outside this UX update; verify separately before publishing them.

**R3 - Personal income tax source rules:** [DNIT: Ley No. 6380/19, articles 47-49](https://www.dnit.gov.py/en/web/portal-institucional/w/ley-n-6380-19). Official statutory text checked September 26, 2026. Supports the limited Paraguayan-source explanation and the relevance of where activities occur. It is not a complete cross-border tax analysis or proof of anyone's tax residency. Review current applicable rules and the person's circumstances before advice.

Source checks must not be presented as review by a named professional. Do not add prices, thresholds, minimum-stay requirements, savings estimates or promised timelines from earlier marketing research to fill gaps.

### Paste into the existing Codex session

```text
Continue in the website repository you already built. Do not start over.
Read docs/CODEX_UPDATE_PARAGUAY_NEXT_VALUE_FIRST.md and the repo rules.
Apply it as a targeted change to the original handoff, retaining every
non-conflicting requirement and all working customer journeys.

Make Paraguay Next benefits-first: explain why consider Paraguay and
what residency can enable, separately from why hire our service.
Implement the revised homepage, Why Paraguay page, motivation paths,
affected service/social copy, navigation, metadata and translations.
Keep pricing and booking directly accessible. Preserve catalog data,
plan IDs, finder behavior, inquiry state and demo/noindex safeguards.

Inspect the existing code, add tests, then implement all four update
phases. Run the old and new tests, build and responsive QA. Deliver the
changes and factual evidence; do not stop at a proposal. Do not deploy
or enable live services. Log pending business/content approvals without
using them as a reason to omit the working prototype's benefits.
```

**Final review question:** Can a new visitor explain both what they might gain from Paraguay and what Paraguay Next will do for them, while a ready buyer can still go straight to a relevant package?
