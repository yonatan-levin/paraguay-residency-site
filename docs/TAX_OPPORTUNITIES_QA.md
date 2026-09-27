# Tax opportunities verification evidence

This report covers the local S1 tax messaging refinement in [issue #10](https://github.com/yonatan-levin/paraguay-residency-site/issues/10), on top of the benefits update. It does not describe the hosted site's current revision or approve publication. Research, source links and claim boundaries are in [the specification](TAX_OPPORTUNITIES_SPEC.md).

## Artifact identity

- Before revision: `14af4aefd7321fbea074c0da6218536e252abf0b`.
- Tested source SHA256: `4cc4e922a1b805048e9e29dd04ee5b502cc7e6d1549638dded974be702d59ad5`, covering 114 application, test, configuration and asset files in [the manifest](../artifacts/tax-opportunities/source-manifest.json).
- Production build: `o-lKvcROyw9eIxuZzFLfd`, served locally at `http://127.0.0.1:52942`.
- Evidence captured on September 26, 2026 in America/Asuncion; some machine timestamps are September 27 UTC. The issue closure record identifies the local commit containing these exact source bytes.

## Changed behavior

The homepage now leads with the value of an international income plan. Why Paraguay and the existing tax, US company and Paraguay company pages explain the conditional foreign dividend opportunity, the separate US LLC case and ordinary Paraguayan company taxation. Conditions and official references sit beside the examples. New copy and metadata are available in English, Spanish, French, German and Hebrew, using the existing localization system and RTL layout.

Informational navigation keeps the selected package and campaign. Explicit service inquiries reuse the existing scope change notice when a package is incompatible. The tax comparison's consultation action opens booking. Prices, catalog, providers, state rules and deployment configuration were not changed.

## Automated and independent evidence

| Check | Observed result | Evidence |
|---|---|---|
| Test first claim and SEO cases | 27 failures before implementation, followed by passing implemented rules | [Red cases](../artifacts/tax-opportunities/claim-tests-red.txt), [claim green run](../artifacts/tax-opportunities/claim-tests-green.txt) |
| New rendered content and conversion action | New heading and booking action absent on the baseline, present on the final artifact | [Heading baseline](../artifacts/tax-opportunities/frontend-red.txt), [conversion baseline](../artifacts/tax-opportunities/tax-conversion-red.txt) |
| Full unit suite, run by main agent | 130 passed, 0 failed, 8 files | [Unit log](../artifacts/tax-opportunities/unit-tests.txt) |
| Full browser regression, run by main agent | 257 passed, 0 failed; Chromium desktop/mobile and WebKit projects | [Browser log](../artifacts/tax-opportunities/browser-tests.txt) |
| Lint, types, production build | All exit 0 | [Lint](../artifacts/tax-opportunities/lint.txt), [types](../artifacts/tax-opportunities/typecheck.txt), [build](../artifacts/tax-opportunities/build.txt) |
| Independent verifier | VERIFIED: baseline reproduced, 61 focused unit and 8 focused browser tests passed; 25 localized initial HTML pages checked; all 114 file hashes matched | [Verifier report](../artifacts/tax-opportunities/verifier/verification.md) |
| Independent code review | APPROVE in cycle 1, no product findings | [Review report](../artifacts/tax-opportunities/reviewer.md) |
| Independent browser QA | PASS in cycle 1, no product findings; detailed scope and limits below | [QA report](../artifacts/tax-opportunities/qa/qa.md) |
| Launch rejection | Expected exit 1: demo configuration and draft professional/locale approvals correctly prevent launch | [Launch gate](../artifacts/tax-opportunities/launch-gate.txt) |

Focused verifier tests overlap the full suite; they are independent reruns, not extra unique test counts. Claim tests check each required source, review state, locale approval and page declaration. A green engineering check never changes draft approval records.

## Changed surface browser QA

QA used agent-browser as the only active manual browser session. An earlier concurrent manual run had unexpected navigation, so the campaign journey and all final after captures were repeated in isolation. The main agent independently read the recorded URLs and measurements and inspected the English structure and Hebrew dividend screenshots.

| Check | Observed result | Evidence |
|---|---|---|
| Package, campaign and language journeys | Why to US information to German to booking preserves the residency package and campaign, including refresh. Hebrew mobile pricing retains both. Four compatible/incompatible US and tax inquiry combinations use the existing retention or explained replacement behavior | [17 recorded observations](../artifacts/tax-opportunities/qa/journeys.json) |
| Responsive matrix | 25 combinations: EN/ES/FR/DE/HE at 320, 360, 390, 768 and 1440 CSS pixels. No horizontal overflow, hidden tax qualification disclosure or hidden action found | [Measurements](../artifacts/tax-opportunities/qa/responsive.json) |
| Accessibility scans | 8 scans: five Why locales and the three English service pages; 0 violations. Each scan returned the same mobile menu glyph contrast incomplete | [Scan summary](../artifacts/tax-opportunities/qa/axe-summary.json) |
| Incomplete contrast review | Visible, named menu glyph checked against computed opaque header colors on all eight routes; ratio 13.70:1. The automated incomplete entries are retained in the raw evidence | [Computed colors and review](../artifacts/tax-opportunities/qa/contrast-review.json) |
| Equivalent 200% reflow | EN/DE/HE financial sections at a 720 × 450 CSS viewport with device scale factor 2, representing 1440 × 900 at 200%. Cards remain rendered with no horizontal overflow; this is not native browser zoom | [Measurements and model](../artifacts/tax-opportunities/qa/zoom.json) |

[Browser diagnostics](../artifacts/tax-opportunities/qa/diagnostics.json) record 0 console messages, 0 page errors and 0 HTTP statuses of 400 or above across 829 local requests. Five prefetch requests have no recorded response status, so their completion is unknown. That network capture ends before the separate menu contrast follow-up and final detail screenshot framing adjustment. No customer data was entered or submitted.

## Before and after

Both sets use the same routes and viewport dimensions. Full page image heights differ because the comparison adds content; the financial section pair is a viewport crop. [Before manifest](../artifacts/tax-opportunities/before/manifest.json) and [after manifest](../artifacts/tax-opportunities/after/manifest.json) bind the captures to their artifacts.

| Surface | Before | After |
|---|---|---|
| English homepage, 1440 × 900 | [Before](../artifacts/tax-opportunities/before/en-home-desktop.png) | [After](../artifacts/tax-opportunities/after/en-home-desktop.png) |
| English Why Paraguay, 1440 × 900 | [Before](../artifacts/tax-opportunities/before/en-why-desktop.png) | [After](../artifacts/tax-opportunities/after/en-why-desktop.png) |
| Financial section, 1440 × 900 | [Before](../artifacts/tax-opportunities/before/en-why-financial-desktop.png) | [After](../artifacts/tax-opportunities/after/en-why-financial-desktop.png) |
| English tax service, 1440 × 900 | [Before](../artifacts/tax-opportunities/before/en-tax-desktop.png) | [After](../artifacts/tax-opportunities/after/en-tax-desktop.png) |
| English US company service, 1440 × 900 | [Before](../artifacts/tax-opportunities/before/en-us-desktop.png) | [After](../artifacts/tax-opportunities/after/en-us-desktop.png) |
| English Paraguay company service, 1440 × 900 | [Before](../artifacts/tax-opportunities/before/en-py-desktop.png) | [After](../artifacts/tax-opportunities/after/en-py-desktop.png) |
| Hebrew Why Paraguay, 390 × 844 | [Before](../artifacts/tax-opportunities/before/he-why-mobile.png) | [After](../artifacts/tax-opportunities/after/he-why-mobile.png) |

## Limits and launch conditions

- DNIT consultation 380 is nonbinding and fact specific. US income tax treatment, Paraguayan income sourcing, company classification, tax residence and continuing filings require qualified review. No combined worldwide zero tax result is established.
- All professional, operator and native language approvals remain pending. Complete translated strings and engineering review do not constitute those approvals.
- Coverage percentage is unmeasured: no coverage provider or threshold is configured. No dependency was installed to manufacture a percentage.
- Physical mobile devices, native browser zoom, participant comprehension and conversion uplift were not measured. Emulated browsers and viewport checks are described only as such.
- Lighthouse was not rerun for this increment. The preceding benefits update recorded English homepage 91 then 79 on repeat; pricing 92 and family campaign 93. Consistent 90 performance remains unproven under [issue #2](https://github.com/yonatan-levin/paraguay-residency-site/issues/2).
- All previews retain noindex; prices remain provisional and providers mocked. No code push, PR update, deployment or live service activation is included. The earlier public preview is unchanged.

## Scope and closure

The main agent independently ran the full tests, read the changed content and review evidence, and checked Git status and the existing PR identity. The [final source recheck](../artifacts/tax-opportunities/final-fingerprint-check.json) found no mismatches across 114 files. All three independent gates passed in cycle 1. The original unrelated modification to `artifacts/value-first/after/manual/agent-browser-doctor.txt` was preserved and excluded from the scoped commit. No new out of scope product finding was identified.

This increment uses the existing checkout and branch; neither is removed while needed for local review. Workspace and cross-tool regression tiers do not apply because no published API contract, orchestrator or other project changed. Publication and landing remain outside the authorized scope. Setup remains in [README](../README.md), system decisions in [DECISIONS](DECISIONS.md), and remaining launch requirements in [the launch checklist](LAUNCH_CHECKLIST.md).
