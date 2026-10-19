# Independent final prototype QA

MODE: EXECUTE  
ROLE: QA  
QA_TYPE: MANUAL_BROWSER_QA  
Tier: S1  
Result: **PASS for the requested local mock prototype**  
HANDOFF_TO: HUMAN

## Scope, identity, and reference material

This independent acceptance pass checked representative live conversion journeys and visual behavior against `docs/CODEX_HANDOFF_PARAGUAY_SITE.md`, especially AC-01, AC-02, AC-05, AC-07, AC-10, AC-11, AC-12, AC-15, AC-17, and AC-18. It also read the consolidated `docs/QA_REPORT.md` and `artifacts/reviewer-integrated.md`. The reviewer verdict is APPROVE_WITH_NITS, with no open CRITICAL/HIGH/MEDIUM findings. The previously reported phone-validation defect is closed.

Validated source fingerprint: **`9b6d17285fa1cd9165ed33ce115efa6b0790bb5ad19baaac33bd4ae8736f322e`**. Independently recalculated all **64** SHA-256 file hashes listed in `artifacts/source-manifest.json`: **0 mismatches**. This verifies the files associated with the supplied aggregate fingerprint; this pass did not regenerate or rewrite the manifest. There is no Git repository or commit SHA in the supplied workspace.

Only this QA report was added. No implementation, tests, dependencies, configuration, server, build, existing evidence, GitHub state, or external provider was changed. No deployment was performed.

## Environment and method

- Target: optimized local demo at `http://127.0.0.1:3000` on Windows.
- Browser tool: installed `C:\Program Files\nodejs\agent-browser.ps1`, isolated session `qa-final-cfd5474485e0`.
- Actual reported browser: HeadlessChrome **152.0.0.0**, Windows desktop user agent. This is distinct from the Chromium 153 Lighthouse environment in the consolidated report.
- Viewports used: **390×844**, **1440×900**, and **320×844** CSS pixels. This pass resized a desktop browser; it does not establish native phone, touch, or mobile user-agent compatibility.
- Input data: test-only names and `example.test` email addresses. No customer records or credentials were used. No screenshots were taken of filled forms or receipts.
- Tools: live snapshot/ref interaction, semantic locators, keyboard Enter/Escape, browser error/console collectors, network request listing, DOM/resource/storage observation, screenshots, `Invoke-WebRequest`, and PowerShell `Get-FileHash`.
- Plan: one complete family campaign journey with Back and failure recovery, one English-to-Spanish selected-plan journey, keyboard error/dialog checks, then reflow, HTTP indexing, network/storage, visual, and source-identity checks. The already completed full suite was not repeated unnecessarily.

## Checks performed

| Check | Steps and expected behavior | Observed result | Status |
|---|---|---|---|
| Family campaign and finder | Open `/en/lp/family-relocation` at 390px; choose “Plan our move”; select initial residency, family, later-this-year, Guided. Use Back between household and timing. | Residency was preselected; family was prefilled but editable. Back retained the family and timing answers. Guided result appeared before any contact information or consent, with “Request a family quote” and no calculated household amount. | PASS |
| Finder-to-inquiry context | Follow “Discuss this plan.” | `/en/book?service=temporary-residency&plan=temporary-guided&campaign=family-relocation`; summary retained Guided, family quote, and “Recommended by your plan finder.” Optional marketing consent was unchecked. | PASS |
| Simulated failure and retry | Fill test name/email; expand preview options; choose Failure; submit; change outcome to Success and retry. | Failure showed an alert and no success screen. Name, email, Guided, and family quote remained. Retry reached the receipt with the same selected plan, family quote, and finder provenance. Receipt explicitly stated that no appointment was booked and no message was sent. | PASS |
| Refreshed receipt | Reload the completed family receipt. | “No active demo receipt” with an explanatory recovery route. No fabricated booking or completed request remained. | PASS |
| English-to-Spanish package continuity | Open fresh `/en/pricing`; select Guided; switch inquiry language to Spanish; submit valid test details. | English inquiry showed Guided `$2,850`; equivalent `/es/book` kept valid service/plan IDs and showed Guiado `USD2.850`. Spanish receipt retained Guiado and `USD2.850`; displayed content and completion notice were Spanish. `document.documentElement.lang` was `es`. | PASS |
| Spanish error summary and keyboard focus | Submit the empty Spanish inquiry, focus the “Escriba su nombre.” error link, then press Enter. | Visible Spanish summary and field errors were present. Enter moved actual DOM focus to `firstName`. Optional consent stayed unchecked. | PASS |
| Contextual local WhatsApp and Escape | Navigate from Spanish receipt to Contact, focus “Consultar por WhatsApp,” press Enter, inspect dialog, press Escape. | Local Spanish dialog named Guiado and explained that delivery and a business number are unavailable. Escape closed it; focus returned to the originating button. No external tab/provider was opened. | PASS |
| Local requests and transient data | Inspect browser request log after family failure/retry and resource/storage state after the Spanish dialog. | Observed application requests used only `http://127.0.0.1:3000`; listed family-journey requests returned 200. External resource lists were empty. Local storage length 0; session storage length 0; cookies empty. Contact values were not in journey URLs. | PASS |
| Errors and console | Query browser errors after journey transitions and both `errors` and `console` at completion. | No page error or console entry was reported during the inspected session. | PASS |
| Responsive/visual | Inspect live family campaign at 390×844, live pricing at 1440×900, existing full-page mobile pricing capture, then measure pricing at 320×844. | Preview banner, CTA, artwork, pricing tiers, and navigation were readable in the live viewport captures. No clipping or overlap was observed in those captures. At 1440px and 320px there was no horizontal overflow and zero broken images; at 320px the document scroll width was exactly 320px. Family receipt and Spanish inquiry also had no horizontal overflow at 390px. | PASS |
| Preview indexing | Request the selected Spanish inquiry with `Invoke-WebRequest`. | HTTP 200; `X-Robots-Tag: noindex, follow`; HTML robots metadata `noindex, follow`. This independently samples the universal policy; all-route assertions are in the full suite. | PASS |
| Frozen source | Compare every manifest entry with `Get-FileHash -Algorithm SHA256`. | 64 files checked, 0 mismatches, supplied fingerprint unchanged. | PASS |

## Browser and visual evidence

Actual routes visited: English family campaign, finder, selected book, selected thank-you, pricing; Spanish selected book, selected thank-you, and contact. Navigation used actual page links and controls rather than direct DOM state changes. The page was allowed to reach the expected URL before assertions.

Fresh unfilled viewport captures were produced and visually opened:

- Mobile family campaign: `C:\Users\Yonatan Levin\.agent-browser\tmp\screenshots\screenshot-1790257402101.png` (390×844).
- Desktop pricing: `C:\Users\Yonatan Levin\.agent-browser\tmp\screenshots\screenshot-1790257710867.png` (1440×900).

Those files are tool-temporary evidence. Durable project captures already supplied by the root remain in `artifacts/screenshots/`; this pass also opened and inspected `_en_pricing-390.png`. Its full-height image was scaled by the viewing tool, so detailed typography judgments rely on the fresh viewport captures rather than that reduced overview. No existing evidence file was overwritten.

The isolated QA browser was closed successfully. The root's server and other sessions were left running and unchanged.

## Other validation and limits

The consolidated QA evidence records 45 passing unit tests, 80 passing browser checks, 13 separately executed accessibility checks, a successful clean install/build/lint/typecheck, and expected live-mode rejection. The independent verifier also records its own bounded browser/test pass. These are reviewed upstream evidence, **not commands rerun by this QA agent**. The remaining acceptance criteria and cross-browser/no-JavaScript/zoom/RTL assertions are supported by those reports and suites, not silently claimed as newly executed manual checks here.

No numeric coverage percentage, full WCAG certification, native iOS/Android compatibility, in-app-browser behavior, live provider operation, field p75 performance, field INP, or hosted deployment behavior is established by this pass. Business/legal/commercial/translation approvals remain unresolved launch inputs. Human review of the visual direction remains appropriate.

## Issues and risk assessment

**No new BLOCKER, MAJOR, or MINOR defect was observed in this bounded independent pass.** No code fix is requested and no extra review cycle is warranted for the tested local prototype.

Previously recorded nonblocking items remain explicit:

- **MINOR / FRONTEND (reviewer LOW):** local WhatsApp click analytics labels the journey entry route rather than the current route. It does not affect the contextual dialog or send data externally. This pass read the review finding but did not inspect/reproduce the internal event payload. Recommended future verification: enter pricing, navigate to contact, open WhatsApp, and assert current route and entry attribution separately.
- **MINOR / REVIEWER, tooling ownership:** Lighthouse completed its reports and then exited 1 during Windows Chrome-profile cleanup (`EPERM`). This was not rerun here. Keep the nonzero command result disclosed; investigate cleanup before depending on that command as an unattended gate.
- **Launch performance limit:** the documented simulated LCP is 3.01–3.31s; field targets and native-device behavior remain unproven. Measure on the selected host and real devices before public launch.

Local prototype release risk is bounded by explicit mock-only behavior, provisional prices, noindex, and live-mode rejection. A public operational release is not approved by this report.

## GitHub issue update and next steps

Issue: N/A. Status: not updated. No Git repository, remote, linked issue, or PR exists. No issue, label, comment, or external message was created.

**READY FOR HUMAN APPROVAL of the local prototype.** Root can deliver the code, setup instructions, evidence, decisions, and launch checklist. Future public launch requires completion of the existing `docs/LAUNCH_CHECKLIST.md`, real integration implementation and validation, native-device testing, business/professional approvals, and explicit release authorization. Do not deploy from this QA verdict.
