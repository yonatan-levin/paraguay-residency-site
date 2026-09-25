# Prototype QA evidence

## Hebrew and GitHub publication

The complete prototype now covers **29 public routes in five languages, 145 public URLs**. Hebrew adds 459 common and 361 editorial messages, actual right to left server and client rendering, translated social artwork, isolated mixed text and preserved appointment drafts. English, Spanish, French and German retain full coverage. Prices remain provisional USD fixtures; integrations remain mocked and every preview remains noindex.

Validated source SHA256: **`62c6bd2f5f6bc5ba6d53aedf46ee890d8d33f8256d354b4f4617b4b1b1546828`**, 94 files in `artifacts/source-manifest.json`. Optimized build: `Z4gZdLWq2bcEoQckTmphI`. GitHub delivery is tracked in [issue #1](https://github.com/yonatan-levin/paraguay-residency-site/issues/1). Source is published for review in the private repository; no live deployment or merge is authorized.

| Check | Actual result | Evidence under `artifacts/` |
|---|---|---|
| Test first locale coverage | 10 failures and 9 passes before implementation | `hebrew-red.txt` |
| Test first appointment preservation | Language change lost the selected appointment before the root draft correction | `hebrew-appointment-red.txt` |
| Test first native menu hydration | With scripts held, opening the server rendered menu then loading JavaScript closed it; regression failed before the correction | `hebrew-hydration-red.txt` |
| Unit suite | 65 passed across six files | `hebrew-unit.txt` |
| Type checking, lint, production build | Passed | `hebrew-typecheck.txt`, `hebrew-lint.txt`, `hebrew-build.txt` |
| Full browser regression | 217 passed, zero failed in 48.3 seconds | `hebrew-e2e.txt` |
| Route and metadata coverage | All 145 URLs return localized HTML, one H1, correct LTR/RTL, noindex, self canonicals and five reciprocal language alternates | Full browser suite |
| Conversion continuity | All five languages retain family quote, finder origin and private contact draft; appointment mode, zone and UTC instant survive French, Hebrew and English switching | Full browser suite |
| Hebrew interaction and responsive checks | Validation, simulated failure/retry, accepted/empty receipt, mixed fields, no external requests, keyboard/no JavaScript and 320/390/768/1440px layouts pass | Full browser suite |
| Accessibility | Existing scans and keyboard/zoom/reflow checks plus Hebrew booking and privacy axe checks pass | Full browser suite |
| Authored copy | 146 routes including the internal fixture; zero hyphen, dash or maqaf findings in rendered text and accessibility/metadata attributes | `hebrew-copy-audit.json` |
| Independent verification | Verified all 820 Hebrew messages, all 29 raw Hebrew routes, assets, server only editorial text and unchanged preview safeguards | `hebrew-verifier.md` |
| Complete Hebrew responsive audit | All 29 routes at 320, 390, 768 and 1440px: 116 distinct pairs, including opened menus. One LOW decorative edge finding; no semantic text or control loss | `hebrew-qa-geometry.json` |
| Launch guard | Expected exit 1 with actionable missing approvals | `hebrew-launch-check.txt` |

The initial browser run passed 213 of 215 checks and exposed a native menu closing during first hydration. The corrected effect closes disclosures only on actual pathname changes. A deterministic regression holds script downloads, opens the server rendered disclosure, releases scripts and verifies it remains open after React handles validation. Both desktop and mobile projects pass. No test retries masked the failure. An outdated four language expected hreflang object was also updated to the five language contract.

Root inspected unfilled Hebrew desktop, 320px homepage and open language picker captures (`hebrew-desktop.png`, `hebrew-mobile.png`, `hebrew-picker-mobile.png`). All three Hebrew social cards were independently inspected for glyph order and clipping. Browser CLI work uses a task namespace and is serialized; the existing Playwright runtime supplies isolated automated checks. No filled form screenshots are retained.

Independent Hebrew code review approved cycle 1 with no HIGH or MEDIUM findings (`hebrew-review.md`) and verified all 94 source hashes. The earlier four language delivery had its own completed review cycle. Hosted CI results are attached to the pull request's exact commit under [GitHub Actions](https://github.com/yonatan-levin/paraguay-residency-site/actions); the local evidence above is bound to the source manifest and optimized build ID.

Independent manual QA retained the Guided package and USD amount through English, Hebrew and German transitions; mixed contact drafts, family quotes and the selected appointment instant remained intact. Hebrew phone errors, local messaging, mock receipts, time zone presentation and privacy boundaries were exercised. The final report is `hebrew-qa.md`. Root also verified that every staged source file matches the validated manifest, allowing only Git text line ending normalization (`hebrew-publication-source.json`).

The complete Hebrew geometry audit contains 16 repeated raw flags: eight are intentionally clipped screen reader only pricing headings, and eight represent the homepage illustration card's decorative background extending 5px beyond the viewport at 320/390px in repeated menu states. The visible Hebrew text, decorative star and controls fit. The latter is a LOW finding parked as [issue #5](https://github.com/yonatan-levin/paraguay-residency-site/issues/5), with `hebrew-qa-home-art-320.png` as visual evidence; it is not hidden behind a claim of zero element overflow.

Native professional translation review, qualified content review, staffed support languages, native devices and production field measurements remain launch requirements. Existing performance and LOW findings are tracked in issues [#2](https://github.com/yonatan-levin/paraguay-residency-site/issues/2), [#3](https://github.com/yonatan-levin/paraguay-residency-site/issues/3) and [#4](https://github.com/yonatan-levin/paraguay-residency-site/issues/4).

### Current Hebrew performance sample

Lighthouse mobile reports on the current optimized build completed with exit 0. These are lab samples, not field p75 measurements. The 90 performance aim remains unmet on pricing and campaign pages; the earlier non Hebrew reports below were not rerun and are historical. Full reports and configuration are in `artifacts/lighthouse-hebrew/`; execution output is `hebrew-lighthouse.txt`.

| Route | Performance | Accessibility | Best practices | SEO | Simulated LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/he` | 92 | 100 | 100 | 69 | 3.31s | 0 | 29ms |
| `/he/pricing` | 85 | 100 | 100 | 66 | 4.36s | 0 | 44ms |
| `/he/lp/residency-cost` | 85 | 100 | 100 | 69 | 4.36s | 0 | 11ms |

SEO deductions retain intentional noindex. No indexing guard was weakened to improve scores, and no performance optimization is claimed by this language update.

## Historical four language coverage update

**Functional and responsive checks pass. Mobile performance remains below the prototype aim of 90.** All 29 public destinations now support English, Spanish, French and German, giving 116 public URLs. Each translated language has 459 common and 361 editorial entries. Services, guides, policy drafts, forms, errors, receipts, metadata and artwork text are translated. Selected packages, family quotes, finder origin and private drafts survive language changes. USD amounts stay provisional; integrations stay mocked and pages stay noindex.

Historical source SHA256: **`7eef6d3a42de8f38f05b411c229f01251644e95a3a207141d753311223590064`**, 87 files, before the current source manifest. Optimized build ID: `0yfV2ooAox-WUZRFRj8xX`. This section records the earlier four language delivery. No Git repository existed at that stage; the owner subsequently requested the GitHub publication described above.

### Current execution evidence

Evidence filenames below are under `artifacts/`.

| Check | Actual result | Evidence |
|---|---|---|
| Test first locale rules | 8 failures and 4 passes before implementation, then green | `locale-red.txt` |
| Test first native launch command | Failed before the locale import correction, then passed | `locale-launch-command-red.txt` |
| Full unit suite | 62 passed, 0 failed across 6 files | `locale-unit.txt` |
| TypeScript, lint and optimized build | All exit 0 | `locale-typecheck.txt`, `locale-lint.txt`, `locale-build.txt` |
| Full browser suite | 168 passed, 0 failed in 35.0s; desktop/mobile Chromium and WebKit smoke | `locale-e2e.txt` |
| Public route and SEO matrix | All 116 public URLs: HTTP 200, localized HTML language, one H1, self canonical, reciprocal alternates, noindex. Unsupported languages/paths retain real 404s | Included in full suite |
| Journey continuity | Four language family journey retains quote flag, finder origin and draft; French/German validation, failure/retry and receipt retain the same package and USD value | Full suite and `locale-qa-final.md` |
| Accessibility and responsive | Existing axe, keyboard, reflow and zoom checks plus French/German form/policy scans and German pages at 320, 390, 768 and 1440px pass | Full suite |
| Complete narrow layout audit | 116 URLs at 320 and 390px, menu open and closed: 232 route/viewport pairs. Baseline 13 overflow cases, candidate shared wrapping 0 | `locale-wrap-audit.json`; final built CSS verified by suite and live QA |
| Authored wording scan | 117 routes including internal RTL: 0 dash matches in rendered text, accessible labels, placeholders, image alt text and metadata | `locale-copy-audit.json`, `locale-copy-audit.txt` |
| Launch checker | Expected exit 1 with actionable missing approvals; no module loading failure | `locale-launch-check.txt` |

The first browser run found two incorrect test keys and German words overflowing cards. The next run exposed a long guide heading after the earlier route assertions passed. The final correction inherits `overflow-wrap: anywhere`, preserving wording without clipping or inserted hyphens. Earlier failures are retained in `locale-e2e-initial.txt` and `locale-e2e-after-card-wrap.txt`. The native Node launch checker needed an explicit `.ts` import for the newly shared locale configuration and `allowImportingTsExtensions` with the existing no emit setting. Its regression test proves that missing approvals are reported instead of a module resolution error; launch policy is unchanged.

Independent review approved the final source at cycle 3 with no open HIGH or MEDIUM code findings. The verifier confirmed exact dictionary coverage, all 16 image assets, localized metadata, mock safeguards, and that long editorial translations appear in server HTML but not browser JavaScript (`locale-verifier.txt`; its bounded checks preceded the final CSS/import corrections). Independent live QA passed and verified all 87 final hashes (`locale-qa-final.md`). Root separately ran the full checks and inspected `locale-de-mobile.png`, `locale-selector-mobile.png` and `locale-fr-desktop.png`. No filled forms were captured.

### Current performance baseline and remaining gap

Lighthouse 13.5.0 ran against the production build on Windows using HeadlessChrome 153, mobile emulation 412 × 823, scale 1.75 and simulated throttling. These are laboratory measurements, not field p75 or native phone evidence.

| Route | Performance | Accessibility | Best practices | SEO | Simulated LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/en` | 77 | 100 | 100 | 69 | 5.45s | 0 | 196ms |
| `/fr` | 86 | 100 | 100 | 69 | 4.21s | 0 | 21ms |
| `/de` | 86 | 100 | 100 | 69 | 4.21s | 0 | 19.5ms |
| `/de/pricing` | 87 | 100 | 100 | 66 | 4.06s | 0 | 35ms |
| `/fr/lp/residency-cost` | 87 | 100 | 100 | 69 | 4.06s | 0 | 16.5ms |

The 90 performance aim is **not met on this final build**. Reports flag unused JavaScript, dependency chains and render blocking. Common dictionaries currently reach the browser for all languages; editorial dictionaries stay on the server. The proposed next optimization is to measure and reduce common translation data delivered per browser route while preserving immediate language switching and drafts, then repeat homepage, pricing and campaign audits. This is a direction to investigate, not a proven explanation of the whole regression. No further optimization was performed after the three review cycle cap. Native language publication review, qualified content review, native device checks and production field targets remain launch requirements.

The four page audit exited 0 and saved HTML/JSON reports in `lighthouse-locales/`. The campaign audit saved complete reports in `lighthouse-locales-campaign/`, then exited 1 during the known Windows temporary Chrome profile cleanup (`EPERM`). Logs are `locale-lighthouse.txt` and `locale-lighthouse-campaign.txt`. SEO deductions remain intentional noindex; no safeguard was weakened. Original performance reports below describe an older source, not current performance.

Existing parked LOW issues remain: local WhatsApp click attribution and repeated English wording. Browser CLI activity was serialized after apparent tab interference despite distinct session names and daemon IDs; its cause was not diagnosed or changed in this product task. The existing Playwright runtime supplied the isolated automated suite and wording scan. Setup, editing, unresolved business inputs and release conditions are updated in `README.md`, `LOCALIZATION.md`, `DECISIONS.md`, `ROUTES_AND_SEO.md` and `LAUNCH_CHECKLIST.md`.

## Website wording update

The requested Tier S3 copy edit removes hyphens and dash punctuation from authored page text, labels, accessible names, metadata, finder options and policy titles. English ranges use “to”; Spanish ranges use “a”. Technical route IDs, styles, URLs, commercial amounts, state logic and preview safeguards are unchanged.

Historical wording source fingerprint: `abf9c0af2c0adc4cbbf0eabd71f30442fdd3226bd05ae4bb06730499ef900a54`, preserved in `artifacts/source-manifest-wording.json`. Historical checks: 45 unit tests passed (`copy-unit.txt`), lint passed (`copy-lint.txt`), production build including TypeScript passed (`copy-build.txt`), and all 80 browser checks passed (`copy-e2e.txt`). These evidence files are under `artifacts/`. The browser run also refreshed responsive screenshots.

A rendered text and accessible/metadata attribute scan covered 39 published locale routes plus the internal RTL fixture, finding **0 remaining authored hyphens/dashes across 40 routes** (`artifacts/copy-audit.json`). The default agent-browser CLI stalled when invoked from the capture script, so the successful read-only scan used the project's existing Playwright runtime (`artifacts/audit-copy.mjs`). Source inspection also checked copy in later finder/form states and social assets. User-entered data and technical identifiers are outside this wording change.

The bounded reviewer approved with nonblocking nits. **Parked copy polish:** repeated wording in `src/content/service-details.ts:491` (“discussion about questions about citizenship”), `src/config/routes.ts:81` (“assistance with settling in with”), and `src/content/ui.ts:82` (“required steps that require”). These preserve meaning and are deferred under the instruction to park LOW findings. No GitHub issue exists because this workspace has no Git repository or remote. No deployment was performed.

The sections below preserve the original prototype delivery evidence and its measurement limits. Performance and independent S1 reports refer to the original source fingerprint, not a new performance audit after this copy edit.

## Delivery scope and environment

The working local prototype implements Phases 1–4 of the supplied handoff: the package-to-inquiry vertical slice, guided/campaign acquisition, service/content breadth and localization, then browser/accessibility/performance hardening. No deployment, live message, calendar booking, payment, or external analytics integration was performed.

The inspected parent workspace contained the supplied handoff documents and no existing application or Git repository. The implementation therefore lives in the new `paraguay-residency-site` directory. The original handoff files remain untouched; the Markdown source is also preserved under `docs/`.

- Validation host: Windows, PowerShell, Node.js 24.14.1, npm 11.11.0.
- Application: Next.js 16.3.6, React 19.3.0, strict TypeScript 5.9.3.
- Tools: Vitest 5.0.1, Playwright 1.63.0 with Chromium and WebKit, axe 4.13.0, Lighthouse 13.5.0.
- Execution target: optimized production build at `http://127.0.0.1:3000`, bound to loopback, in demo mode.
- Original delivery source fingerprint: `9b6d17285fa1cd9165ed33ce115efa6b0790bb5ad19baaac33bd4ae8736f322e` (64 source/config/test/asset entries). The original manifest is preserved in `artifacts/source-manifest-prototype-delivery.json`; `npm run snapshot` refreshes the current manifest.
- There is no Git HEAD, remote, issue, PR, or hosted CI run. The fingerprint identifies the tested files; it is not a substitute claim about a commit. The manifest intentionally excludes documentation, generated build output, dependencies, and evidence files.

## Executed checks

Commands below ran from the application directory. PowerShell redirection captured output under `artifacts/`; this table reports the actual result, including expected and unexpected nonzero exits.

| Command | Actual result | Evidence |
|---|---|---|
| `npm ci` | Exit 0; 323 packages installed, 324 audited, 0 reported vulnerabilities | `artifacts/install.txt` |
| `npm run lint` | Exit 0 | `artifacts/lint.txt` |
| `npm run typecheck` | Exit 0, generated route types and TypeScript validation | `artifacts/typecheck.txt` |
| `npm test` | 45/45 passed across 3 files | `artifacts/unit-green.txt` |
| `npx vitest run tests/unit/seo.test.ts --reporter=verbose` | 7/7 passed separately; preview policy and approved-mode SEO fixtures (subset of the 45) | `artifacts/seo-fixtures.txt` |
| `npm run build` | Exit 0; optimized build completed | `artifacts/build.txt` |
| `npm run test:e2e -- --reporter=list` | 80/80 passed: desktop Chromium, mobile Chromium, WebKit smoke | `artifacts/e2e-run.txt` |
| `npm run test:a11y -- --reporter=list` | 13/13 passed; these are a separately executed subset of the 80 browser checks | `artifacts/accessibility-run.txt` |
| `npm run check:launch` | Expected exit 1, with missing business/configuration approvals listed | `artifacts/launch-check.txt` |
| `$env:SITE_MODE='live'; npm run build` in an isolated shell | Expected exit 1 before compilation; changing the mode cannot activate this prototype | `artifacts/live-build-blocked.txt` |
| `npm run perf` | All three audits and HTML/JSON reports completed; then exit 1 during Windows temporary Chrome-profile cleanup (`EPERM`) | `artifacts/lighthouse-run.txt`, `artifacts/lighthouse/` |
| `git status --short` | Not available: this directory and its parents are not a Git repository | No commit or landing claim |

The configured CI workflow performs installation, typecheck, lint, unit tests, build, and browser checks. It has not been run on a hosted service.

## Test-first evidence and business contracts

The tests for catalog/selection/finder, submissions/state transitions, and SEO gates were written before their corresponding implementation. Retained failing runs are `artifacts/unit-business-red.txt`, `unit-submission-red.txt`, and `unit-seo-red.txt`. Additional first-failing regressions cover submission edge states, pending behavior, phone plausibility, and completed-finder context (`unit-submission-edge-red.txt`, `unit-pending-red.txt`, `unit-phone-validation-red.txt`, `finder-origin-red.txt`). The final green runs include those cases.

Pure rules exercise integer-minor-unit prices, fixed/range/quote display, unknown inclusions, invalid IDs, selection ownership, finder branching/back/reset, family quote behavior, attribution allowlisting, and analytics redaction. Submission tests exercise concurrent/repeated attempts, payload-bound idempotency, pending/failure/unavailable/success, thrown-provider error sanitization, and receipt recovery. An injected clock covers future slots, rejected past slots, and UTC/timezone semantics.

| Acceptance criteria | Verified surface and evidence |
|---|---|
| AC-01 | Guided package and catalog price survive pricing → inquiry → receipt in desktop/mobile journeys |
| AC-02 | Family campaign prefill is editable; family answers survive Back; inquiry/receipt remain quote-only |
| AC-03 | Existing temporary resident receives the upgrade route, without a first-residency upsell |
| AC-04 | Business/tax/property rules skip residency questions; business inquiry works end to end |
| AC-05 | Back preserves relevant answers; changing goal clears incompatible package URL/state and completed recommendation |
| AC-06 | Invalid or malicious IDs produce safe fallback, without an arbitrary redirect |
| AC-07 | Finder result appears without contact/consent; matching completed recommendation continues into inquiry/receipt |
| AC-08 | Unit concurrency/retry tests accept one receipt and conversion per unchanged payload; UI failure retry succeeds |
| AC-09 | Clock-injected time tests reject past slots; UI timezone change preserves selected UTC instant |
| AC-10 | Failure/unavailable UI preserves contact/selection and supports retry |
| AC-11 | Direct or refreshed receipt shows recovery; no invented success or new conversion |
| AC-12 | Local WhatsApp dialog and mocked submissions; automated external-request assertion plus independent network/storage inspection |
| AC-13 | Query IDs and event fields are allowlisted; free text is React-rendered data and absent from event payloads/URLs; submission validation bounds notes |
| AC-14 | Cards/finder/summary/receipt use the shared catalog and formatter; unit values and end-to-end displayed-price consistency verified |
| AC-15 | Every inventoried preview route has noindex; HTTP noindex also covers 404s; demo sitemap contains no page URLs |
| AC-16 | Separate approved-mode metadata fixtures verify self canonical, reciprocal real alternates, social metadata and gated sitemap; see `tests/unit/seo.test.ts` |
| AC-17 | EN/ES equivalent switching preserves selection, non-campaign family quote and draft; internal mixed-script RTL fixture checked |
| AC-18 | Automated axe, keyboard navigation/dialog focus, 320–1440px reflow and emulated 200% zoom pass |
| AC-19 | With JavaScript disabled, homepage content and navigation to server-rendered package prices work in Chromium and WebKit |
| AC-20 | Live-readiness errors are actionable; actual live-mode build attempt fails closed |

AC-14 verifies current display consistency and shared-source wiring; it does not claim a separate rebuilt-browser experiment after changing a commercial amount. No numeric code-coverage percentage is claimed. Coverage instrumentation was not installed; meaningful business/state assertions and executed browser behavior are the evidence.

## Route and browser coverage

The route suite uses an explicit inventory independent of the application route registry: **29 English pages and 10 Spanish equivalents**, plus the internal RTL fixture and unknown-route cases. For each real page it checks status, one H1, canonical, description, noindex, and page-render errors. A crawl of rendered internal links verifies their destinations. See [the complete route inventory](ROUTES_AND_SEO.md).

English includes all services, the preparation guide, About/contact, policy drafts, both campaigns and the link hub. Spanish covers the complete core conversion routes and campaigns. English-only secondary destinations are labeled. `/he` and unpublished `/es/accounting` return 404; Hebrew is not exposed as a public locale.

Chromium desktop runs at 1440×900. The mobile journey project runs at 390×844 with mobile browser settings. Reflow checks cover 320, 360, 390, 768 and 1440 CSS pixels on home, pricing, finder, inquiry and the Spanish family campaign. WebKit independently covers translated/contextual pricing, JavaScript-disabled marketing/pricing, and real 404s.

The accessibility command runs six axe WCAG A/AA scans, five width/reflow checks, a keyboard check, and an RTL/zoom check. Keyboard evidence includes skip link focus, mobile menu Enter/Escape, WhatsApp dialog Enter/Escape and focus return. Form errors are visible, localized and announced. The zoom test models 200% zoom using a 720×450 CSS viewport with device scale 2; it is not a native browser-zoom or physical-device certification.

Independent live browser inspection also confirmed rejected malformed WhatsApp numbers, EN→ES draft and selected-price continuity, empty local/session storage and cookies, and no external resource/provider requests on the inspected journey. The submitted contact examples were test values only. Traces, videos, and automatic failure screenshots are disabled to avoid retaining contact drafts.

## Screenshots and visual inspection

- `artifacts/home-desktop.png` and `artifacts/home-mobile.png`: independently inspected 1440×900 and 390×844 hero viewports from the final build.
- `artifacts/screenshots/`: full-page unfilled home, pricing, finder, inquiry and Spanish family-campaign captures at 390px and 1440px, plus `pricing-200-percent.png`.
- `artifacts/screenshots/qa-family-campaign-390.png` and `qa-pricing-1440.png`: durable copies of the independent QA agent's unfilled viewport captures (its report also records the original temporary paths).
- Screenshots contain no submitted contact forms or completed private receipts. Main navigation, package cards, form fields and CTAs showed no clipping or horizontal overflow on the checked widths.

## Production-build Lighthouse baseline

Method: Lighthouse 13.5.0, Windows HeadlessChrome 153.0.0.0, simulated mobile throttling, 412×823 CSS pixels, device scale factor 1.75, loopback production server. Other task browser suites were stopped for the run. These are single-run laboratory measurements, not production field percentiles or INP.

| Route | Performance | Accessibility | Best practices | Preview SEO | Simulated LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/en` | 93 | 100 | 100 | 69 | 3.17s | 0 | 37ms |
| `/en/pricing` | 95 | 100 | 100 | 66 | 3.01s | 0 | 21ms |
| `/en/lp/residency-cost` | 92 | 100 | 100 | 69 | 3.31s | 0 | 27ms |

The performance ≥90 and accessibility ≥95 prototype aims are met for these pages. The only failing SEO audit is intentional crawl exclusion (`noindex`); it was preserved. Approved-mode SEO policy/metadata is measured separately by the unit fixtures, not by claiming a ≥95 Lighthouse score for a live site. The full reports expose every audit result: `artifacts/lighthouse/en.html`, `en_pricing.html`, `en_lp_residency-cost.html`, matching JSON, and `summary.json`.

Earlier measurements are preserved in `artifacts/lighthouse/baseline-before-hardening.json`: performance 91/78/85. Measured corrections included splitting booking/finder code away from marketing routes, high-priority hero loading, correct intrinsic dimensions, accessible label text, heading order and a local icon. Marketing and pricing remain server-rendered with JavaScript disabled.

**Remaining performance limit:** simulated LCP is 3.01–3.31s, above the eventual 2.5s field target. No field p75 LCP, INP, native mobile performance, or external hosting/network result exists. Reports still identify unused framework code, dependency chains and render-blocking opportunities; revisit these against the selected production host and real-device/field evidence before launch.

**Parked tooling issue:** Windows denied removal of Lighthouse's temporary Chrome profile after all reports were written. The runner exited 1; this is recorded rather than reported as a fully successful command. No application request or test failed because of this cleanup error. No GitHub issue could be created without a repository/remote.

**Parked LOW analytics issue:** the local WhatsApp preview event uses the journey's entry page as its route key, rather than the current page. For example, entering pricing and opening WhatsApp later on contact attributes that local click to pricing. Package context and the actual dialog are correct; no live analytics provider receives the event. Correct this before using click-location reporting for marketing decisions. Source: `src/components/shell.tsx`.

## Independent review and release boundary

The independent verifier returned **VERIFIED** after rehashing all 64 files and independently passing 45 unit tests, lint/typecheck and 19 Chromium/WebKit checks (`artifacts/verifier-integrated.md`). The cycle-2 reviewer returned **APPROVE_WITH_NITS**, with no open CRITICAL/HIGH/MEDIUM findings and the local attribution LOW parked above (`artifacts/reviewer-integrated.md`). Root independently reran the clean install, lint, typecheck, unit tests, build, full browser suite and accessibility command rather than relying only on delegated reports.

Independent manual QA returned **PASS for the local mock prototype**, with no new defects (`artifacts/qa-final.md`). It exercised the family campaign through finder, failure/retry and quote-only receipt; refreshed receipt recovery; English Guided to Spanish Guiado; localized error focus; contextual WhatsApp keyboard interaction; local-only network and empty persistent storage; noindex; mobile reflow and visual inspection. It independently matched all 64 source hashes and closed its isolated browser. These results do not claim native-device or live-provider validation.

This delivery approves a reviewable local prototype only. Prices, scope, team/operator details, policy drafts and regulated-service copy remain unapproved. Integrations are mocked and personal drafts/receipts are memory-only. A full reload intentionally loses them. No live operational handling, spam protection, retention service, provider monitoring or payment capability is implied.

Before a public release, the owner must settle brand/domain/operator and contacts; approve the commercial catalog and family policy; obtain professional/content/translation/privacy review; select and implement real providers with secure operating controls; complete native iOS/Android/in-app-browser checks; and explicitly authorize the reviewed release and destination. These responsibilities and required evidence are enumerated in [the launch checklist](LAUNCH_CHECKLIST.md) and [the decisions log](DECISIONS.md).
