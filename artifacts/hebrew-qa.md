# Hebrew acceptance QA

MODE: EXECUTE · ROLE: QA · QA_TYPE: MANUAL_BROWSER_QA / FEATURE_VALIDATION · Tier: S2

## Verdict

**PASS with one disclosed MINOR cosmetic defect, parked in issue #5.** No BLOCKER or MAJOR finding in the scoped acceptance checks. This verdict covers the local prototype and the evidence below, not production integrations, native devices, professional translation approval, or live deployment.

Verified production build: `Z4gZdLWq2bcEoQckTmphI`, served at `http://127.0.0.1:3000` on Windows. Independently compared all 94 source manifest files: zero mismatches; aggregate SHA-256 `62c6bd2f5f6bc5ba6d53aedf46ee890d8d33f8256d354b4f4617b4b1b1546828`. Build identity remained unchanged throughout the geometry audit. Implementation was staged against initial HEAD `0672b54372b6574c5a22b983623f4044784423ee`; the source fingerprint is the acceptance boundary.

## References and scope

Used `docs/LOCALIZATION.md`, the handoff acceptance requirements, `tests/e2e/hebrew.spec.ts`, `tests/e2e/routes.spec.ts`, and the completed `artifacts/hebrew-verifier.md` and `artifacts/hebrew-review.md`. Applied the QA, SDLC, agent-browser, and verification-before-completion skills. This is the Hebrew extension acceptance pass; earlier prototype and four-language QA remain separate evidence.

## Direct manual acceptance checks

The default agent-browser CLI used namespace `hebrew-qa` and session `hebrew-qa-final`. All interaction checks used test contact details and local mocks.

| Check | Observed result | Status |
| --- | --- | --- |
| Hebrew home at 1440 px | Real RTL document, header, navigation and content; Latin brand and editorial artwork remained readable. | PASS |
| EN → HE → DE → HE booking draft | Selected temporary residency Guided package, mixed Hebrew/Latin name and notes, email, appointment and timezone survived every language transition. Hebrew used RTL and German used LTR. | PASS |
| Appointment instant and receipt | `2026-09-25T13:00:00.000Z` remained the selected instant when Asia/Jerusalem displayed 16:00 and UTC displayed 13:00. Hebrew mock receipt retained the Guided plan and provisional $2,850; explicitly said no appointment or message was sent. | PASS |
| Family campaign → Guided → inquiry → receipt at 390 px | Service, plan and `campaign=family-relocation` survived navigation. Inquiry and receipt showed a family quote request without inventing a family total. | PASS |
| Invalid phone recovery | `+1------` produced a Hebrew validation summary and field link. Keyboard Enter on that link focused the phone input. Correcting to a test international number allowed the mock receipt. | PASS |
| Contextual WhatsApp dialog | Hebrew preview named the selected plan, explained the disabled integration, and did not contact a provider. Escape dismissed it and restored focus to the trigger. | PASS |
| Long Hebrew copy at 320 px | Company formation, residency guide and privacy copy were meaningful and readable, including exclusions and draft/professional-review qualifications. | PASS |
| Provisional price and range bidi | Company formation $1,000 and accounting $90 to $220 retained catalog values. Both accounting amounts and the monthly provisional unit were readable across wrapping; price isolates used RTL and contact/timezone inputs used LTR. | PASS |
| Preview/privacy boundary | `/he/privacy` returned HTTP 200 with `X-Robots-Tag: noindex, follow` and matching HTML robots. At checked conversion/dialog states, localStorage and sessionStorage were empty, cookies were empty, and no external resource request appeared. Contact details were absent from receipt URLs. | PASS |

No manual page errors or console entries were observed in the queried sessions. No filled-form or receipt screenshot was saved. Both owned browser sessions were closed; the root-owned server was not changed.

## Responsive audit

The delegated geometry audit used an isolated installed Playwright context because prior agent-browser loops stalled and named sessions had shown tab interference. This fallback was explicitly authorized. Runtime: Playwright 1.63.0, Chromium 153.0.8010.12; heights 900 px; widths 320, 390, 768 and 1440 px. Its JSON was independently inspected, and both unique flag types were adjudicated against computed geometry and visual evidence.

- All **29 Hebrew routes × 4 widths = 116 unique pairs** returned HTTP 200 and Hebrew/RTL documents. **388 page states** were recorded.
- All **116** five-option language menus fit, Escape closed the disclosure, and CTA bounds and meaningful visible text fit.
- All **78** applicable mobile menus fit; opening either navigation disclosure closed the other in both directions.
- **0** page errors and **0** external requests. Document width fit in all 116 pairs.
- **16 raw geometry flags remain in the artifact:** eight repeated observations of the MINOR home art edge defect and eight observations of pricing's deliberately clipped, 1×1 px screen-reader heading (`clip-path: inset(50%)`). The latter are scanner false positives, not hidden visible-content defects. Strict containment of every element therefore does not pass; meaningful text and control geometry does.
- **1,370 raw failed-request events were recorded**, all same-origin Next.js `_rsc` requests with `net::ERR_ABORTED`. Follow-up inspection of 13 samples confirmed prefetch headers. These are recorded navigation/prefetch cancellations; no other failure category was found. This report does not claim zero failed requests.

Full evidence: [geometry JSON](hebrew-qa-geometry.json). The route inventory is retained there rather than sampled or truncated.

## Parked finding

**MINOR · FRONTEND · issue #5 · `/he` at 320 and 390 px.** Open the Hebrew home at either width and scroll to the hero artwork. The white `.art-note` background extends 5 px past the right viewport edge and is clipped. At 320 px its right bound is 325 px, while the document stays 320 px; Hebrew text ends at approximately 266.58 px and the star at 311 px. Text, star and actions are fully visible. Expected: the entire decorative card edge fits.

Likely cause: the mobile `.hero-art` physical left margin in `src/app/globals.css` reserves space on the opposite side from `.art-note`'s logical RTL inset. Future fix direction: use the appropriate logical spacing, then inspect both LTR and RTL home artwork at 320/390 px and rerun narrow geometry. Under the S2 instruction to park LOW findings, QA made no fix and started no extra review cycle. Root independently agreed with the visual classification and arranged issue #5; QA made no GitHub mutation.

## Visual evidence and limits

Directly inspected unfilled screenshots: [desktop RTL](hebrew-qa-home-1440.png), [family campaign](hebrew-qa-family-390.png), [art edge](hebrew-qa-home-art-320.png), [accounting price range](hebrew-qa-range-320.png). Geometry screenshots also capture the home edge at [320 px](hebrew-qa-geometry-home-320-detail.png) and [390 px](hebrew-qa-geometry-home-390-detail.png).

Root's 217 browser tests and 65 unit tests, verifier/reviewer reports, build and type checks are upstream evidence and were not rerun by this bounded QA pass. The fast SSR menu hydration regression was covered upstream, not independently repeated here. No full WCAG, native-phone, field-performance, professional linguistic/legal, or real-provider acceptance is claimed. Existing Hebrew performance follow-up remains parked in issue #2; no performance changes were made.

No source, test, configuration, build output, server, commit or external system was changed by this QA task. Only the owned QA report and unfilled evidence were created. No deployment occurred.

HANDOFF_TO: HUMAN / root closure. Ready for the authorized publication workflow with the disclosed parked MINOR issue.
