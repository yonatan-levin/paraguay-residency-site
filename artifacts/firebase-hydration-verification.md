# Firebase interaction verification

Checked on 2026-09-25. Fixed application source: `a89512521040b0313b3c671c54ef18e4f2f22ac8`.

**Hosted acceptance failed: 219 passed, 3 failed.** The delayed hydration fix passes its focused tests, but immediate navigation after changing a journey can still carry an incompatible package. Final hosted QA is not accepted. The three review cycle cap has been reached; remaining work is recorded in [issue #7](https://github.com/yonatan-levin/paraguay-residency-site/issues/7).

## Reproduction before implementation

The first Firebase regression against `7af1bb9f380c26e5b8b00f7ac8794c09bc19f139` passed 206 checks and failed 11. Ten failures involved lost selection changes, scheduling controls not appearing, or native booking GET submission. Delayed hydration was the initial diagnosis; the corrected run below isolates three additional route transition failures. The remaining initial failure was a link inventory exceeding its local 30 second test timeout over the hosted network.

Five deterministic tests were written before the production fix. They withheld application JavaScript or disabled it entirely. All five failed on the prior implementation because interactive controls were enabled in server HTML. These cases cover booking, pricing, finder, WhatsApp preview and booking without JavaScript.

## Fix and acceptance evidence

Native disabled attributes now prevent conversion interactions until React handlers are attached. The shared readiness hook has a false server snapshot and a true client snapshot. Native navigation and language disclosures remain usable. The fix introduces no timers, persistent storage, provider calls or new commercial behavior.

| Check | Observed result |
| --- | --- |
| Deterministic baseline | 5 expected failures before production changes |
| Implementer focused regression | 13 passed: 5 new hydration tests and 8 existing Hebrew checks |
| Independent verifier | 41 passed across hydration, finder, journeys and Hebrew desktop/mobile checks |
| Root unit validation | 65 passed, 0 failed |
| Root lint, type checking and optimized build | All exited successfully |
| Final implementation review | Cycle 3 APPROVE, no HIGH or MEDIUM findings |
| GitHub CI for fixed source | Both push and pull request runs succeeded |
| Full hosted regression after deployment | 219 passed, 3 failed in 4.0 minutes; no retries |

GitHub CI: [pull request run](https://github.com/yonatan-levin/paraguay-residency-site/actions/runs/36191257159), [push run](https://github.com/yonatan-levin/paraguay-residency-site/actions/runs/36191252063).

## Reproduce

Build the reviewed source, then run `npm run test:e2e -- tests/e2e/hydration.spec.ts tests/e2e/hebrew.spec.ts --project=chromium`. The new tests hold script requests themselves; no manual throttling or weakened ordinary journey assertions are required. Run all affected local tests with `npm run test:e2e -- tests/e2e/hydration.spec.ts tests/e2e/finder.spec.ts tests/e2e/journeys.spec.ts tests/e2e/hebrew.spec.ts`.

The two existing privacy tests now derive the only permitted origin from Playwright's configured base URL. Requests to another host, protocol or port remain failures. This permits the same assertions on local and hosted builds.

## Remaining hosted failures

- Chromium `finder.spec.ts`: open `/en/find-my-plan?plan=temporary-concierge`, select Business setup and immediately click Skip to booking. The previous Concierge package remains.
- Chromium and mobile Chromium `journeys.spec.ts`: open `/en/pricing?plan=temporary-guided`, select Permanent residency upgrade and immediately click Talk through your options. Booking can still retain Guided.

Code inspection explains the remaining window: `useSelection` prefers the current URL query while `router.replace` is pending, even though the in-memory selection and visible journey have changed. Dependent links can therefore use the previous package. The proposed next fix is to make an explicit journey change authoritative immediately while URL synchronization is pending, retaining normal deep-link and browser navigation behavior. First add deterministic delayed-navigation regressions, then validate the transition and repeat hosted acceptance. No further implementation was attempted after the review cycle cap.

For hosted verification, use the command in [the Firebase hosting guide](../docs/FIREBASE_HOSTING.md). The longer hosted timeout accommodates exhaustive link requests; retries remain disabled. Deployment identity and the full hosted regression belong in [issue #7](https://github.com/yonatan-levin/paraguay-residency-site/issues/7); independent manual observations are in [the hosted QA report](firebase-hosted-qa.md).
