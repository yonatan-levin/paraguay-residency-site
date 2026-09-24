# Independent domain verification — 2026-09-24

MODE: VERIFICATION  
ROLE: VERIFIER  
Tier: S1  
Status: PARTIALLY VERIFIED (domain contracts pass; integrated website not yet verified)

## Scope and claim

Independent read-only verification of the domain, submission, mock gateway, analytics, SEO, and content slice against `docs/IMPLEMENTATION_PLAN.md` and handoff sections 6–13. The frontend was still in progress during this pass. No production source or test was edited by this verifier.

The working directory is `C:\Users\Yonatan Levin\Documents\Programming\Projects\paraguay-next\paraguay-residency-site`. `git status --short` returned `fatal: not a git repository`; there is no commit SHA against which to bind this pass and no recoverable original application baseline.

## Commands independently executed

| Check | Result | Evidence |
|---|---|---|
| `npm test` | PASS | Vitest 5.0.1: 3 files, 35 tests passed, 0 failed; run began 10:05:19 local machine time. |
| Scoped ESLint | PASS | ESLint exit 0 for `src/domain`, `src/application`, `src/infrastructure`, `src/content`, `src/config`, `src/lib`, and `tests/unit`; no diagnostics. |
| `npm run check:launch` | PASS (expected rejection) | Exit 1: local demo, missing approved HTTPS origin, brand/operator/contact/commercial/content/privacy/provider/translation approvals. No live launch claimed. |
| `npm test -- --coverage` | NOT MEASURED | Exit 1: `Cannot find dependency '@vitest/coverage-v8'`. No numerical coverage claim is made. |
| Typecheck / build / browser integration | NOT RUN in this pass | Frontend was still being completed. Root owns subsequent integrated verification. |

Commands used the discovered `C:\Program Files\nodejs\npm.cmd` / `node.exe` binaries and the absolute working directory above.

## Contract verification

| Contract | Finding |
|---|---|
| Provisional prices | The catalog contains the supplied integer minor-unit fixed/range seeds and quote-only additional services. All prices remain provisional and commercial approvals remain false. Formatting, fractional minor units, ranges, Spanish quote text, and missing inclusion state are exercised. |
| Safe navigation | Valid package IDs resolve to their owning service; invalid IDs are ignored and marked invalid. Generated navigation remains locale-prefixed and application-relative. Selected Guided context has the same catalog price in the accepted receipt. |
| Finder rules | Business/tax/property goals skip residency stage; temporary residents receive upgrade-basic; investment gets specialist discussion. Goal edits clear incompatible stage/support answers while retaining household/timing. Family/couple yields a quote flag; there is no household-price arithmetic. |
| Submission | The accepted payload, receipt and event are created only after gateway acceptance. Same-payload double submit and retry are keyed; changed payloads receive a different key. Pending remains pending after an invalid competing request, and a changed pending request is blocked. |
| Failure/recovery | Simulated unavailability, thrown adapter errors and past slots produce failure/unavailable results without a receipt or success event. Receipt starts empty; read/clear does not emit conversion. Returning to a previously accepted payload restores its receipt. |
| Minimal contact | Email conversation and country-code WhatsApp conversation are independently valid. Appointment requires email but never requires phone as well. Notes are bounded. Malformed instants and forged package IDs are rejected. |
| Time | Clock injection generates future UTC slots and rejects stale/unlisted bookings. UTC and America/Asuncion representations of the same instant are exercised. |
| Privacy boundary | Receipt does not contain the contact object. Analytics sanitizer copies only allowed fields/values and drops contact/free text/raw URLs. Attribution allowlists campaign fields and strips referrer queries. No storage, network provider call, console logging, or placeholder implementation was found in the checked pure/application/mock modules. This is a source-level conclusion; browser runtime request/storage inspection remains pending. |
| SEO gate | Demo always yields noindex and an empty sitemap. Approved-mode fixture checks origin, reviewed content, commercial status, locale completeness, and indexable route. Forms/campaign/receipt/draft policy routes are excluded. Spanish has its own canonical and reciprocal alternates; English-only accounting advertises no Spanish alternate. |
| Content | Source files contain distinct per-service descriptions, dependencies, steps and FAQs; the preparation guide is substantive and explicitly not a definitive legal checklist. Draft review state and unresolved professional responsibilities are visible in the source. No fabricated legal timelines, guaranteed outcomes, household total or published business contact was identified. The rendered Spanish experience remains a later browser check. |

## Test-first evidence limitations

The retained artifacts were read and contain genuine assertion failures against stub/earlier behavior:

- `unit-business-red.txt`: 11 failed / 1 passed.
- `unit-submission-red.txt`: 10 failed / 2 passed.
- `unit-seo-red.txt`: 6 failed / 1 passed.
- `unit-submission-edge-red.txt`: 2 failed / 14 passed.
- `unit-pending-red.txt`: 1 failed / 15 passed, specifically invalid submission changing a pending state.

These are implementer-recorded historical artifacts, not a baseline independently re-executed by this verifier. The original stub source was not retained in version control. The fresh current-head run is independently verified. The original business-red catalog test expected 18 items; current catalog has 19 because quote-only retirement support is included, so red/green counts are not evidence of an unchanged test set.

## Snapshot identifiers

SHA-256 digests of critical files inspected after the fresh tests:

| File | SHA-256 |
|---|---|
| `src/application/submission.ts` | `0A63DD24911CECE52E2B9EFCC9388602FA15F1D648A542C464ADF7F10AE1D71D` |
| `src/domain/finder.ts` | `882D6CACEFF78ADC32ECF39833D07636070C20FD16298049E941CFE4212299DF` |
| `src/domain/selection.ts` | `B9630D143596ADBDD299B82F1874A855AD2035D92DBC2DE7741A38F383B43580` |
| `src/lib/seo/metadata.ts` | `B4C2A29DBBE5196D2936B4A01E656A0AA17EE04E08E60F7DBAC4B04EE18F99BE` |
| `tests/unit/submission.test.ts` | `B5AD2767F2D066963270FBD01366CB55285321D45CC21D2FB7D0C427957EB9CE` |

## Verdict and handoff

No concrete defect was found in the checked domain slice after the implementer's pending-state correction. This does not verify complete frontend behavior, locale switching in the browser, absence of persistent browser data, responsive behavior, no-JavaScript fallbacks, rendered headers, build health, accessibility or coverage percentage. Those remain required integrated checks.

No GitHub issue update: no Git repository, remote or issue exists for this local prototype at this stage. No deployment performed.

HANDOFF_TO: HUMAN (root orchestrator for integrated VERIFIER → REVIEWER → QA sequencing)
