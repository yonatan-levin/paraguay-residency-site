# Independent localization QA

MODE: EXECUTE  
ROLE: QA  
QA_TYPE: MANUAL_BROWSER_QA  
Tier: S2  
Result: **PASS for the localized local prototype smoke scope.**

## Scope and environment

Contract: the user's full public EN/ES/FR/DE localization requirement, authored wording without dash punctuation, and `docs/LOCALIZATION.md`. Existing provisional prices, noindex, mock-only integrations, and context preservation remain required. Root owns the exhaustive route and wording audit; this pass samples real French/German content and performs a complete localized mock journey.

Target: local optimized demo at `http://127.0.0.1:3000`, Windows. Tool: agent-browser 0.32.1 with explicitly named session `locale-qa-cfd5474485e0`, daemon PID 51024. No source files, server process, packages, other sessions, or external systems are modified by this pass. Only `artifacts/locale-qa-*` evidence is owned here.

Final source fingerprint: **`7eef6d3a42de8f38f05b411c229f01251644e95a3a207141d753311223590064`**. Independently recalculated every file hash in the final source manifest: **87 entries, 0 mismatches**. There is no Git commit identity. The semantic/journey checks below ran during this localization pass; final focused retests ran after the last shared text-wrap and CLI import corrections. Tests, package files and application code were not modified by QA.

The root observed an unexpected screenshot from this session's page despite using a different named session/PID. The cause was not proven. Browser CLI work was therefore serialized: the root paused its agent-browser usage while this pass ran. This is a tool-isolation limitation, not an attributed application defect.

## Completed content checks

| Route | Actual evidence | Status |
|---|---|---|
| `/fr/permanent-residency` | French title, `lang=fr`, service description, intended customer, scope, exclusions, process, package labels, FAQs and draft-review boundaries. Provisional USD amounts remain present. | PASS |
| `/fr/guides/residency-requirements` | Full eight-section guide read in French, including document preparation, household quote boundaries, separate external costs, and professional-review limits. No horizontal overflow at 390px. | PASS |
| `/fr/privacy` | Full privacy draft read in French. Memory-only test data, no external tracking, optional unchecked consent, and unresolved legal/operator inputs remain explicit. No horizontal overflow at 390px. | PASS |
| `/de/permanent-residency` | German document language/title and seven translated section headings; correct service topic. No horizontal overflow at 390px. | PASS |
| `/de/guides/residency-requirements` | German document language/title, all section headings, and sampled opening preparation paragraphs have meaningful translated copy. No horizontal overflow at 390px. | PASS |
| `/de/privacy` | Full privacy draft read in German; mock handling and outstanding approvals remain clear. No horizontal overflow at 390px. | PASS |

No page errors were reported during these content checks. This is a functional/content-language review, not native-speaker certification or professional legal approval.

## Reproduced layout defects before the fix

Both findings were independently reproduced and sent to root/FRONTEND. FRONTEND already owns the scoped correction; QA made no source edit.

1. **MAJOR, FRONTEND, `/de/services` at 320 CSS pixels.** Document width was 363px. The `.services-grid` container was 280px, but its computed single column and articles grew to 343.125px (`min-width:auto`, normal word wrapping). Long German headings establish a larger minimum content width. Visible service text is clipped unless horizontally scrolled. Evidence: `locale-qa-de-services-320-before.png`, captured and opened. Fix direction: permit long words in the affected cards to wrap. Retest: page width equals viewport and all service labels remain visible at 320px.
2. **MAJOR, FRONTEND, `/de` at 390 CSS pixels.** Document width was 441px. `.goal-grid` cards expanded to 203.265625px columns; the second column reached x=440.53125. The issue occurs with the language menu closed, so the language disclosure is not the cause. Long German words in goal cards set the minimum width. Fix direction: wrap long goal-card wording without hiding overflow. Retest: closed/open language menu, goal cards and CTA fit at 390px and 320px.

**Both findings closed by live retest on build fingerprint `b06a6daf215a48ef7bcdbf44373f267f69ceea6df534d6b018f4b44d65acb1a5`.** `/de/services` at 320px now has document width 320px, article width 280px and `overflow-wrap:anywhere`. `/de` at 390px has document width 390px and four 168px cards, including with the language menu open; at 320px with the menu closed the document width is 320px. Unfilled evidence was captured and visually opened: `locale-qa-de-services-320-after.png` and `locale-qa-de-home-390-after.png`.

3. **MAJOR, FRONTEND, `/de/guides/residency-requirements` at 320px, now CLOSED.** Independently confirmed after the first fixes. Document width was 338px. The H1 box was 280px, but its text range extended to x=338.453125 and `H1.scrollWidth` was 318px because `Aufenthaltserlaubnis` did not wrap. Other main-content text ranges did not exceed the viewport. Evidence: `locale-qa-de-guide-320-before.png`, captured and visually opened. Root applied shared wrapping and owned the aggregate route audit. Final live retest at fingerprint `7eef6d3a42de8f38f05b411c229f01251644e95a3a207141d753311223590064`: document width 320px, inherited H1 `overflow-wrap:anywhere`, and zero text ranges extending beyond the viewport. `locale-qa-de-guide-320-after.png` was captured and visually opened. The heading remains readable with the long word broken across lines and the primary CTA visible.

On the same final build, independently revisited services at 320px and homepage at 390px with the language picker open: document widths were 320px and 390px respectively; service article width was 280px. Thus the shared correction retained both earlier fixes. **All three observed layout findings are closed; no new finding remains.**

## Completed localized journey and navigation checks

- At 390px, chose French `Accompagné` from pricing and reached `/fr/book?service=temporary-residency&plan=temporary-guided`. Empty submission displayed a French alert with translated first-name and email validation.
- Entered a test name and `example.test` email, then used the actual four-language picker to switch to German. The same safe service/plan query survived; name and contact draft remained filled. `Begleitet`, German form labels, German mock warnings and a provisional `2.850 $` were visible. Marketing consent stayed unchecked.
- Chose simulated Failure in German and submitted. The German error alert explained retry options and retained the test draft. Changed the simulated outcome to Success and retried. The German receipt retained `Begleitet` and `2.850 $`, explicitly saying no appointment or message occurred.
- Switched that completed receipt to French through the actual picker. Receipt stayed complete, translated to `Accompagné` and `2 850 $US`, without another submission action. Both receipt layouts fit at 390px. The browser resource list contained no external origin; local storage and session storage lengths were zero, cookies were empty, and no page errors were reported.
- At 1440×900, the German navigation labels, primary CTA and four language choices were readable without overlap or document overflow. Escape closed the language menu and returned focus to `Sprache wählen: DE`. Evidence `locale-qa-de-desktop-picker.png` was captured and visually opened. At 390px the open language picker also stayed within the viewport, and the mobile primary CTA remained visible.

All contact values were test data. No filled-form or receipt screenshots were retained. These are browser-size checks, not native mobile-device certification.

## Final safeguards, evidence boundary and handoff

On the final build, `Invoke-WebRequest` to the German guide returned HTTP 200, `X-Robots-Tag: noindex, follow`, and matching HTML robots metadata. Browser `errors` and `console` collectors reported no entries. Browser session `locale-qa-cfd5474485e0` was closed successfully; the root was notified that browser CLI use was yielded. No server was restarted or stopped by QA.

This pass deliberately did not repeat the full Playwright suite, exhaustive EN/ES/FR/DE route matrix, all-authored-wording dash audit, build, or unit commands owned by the root. Root's aggregate 232 page/viewport audit and suite results are separate evidence, not presented as commands executed by this QA agent. The report approves the actual representative manual scope listed above. It does not independently certify every translation as native or the full public-page inventory from samples alone.

No unresolved application finding remains from this pass. No GitHub issue/PR was supplied and no external update was made. Native devices, field performance, professional/legal approval and human publication-language review remain launch checks. No deployment, real booking, outbound message or provider call is authorized by this report.

**READY FOR HUMAN APPROVAL of the localized local prototype, subject to root's full-suite and authored-wording gates.**

HANDOFF_TO: HUMAN
