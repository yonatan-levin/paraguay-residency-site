# Selection transition verification

Checked on 2026-09-26. Reviewed application source: `3d4061dc30affef67728d6e59a69432903be1b2c`.

This evidence covers the additional focused validation cycle authorized by the owner in [issue #7](https://github.com/yonatan-levin/paraguay-residency-site/issues/7#issuecomment-5840477447). The earlier three-cycle stop remains part of the historical evidence. The reviewer connection failed before a verdict and was successfully retried; that interruption was not a code review rejection.

## Reproduction and change

The prior Firebase source `a89512521040b0313b3c671c54ef18e4f2f22ac8` passed 219 hosted browser checks and failed three. Pricing and finder choices updated in memory while their previous URL selection still supplied conversion links during asynchronous navigation. Immediate booking could therefore retain an incompatible package.

Tests were written before changing production code. Holding same-page navigation responses produced six expected failures and one passing no-JavaScript preservation check on the baseline. A further modified-click test failed before moving link side effects to Next.js `onNavigate`.

An explicit choice, including an empty or campaign-only selection, now supplies links immediately while its old URL is still active. Navigating away retires that override; explicit URL selections again govern deep links and Back/Forward. Pricing derives its displayed journey from the same effective selection. Opening a package link in another tab does not change the original tab's selection. No persistent storage, provider integration, price, translation, or hydration guard was changed.

## Local verification

| Check | Result |
| --- | --- |
| New deterministic transition tests | 8 passed |
| Full local browser suite | 230 passed, 0 failed in 1.0 minute, zero retries |
| Independent focused verification | 49 passed, 0 failed in 20.6 seconds |
| Unit tests | 65 passed, 0 failed |
| Lint, type checking and optimized build | PASS; independently rerun by root |
| Independent code review | APPROVE; no HIGH/MEDIUM findings or new parked items |
| Diff whitespace check | PASS |

GitHub CI independently passed for this source: [pull request run](https://github.com/yonatan-levin/paraguay-residency-site/actions/runs/36272438971) and [push run](https://github.com/yonatan-levin/paraguay-residency-site/actions/runs/36272436076).

The new cases cover immediate pricing navigation at 1440 and 390 pixels; finder clearing with and without a family campaign; header and language links; rapid successive choices; explicit history restoration; retained contact drafts; no-JavaScript deep links; and modified clicks. Existing journey, Hebrew and delayed-hydration tests retain their assertions. The root independently inspected the implementation and red/green logs.

## Hosted verification

The root independently ran the complete suite against the Firebase origin on the reviewed source: **230 passed, 0 failed, 0 retries in 3.2 minutes**, process exit 0. This includes all three previously failing cases and the eight new delayed-navigation cases. The suite checks all 145 public URLs, preview metadata, translated conversion journeys, accessibility, privacy boundaries, delayed hydration, mobile layouts and WebKit smoke behavior.

Cloud Build `fb191d68-b688-474e-9956-aef9f80fe4fe` completed successfully at `2026-09-26T21:20:16.717847Z`. Firebase confirmed rollout completion. The root independently verified revision `paraguay-prototype-build-2026-09-26-001` as Ready with 100% traffic, `SITE_MODE=demo`, the correct Firebase `SITE_URL`, minimum instances 0 and maximum instances 2. Those limits are not a spending cap.

The raw runner logs remain in local temporary storage, outside source uploads. This report publishes only aggregate evidence; filled form captures, contact payloads and credentials are not included. Independent manual observations and their limits are recorded separately in [hosted QA](firebase-hosted-qa.md).

Independent manual QA passed all 50 current route/viewport pairs and the immediate conversion, five-language family appointment draft, mock failure/retry and WhatsApp privacy checks. The root also inspected the fresh unfilled Hebrew screenshots at 390 and 1440 pixels. Script blocking through the manual browser tool did not take effect, so that attempt is not counted as a no-JavaScript pass; the hosted automated suite supplies that evidence.

## Reproduce

Run `npm run build`, then `npm run test:e2e -- tests/e2e/selection-transition.spec.ts --project=chromium`. The regression itself holds route responses; it does not rely on a sleep or a slow external connection. Run the complete suite with `npm run test:e2e`.

For hosted testing, use the verified origin and command in [the Firebase guide](../docs/FIREBASE_HOSTING.md). The 120 second timeout accommodates the exhaustive link inventory over the internet; test retries remain zero. Final rollout identity and hosted results are recorded in [deployment evidence](firebase-deployment.json) and [independent hosted QA](firebase-hosted-qa.md).

## Scope limits

This is a public team demo with noindex, provisional USD prices and local mocked integrations. No real appointment, message, lead or payment is sent. Public source publication and Firebase deployment do not authorize merging the pull request or a business launch. Existing parked issues #2 through #5 and #8 are outside this fix.
