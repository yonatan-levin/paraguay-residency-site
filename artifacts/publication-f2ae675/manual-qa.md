# Hosted publication manual QA

MODE: EXECUTE · ROLE: QA · QA_TYPE: MANUAL_BROWSER_QA · Tier: S2

**PASS for the assigned hosted smoke scope.** No product issue observed. This does not replace the root-owned full hosted regression or approve a business launch.

## Environment and references

- Checked September 27, 2026; session closed at 06:56 America/Asuncion.
- Origin: `https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app`.
- Local HEAD independently confirmed before and after QA: `f2ae675d78fd8987097d9a80f45d031ea8269ccc`.
- Root supplied deployment identity: Cloud Build `2a64e92a-fda7-487b-8d19-76ae603bafab` SUCCESS; revision `paraguay-prototype-build-2026-09-27-001` Ready, 100% traffic. QA did not query the cloud control plane.
- Windows, HeadlessChrome/152.0.0.0, isolated agent-browser session `publication-qa-cfd5474485e0`.
- Viewports: EN 1440 × 900; HE 320 × 844 and 390 × 844. These are browser viewport checks, not physical-device testing.
- References: root dispatch, `docs/FIREBASE_HOSTING.md`, finder-placement acceptance/evidence. Agent-browser and verification-before-completion skills applied.
- Input: `/en?plan=temporary-guided&campaign=family-relocation`; no contact information entered.

## Checks performed

| Check | Actual evidence | Result |
|---|---|---|
| English desktop placement | Browser snapshot, DOM measurements, and screenshot show the hero finder at x120–258.77, y617.98–667.05. Header contains zero finder links. Pricing, benefits, and consultation links remain visible. Document width equals 1440. | PASS |
| Finder navigation | Clicked the hero finder; destination `/en/find-my-plan?service=temporary-residency&plan=temporary-guided&campaign=family-relocation`. | PASS |
| Language switch and context | Opened the native language disclosure and clicked Hebrew. Destination `/he/find-my-plan` retains the same service, plan, and campaign. Localized finder heading/choices render, document is `lang=he`, `dir=rtl`; residency choice is selected and Next enabled. | PASS |
| Return home with context | Clicked the Hebrew finder header brand link. `/he` retains Guided and the family campaign. | PASS |
| Hebrew mobile placement | At 320 px, hero finder x20–300, y470.73–518.89; at 390 px, x20–370, y412.34–460.50. Pricing, benefits, and consultation links fit in both first viewports. Header finder count is zero; document widths are exactly 320 and 390. Visually inspected both screenshots with no content overlap or clipping. | PASS |
| Preview safeguards | English/Hebrew preview banners visibly state no real booking/message. EN home, HE finder, and HE home expose `noindex, follow` metadata and canonical URLs on the Firebase origin. This check inspected DOM metadata; response-header validation remains in root's HTTP checks. | PASS |
| Browser diagnostics | After the complete sequence, `agent-browser errors --json` returned `errors: []`; `console --json` returned `messages: []`. | PASS |
| Cleanup | `agent-browser close` succeeded; only owned QA report/screenshots were written. | PASS |

## Visual evidence

- [English desktop](manual-en-desktop.png)
- [Hebrew 320 px](manual-he-320.png)
- [Hebrew 390 px](manual-he-390.png)

## Issues, tests, and limits

No BLOCKER, MAJOR, or MINOR product issue found in this scope. A semantic brand-link locator returned “Element not found”; a fresh snapshot exposed the link and clicking its reference succeeded. The failed locator is not counted as application evidence.

The full hosted automated suite is root-owned and was not duplicated. No form submission, provider-network audit, no-JavaScript test, performance measurement, complete accessibility audit, or FR/DE/ES manual sweep was performed. Demo labels and metadata are verified; those observations alone do not prove every integration boundary.

No app/config, Git, GitHub, or deployment changes made. Final publication acceptance depends on root reconciling the full hosted regression and rollout evidence. Re-run this smoke if the deployed source changes.

HANDOFF_TO: HUMAN / root for publication acceptance.
