# Firebase hosted QA

MODE: EXECUTE · ROLE: QA · QA_TYPE: MANUAL_BROWSER_QA / FEATURE_VALIDATION · Tier: S2

## Summary

**PARTIAL / NOT ACCEPTED.** Corrected deployment `a89512521040b0313b3c671c54ef18e4f2f22ac8` passes the independently checked native-disabled guards. Root's complete hosted regression still reports **219 passing / 3 failing** checks involving package context during an asynchronous route transition. The third review cycle is exhausted; testing and implementation stopped on root instruction. The owner must authorize a further cycle before additional work.

The initial deployment's broader hydrated smoke remains below as explicitly historical evidence. It does not override the current failing acceptance gate.

This report records observed browser and HTTP behavior. Cloud rollout identity was supplied by the deploying root agent; QA did not modify cloud resources, repository code, tests, configuration, or GitHub.

## Current deployment retest

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

### Current release blocker

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

## Next step and final status

**NOT ACCEPTED.** Root must present the three remaining hosted failures and the proposed route-transition fix to the owner because the three-cycle cap is reached. After authorization and correction, verify immediate-click package context, rerun the affected hosted tests, and complete the interrupted current-build smoke. This report is evidence for that decision, not approval to deploy another revision or merge.

HANDOFF_TO: HUMAN / root for continuation authorization; FRONTEND owns the proposed fix.
