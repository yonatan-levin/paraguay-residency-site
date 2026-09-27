# Routes and SEO contract

Every route in this prototype is **noindex**. The “eventual indexing” column below is intent ownership after approval, not the current runtime behavior or a claim about keyword volume. All page URLs use a locale prefix and no trailing slash; `/` redirects to `/en` without IP-based inference.

## Route ownership and locale availability

| Stable destination | English path | Spanish, French, German and Hebrew | Purpose / primary action | Eventual indexing |
|---|---|---|---|---|
| Home | `/en` | `/es`, `/fr`, `/de`, `/he` | Explain the opportunity, then paid assistance; benefits anchor, packages or consultation | Index after approval |
| Why Paraguay | `/en/why-paraguay` | `/es/why-paraguay`, `/fr/why-paraguay`, `/de/why-paraguay`, `/he/why-paraguay` | Evaluate residency, a second base, finances, everyday costs and business; finder, packages or consultation | Index after claim and publication approval |
| Residency | `/en/paraguay-residency` | `/es/paraguay-residency`, `/fr/paraguay-residency`, `/de/paraguay-residency`, `/he/paraguay-residency` | Commercial residency-assistance overview; compare plans | Index after approval |
| Pricing | `/en/pricing` | `/es/pricing`, `/fr/pricing`, `/de/pricing`, `/he/pricing` | Residency costs/package scope; choose route then support level | Index after approval |
| Finder | `/en/find-my-plan` | `/es/find-my-plan`, `/fr/find-my-plan`, `/de/find-my-plan`, `/he/find-my-plan` | Needs-based starting point; discuss or compare | Noindex |
| Inquiry | `/en/book` | `/es/book`, `/fr/book`, `/de/book`, `/he/book` | Callback or demo time with visible selection | Noindex |
| Receipt | `/en/thank-you` | `/es/thank-you`, `/fr/thank-you`, `/de/thank-you`, `/he/thank-you` | Valid memory-only receipt, otherwise recovery | Noindex |
| Services | `/en/services` | `/es/services`, `/fr/services`, `/de/services`, `/he/services` | Browse service categories | Index after approval |
| Permanent residency | `/en/permanent-residency` | `/es/permanent-residency`, `/fr/permanent-residency`, `/de/permanent-residency`, `/he/permanent-residency` | Upgrade review for existing residents | Index after approval |
| Investor residency | `/en/investor-residency` | `/es/investor-residency`, `/fr/investor-residency`, `/de/investor-residency`, `/he/investor-residency` | Specialist investor/business discussion | Index after approval |
| Relocation | `/en/relocation` | `/es/relocation`, `/fr/relocation`, `/de/relocation`, `/he/relocation` | Arrival, orientation and settling-in scope | Index after approval |
| Tax | `/en/tax-planning` | `/es/tax-planning`, `/fr/tax-planning`, `/de/tax-planning`, `/he/tax-planning` | Scoped professional consultation | Index after approval |
| Paraguay company | `/en/company-formation/paraguay` | `/es/company-formation/paraguay`, `/fr/company-formation/paraguay`, `/de/company-formation/paraguay`, `/he/company-formation/paraguay` | Local setup inquiry, recurring obligations separate | Index after approval |
| U.S. company | `/en/company-formation/us` | `/es/company-formation/us`, `/fr/company-formation/us`, `/de/company-formation/us`, `/he/company-formation/us` | U.S. setup inquiry with unapproved scope marked | Index after approval |
| Accounting | `/en/accounting` | `/es/accounting`, `/fr/accounting`, `/de/accounting`, `/he/accounting` | Scope-dependent ongoing support | Index after approval |
| Banking | `/en/banking` | `/es/banking`, `/fr/banking`, `/de/banking`, `/he/banking` | Preparation assistance; institution decides | Index after approval |
| Property | `/en/real-estate` | `/es/real-estate`, `/fr/real-estate`, `/de/real-estate`, `/he/real-estate` | Property-assistance engagement inquiry | Index after approval |
| Driving license | `/en/driving-license` | `/es/driving-license`, `/fr/driving-license`, `/de/driving-license`, `/he/driving-license` | Local-document support; quote only | Index after approval |
| Retirement | `/en/retire-in-paraguay` | `/es/retire-in-paraguay`, `/fr/retire-in-paraguay`, `/de/retire-in-paraguay`, `/he/retire-in-paraguay` | Retirement-focused planning; quote only | Index after approval |
| Citizenship | `/en/citizenship-guidance` | `/es/citizenship-guidance`, `/fr/citizenship-guidance`, `/de/citizenship-guidance`, `/he/citizenship-guidance` | Professional review; no guarantees, quote only | Index after approval |
| Guides | `/en/guides` | `/es/guides`, `/fr/guides`, `/de/guides`, `/he/guides` | Educational hub with existing guide links only | Index after approval |
| Requirements guide | `/en/guides/residency-requirements` | `/es/guides/residency-requirements`, `/fr/guides/residency-requirements`, `/de/guides/residency-requirements`, `/he/guides/residency-requirements` | Preparation questions and document categories | Index after professional review |
| About | `/en/about` | `/es/about`, `/fr/about`, `/de/about`, `/he/about` | Operator/professional boundaries and pending team facts | Index after identity/content approval |
| Contact | `/en/contact` | `/es/contact`, `/fr/contact`, `/de/contact`, `/he/contact` | Demo inquiry/booking and contextual messaging preview | Index after approval |
| Cost campaign | `/en/lp/residency-cost` | `/es/lp/residency-cost`, `/fr/lp/residency-cost`, `/de/lp/residency-cost`, `/he/lp/residency-cost` | Cost promise → pricing with intended route | Noindex |
| Family campaign | `/en/lp/family-relocation` | `/es/lp/family-relocation`, `/fr/lp/family-relocation`, `/de/lp/family-relocation`, `/he/lp/family-relocation` | Family promise → editable family finder context | Noindex |
| Link hub | `/en/links` | `/es/links`, `/fr/links`, `/de/links`, `/he/links` | At most four conversion destinations | Noindex |
| Privacy draft | `/en/privacy` | `/es/privacy`, `/fr/privacy`, `/de/privacy`, `/he/privacy` | Draft data-handling explanation | Noindex until approved |
| Terms draft | `/en/terms` | `/es/terms`, `/fr/terms`, `/de/terms`, `/he/terms` | Draft service terms | Noindex until approved |
| Disclaimer draft | `/en/disclaimer` | `/es/disclaimer`, `/fr/disclaimer`, `/de/disclaimer`, `/he/disclaimer` | Draft scope/qualification disclosures | Noindex until approved |

An internal RTL fixture is nonindexable and absent from public navigation, `hreflang`, and sitemap. It remains an engineering validation surface; the complete public Hebrew site is available at `/he`. Unknown locales, unknown services/guides, and arbitrary paths return a real 404 rather than a generic sales page.

## Navigation and context

Primary navigation is Why Paraguay / Residency / Packages / Relocation & Business / Guides / About and language selection. Find my plan is the primary homepage hero action, outside the shared header. Package comparison remains beside it, with benefits and consultation links directly below. Direct consultation also remains available in navigation, so the finder is optional. Existing in-page finder links and the mobile conversion bar remain available. Footer links include services, contact, and policy drafts; no dead hash-only destinations.

The homepage benefits link uses the native `#benefits` anchor. Registered links into Why Paraguay include `#second-base`, `#financial-planning` and `#life-and-budget`; their headings and explanatory copy are in initial HTML. Route bound anchor validation keeps fragments separate from route IDs and selection parameters. Informational motivation links preserve the current selection without answering finder questions. An explicit service inquiry preserves a compatible package and explains any incompatible package removal beside the action.

Use stable service/package identifiers in allowlisted `service` and `plan` parameters. Context links never serialize contact drafts, notes, nationality/country answers, raw referrer strings, or arbitrary return URLs. Unknown or incompatible IDs resolve safely and cannot produce a mismatched package/price. Recognized campaign attribution is captured in memory; direct navigation does not overwrite it.

The language switcher offers the same public route in English, Spanish, French, German and Hebrew. It preserves valid package/service/campaign context, family quote state, finder origin and private drafts in memory. All public navigation stays in the selected language. Unsupported locales return 404. The native disclosure and ordinary links also work without JavaScript.

## Server metadata

- Server-render title, distinct description, self canonical, locale/language, social metadata, and crawlable navigation through App Router page data and metadata facilities.
- A canonical URL consists only of the configured origin plus the normalized locale path. Omit plan, service, campaign, UTM, and other query parameters and fragments.
- Spanish, French, German and Hebrew pages have translated titles/descriptions and their own canonicals; do not canonicalize translations to English.
- Add reciprocal language alternates only for real complete equivalents, including self-reference and English `x-default`. All public pages advertise all five complete counterparts. The internal RTL fixture has no public alternates.
- Social metadata and original 1200 × 630 assets follow each route’s content. Do not bake provisional prices, invented awards, or claims into images.
- No `meta keywords`, fake ratings/reviews, unsupported address/affiliation, fabricated author, or government identity. Organization/BreadcrumbList/Article data may be added only when the required facts are genuinely available and approved.
- FAQs are useful content; the prototype makes no rich-result or ranking promise.

## Indexability and sitemap

One shared `canIndex(page, environment)` policy returns true only when all of the following are true:

1. Runtime is live mode.
2. Current origin exactly matches the approved production origin.
3. The route is explicitly indexable and canonical.
4. Required content review is approved.
5. Required commercial information is approved separately from content wording.
6. The route’s locale is complete and approved for publication.
7. Every required claim dependency has its applicable official source check and professional or editorial review, operator approval where required, and locale publication approval. Missing dependencies and source checked drafts fail closed even if page and global approvals are true.

Any missing value fails closed. Every preview emits robots `noindex` metadata and a matching HTTP `X-Robots-Tag` where the framework supports it. Keep crawlers able to read noindex directives; do not combine an inaccessible robots policy with the expectation that a crawler sees a page’s metadata. Robots settings are never presented as access control.

The sitemap uses the same policy and canonical route inventory. Demo mode contributes no preview page URLs. Even an approved-mode fixture excludes inquiry, receipt, finder, campaigns, link hub, internal fixtures, incomplete translations, and draft content. A production origin and approval flags are inputs for policy testing, not permission to publish this app.

## Intent and internal linking

Why Paraguay owns broad evaluation of the country and what residency may enable. Residency overview owns commercial assistance; pricing owns package/cost comparison; the guide owns preparation/document questions. Permanent-residency, relocation, tax, and company pages own their specific services. Do not multiply near-identical nationality or cost pages.

The financial section of Why Paraguay compares the specific personal foreign dividend opportunity, a foreign owned US LLC and a Paraguayan company. Tax planning includes the full comparison; each company service includes its relevant structure. The homepage introduces the opportunity and answers the combined structure question. Titles and descriptions reflect these subjects in all five locales without an unqualified zero tax assertion. No route, canonical, language alternate, catalog entry or selection parameter is added. Claim dependencies cover both rendered content and metadata; previews remain noindex.

The social link hub has four destinations: Why Paraguay, residency packages, family relocation and consultation. Cost and family campaigns retain their direct intent. Homepage, Why and campaign share assets use Paraguay Next and matching localized messages without provisional amounts or unapproved legal outcomes. Query parameters never supply share image wording.

Residency links to pricing and the requirements guide. The guide links to relevant services with a contextual consultation action. Each service template includes its intended customer, included assistance, exclusions, process, relevant package or quote, practical questions, and contextual inquiry. Service copy must be distinct enough to answer that service’s questions; unapproved pages cannot become thin indexable production placeholders.

## Verification contract

Test noindex for every real preview route and independently exercise the shared indexability policy with approved-mode fixtures. Verify canonical query removal, reciprocal genuine translations, absent draft alternates/sitemap entries, real 404 responses, route-specific metadata, selected context after locale changes, and useful marketing content with JavaScript disabled. A preview Lighthouse SEO deduction caused by intentional noindex is reported honestly rather than “fixed” by weakening preview safety.
