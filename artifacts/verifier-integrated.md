# Integrated independent verification — 2026-09-24

MODE: VERIFICATION  
ROLE: VERIFIER  
Tier: S1  
Status: VERIFIED — functional local prototype, subject to the explicit measurement limits below

## Claim and exact artifact

The implementation completes the handoff's local website journeys, preserves package/family/finder context, keeps prices provisional, uses local integrations only, and prevents preview indexing. This pass independently checks the integrated implementation; it does not authorize deployment or approve commercial/legal content.

Final source manifest: `artifacts/source-manifest.json`  
Source SHA-256: `9b6d17285fa1cd9165ed33ce115efa6b0790bb5ad19baaac33bd4ae8736f322e`  
Manifest entries: **64**, independently re-hashed with **0 mismatches** before the final test run.

No Git repository or recoverable pre-implementation application exists in this workspace. This report binds to file hashes rather than a commit SHA. All tests targeted the local production server at `http://127.0.0.1:3000`. The verifier did not modify production source, install packages, rebuild or restart the shared production server.

## Independently executed final checks

| Check | Result | Evidence |
|---|---|---|
| `npm test` | PASS | **45 passed, 0 failed**, 3 files; fresh final-snapshot run began 10:35:24 machine-local time. |
| `npm run typecheck` | PASS | Next route type generation and `tsc --noEmit` exited 0. |
| `npm run lint` | PASS | Full-project ESLint exited 0, no errors or warnings. |
| Final bounded browser regression | PASS | **19 passed, 0 failed** in 8.0 seconds: 16 Chromium journey/finder/smoke checks and 3 WebKit smoke checks. `artifacts/verifier-final-browser-run.txt`. |
| Source-manifest comparison | PASS | Every listed source file's independently computed SHA-256 matched its recorded hash. |

Browser command (from the application directory):

```text
node node_modules/@playwright/test/cli.js test journeys.spec.ts finder.spec.ts smoke.spec.ts --project=chromium --project=webkit --reporter=line --output=artifacts/verifier-final-browser-output
```

The actual invocations used absolute executable and application paths. The output directory is isolated from the root's full-suite evidence. No screenshots, videos or traces of contact-filled pages were generated.

The final production-build log was inspected in `artifacts/build.txt`; it records a successful optimized build including locale routes, icon, robots and sitemap. Root also independently recorded **80/80** full browser tests in `artifacts/e2e-run.txt`. Those are separately identified evidence; this verifier did not re-run the full 80 or rebuild the application merely to repeat an already running production build.

## Functionality and safeguards

| Area | Verified behavior |
|---|---|
| Selected plan and price | Guided remains selected with its central provisional USD price through pricing, inquiry and accepted demo receipt. Invalid IDs recover safely. Switching pricing journeys removes an incompatible selected package. |
| Finder branching | Existing temporary resident receives upgrade support. Business goals skip residency questions. Changing a deep-linked goal clears incompatible plan state. |
| Family context | Campaign defaults are editable; Back preserves answers. Family result remains quote-only through inquiry and receipt, with no invented household total. |
| Final finder-result correction | Source now records `finderResult` at completion, carries it into matching lead context/receipt, and clears it when goal, package or journey becomes incompatible. Final browser assertions verify finder-origin context on inquiry/receipt and its absence after incompatible edits. |
| Locale context | English-to-Spanish switching retains valid selected plan, non-campaign family quote and the in-memory draft. Spanish validation and WhatsApp-only callback work. Unsupported Spanish accounting and Hebrew routes return real 404 responses. |
| Submission states | Invalid, pending, success, failure, unavailable and retry behaviors pass. Failed requests preserve inputs; retry can succeed. Duplicate identical submissions generate a single accepted receipt/event set. Changed payloads get different idempotency keys. |
| Time | Injected-clock unit tests prove future UTC slots and equivalent zoned display. Browser appointment flow retains the selected instant when changing zones, shows the zone explicitly, and recovers from unavailable time. |
| Receipt integrity | Direct or refreshed confirmation shows neutral recovery. Receipt reads do not create events. Successful receipts contain non-personal context and the selected price, without the contact object. |
| Phone fix | Final source normalizes permitted separators and counts actual digits, rejecting punctuation-only padding. The 10 new phone cases are included in the fresh 45-test run. An earlier agent-browser check on the preceding snapshot independently rejected `+1------` in the UI. The same final validation code and cases pass here. |
| Local integrations | WhatsApp opens an explicit unsent preview with package context. Browser request inspection shows no external provider traffic. The submission/analytics modules contain no provider requests, persistent storage writes, contact logging or raw-markup rendering. |
| Provisional offers | Prices originate from the integer-minor-unit catalog and remain provisional. Unapproved business contacts, professional identity and live delivery claims are not invented. |
| Preview SEO | Final Chromium and WebKit smoke confirm the robots header and metadata remain noindex and canonical URLs omit plan/tracking parameters. Invalid/unpublished routes return 404. |
| No-JavaScript content | Final Chromium and WebKit tests read the homepage, follow ordinary navigation and find the Guided card/price on pricing with JavaScript disabled, including after the final code split. |

## Separate privacy / HTTP checks

On the immediately preceding production snapshot (`d0b15150bf8a0112bd141d7e7e9d541cecd80468969c6308449112c09f92c637`), the verifier used the required agent-browser skill and an isolated named session to:

1. Submit a punctuation-padded phone number and observe the field error.
2. Enter synthetic test details, switch to Spanish, and complete a local receipt while preserving Guided and the same USD amount.
3. Inspect browser state after the flow: local storage keys `[]`, session storage keys `[]`, cookies empty, external resource origins `[]`.
4. Inspect observed requests: only local GET requests; no personal data in the receipt URL and no external provider request.
5. Close the verifier-owned browser session.

The current final code still uses the same in-memory draft/receipt and local adapter boundaries. Final browser suites independently repeat conversion, locale, failure, family-context, WhatsApp and no-JavaScript behaviors. The manual storage inspection is identified as preceding-snapshot evidence rather than falsely presented as a repeated final-snapshot measurement.

Independent HTTP checks on that preceding build confirmed meaningful homepage/pricing HTML without JavaScript; `noindex, follow` headers on 200 and 404 responses; actual 404 status for an unknown English path, `/es/accounting`, and `/he`; and an empty sitemap with no `<loc>` entries. The final smoke suite repeats the relevant noindex, canonical, 404 and no-JavaScript contracts.

## AC-16 approved-mode fixture is distinct from preview checks

Fresh unit tests exercise a synthetic, fully approved runtime and page record. They verify:

- A Spanish page uses its own Spanish canonical.
- English, Spanish and `x-default` alternates point only to genuine complete equivalents.
- English-only accounting does not advertise a Spanish alternate.
- Indexability is denied when origin, content review, required commercial approval, locale completeness or route eligibility is missing.
- Forms, finder results, receipts, campaigns and draft policy routes do not enter the approved-mode sitemap.

This does **not** establish a live deployment, approved business content or actual production indexing. The running prototype remains noindex. The launch-validation command's expected rejection was independently observed during the earlier domain pass; the final source retains the demo-only runtime and explicit configuration block on live mode.

## Responsive / quality evidence and limits

- Root's final 80-test record includes 320, 360, 390, 768 and 1440 CSS-pixel reflow, automated accessibility, keyboard/focus/dialog behavior, an RTL fixture and emulated 200-percent zoom. The verifier read these assertions and inspected the unfilled 390-pixel pricing and booking screenshots from the preceding snapshot; no clipped form fields or overlapping cards were visible. Independent final bounded browser runs do not replace the separate QA visual pass.
- The final dynamic component boundary retains server rendering; the fresh no-JavaScript tests prove that the payload split did not turn marketing/pricing into an empty JavaScript-only shell.
- Numerical line/branch coverage is **not measured**. The earlier coverage probe failed because `@vitest/coverage-v8` is absent. This report makes no percentage claim; the implementation plan prioritizes the explicit behavioral contracts and supplies no repository coverage threshold.
- Historical RED artifacts document original stubs and later edge regressions. They were inspected, not independently rerun from a version-controlled baseline, which does not exist. See `artifacts/verifier-domain.md` for details.
- Lighthouse performance is a separate measurement. The verifier independently read the final `artifacts/lighthouse/summary.json` after root completed the measurement on this unchanged snapshot. Final performance scores are **93 home / 95 pricing / 92 campaign**, meeting the 90 aim; all three record **100 accessibility**, **100 best practices**, and **CLS 0**. Headless Chrome 153 used mobile emulation at 412×823 CSS pixels and device scale 1.75. Simulated LCP is **3.17 / 3.01 / 3.31 seconds**, so a 2.5-second field LCP target is not established. Preview SEO scores **69 / 66 / 69** retain the intentional noindex penalty; approved-mode policy fixtures are verified separately above.
- The Lighthouse command itself exited **1** after writing the complete reports because Chrome-launcher could not delete a temporary profile on Windows (`EPERM`, `rm`). The verifier read that failure in `artifacts/lighthouse-run.txt`. This is a recorded cleanup failure, not a successful command exit; it does not erase the generated measurements. No cleanup or source fix was performed by this verifier.
- Native iOS/Android, social in-app browsers, actual browser zoom UI, real-user field performance, production p75 metrics, live provider integrations and commercial/legal approval are **not proven**.

## Verdict

**VERIFIED for the functional local prototype on the identified final source snapshot.** No unresolved functional failure was found in the final independently executed checks. Proceed to the separately owned REVIEWER and QA gates; retain performance and measurement limitations in the delivery report. No deployment was performed or authorized.

GitHub issue update: N/A — no repository remote or tracking issue exists for this local prototype.

HANDOFF_TO: REVIEWER (dispatch remains with the root orchestrator)
