# Testing

The repository combines Vitest checks for domain/application/content contracts with Playwright coverage of the rendered site and conversion journeys. The directory name `tests/unit/` is the existing location for Vitest tests; it includes application and content-level coverage as well as focused rules.

## Local validation commands

From the repository root after `npm ci`:

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium webkit
npm run test:e2e
npm run test:a11y
```

`typecheck` runs Next.js type generation before TypeScript. Vitest uses the Node environment and the source alias configured in `vitest.config.ts`. Browser suites exercise the production server, so a build is required first.

## Coverage

| Surface | Coverage location |
| --- | --- |
| Pricing, finder, selection and submission behavior | `tests/unit/business.test.ts`, `submission.test.ts`, `value-first.test.ts` |
| Locale, translation and reviewed-content contracts | `tests/unit/locales.test.ts`, `translations.test.ts`, `content-review.test.ts` |
| SEO and launch diagnostics | `tests/unit/seo.test.ts`, `launch-command.test.ts` |
| Public routes, links, metadata and hydration | `tests/e2e/routes.spec.ts`, `locales.spec.ts`, `hydration.spec.ts`, `smoke.spec.ts` |
| Package, finder, inquiry, receipt and transition journeys | `tests/e2e/journeys.spec.ts`, `finder.spec.ts`, `finder-placement.spec.ts`, `selection-transition.spec.ts` |
| Hebrew and Russian journeys | `tests/e2e/hebrew.spec.ts`, `russian-journeys.spec.ts` |
| Benefits, tax content and accessibility | `tests/e2e/value-first.spec.ts`, `tax-opportunities.spec.ts`, `accessibility.spec.ts` |

The Playwright configuration defines desktop Chromium, 390px mobile Chromium for journey/Hebrew suites and WebKit smoke coverage. Browser emulation does not establish native device behavior.

## Server targeting and artifacts

Playwright uses `E2E_BASE_URL` or `http://127.0.0.1:3000`. It starts `npm run start` on the target port when needed and may reuse a running server outside CI. Set `E2E_WORKERS` to control concurrency; the configured default is in `playwright.config.ts`.

Traces, automatic screenshots and video are disabled. Explicit screenshot tests capture unfilled pages. Playwright reports remain local generated artifacts. Test data should not be real contact information.

The hosted-target instructions and acceptance matrix live in [Firebase hosting](FIREBASE_HOSTING.md). Hosted evidence is necessary to establish deployed adapter behavior, environment values and origin metadata; a local pass does not do that.

## Performance and launch checks

With a production server running, `npm run perf` writes mobile Lighthouse reports to `artifacts/lighthouse/`. `PERF_BASE_URL` changes the target and `CHROME_PATH` can supply Chrome. Intentional noindex affects preview SEO scores. Lighthouse does not establish field INP or production p75 performance.

`npm run check:launch` is expected to exit nonzero for this prototype. It reports missing live origin/approval requirements and does not create providers or deploy.

## CI and recorded evidence

`.github/workflows/ci.yml` runs Node.js 24 dependency installation, type checking, lint, Vitest, production build, browser installation and Playwright on pushes and pull requests. This describes the configured checks, not a verdict for the current revision.

[Initial QA](QA_REPORT.md), [benefits QA](VALUE_FIRST_QA.md), [tax QA](TAX_OPPORTUNITIES_QA.md) and [Russian validation](../artifacts/russian/VALIDATION.md) retain historical observations and limits.
