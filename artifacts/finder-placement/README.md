# Finder placement verification

The existing Find my plan link is now the primary homepage hero action and is absent from the shared header. Package comparison remains beside it; benefits and consultation remain directly below. Existing translations, journey links, mobile conversion bar and page section order are reused without changing business rules, prices or providers.

Baseline: `d7affae4a90dc2370d21bab50f9a2c2e7d658dc9`. Build: `TODsCg95fGXB6l3yUcRQm`. Tested source SHA256: `123ff6739ee122dc7738ea8e670533fa0be4d8128b95f8ac9096c415d346d02a`, 115 files; [final recheck](final-fingerprint-check.json) found no mismatches. The local commit is recorded in [issue #11](https://github.com/yonatan-levin/paraguay-residency-site/issues/11). Evidence was captured September 26, 2026 in America/Asuncion, September 27 UTC.

| Check | Observed result |
|---|---|
| Test first placement check | [Baseline failure](frontend-red.txt): hero finder absent before the change |
| Main agent full unit suite | [130 passed](unit-tests.txt), 0 failed |
| Main agent full browser suite | [267 passed](browser-tests.txt), 0 failed, including ten new locale/viewport placement cases and existing accessibility regression |
| Main agent build, lint and types | All exit 0: [build](build.txt), [lint](lint.txt), [types](typecheck.txt) |
| Independent verification | [VERIFIED](verifier.md): 19 focused unit tests, 35 browser tests and scoped lint passed |
| Independent review | [APPROVE](reviewer.md), no HIGH/MEDIUM findings |
| Independent QA | [PASS](qa.md): German mobile keyboard entry retains package and campaign; visible supporting actions, no overflow or observed browser errors |

All gates passed in cycle 1. Focused reruns overlap the full suite and are not extra unique test counts. The main agent independently read the diffs, reports and screenshot evidence, reran the full tests and checked Git state. The old doctor artifact remains unrelated and untouched.

## Visual comparison

| View | Before | After |
|---|---|---|
| English desktop, 1440 × 900 | [Before](before-desktop.png) | [After](after-desktop.png) |
| English mobile, 390 × 844 | [Before](before-mobile.png) | [After](after-mobile.png) |
| Hebrew mobile, 320 × 844 | Earlier layout is documented by the baseline above | [RTL after](after-hebrew-320.png) |

The English captures use `/en?service=temporary-residency&plan=temporary-essential`. The Hebrew capture uses `/he?plan=temporary-essential&campaign=residency-cost`. The root's manual English click reached the finder with the Essential selection retained; a later Hebrew DOM check found width 320 with no overflow and zero header finder links. [Manual output](manual.txt) retains an unsuccessful stdin probe and an early URL observation; only the completed navigation and successful subsequent DOM probe are treated as evidence. QA's separate German keyboard observations and images are linked from [its report](qa.md).

No physical-device, conversion-uplift, native zoom or new performance measurement is claimed. The optional additional agent-browser CLI axe command was unavailable and is recorded as NOT RUN; the existing repository accessibility tests passed within the full browser suite. No harness change was attempted. Coverage percentage remains unmeasured. Earlier business, professional-content and performance launch requirements are unchanged.

No push, PR update, deployment or live service activation is included. Preview mode and noindex remain intact. The current checkout and local server remain available for review; cross-project regression is not applicable to this two-component change. Navigation contracts were updated in `docs/ROUTES_AND_SEO.md` and `docs/VALUE_FIRST_PLAN.md`.
