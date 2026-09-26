# Value first update: final browser QA evidence

MODE: EXECUTE · ROLE: QA · QA_TYPE: MANUAL_BROWSER_QA

## Result and scope

**PASS for the incremental feature and preserved journeys checked below. Performance remains qualified and is not consistently at the original aim of 90.** No new functional blocker was observed. This is local production QA, not a business launch approval, professional legal review, native device certification or participant comprehension result.

Source: `d96c06893a55b56c8b563d75fcca0c4019c2cad4`, branch `update/value-first`. Production build: `s8gB49V7pfMaPKdhDCvbw`. Local URL: `http://127.0.0.1:52942`. The root's `source-manifest.json` records 111 source files and aggregate SHA256 `b0b066e3a52e197b54075355e3a785aa3512f8d205fc13c29ecfc4991be07d1b`. No source changes were made during this QA.

References: `docs/CODEX_UPDATE_PARAGUAY_NEXT_VALUE_FIRST.md`, `docs/VALUE_FIRST_PLAN.md`, original handoff and the existing acceptance tests. Baseline evidence is preserved in `../before/`. One factual correction changes the baseline interpretation's performance threshold from 95 to the original aim of 90; all baseline measurements remain unchanged.

## Environment and methods

- Windows, Node 24.14.1, npm 11.11.0, Next 16.3.6, demo mode and noindex.
- Primary manual browser: agent-browser 0.32.1, named isolated session, HeadlessChrome 152. Screenshots, rendered DOM inspection, keyboard navigation, reduced motion and responsive measurements used this tool.
- The advertised agent-browser `a11y` command returned `Unknown command` in all five attempts. These are tool errors, not site accessibility failures. `manual/*-why-a11y.json` retains those results. The read-only doctor command produced no usable diagnostic output; no tool or harness repair was attempted.
- Targeted fallback: existing Playwright 1.63.0 and installed axe library, Chromium 153.0.8010.12. Used only for the unavailable accessibility audit, actual `javaScriptEnabled: false` contexts and supplemental native-link/action checks. Browser instances were closed afterward.
- Lighthouse: existing method and temporary baseline script, Lighthouse 13.5.0, HeadlessChrome 154, default simulated mobile 412×823 at DPR 1.75, CPU slowdown 4, RTT 150ms, throughput 1638.4Kbps. Performance ran after other QA browsers closed.

## Checks actually performed

| Surface | Evidence and observed result |
|---|---|
| Homepage responsiveness | `manual/*-home-{320,360,390,768,1440}-audit.json`: **25/25 pass**, five locales. No horizontal page overflow, all four benefit cards visible with content fitting, one H1, correct ten-section order and noindex. At 390px, each consultation link ends above the persistent bar. |
| Enlarged/reflow model | `manual/*-home-200-percent-audit.json` and PNGs: **5/5 pass**. `set viewport 720 450 2` halves the 1440×900 CSS viewport and doubles density, modeling 200% browser zoom. It is not CSS `zoom` and not a physical browser zoom control. The separate 320px checks cover narrow reflow. |
| Homepage narrative | First and full screenshots show the opportunity first, four benefits, motivations, a distinct paid-assistance section, process, then unchanged provisional packages. The tax qualification is visible inside its card. Mobile artwork no longer displaces the proposition and direct actions. |
| Why Paraguay | EN/HE screenshots plus five locale axe audits show eight substantive sections and three source notes. No email gate. Native financial section anchor, ordinary service links and EN→ES equivalent navigation retain Guided context. |
| New-page accessibility | `manual/*-why-axe.json`: **five audits, zero WCAG 2A/2AA/2.1AA violations**. Each has one automated incomplete item, `color-contrast`, on the non-text mobile menu summary glyph. Manual resolution is documented below. |
| Keyboard and reduced motion | Actual Tab→skip link→Enter→Tab→benefits→Enter reaches the real `#benefits`, retaining Guided. Target heading top is 103.72px, with the header above the viewport. Focus outline is visible, 3px solid. Reduced-motion media is true and computed scroll behavior is `auto`. `manual/keyboard-*.json` and matching PNGs preserve evidence. |
| JavaScript disabled | `manual/supplemental-qa.json`: both cost campaign CTAs navigate to pricing with `temporary-guided`, `temporary-residency` and `residency-cost`; homepage direct pricing/booking work; Why anchor, Spanish switch and native mobile menu work. **Seven no-JS checks pass**, in addition to the five axe checks. |
| Final actions and conversion bar | `manual/final-actions.json`: **six pass**. Why final pricing and footer booking work via ordinary scroll and normal click with Guided preserved. Persistent bar is absent on finder, booking and receipt. Blank focused name input fits a 390×420 reduced-height viewport; this is only an emulation of less available screen space. |
| Guided finder baseline match | Actual radio selections: residency assistance, first residency, individual, exploring, Guided. Result remains Guided, illustrative USD 2,850 per applicant, with the stated coordination rationale and pending professional/scope confirmation. No contact fields were entered in screenshots. |
| Browser errors | `manual/page-errors.json` records no agent-browser page errors. Supplemental browser result also has an empty page-error list. |
| Existing regression evidence | Root-owned `gates/unit.txt` and `gates/e2e.txt` were read: **100 unit tests and 249 E2E tests pass**. These were run by root, not rerun by this manual QA agent. Root also supplied lint/typecheck/build gate logs. |

### Manual contrast resolution

`manual/final-actions.json` records the actual menu glyph foreground `rgb(20,43,59)` and transparent element/ancestor backgrounds over page background `rgb(247,248,245)`. Relative sRGB luminance gives **13.6955:1** contrast. The shared menu glyph is visually distinct in the mobile screenshots, resolving the five equivalent axe incomplete items for this component. This does not establish full WCAG compliance or replace a screen-reader audit.

### Attempts retained transparently

`manual/supplemental-initial-attempt.json` records a click timeout when the below-fold financial anchor sat behind the fixed conversion bar. An ordinary 300px wheel scroll exposed it and a normal click passed; no force click was used. This is recorded as automation scroll behavior, not an inaccessible final action.

`manual/final-actions-initial-attempt.json` records an unstable-element timeout immediately after Control+End. Waiting for normal navigation completion and ordinary element scrolling produced a successful normal footer click. No production behavior was changed to obtain the result. Final-page actions and the footer remain reachable. The failed attempts are not silently counted as passes.

## Before and after screenshots

There are **28 primary after screenshots**, named `{route}-{390|1440}-{first|full}.png`:

- `en-home`, `he-home`, `en-pricing`, `en-finder-result`, `en-family-relocation`: directly comparable to the 20 baseline images.
- `en-why-paraguay`, `he-why-paraguay`: eight images for the new route.

390px screenshots use height 844; 1440px screenshots use height 900. Full images show the actual narrative sequence through packages and footer. Matching `*-snapshot.txt` files preserve rendered semantics. Additional `manual/` PNGs show zoom emulation, anchor/focus, ordinary no-JS scrolling, footer and an unfilled booking form. EN/HE first screens, EN full narrative and family mobile captures were visually inspected. Root independently inspected additional EN/HE before/after images.

## Performance comparison and limitation

| Route | Baseline performance | Paired after | LCP before → after | TBT before → after | CLS |
|---|---:|---:|---:|---:|---:|
| Home | 84 | 91 | 4.475s → 2.084s | 29.5ms → 331ms | 0 → 0 |
| Pricing | 85 | 92 | 4.363s → 3.318s | 59ms → 80ms | 0 → 0 |
| Family campaign | 86 | 93 | 4.214s → 3.204s | 23.5ms → 59ms | 0 → 0 |

All three paired after audits give accessibility and best-practices scores of 100. SEO remains 66/66/69 because preview indexing is deliberately disabled. These are single-run simulated lab measurements, not field metrics.

The elevated home TBT justified one focused repeat, preserved separately in `lighthouse-home-repeat/`: **performance 79, LCP 5.596s, TBT 62.5ms, CLS 0**. The 331ms TBT spike did not repeat, while LCP worsened. The results show substantial local measurement variance; they do **not** prove a stable speed improvement or consistent achievement of the 90 performance aim. Performance remains an open limitation under existing issue 2.

Report inspection found home transfer 796,186 → 820,254 bytes (+24,068, about 3.02%), script transfer 705,575 → 714,184 bytes (+8,609, about 1.22%), and unchanged image transfer of 5,132 bytes. No new heavy image payload or layout shift appeared. The first after trace had greater layout/script work and a large unattributed main-thread interval. The available runs do not establish a stable causal regression. No additional benchmark or speculative optimization was performed.

**Both after performance commands returned exit 1 after all requested reports and summaries were successfully saved**, due to Windows `EPERM` while chrome-launcher removed its own temporary profile. This is a cleanup failure, not a successful command exit or missing audit. `lighthouse/execution-log.txt` and `lighthouse-home-repeat/execution-log.txt` retain the errors. The temporary-profile Chrome process checks found no matching running processes. No harness/configuration changes or recursive cleanup workaround was attempted.

## Unexecuted checks and release boundary

No actual participant comprehension study, native mobile keyboard/safe-area hardware test, screen-reader certification, professional legal/tax review, native-speaker approval or field-performance measurement was performed. Language completeness/layout checks do not confer professional translation approval. Source notes and draft caveats do not confer legal or operator approval. The original provisional prices, mocked services, noindex and launch gates remain required.

No deployment, live service activation, payments, messages, cloud mutation, GitHub mutation or commit was performed by this QA agent. Root owns tracking and final acceptance. The root-owned local production server was left running; all owned QA browser sessions were closed.

HANDOFF_TO: HUMAN via root. Functional QA is ready for review with the explicit performance and professional-approval limitations above.
