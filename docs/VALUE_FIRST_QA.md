# Paraguay Next benefits first QA

This report covers the incremental update defined in `CODEX_UPDATE_PARAGUAY_NEXT_VALUE_FIRST.md`. It does not approve legal or tax advice, commercial offers, staffed languages, indexing, deployment or real integrations. Work tracking is [GitHub issue 9](https://github.com/yonatan-levin/paraguay-residency-site/issues/9).

**Result:** The four update phases have been delivered locally. Functional verification is VERIFIED, code review is APPROVE, and [final browser QA](../artifacts/value-first/after/qa-report.md) is PASS within its stated scope. Performance remains variable and the consistent 90 aim is unproven. There are no failing final unit or E2E tests and no open implementation blocker; business publication and professional approvals remain separate.

## Validated artifact and change surface

The implemented code is local commit `d96c06893a55b56c8b563d75fcca0c4019c2cad4` on `update/value-first`, following the specification and baseline commit `7e90a2a9a5631d1e23e7f23c18c1a6790e4d3168`. The final exercised production build is `s8gB49V7pfMaPKdhDCvbw`. Final documentation and evidence are committed separately from this tested code.

The root independently compared all 63 verifier source hashes before committing, then recorded a 111 file source/test/configuration/asset manifest: `b0b066e3a52e197b54075355e3a785aa3512f8d205fc13c29ecfc4991be07d1b`. See [build identity](../artifacts/value-first/after/build-identity.json) and [source manifest](../artifacts/value-first/after/source-manifest.json). These identify the local built bytes; a Git commit alone does not substitute for the test evidence.

| Surface | Implemented change |
|---|---|
| Home and navigation | Ten ordered sections, four visible benefit cards, four informational motivations, separate paid service value, direct pricing and booking, responsive grouped navigation |
| `/[locale]/why-paraguay` | New substantive page with eight sections, real anchors, status distinctions, financial questions, budget prompts, business workstreams and source notes |
| Existing service, guide and pricing routes | Outcome introductions and relevant links; pricing retains immediate comparison with only a short evaluation link |
| Existing campaigns and link hub | Compact intent matched content, compatible cost CTA selection, editable family journey and exactly four hub destinations |
| All five locales | EN/ES/FR/DE/HE copy, metadata, artwork and native links; Hebrew remains RTL; authored visible copy avoids decorative dash punctuation |
| Content and release controls | Registered claim dependencies, source records and separate professional, operator and translation approvals; previews remain noindex and draft claims cannot pass approved mode fixtures |
| Primary files | `src/components/{home,why-paraguay,value-content,content-pages,campaigns,shell,journey-provider}.tsx`, `src/content/{value-first,content-review}.ts`, locale dictionaries, route/SEO and domain rules, tests and social artwork |

Catalog data, service/package IDs, prices, dependency versions, runtime settings, provider adapters and deployment configuration have no diff from the baseline. No new service, payment, database, tax calculator or live integration was added. The full code diff contains 63 files.

## Baseline and method

Baseline source: `6b5c6ba7a104cc2f8f9671fa34d6be27eea848b6`. Baseline production build: `G8jW-o41AUeUIkrx00so2`. The existing Next.js/React application, catalog, mock adapters and deployment configuration were retained. Evidence is in [`artifacts/value-first/before`](../artifacts/value-first/before/baseline.json).

| Command | Baseline | Final root execution |
|---|---|---|
| `npm test` | 65 passed | 100 passed across 8 files, 0 failed |
| `npm run lint` | Passed | Passed, exit 0 |
| `npm run typecheck` | Passed | Passed, exit 0 |
| `npm run build` | Passed | Passed, exit 0 |
| `npm run test:e2e` | 230 passed, no retries | 249 passed in 1.8 minutes, 0 failed, no retries |

Both browser runs used production servers and the unchanged Playwright configuration, including Chromium desktop/mobile and WebKit smoke projects. The final PowerShell invocation set `$env:E2E_BASE_URL = 'http://127.0.0.1:52942'` before `npm run test:e2e`. Complete final output is in [`after/gates`](../artifacts/value-first/after/gates/e2e.txt). Runtime versions are recorded in the baseline metadata. No new test dependency was installed.

The baseline had no failing tests. An additional test reproduced an existing gap: entering the residency service inquiry discarded a selected compatible Guided package. That is part of this update's explicit selection preservation scope. Tests for native anchors, informational motivations and required claim approvals were also observed failing before the implementation.

Before screenshots cover English home, pricing, Guided finder result and family campaign, plus Hebrew home, at 390 × 844 and 1440 × 900. Each has a first screen and full page image, for 20 images. Finder evidence uses only fixture choices and no filled contact details. The semantic snapshots and complete baseline command logs are alongside the images.

## Integration findings

The first updated full browser run passed 238 of 240 tests. One failure was a stale test destination: WhatsApp moved out of the homepage hero under the approved content hierarchy. Its keyboard dialog and focus recovery assertions were preserved and moved to the Contact page. The other was an introduced German homepage overflow at 768px: the final action extended approximately 8px past the viewport. These results are retained in `after/gates/e2e-initial.txt`; the first mobile captures are in `initial-integration/` and are not the final after images.

The German overflow was fixed by allowing the final action content to shrink and wrap, without masking page overflow. A new failing responsive test was observed before the correction. The mobile heading adjustment also keeps the quiet consultation link above the persistent action at 390px across all five languages.

Independent review cycle 1 found a MEDIUM compatible package loss in both residency cost actions. Four added failing cases reproduced it before the correction. Both actions now retain Guided, or explain replacement when an explicitly requested service is incompatible. The family campaign's intentional reset remains unchanged. [Review cycle 2](../artifacts/value-first/review/cycle-2.md) is APPROVE with no open CRITICAL/HIGH/MEDIUM findings; two review cycles were used, within the cap of three.

The independent verifier reproduced base behavior directly from base source without modifying the checkout. Its domain evidence covers 12 probe groups and 18 focused production browser cases, including delayed selection and modified click regressions. Its final independent delta added 14 passing targeted checks and concluded VERIFIED. See [final verification](../artifacts/value-first/verification/final-verification.md) and the earlier [domain evidence](../artifacts/value-first/verification/domain-verification.md). The root separately ran the full final suites above, read the changed files and checked the source hashes and Git state. No coverage percentage is claimed because this project has no configured coverage report.

`npm run check:launch` intentionally returns exit 1 with missing professional, operator, translation and general launch approvals. This is the expected safe result, not a test failure. Its full output is in [`launch-blocked.txt`](../artifacts/value-first/after/gates/launch-blocked.txt).

## Acceptance and journey evidence

| Contract | Evidence |
|---|---|
| V2-01 to V2-05: brand, order, visible benefits, native anchor, direct actions | New semantic browser assertions, all locale initial HTML checks, screenshots and manual keyboard anchor check |
| V2-06 to V2-07: motivations and Why content | Unit mapping/invalid ID cases, informational navigation tests, all eight sections and source links checked in every locale |
| V2-08 to V2-10: reflow, no JavaScript and locales | Five locale responsive tests at five widths; all locale server HTML and context links; supplemental native menu, language, anchor and conversion link checks with JavaScript disabled |
| V2-11 to V2-12: SEO and claim boundaries | Approved mode fixtures, missing dependency/reviewer/date/locale failures, canonical and alternate assertions, empty preview sitemap, engineering editorial review with professional review still pending |
| V2-13 to V2-16: conversion regressions | Full original suite retained for Guided booking/receipt, family quote, invalid/business IDs, idempotency, failure/retry, receipt recovery, timezone/UTC, drafts and delayed transitions |
| V2-17 to V2-18: events and social/demo behavior | Typed event allowlist/redaction tests, campaign and hub checks, unchanged mock providers and messaging dialog/focus tests |

Test first work covered route and anchor contracts, motivation mapping, compatible/incompatible selection, required claim reviews and metadata/indexability. Baseline probes independently confirm the former missing route/fragment and approval gate behavior. The new browser suite adds 19 cases; existing tests were adjusted only for the intentional hero wording and the messaging entry point, retaining their functional assertions.

## Before and after screenshots

These are captures of the actual local production builds. Each linked full page image has a corresponding `-first.png` and semantic `-snapshot.txt` in the same folder. There are 20 baseline screenshots and 28 matching/new final route screenshots. The new Why page has no baseline equivalent.

| Page | Before, 390px | After, 390px | Before, 1440px | After, 1440px |
|---|---|---|---|---|
| English home | [Before](../artifacts/value-first/before/en-home-390-full.png) | [After](../artifacts/value-first/after/en-home-390-full.png) | [Before](../artifacts/value-first/before/en-home-1440-full.png) | [After](../artifacts/value-first/after/en-home-1440-full.png) |
| Hebrew home | [Before](../artifacts/value-first/before/he-home-390-full.png) | [After](../artifacts/value-first/after/he-home-390-full.png) | [Before](../artifacts/value-first/before/he-home-1440-full.png) | [After](../artifacts/value-first/after/he-home-1440-full.png) |
| Pricing | [Before](../artifacts/value-first/before/en-pricing-390-full.png) | [After](../artifacts/value-first/after/en-pricing-390-full.png) | [Before](../artifacts/value-first/before/en-pricing-1440-full.png) | [After](../artifacts/value-first/after/en-pricing-1440-full.png) |
| Guided finder result | [Before](../artifacts/value-first/before/en-finder-result-390-full.png) | [After](../artifacts/value-first/after/en-finder-result-390-full.png) | [Before](../artifacts/value-first/before/en-finder-result-1440-full.png) | [After](../artifacts/value-first/after/en-finder-result-1440-full.png) |
| Family campaign | [Before](../artifacts/value-first/before/en-family-relocation-390-full.png) | [After](../artifacts/value-first/after/en-family-relocation-390-full.png) | [Before](../artifacts/value-first/before/en-family-relocation-1440-full.png) | [After](../artifacts/value-first/after/en-family-relocation-1440-full.png) |
| English Why Paraguay | New route | [After](../artifacts/value-first/after/en-why-paraguay-390-full.png) | New route | [After](../artifacts/value-first/after/en-why-paraguay-1440-full.png) |
| Hebrew Why Paraguay | New route | [After](../artifacts/value-first/after/he-why-paraguay-390-full.png) | New route | [After](../artifacts/value-first/after/he-why-paraguay-1440-full.png) |

The root independently visually inspected the English before/after mobile hero, English desktop first/full page, Hebrew mobile home and Why page. Benefits precede the paid assistance and package sections, actions are readable, and the mobile hero does not include the large illustration. No filled contact details were captured. Finder result images use fixture choices only.

## Responsive, keyboard and no JavaScript checks

The 25 homepage measurements cover EN/ES/FR/DE/HE at 320, 360, 390, 768 and 1440 CSS pixels, with no horizontal overflow. Four benefit summaries remain rendered and their content fits. The five enlarged layout checks model 200% browser zoom from 1440×900 with a 720×450 CSS viewport and pixel density 2. This is an equivalent reflow model, not a native browser zoom control or real mobile device test.

Manual keyboard navigation used Tab, the skip link, Enter and the benefits link. It retained Guided and reached the target heading at 103.72px from the viewport top, clear of the header. The focused link had a visible 3px outline. Reduced motion reported true with `scroll-behavior: auto`. The existing keyboard menu and messaging dialog focus recovery tests also pass.

The installed `agent-browser` 0.32.1 rejected its advertised `a11y` command. Those five tool errors are retained and are not website violations. The installed Playwright and axe libraries supplied the targeted fallback: all five Why pages returned zero axe violations, each with one incomplete contrast check for the non-text menu glyph. The supplemental report records 12 passing checks, including both cost CTA positions with JavaScript disabled, Why financial anchor and EN to ES context, direct homepage pricing/booking and the native mobile menu. See [supplemental results](../artifacts/value-first/after/manual/supplemental-qa.json).

The menu glyph was then checked using its computed foreground `rgb(20, 43, 59)` and effective background `rgb(247, 248, 245)`, giving a contrast ratio of 13.70:1. Six additional [final action checks](../artifacts/value-first/after/manual/final-actions.json) passed: normally clicked final pricing and footer booking retain Guided; the persistent conversion bar is absent from finder, booking and receipt; a blank focused booking input remains visible in a reduced height 390×420 desktop viewport. These checks do not establish native keyboard, safe area or assistive technology behavior on real devices.

The first supplemental pointer attempt hit a partially visible anchor beneath the persistent action. An ordinary 300px wheel scroll exposed it, and a normal click reached the financial heading at 80.69px without force clicking. The initial automation timeout is retained separately; it was not counted as a successful run. Manual browser ownership was serialized after a named-session isolation anomaly, without changing browser tooling or harness configuration.

## Production performance comparison

Lighthouse 13.5.0 with Chrome 154 used the same external adaptation of the existing project script and default simulated mobile settings for both builds: 412×823, density 1.75, CPU slowdown 4, RTT 150ms and throughput 1638.4Kbps. The three routes ran sequentially after the screenshot browser closed. Both builds were optimized production builds. Full JSON and HTML reports are preserved in [before](../artifacts/value-first/before/lighthouse/summary.json) and [after](../artifacts/value-first/after/lighthouse/summary.json).

| Route | Performance before → after | LCP before → after | CLS before → after | TBT before → after |
|---|---:|---:|---:|---:|
| English home | 84 → 91 | 4.475 → 2.084 s | 0 → 0 | 29.5 → 331 ms |
| English pricing | 85 → 92 | 4.363 → 3.318 s | 0 → 0 | 59 → 80 ms |
| English family campaign | 86 → 93 | 4.214 → 3.204 s | 0 → 0 | 23.5 → 59 ms |

The increased homepage TBT prompted one focused cold repeat using the same method, recorded separately in [home repeat](../artifacts/value-first/after/lighthouse-home-repeat/summary.json): performance **79**, LCP **5.596s**, TBT **62.5ms**, CLS **0**. The initial 331ms blocking result did not repeat, but the repeat LCP was worse. These samples demonstrate variability; they do **not** establish a stable improvement or consistent attainment of the 90 performance aim. There are no repeated baseline samples to separate environment variation from code effects.

Report inspection found homepage transfer bytes increased from 796,186 to 820,254, a 24,068 byte or 3.02% increase. Script transfer increased from 705,575 to 714,184 bytes, 8,609 bytes or 1.22%. Image transfer remained 5,132 bytes, with no new heavy media or measured layout shift. The new social images are metadata assets, not additional homepage image transfers. The root independently read the Lighthouse metrics and resource breakdown. No broader performance refactor was added to this content update.

Both after audit commands saved complete measurements, then exited 1 during Chrome temporary profile cleanup with `EPERM`. Their execution logs retain that tool failure; they are not represented as successful commands. The owned audit Chrome processes were confirmed stopped. No browser tooling or harness configuration was changed to bypass cleanup.

Accessibility and best practices scored 100 on all baseline, after and repeat samples. Preview SEO scores were 66 to 69 and include the deliberate noindex deduction; indexability was not weakened. These are laboratory measurements, not field INP, production percentiles or conversion evidence. Performance remains open under existing [issue 2](https://github.com/yonatan-levin/paraguay-residency-site/issues/2), including repeatability and broader locale coverage. The baseline metadata's original reference to a 95 performance target was corrected to the handoff's actual 90 aim; measured baseline results were not altered.

## Content and translation review boundaries

The authored draft distinguishes the benefits of a residency status, wider life/business planning, and the preparation or coordination offered by Paraguay Next. It provides visible income source qualifications, stage distinctions and budget prompts without invented amounts, approval results, citizenship deadlines, team credentials or testimonials.

Official source R2 and DNIT Law 6380/19 articles 47 to 49 were retrieved and inspected during this task. Direct retrieval of R1 timed out; its bounded statements use the official search snapshot and the supplied brief's source check. That limitation is recorded in the source registry. Source inspection is not a review by a lawyer or tax professional.

English, Spanish, French, German and Hebrew remain separate publication approvals. Translation completeness and automated checks do not establish professional legal equivalence or staffed support. Qualified legal/tax review, operator delivery approval and native language publication review remain pending. The claim gate, general launch gates and preview noindex protections must remain in force.

## Participant comprehension script

This protocol is prepared but has not been run with actual participants. Show the home page to someone unfamiliar with the service, let them browse naturally, and ask without explaining the intended answers:

1. What is offered here?
2. What could you gain from considering Paraguay or its residency options?
3. What would you pay Paraguay Next to do?
4. What would you do next, and why?

Record their own words and the page or action they use. An answer limited to “they handle documents” is incomplete understanding. Check whether they distinguish possible outcomes from government approval and from the paid service. Do not turn a click count into a comprehension or conversion claim.

## Checks that require separate evidence

Physical iOS/Android devices, social in app browsers, on screen keyboard overlap on real hardware, assistive technology sessions with users, participant comprehension sessions and professional legal/tax/language approvals are not established by desktop browser emulation. No field performance, real consultation attendance, paid customer or conversion uplift measurement is claimed.

No deployment or live service activation is authorized by this report. The previously hosted team demo is a separate artifact.

## Delivery boundary

The root checked that the code was committed locally, the catalog/runtime/dependencies/deployment files remained unchanged, and PR 6 still pointed to baseline `6b5c6ba7a104cc2f8f9671fa34d6be27eea848b6`. The update was not pushed, merged, deployed or connected to real services. The existing checkout and local branch are retained for review. Setup is in [README](../README.md); changed route contracts, decisions and launch prerequisites are in [ROUTES_AND_SEO](ROUTES_AND_SEO.md), [DECISIONS](DECISIONS.md) and [LAUNCH_CHECKLIST](LAUNCH_CHECKLIST.md).

The complete project regression is T1. T2/T3 estate and landing checks do not apply because this update changes no cross-project published contract and performs no default branch landing. The task-scoped background review check found no Paraguay findings or running review entries in the configured Codex/Claude security locations. No push-triggered security review is claimed. Unrelated parked issues remain untouched; performance evidence belongs to existing issue 2. The browser session/tool and temporary-profile cleanup limitations are recorded here without a harness change.

Final documentation links were checked against local files. Source and authored documentation pass the whitespace check. The unrestricted evidence diff also reports trailing whitespace and final blank lines in captured tool logs and generated Lighthouse HTML; those raw outputs are retained without rewriting their evidence.
