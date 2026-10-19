MODE: EXECUTE  
ROLE: QA  
QA_TYPE: FEATURE_VALIDATION / MANUAL_BROWSER_QA / REGRESSION_CHECK  
Tier: S1, issue #10, cycle 1

# Summary

**PASS for the scoped local prototype.** Both structures, the foreign dividend example and their qualifications render visibly in all five languages. Selected package and campaign context survive informational navigation and language changes. Explicit inquiries retain the established compatible/incompatible behavior. No product defect was found. This verdict does not approve publication or an individual's tax outcome.

# Reference material and environment

- Contract: [TAX_OPPORTUNITIES_SPEC.md](../../../docs/TAX_OPPORTUNITIES_SPEC.md); [REVIEWER APPROVE](../reviewer.md); [VERIFIER evidence](../verifier/verification.md).
- Branch `update/value-first`, baseline `14af4aefd7321fbea074c0da6218536e252abf0b`; source changes were uncommitted during QA.
- Tested build `o-lKvcROyw9eIxuZzFLfd`, source fingerprint `4cc4e922a1b805048e9e29dd04ee5b502cc7e6d1549638dded974be702d59ad5`, 114 files in the [manifest](../source-manifest.json).
- Local production preview `http://127.0.0.1:52942`. Windows, Headless Chrome 152, agent-browser session `tax-qa-cfd5474485e0`. Capture timestamps are UTC; work crossed into 2026-09-27 UTC (2026-09-26 Paraguay time).
- Used one exclusive manual browser session after earlier concurrent-session ambiguity. No interference occurred in these checks. Closed only this QA session when finished.

# Plan and checks performed

The bounded plan was to exercise the changed tax surface, its links to existing conversion journeys, accessibility, translations and reflow. No full regression rerun or unrelated exploration was added.

| Check | Actual result and evidence | Status |
|---|---|---|
| Informational US journey and language switch | Why with `temporary-guided` and `residency-cost` → US page → German → header booking. Both context values persist; selected German package visibly appears and survives refresh. | PASS |
| Explicit service inquiries | US compatible and incompatible package; tax compatible and incompatible package. Compatible plans persist. Incompatible plans show the adjacent scope notice, then clear only after inquiry; campaign remains and booking has the intended service. | PASS |
| Mobile language and pricing navigation | Why → Hebrew → mobile menu → pricing retains selected plan and campaign. | PASS |
| Keyboard basics | First Tab focuses the skip link. Mobile menu opens with Enter and closes with Escape. | PASS |
| Responsive content | EN/ES/FR/DE/HE at 320, 360, 390, 768 and 1440 CSS pixels: **25 combinations**, no horizontal overflow, both structures and both cases visible, internal financial-section actions fit, no qualification hidden in a disclosure, correct document direction. | PASS |
| Equivalent 200% reflow | EN/DE/HE Why at 720×450 CSS pixels and DPR 2, modeling a 1440×900 desktop at 200%. All four case/structure blocks visible and no overflow. This is emulation, not native browser zoom. | PASS |
| Automated accessibility | **8 axe 4.13.0 scans**, Why in all five locales plus EN tax/US company/Paraguay company pages at 390×844. WCAG 2 A/AA, 2.1 AA and 2.2 AA tags: **0 violations**. | PASS within scanned rules |
| Axe incomplete follow-up | Each scan had one incomplete contrast check for the non-text mobile menu glyph. All eight were visible and named. Computed foreground `rgb(20,43,59)` against opaque header `rgb(247,248,245)` gives **13.70:1**. | PASS for those eight entries |
| Preview indexing | Every responsive page retained `noindex, follow`; screenshot metadata also records it. | PASS |
| Before/after evidence | Recaptured **7 matched after images**, plus 2 detail images. URL, title, dimensions, direction, build and source identity recorded. | PASS |

Journey details: [17 recorded observations](journeys.json). Responsive measurements and localized case text: [responsive.json](responsive.json). Accessibility: [summary](axe-summary.json), per-route `axe-*.json`, [manual contrast resolution](contrast-review.json). Zoom: [measurements](zoom.json) and `zoom-en.png`, `zoom-de.png`, `zoom-he.png`. All checks ran through the installed agent-browser CLI using the [read-only evidence runner](browser-evidence.mjs). Two initial QA runner locator mistakes were corrected; they were not site defects.

# Browser and manual evidence

Screenshots are listed in the [after manifest](../after/manifest.json) and paired with the [unchanged baseline manifest](../before/manifest.json). The paired EN pages cover home, Why, its financial section, tax planning, US company setup and Paraguay company setup at 1440×900; the paired Hebrew Why page is 390×844. Full-page captures preserve all content. Detail captures intentionally show a viewport crop; the additional EN structures image aligns the grid at its top so both headings are visible.

Visually inspected the EN structure comparison and Hebrew dividend detail: qualifications sit inside their related cards; source links, percentages, mixed Latin text and Hebrew reading order remain readable. This is not native-language approval or a full accessibility certification. One later cold-session viewport command returned success but its CLI process exceeded the evidence runner timeout; reopening the named session and repeating the extra image capture succeeded. No product failure was observed.

[Browser diagnostics](diagnostics.json) record **0 console messages, 0 page errors and 0 HTTP statuses of 400 or above across 829 requests**. All requests were local. **5 Next.js prefetch requests have no recorded response status**, so their completion is unknown; no failed status or user-facing failure was observed. Network evidence ends before the separate menu contrast follow-up and final detail screenshot recapture.

# API and test evidence

No API contract changed and no external submission or live account was exercised. No form contact data was entered or submitted.

QA independently read the owner logs: [130 unit tests passed](../unit-tests.txt), [257 browser tests passed](../browser-tests.txt). The recorded full suite includes the new tax E2E coverage and existing no-JavaScript, language, pricing and booking regression. Owner lint, typecheck and production build logs are green; VERIFIER separately ran 61 focused unit tests, 8 tax E2E tests and 25 localized initial-HTML probes. QA did not claim those commands as its own execution or duplicate the full suite. QA ran the browser checks above and `git diff --check` (exit 0; line-ending warnings only).

# Issues and risk assessment

No BLOCKER, MAJOR or MINOR product findings from this scoped QA cycle. No source, test, configuration, dependency, Git or GitHub mutation was made. Only the assigned QA evidence and after screenshots/manifest were written; the regression screenshot subfolder and preexisting doctor artifact were preserved.

Professional Paraguay/US tax review, operator approval and native translation approval remain outstanding launch gates. Physical devices, native browser zoom and screen-reader operation were not tested. Coverage percentage is unmeasured. Lighthouse was not rerun; existing performance uncertainty in issue #2 is unchanged. These limits prevent a broader production-readiness claim, not this local prototype verdict.

# GitHub issue update and next steps

Issue [#10](https://github.com/yonatan-levin/paraguay-residency-site/issues/10): **not updated by QA**. No bug issue was created. Main agent/SCRIBE should record the PASS, exact evidence identity and limits, then complete authorized local closure. No deployment, push, merge or publication is authorized by this report.

**READY FOR HUMAN APPROVAL of the local prototype.**  
HANDOFF_TO: HUMAN
