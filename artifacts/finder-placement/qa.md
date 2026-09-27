# Finder placement QA — issue #11, cycle 1

MODE: EXECUTE  
ROLE: QA  
QA_TYPE: MANUAL_BROWSER_QA  
Tier: S2  
Result: **PASS for the dispatched placement smoke scope.**

## Summary and reference material

Validated the request to move the primary finder link from the header into the homepage hero while retaining pricing, benefits, booking, and journey context. References: root dispatch and REVIEWER APPROVE, the scoped `home.tsx`/`shell.tsx` diff, and `tests/e2e/finder-placement.spec.ts`. No source changes were made by QA.

## Environment

- Date: 2026-09-26, America/Asuncion.
- Checkout: `update/value-first`, HEAD `d7affae4a90dc2370d21bab50f9a2c2e7d658dc9`, with the reviewed uncommitted implementation.
- Server: `http://127.0.0.1:52942`; local build ID independently read as `TODsCg95fGXB6l3yUcRQm`.
- Source manifest reference: `123ff6739ee122dc7738ea8e670533fa0be4d8128b95f8ac9096c415d346d02a` (`source-manifest.json`). This identifies the root's built source snapshot, not a new commit.
- Browser: agent-browser isolated session `finder-qa-cfd5474485e0`, HeadlessChrome/152.0.0.0 on Windows, 390 × 844 CSS-pixel viewport. No physical-device claim.
- Input: `/de?plan=temporary-essential&campaign=residency-cost`, anonymous preview.

## Plan and checks performed

| Check | Method and actual evidence | Status |
|---|---|---|
| Header finder removed | Browser DOM query found 0 header links targeting `find-my-plan`; `qa-dom.json`. | PASS |
| Central hero finder visible | German finder bounds x=20–370, y=543.27–591.42, wholly within the initial viewport; `qa-dom.json`, `qa-german-mobile.png`. | PASS |
| Supporting routes retained | Hero pricing, benefits, and booking links all visible with their expected route/anchor and journey parameters; all end before y=758. | PASS |
| Mobile overflow | `document.documentElement.scrollWidth` and viewport width both 390. | PASS |
| Keyboard access and visible focus | Five real Tab presses reached skip link → brand → language summary → menu summary → hero finder. `:focus-visible` true; screenshot shows an orange outline; `qa-keyboard-focus.json`, `qa-german-keyboard.png`. | PASS |
| Keyboard activation and context | Enter opened `/de/find-my-plan?service=temporary-residency&plan=temporary-essential&campaign=residency-cost`; finder heading, choices, and initial disabled Next/Back rendered. `qa-destination.txt`, `qa-finder-snapshot.txt`. | PASS |
| Browser errors | `agent-browser errors` and `console` returned no entries for this session; observation recorded in `qa-runtime.txt`. | PASS |
| Existing visual evidence | Independently opened `after-desktop.png`, `after-mobile.png`, and `after-hebrew-320.png`; hero finder is prominent, header finder absent, supporting links readable, and no visible overlap/clipping in these captures. These are root-captured images, not fresh QA navigations. | PASS |
| Optional hero axe audit | `agent-browser a11y --selector '[data-home-section=hero]' --json` returned `Unknown command: a11y`; `qa-axe.json`. No axe result or full accessibility-compliance claim. | NOT RUN |

## Issues and risk assessment

No BLOCKER, MAJOR, or MINOR product defect observed in this bounded smoke. No implementation handoff required. Residual scope: automated accessibility audit through this CLI unavailable; no physical-device, additional browser, performance, tax-content, or broader finder-completion validation performed by QA. Supporting links were checked for visibility and destination, not individually navigated.

## Tests and API evidence

The placement E2E test was read. Full unit/browser suites were deliberately not rerun: the root owns the reported 130-unit/267-browser regression evidence and the VERIFIER evidence. These reported suite results are not represented as independent QA executions. No API-specific requests or auth checks were in scope.

## GitHub issue update and next steps

Issue #11: QA result PASS; no GitHub mutation by QA. Root owns tracking and acceptance. Re-test this same German keyboard path if the source changes. QA session closed successfully; no source, Git state, deployment, or peer evidence modified.

HANDOFF_TO: HUMAN (through root for acceptance)
