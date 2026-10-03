MODE: CODE_REVIEW
ROLE: REVIEWER
Tier: S1
Review cycle: 1
Verdict: APPROVE_WITH_NITS

## Scope and identity

Reviewed the 28-file diff from `8a7ff4da349e1d727f2c3c00e14f7f36e53a24fc` to `c98b69f9b8ed8f2c300ede958a98a229f51dadf1` against `docs/RUSSIAN_LOCALIZATION_SPEC.md` and issue #13. This verdict covers the Russian locale extension for the authorized noindex, mock-only demo. It does not grant business publication, qualified legal/tax approval, native Russian certification, or permission to merge the default branch.

Final HEAD was independently read as `c98b69f9b8ed8f2c300ede958a98a229f51dadf1`. The tracked source, tests, assets, scripts, docs, README and build/package configuration had no working-tree differences from HEAD. Task evidence and the pre-existing unrelated `artifacts/value-first/after/manual/agent-browser-doctor.txt` change remain outside product scope and were preserved. The parent/verifier supplied source fingerprint is `7707ff68cb382395abf8f3c9db320577b6b86365ba3adeee080f0961f0deb992`; this reviewer used the exact Git commit and tracked-file comparison for its own identity check.

## Findings

No BLOCKER, HIGH or MEDIUM finding. One LOW test-evidence improvement is parked for separate work; it does not block the authorized demo or the subsequent QA pass.

| Severity | Location | Type | Finding and smallest safe improvement |
| --- | --- | --- | --- |
| LOW | `tests/e2e/russian-journeys.spec.ts:69` (assertion at line 95) | Test precision | `recordSubmission` observes DOM `submit` events. A future programmatic submission from a receipt or locale effect would not emit that event, so the count could remain one even if the gateway were called again. Keep this assertion as a UI-event check and add an assertion at the existing controller/mock gateway seam that the accepted receipt retains its identity and there is exactly one submission across the locale round trip. A component/integration test can supply a counting mock; no live endpoint or product instrumentation is needed. Current production submission and receipt paths are unchanged, and this review found no duplicate call in them. Suggested parked issue: `parked: assert gateway idempotency across receipt locale switches`. |

## Review evidence

- Read all 478 common and 530 editorial Russian values alongside their complete canonical English keys. No material condition was omitted or broadened. Preserved qualifiers include nonbinding and fact-specific DNIT consultation, potential rather than universal 0%, foreign dividend versus LLC distribution, source versus payment location, US citizenship/tax residence and effectively connected income, the LLC corporate election, filing/state/other-country obligations, 10% IRE on net taxable income, and separate immigration residence, tax residence and company ownership.
- The same inspection confirmed provisional USD offers, quote-only family handling, exclusions, independent government/bank decisions, no guaranteed citizenship or processing date, privacy limitations, test-data guidance, no invented operator/professional identity, and mock-only confirmations. This is semantic preservation against the accepted English source, not a new determination of legal accuracy.
- Reviewed locale registration, route projection, common/editorial dictionary imports and affected formatter/metadata/approval consumers. Russian is `ru`, native label `Русский`, `ru-RU`, LTR and `ru_RU`; the internal fixture remains English-only. Content completeness does not change the draft publication approvals. No dependency, provider, controller, root state, component, CSS, numerical price, runtime or deployment configuration change was introduced.
- Reviewed the changed route, locale, finder, unit and Russian journey tests. Coverage includes explicit Russian acceptance, whole-key and placeholder parity, nonempty values, punctuation, missing-copy failure, invalid locales, metadata/approval controls, localized failure/retry, family/campaign/private draft preservation, Hebrew direction transitions, selected UTC instant, no-JavaScript navigation, accessibility, reflow and local WhatsApp behavior. Existing controller tests cover concurrent submission, retry and receipt behavior; the LOW finding above concerns the additional browser assertion's narrower evidence.
- The delegated artwork/documentation subreview inspected all four PNGs with `view_image`, reviewed the SVG and generator additions, and read the six reference-document diffs. It found readable Cyrillic, no clipping or invented price/outcome, retained demo qualifiers, no executable/external SVG reference, and consistent documentation. The source/generator diff was also reviewed here; rendered hero and mobile-menu QA remain part of the next QA gate.
- Security: the added dictionaries are plain rendered text and preserve existing escaping/interpolation boundaries. No new persistence, network destination, sensitive payload, authorization surface or live integration was added. Performance: the additional common dictionary follows the existing bounded client dictionary pattern, while long editorial content stays server-only; no new loop, query or network path was added.

## Independently executed validation

Command, with repository working directory `C:\Users\Yonatan Levin\Documents\Programming\Projects\paraguay-next\paraguay-residency-site`:

```text
C:\Program Files\nodejs\node.exe <repo>\node_modules\vitest\vitest.mjs run tests/unit/translations.test.ts tests/unit/locales.test.ts tests/unit/content-review.test.ts tests/unit/seo.test.ts --reporter=json --outputFile=<repo>\artifacts\russian\reviewer\focused-unit.json
```

Result: **83 passed, 0 failed, 0 pending**, across four files. Evidence: `focused-unit.json`. `git diff --check <base> <head>` also passed. The final tracked-file check described above was clean.

The verifier's separate report records 121 unit checks, 49 browser checks and 16 baseline/head probes. Root owns the full lint/type/build/regression run. These were inspected as corroborating evidence and are not claimed as rerun by this reviewer. Coverage percentage was not measured; the accepted contract and current Vitest configuration contain no percentage gate. No build, server, browser suite, provider, deploy, commit or push was started by this reviewer.

## Next step

Proceed to QA on the reviewed commit, then follow the existing demo publication authorization and hosted verification gate. The change is suitable for commit/PR from a code-review standpoint; the optional LOW improvement should be recorded separately, not added to this review cycle. Native Russian and qualified legal/commercial approval remain explicit business-launch inputs.

## GitHub Issue Update

- Issue: #13
- Status: not updated by this reviewer; root/SCRIBE owns bookkeeping.
- Actions taken: none.
- Proposed update: log `APPROVE_WITH_NITS` for the exact reviewed SHA, transition review to QA, include the preserved content/privacy/approval boundaries and 83/0 focused result, and open the LOW parked test-evidence issue with the location and minimal suggestion above.

HANDOFF_TO: QA
