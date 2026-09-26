# Firebase hosted QA

MODE: EXECUTE · ROLE: QA · QA_TYPE: MANUAL_BROWSER_QA / FEATURE_VALIDATION · Tier: S2

## Summary

**PASS for the authorized team demo on source `3d4061dc30affef67728d6e59a69432903be1b2c`.** Immediate conversion links now reflect the selected journey before asynchronous URL synchronization finishes. Independent manual checks passed for the targeted conversion flows and all 50 representative locale/viewport combinations. Root's fresh hosted regression completed **230 passing / 0 failing / 0 retries** checks in 3.2 minutes. QA independently read its result and relevant test entries. This is not business launch or merge approval.

The owner authorized one additional focused fix and validation cycle after the earlier cap. The September 25 failures below are preserved as historical evidence and are superseded by this deployment's results.

This report records observed browser and HTTP behavior. Cloud rollout identity was supplied by the deploying root agent; QA did not modify cloud resources, repository code, tests, configuration, or GitHub.

## Current deployment: September 26 selection transition retest

- Reviewed/deployed source: `3d4061dc30affef67728d6e59a69432903be1b2c`; local HEAD independently matched before testing.
- Origin: `https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app`.
- Root supplied Cloud Build `fb191d68-b688-474e-9956-aef9f80fe4fe`, SUCCESS, created `2026-09-26T21:18:14.153116629Z`, finished `2026-09-26T21:20:16.717847Z`. Root independently verified revision `paraguay-prototype-build-2026-09-26-001` Ready with 100% traffic. QA did not query the cloud control plane.
- Windows, agent-browser 0.32.1, HeadlessChrome/152.0.0.0. Isolated namespace `firebase-selection-qa`, session `firebase-selection-qa-cfd5474485e0`. Representative viewports: 390 × 844 and 1440 × 1000.
- Contracts: `tests/e2e/selection-transition.spec.ts`, `hydration.spec.ts`, `hebrew.spec.ts`, `journeys.spec.ts`, and the existing hosting/localization evidence. Applied SDLC, agent-browser and verification-before-completion skills.
- Fixture-only contact data. No filled-form screenshot, receipt screenshot, raw HAR or provider credentials were saved.

| Current check | Direct observation | Status |
| --- | --- | --- |
| Immediate pricing conversion | On EN pricing with Guided, activated permanent residency and inspected the next animation frame. The address bar still held `plan=temporary-guided`, while booking, brand and Hebrew language links already held `service=permanent-residency`. Clicking the booking link immediately reached the permanent-residency booking page without Guided. This was a browser DOM activation, without a URL-settlement wait before clicking. | PASS |
| Immediate finder clearing with family campaign | At 390 px, changed the finder goal from an incoming Concierge selection to business. While the address bar still contained Concierge, skip, brand and Hebrew language links contained only `campaign=family-relocation`. Immediate skip navigation reached booking with no plan/service and displayed the neutral starting point. | PASS |
| Five-language family appointment draft | Hebrew family campaign → Guided booking → FR → DE → ES → EN → HE retained the plan, service, campaign, mixed Hebrew/Latin name and notes, fixture email, appointment mode, and Asia/Jerusalem timezone. Each destination had the expected language/direction. The summary and receipt requested a family quote without inventing a total. | PASS |
| UTC invariant | Across those locale changes, selected UTC value remained `2026-09-27T13:00:00.000Z`. Asia/Jerusalem displayed 16:00; changing to UTC displayed 13:00 without changing the instant. | PASS |
| Simulated failure and retry | Hebrew failure displayed the translated error and kept the draft and selected slot. Successful retry reached a Hebrew receipt containing Guided, family quote state and the same simulated appointment. The receipt explicitly said no appointment or message was sent. | PASS |
| Local WhatsApp preview and keyboard dismissal | EN contact with Guided opened a local dialog naming Guided and explaining that sending was disabled. Escape closed it and returned focus to the WhatsApp trigger. | PASS |
| Observed privacy and network boundary | Booking failure and WhatsApp states had empty cookies and zero localStorage/sessionStorage entries. The receipt URL contained selection context only. A fresh request log for contact/WhatsApp recorded 14 requests, all same-origin GET with status 200; resource entries contained no external origin. No raw capture was exported. | PASS for the observed interval |
| Current responsive/metadata matrix | Home, pricing, booking, family campaign and privacy in EN/ES/FR/DE/HE at both widths: 25 URLs and 50 pairs. All had a localized H1, expected `lang` and direction, matching Firebase canonical, six alternate links, `noindex, follow`, no broken image, and document width equal to viewport. Matrix validation returned 50 rows and zero failures. | PASS |
| Hebrew server HTML and disabled SSR controls | Independent HTTP GET for Hebrew booking returned 200 at `Sat, 26 Sep 2026 21:28:53 GMT`, Hebrew RTL HTML and `X-Robots-Tag: noindex, follow`. Server HTML included the disabled mode fieldset and disabled submit button. | PASS for inspected HTML |
| Runtime diagnostics | At the end of normal browser flows and the route sweep, `errors --json` returned an empty errors list and `console --json` returned an empty messages list. | PASS for the normal session |
| Fresh visual evidence | Visually inspected the unfilled Hebrew home screenshots at 390 × 844 and 1440 × 1000. Main text, actions, language control and navigation were usable; mobile sticky action remained visible. This is a representative visual inspection, not a complete element or translation audit. | PASS within scope |
| Deterministic pending navigation, empty selection, rapid changes/history, modified clicks and no-JS | Root ran the complete hosted suite with retries disabled and a 120-second per-test limit. QA read the log entries for all eight transition tests, five hydration tests and the final 230-pass result. These automated checks cover the timing and no-JS cases beyond the manual actions above. | PASS, executed by root |

Current screenshot evidence: [Hebrew mobile](firebase-selection-he-390.png) and [Hebrew desktop](firebase-selection-he-1440.png). The older `firebase-hosted-he-*.png` files below remain historical.

Raw matrix metadata, containing no contact fields: `C:\Users\Yonatan Levin\AppData\Local\Temp\firebase-selection-qa-e47bfb03ede9463a88594cde608384dc\matrix.json`. Root's hosted test log, independently read by QA: `C:\Users\Yonatan Levin\AppData\Local\Temp\paraguay-track-a47fbe5e7b154edd8602afe2450f7df6\firebase-selection-hosted-e2e.txt`. Committed summaries: [deployment manifest](firebase-deployment.json) and [selection verification](firebase-selection-verification.md).

### Current limitations and tooling observations

- A separate attempted agent-browser script-abort check did not block the JavaScript requests; the request log showed status 200 and the page hydrated. No manual no-JS PASS is claimed from that attempt. Root's actual JavaScript-disabled/held-script hosted tests passed, and the independent server HTML check above confirms the inspected disabled controls.
- A semantic CLI link lookup missed a visible pricing link once. Fresh DOM inspection and activation completed the flow. A read issued before finder navigation completed also found no booking summary; waiting for the destination then confirmed the correct result. Neither tooling timing event reproduced a product failure.
- Both owned browser sessions were closed. QA changed only this evidence file and the two new unfilled screenshots.
- No new product blocker was observed. Existing parked issues #2–5 and #8 remain unchanged. This pass does not establish professional translation/legal approval, full WCAG conformance, real-provider operation, billing cost, cold-start performance, or public business launch readiness.

## Historical September 25 deployment retest

At the end of that earlier cycle the result was **PARTIAL / NOT ACCEPTED**, with 219 passing and three failing hosted checks. Work stopped at the cap until the owner authorized the focused continuation reported above. The following observations belong to the earlier source only.

- Corrected source: `a89512521040b0313b3c671c54ef18e4f2f22ac8`; local HEAD independently matched.
- Deployment identity supplied by root: Cloud Build `2aad9898-ab41-45f6-b5ae-bfb399fedc97`; Cloud Run revision `paraguay-prototype-build-2026-09-25-002`, reported Ready with 100% traffic. QA did not independently query cloud control-plane state.
- Same origin and browser version as the historical pass. Viewport during affected-flow retest: 390 × 844.
- Read the corrected `tests/e2e/hydration.spec.ts` contract before checking the deployed behavior.

| Current check | Direct observation | Status |
| --- | --- | --- |
| Blocked application scripts | An isolated `firebase-hosted-qa-off` session aborted `**/_next/static/**/*.js`. Hebrew booking showed all nine form controls effectively disabled, zero enabled form controls, and RTL. Native `button.click()` followed by Enter left the URL unchanged. | PASS |
| Native language navigation without app scripts | Opened the native language disclosure and selected Deutsch. URL moved from Hebrew to German while retaining the Guided plan. | PASS |
| Other pre-hydration controls | Pricing had three disabled controls and zero enabled controls; finder had eight disabled controls and zero enabled controls. The contact page's WhatsApp trigger was disabled. Its two enabled close/return buttons belonged to the unopened dialog. | PASS |
| Hydrated mobile finder | Selected residency and continued to the stage step. After waiting for URL settlement, the previous Guided plan parameter was absent. | PASS for settled behavior only |
| Hydrated mobile pricing | Changed from Guided/first residency to permanent residency. After waiting for URL settlement, URL was `?service=permanent-residency`, Guided was cleared, and upgrade packages were shown. | PASS for settled behavior only |
| Hebrew channel and mode | Switched callback channel to WhatsApp and observed the phone field. Switching to appointment mode exposed email, timezone and slots. Selected the first slot and filled fixture contact details. | PASS |
| Hebrew to English draft retention | HE → EN retained Guided with provisional USD 2,850, mixed-script name/notes, fixture email, Asia/Jerusalem and UTC slot `2026-09-26T13:00:00.000Z`. Changing the timezone to UTC displayed 13:00 for that same selection. | PASS |
| Current build failure/retry and remaining locale/layout smoke | Not completed. A stale element reference prevented the attempted return to Hebrew. Root then instructed an immediate stop after its final regression failures. The command sequence was interrupted before its failure/retry actions, and both owned browser sessions were closed. | NOT RUN to completion |

The deliberately blocked-script browser naturally generates aborted asset requests; it is a fault-injection check, not normal runtime evidence. No current-build no-console-errors or complete current-build five-language responsive verdict is claimed. The initial 50-pair result below belongs to the first revision.

### Historical September 25 release blocker

**BLOCKER · FRONTEND · finder/pricing route transitions.** Root reports that immediately following a goal/journey change with skip/booking navigation can carry the previous selected package. Three hosted tests remain red: finder goal-change skip, desktop pricing journey change, and mobile pricing journey change. Root's proposed direction is to make conversion links reflect the new selection while the asynchronous URL update settles, then verify deterministic immediate-click regression cases.

This QA pass independently saw the transient old `plan=temporary-guided` URL and old sticky Guided link immediately after changing pricing, followed by correct state after settling. It did not click the conversion link during that window, so the complete incorrect conversion is attributed to root's regression, not independently reproduced here. Confidence: confirmed transient stale state; end-to-end failure and exact cause require the root evidence and follow-up cycle.

Root reported all five held/off-JavaScript tests and the earlier hydration cases passing. No additional review or repair cycle was started by QA. Existing issues #2–5 and #8 remain parked; no GitHub mutation was made.

## Historical initial deployment: references and environment

- Contract: `docs/FIREBASE_HOSTING.md`, `docs/LOCALIZATION.md`, `tests/e2e/hebrew.spec.ts`, and `tests/e2e/journeys.spec.ts`.
- Origin: `https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app`.
- Initial deployed source: `7af1bb9f380c26e5b8b00f7ac8794c09bc19f139`. Local HEAD independently matched during these checks.
- Deployment identity supplied by root: Cloud Build `85f5a546-2477-44b9-86b3-f26c3a519431`; Cloud Run revision `paraguay-prototype-build-2026-09-25-001`.
- Checked 2026-09-25. An independent HTTP response recorded `Fri, 25 Sep 2026 21:13:55 GMT`.
- Agent-browser 0.32.1, Windows, HeadlessChrome/152.0.0.0; isolated namespace `firebase-hosted-qa`, session `firebase-hosted-qa-cfd5474485e0`.
- Viewports: 390 × 844 and 1440 × 1000. Only fixture names and `example.test` contact addresses were used.
- Skills: SDLC, agent-browser core, verification-before-completion. This consumes the existing local QA as background and adds hosted evidence; it does not repeat the complete local acceptance suite.

## Historical initial deployment checks

| Check | Observed result | Status |
| --- | --- | --- |
| Route and responsive smoke | Navigated home, pricing, booking, family campaign and privacy in EN/ES/FR/DE/HE at both widths: 25 distinct URLs, 50 route/viewport pairs. Every page had its expected language, Hebrew RTL or other-language LTR, a localized H1, matching Firebase canonical, six alternate links including the default, and `noindex, follow`. Document width equalled viewport width; no loaded image reported zero natural width. | PASS |
| Hebrew initial HTML | Independent `Invoke-WebRequest /he` returned 200, `<html lang="he" dir="rtl">` and `X-Robots-Tag: noindex, follow`. This proves server HTML direction, not a timed screenshot before hydration. | PASS |
| Guided package and booking draft | From EN pricing, selected Guided and observed provisional USD 2,850. Filled a mixed Hebrew/Latin fixture name and notes, selected an appointment, and changed EN → HE → DE → HE. Package, contact draft, notes, appointment mode and timezone persisted. | PASS after hydration |
| UTC appointment invariant | Selected `2026-09-26T13:00:00.000Z`. Asia/Jerusalem displayed 16:00; UTC displayed 13:00. The actual selected value remained unchanged across timezone and locale changes. | PASS after hydration |
| Failure and retry | Hebrew simulated failure produced the translated error and retained the contact draft. Selecting simulated success and retrying produced a Hebrew receipt with Guided, provisional 2,850 and the same UTC appointment. It explicitly said no appointment or message was sent. | PASS after hydration |
| Family flow | At 390 px, Hebrew family campaign → Guided inquiry → French retained the service, plan, `campaign=family-relocation`, contact draft and family quote state. French receipt showed a quote request without an invented family total. | PASS after hydration |
| Local WhatsApp preview | EN contact with Guided opened a dialog naming Guided and explaining that sending was disabled. Escape closed it and returned focus to its trigger. | PASS after hydration |
| Privacy boundary | At appointment receipt and WhatsApp states, localStorage/sessionStorage counts were zero and cookies empty. Receipt URLs contained package/campaign selection, not contact details. Resource entries contained no external origin. | PASS for observed states |
| Conversion network capture | HAR recorded 35 requests during family selection, locale switch, submission and WhatsApp preview. All 35 were same-origin GET requests returning 200; no POST or provider origin was captured. | PASS for recorded interval |
| Root and missing route | Root resolved to `/en` with final 200 and noindex header. Independent request to `/he/not-a-real-service` returned 404 with noindex header. | PASS |
| Search metadata | Sitemap returned 200 with an empty URL set. Robots returned 200, `Allow: /` and the Firebase sitemap URL, together with noindex response header. Crawling is allowed so robots can observe noindex; this is not a disallow-all policy. | PASS for noindex boundary |
| Static delivery | Hebrew SVG returned 200, image/svg+xml, 4,677 bytes. Observed hashed JavaScript chunk returned 200, application/javascript, 176,342 bytes, `max-age=31536000, immutable`. Repeated requests returned identical SHA-256 digests for both sampled assets. | PASS |
| Runtime diagnostics | Agent-browser `errors --json` returned `errors: []`; `console --json` returned `messages: []` after the manual sequence and route sweep. | PASS for this session |

The URL matrix was `/{en,es,fr,de,he}` combined with the suffixes ``, `/pricing`, `/book`, `/lp/family-relocation`, and `/privacy`. The route checks read rendered DOM and document geometry; they are not a complete element-by-element layout audit or full linguistic review.

## Historical findings and limits

### Earlier BLOCKER reported by upstream hosted regression: early interaction before hydration

Responsible role: FRONTEND. Root reported 206 passing and 11 failing hosted checks on the initial source: ten early-interaction/native-booking failures and one route inventory timeout. These initial failures were not independently reproduced by the first manual pass, which interacted after hydration. The corrected deployment's guards were subsequently checked above; the current remaining blocker is the separate route-transition race.

### MINOR retained: Hebrew decorative edge, existing issue #5

Responsible role: FRONTEND. On `/he` at 390 px, `.art-note` has right bound 395 px while document width remains 390 px. The decorative background edge extends 5 px outside the viewport, matching the previous local finding. Meaningful content and controls remain usable. No fix was attempted. Future retest: inspect the artwork at 320/390 px in LTR and RTL after a logical-spacing fix.

### Documentation mismatch already tracked by root

`FIREBASE_HOSTING.md` says robots discourages crawling; actual behavior is crawlable noindex with an empty sitemap. Root said this wording is parked in issue #8. QA did not mutate the issue or documentation.

## Historical evidence and operational limits

- Visually inspected unfilled screenshots: [Hebrew mobile](firebase-hosted-he-390.png), [Hebrew desktop](firebase-hosted-he-1440.png).
- No filled-form or receipt screenshot was saved.
- Temporary HAR: `C:\Users\Yonatan Levin\AppData\Local\Temp\firebase-hosted-qa.har`; summary above derived from all 35 entries. This raw response capture remains outside the repository.
- One repeated Hebrew home navigation observed responseStart 397.3 ms, DOMContentLoaded 420.8 ms and load 713.7 ms. This is a single warm-browser sample, not a performance SLA, percentile, cold-start or mobile field measurement.
- A semantic CLI link lookup failed once despite the link being visible in the next snapshot. Clicking the fresh element reference succeeded and state remained intact. This was a tooling locator failure, not evidence of an app failure.
- No native phone, full WCAG, screen-reader, load/cost, professional translation/legal, real provider or cloud billing validation is claimed. Earlier performance issue #2 is unchanged.
- Root owns the full hosted regression, source identity, cloud build and release decision. This QA task did not rerun unit tests or change runtime configuration.
- The owned browser session was closed at the end of the initial pass.

## Historical September 25 next step

**NOT ACCEPTED.** Root must present the three remaining hosted failures and the proposed route-transition fix to the owner because the three-cycle cap is reached. After authorization and correction, verify immediate-click package context, rerun the affected hosted tests, and complete the interrupted current-build smoke. This report is evidence for that decision, not approval to deploy another revision or merge.

At that point, the handoff was to HUMAN / root for continuation authorization and FRONTEND for the proposed fix. Authorization, correction and the fresh retest are documented at the top of this report.

## Current final status

**PASS for the authorized Firebase team demo at `3d4061dc30affef67728d6e59a69432903be1b2c`.** No unresolved finding from the targeted selection transition repair remains in the observed manual checks or root's 230-test hosted run. Existing parked findings and business launch prerequisites remain outside this fix. Root owns final evidence reconciliation, GitHub tracking and handoff; merge and business launch still require human approval.

HANDOFF_TO: root / HUMAN for team demo review.
