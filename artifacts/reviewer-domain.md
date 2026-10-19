# Domain and tooling review — initial scoped pass

MODE: CODE_REVIEW
ROLE: REVIEWER
Tier: S1

## Verdict

REJECT for one MEDIUM input-validation defect. This verdict covers only the frozen domain/content/tooling slice. Frontend route composition, client journey state, live browser behavior, build, and full integration remain outside this pass.

There is no Git repository or original implementation baseline in the supplied workspace. All reviewed implementation files are new additions. Both root and app Git checks returned "not a git repository"; the submission file was also inspected as a no-index addition against /dev/null. No source files were changed by this review.

## Finding

| Severity | Location | Evidence and impact | Minimal correction |
|---|---|---|---|
| MEDIUM | src/application/submission.ts:22 | WhatsApp callback validation counts separators toward the minimum length. Direct execution of validateSubmission accepted both `+1------` and `+595 ()----` with `success:true`. The UI can therefore accept an unusable callback number, contrary to the required contact-channel contract. Existing tests reject a missing plus sign but do not exercise punctuation-only or insufficient-digit values. | Normalize the permitted display separators, validate the resulting international digits rather than formatted character length, and add regression cases for insufficient digits and separator-only tails. Retain ordinary formatted international numbers. |

No HIGH or CRITICAL findings were found in this slice. No optional nit is raised as a blocker.

## Reviewed scope

- src/domain/{types,pricing,selection,finder,attribution}.ts
- src/application/submission.ts
- src/infrastructure/mock/gateways.ts
- src/lib/analytics/events.ts and src/lib/seo/metadata.ts
- src/config/{runtime,routes,brand}.ts
- src/content/{catalog,service-details,guide}.ts
- package.json, next.config.ts, eslint.config.mjs, vitest.config.ts, playwright.config.ts
- scripts/{check-launch,lighthouse,render-social-assets}.mjs
- tests/unit/{business,submission,seo}.test.ts
- Authoritative handoff and implementation plan

## Independent checks

- `npm test`: 3 files, 35 tests passed.
- Scoped ESLint command covering the files above and unit tests: exit 0, no warnings/errors.
- `npm run check:launch`: exit 1, expected. Demo mode and all missing owner approvals are reported explicitly.
- Actual schema reproduction through Vite module loading: invalid WhatsApp values above accepted (finding).
- Catalog probe: 19 packages, 14 services; all package owning-service references valid; fixed/range values nonnegative integer minor units.
- Finder probe: all 54 goal/stage/support combinations resolve to existing coherent service/package IDs.
- Calendar probes at year-end, leap day, and a daylight-saving boundary: only unique future UTC slots generated.
- Source inspection: price fixtures match the handoff; family recommendations carry quote flags rather than household totals; note/contact data stay outside emitted event properties; accepted retries restore the matching receipt; integrations contain no provider requests.
- SEO/runtime inspection: demo pages and sitemap are fail-closed; live mode cannot be enabled by an environment toggle; source-review and commercial-approval flags remain independent.
- Content inspection: service scopes are distinct and provisional; no invented eligibility threshold, government timeline, credential, review date, guaranteed tax/banking result, or property-management calculator was added.

## Limits and next step

BACKEND should address the phone-validation defect test-first. Re-review the changed validation and tests, then complete the integrated frontend review after its verifier finishes. No whole-feature approval, commit/PR approval, deployment approval, or coverage percentage is claimed by this scoped pass.

HANDOFF_TO: BACKEND

# GitHub Issue Update

- Issue: N/A
- Status: not updated
- Actions taken: none; this supplied workspace has no Git repository or linked issue.
- Proposed update: none until a repository/issue exists; the parent owns any later tracking.
