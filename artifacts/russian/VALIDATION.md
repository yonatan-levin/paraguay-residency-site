# Russian preview release: factual QA evidence

The complete Russian version is published at [the existing Firebase preview](https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app/ru). It extends all 30 public routes and existing conversion journeys. The site now offers six languages. This report records the checks actually performed on 3 October 2026; it does not approve business launch.

## Release identity

- Application source: `c98b69f9b8ed8f2c300ede958a98a229f51dadf1`, local branch `feature/russian-locale`.
- Baseline: `8a7ff4da349e1d727f2c3c00e14f7f36e53a24fc`.
- Source fingerprint: `7707ff68cb382395abf8f3c9db320577b6b86365ba3adeee080f0961f0deb992`.
- All 123 application, test, asset and configuration files in the manifest matched the uploaded Firebase source archive, with zero mismatches.
- Cloud Build `329483a8-dbf5-47cd-ae12-830d99f5d089`: SUCCESS.
- Rollout `build-2026-10-03-001`: SUCCEEDED at `2026-10-03T13:27:28.278706Z`.
- Cloud Run `paraguay-prototype-build-2026-10-03-001`: ready and serving 100% of traffic.
- Machine-readable release and provider evidence: [publication/release.json](publication/release.json), [uploaded source comparison](publication/uploaded-source-verification.json), [Cloud Build](publication/cloud-build.json), [Cloud Run](publication/cloud-run.json), [rollout inventory](publication/rollouts.json).

## Verified results

| Check | Result | Evidence |
| --- | --- | --- |
| Complete Russian dictionaries | 478 common + 530 editorial values; zero missing/extra/empty values, placeholder mismatches or prohibited dash punctuation | [Dictionary audit](dictionary-audit.json) |
| Root full unit suite | 137 passed, 0 failed | [Unit output](test.txt) |
| Lint, types and production build | All passed; types/build repeated on the committed source | [Lint](lint.txt), [types](typecheck.txt), [build](build.txt) |
| Root full local browser suite | 315 passed, 0 failed; retries disabled; 1.3 minutes | [Local output](e2e-local.txt) |
| Root full hosted browser suite | 315 passed, 0 failed; retries disabled; 4.8 minutes | [Hosted output](publication/e2e-hosted.txt) |
| Additional hosted HTTP matrix | 24 routes across six languages passed status, language, direction, noindex header and canonical checks | [HTTP evidence](publication/http-checks.json) |
| Independent verification | VERIFIED: 121 unit checks, 49 browser checks, 16 independent baseline/head probes passed | [Verifier report](verifier/verification-report.md) |
| Independent review, cycle 1 | APPROVE_WITH_NITS; no BLOCKER/HIGH/MEDIUM finding; 83 independently run unit checks passed | [Review report](reviewer/review-report.md) |
| Independent local manual QA | PASS: 11 Russian routes, five widths, five assets and 25 screenshots | [Manual QA](qa/local-manual-qa.md) |
| Root hosted manual smoke | PASS: Russian/Hebrew draft round trip, guided plan/campaign preservation, mock success receipt, empty storage, no page/console errors, desktop/menu and mobile screenshots | [HE draft](publication/hosted-draft-he.json), [RU draft](publication/hosted-draft-ru.json), [receipt](publication/hosted-receipt.json) |
| Business launch boundary | Expected rejection remains; publication approvals and live services remain disabled | [Launch gate output](launch-boundary.txt) |

The browser suites include the public route/metadata matrix, Russian Why Paraguay and tax content, keyboard and accessibility checks, no JavaScript navigation, validation, mocked failures/retries/unavailable slots, family quote handling, private drafts, UTC appointment preservation and Hebrew direction changes. Existing English, Spanish, French, German and Hebrew checks remained in the suite. Chromium desktop/mobile and WebKit smoke coverage were retained.

The unit test asserting requested Russian support failed against the baseline before locale implementation: [red evidence](red.txt). The initial author validation also found a TypeScript assertion error and an ASCII apostrophe in a test lookup for a canonical curly-apostrophe key. Both test-only mistakes were corrected. The first full local browser run was 313 passed and 2 failed for that same lookup, recorded in [initial output](e2e-local-initial.txt); the subsequent complete run passed all 315. No product code was changed during the formal review cycle. The early focused frontend import log predates completed dictionaries and is retained as historical author evidence.

## Before and after

Before this release, the live `/ru` route returned 404 and the menu had five languages: [baseline HTTP](baseline-http.json), [before menu](before-language-menu.png).

After publication: [desktop Russian menu](publication/hosted-menu-1440.png), [mobile Russian home](publication/hosted-home-320.png), [hosted Russian receipt](publication/hosted-receipt-390.png). Additional local examples: [320px language menu](qa/language-320.png), [mobile pricing](qa/pricing-card-320.png), [qualified tax text](qa/why-tax-390.png), [Hebrew draft](qa/he-draft-390.png), [Russian receipt round trip](qa/receipt-roundtrip-390.png).

Local manual widths were 320, 390, 768, 1200 and 1440 CSS pixels. Root additionally inspected local and hosted screenshots rather than relying only on agent verdicts. The 11 generic screenshots generated by each root regression run were copied into this task's local/hosted evidence directories; the prior generic artifacts were restored. Browser sessions and the root local server were closed after use.

## Boundaries and follow-up

- Prices remain provisional USD values. Integrations remain local mocks. All preview routes retain noindex, and the sitemap remains empty. No billing, capacity, dependency, component, layout or external provider change was made.
- Native Russian and qualified legal/tax/commercial approval remain outstanding launch inputs. Semantic comparison preserved the accepted English qualifications; it is not professional certification. No physical device, screen reader or new performance benchmark is claimed. The existing mobile performance follow-up remains [issue #2](https://github.com/yonatan-levin/paraguay-residency-site/issues/2).
- One LOW review item is parked in [issue #14](https://github.com/yonatan-levin/paraguay-residency-site/issues/14): strengthen receipt language-switch tests with a counting mock gateway and stable receipt identity. The current browser assertion counts DOM submit events and cannot alone detect a future programmatic gateway submission. No duplicate submission was found in current production paths. Release tracking is in [issue #13](https://github.com/yonatan-levin/paraguay-residency-site/issues/13).
- The installed agent-browser standalone accessibility command was unavailable to the verifier. Existing Axe browser checks passed; no harness repair was attempted. Root corrected tool-only quoting/selector errors and reran affected hosted actions before recording final evidence.
- The GitHub repository is public, but this source branch has not been pushed or merged. Existing draft PR #6 remains unchanged. Firebase explicitly deployed the validated local source. Evidence-only commits after the application commit do not alter the deployed application.
- The unrelated pre-existing `artifacts/value-first/after/manual/agent-browser-doctor.txt` modification was preserved and excluded from commits. No default-branch landing occurred, so no new push-triggered security review was claimed.

Setup, architecture decisions, localization rules and launch requirements are maintained in [README](../../README.md), [localization](../../docs/LOCALIZATION.md), [decisions](../../docs/DECISIONS.md), [Firebase setup](../../docs/FIREBASE_HOSTING.md) and [launch checklist](../../docs/LAUNCH_CHECKLIST.md). Work status remains in GitHub rather than this evidence report.
