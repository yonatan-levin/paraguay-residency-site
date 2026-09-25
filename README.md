# Paraguay Residency Studio prototype

A complete demo website for reviewing residency and relocation journeys. The brand, prices, scope, people, and business policies are provisional. Requests, appointments, WhatsApp messages, and analytics remain local simulations. **No real booking or message is sent.** The source repository is public for team collaboration. Firebase Blaze billing is authorized and the dedicated backend is configured with its verified origin. See [the hosting guide](docs/FIREBASE_HOSTING.md) for setup and [issue #7](https://github.com/yonatan-levin/paraguay-residency-site/issues/7) for rollout and hosted verification status.

## Run on Windows / PowerShell

Use Node.js 24 LTS and npm. From PowerShell:

```powershell
$projectPath = Join-Path (Get-Location) 'paraguay-residency-site'
git clone --branch prototype/hebrew https://github.com/yonatan-levin/paraguay-residency-site.git $projectPath
Set-Location $projectPath
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://127.0.0.1:3000`. The root redirects to `/en`. Change the port with `npm run dev -- --port 3100` if needed. Commands bind to loopback by default. Use test contact details only.

For a production build served locally:

```powershell
npm run build
npm run start
```

This optimizes the prototype; it does not make the business launch-ready. `SITE_MODE=live` deliberately fails. All pages send noindex metadata and an HTTP robots header. The owner has authorized a public team demo with test data only. Noindex discourages indexing but does not restrict access; anyone with the demo URL can visit.

## Validation

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium webkit
npm run test:e2e
npm run test:a11y
```

Playwright starts the production server automatically when the configured local URL is not already running. It uses Chromium desktop/mobile and WebKit smoke projects. Override the local URL with `$env:E2E_BASE_URL = 'http://127.0.0.1:3100'` and worker count with `$env:E2E_WORKERS = '2'`. Screenshot tests capture only unfilled pages; traces and automatic screenshots of form failures are disabled.

Run `npm run perf` with the production server running to produce mobile Lighthouse reports in `artifacts/lighthouse/`. Set `PERF_BASE_URL` for another local port and `CHROME_PATH` if Chrome is not discovered. Preview SEO scores retain the intentional noindex penalty. Lighthouse cannot establish field INP, production p75 performance, or native iOS/Android behavior.

`npm run check:launch` intentionally exits unsuccessfully and lists missing approvals. It does not provision, send, or deploy anything.

The included CI workflow runs type checking, lint, unit tests, build, and browser checks. See [the actual QA results](docs/QA_REPORT.md) for local evidence and limitations, and [GitHub Actions](https://github.com/yonatan-levin/paraguay-residency-site/actions) for hosted runs on each commit. Work is tracked in [issue #1](https://github.com/yonatan-levin/paraguay-residency-site/issues/1); the outstanding mobile performance target is [issue #2](https://github.com/yonatan-levin/paraguay-residency-site/issues/2).

## Review the journeys

- Choose a package on `/en/pricing`, discuss it, submit test details, and inspect the simulated receipt. The package and provisional price stay visible throughout.
- Use `/en/find-my-plan` for a needs-based starting point. Results do not require contact details. Family requests receive a quote flag, never an invented household total.
- Try both conversation and demo-time modes on `/en/book`; change the timezone and use the demo outcome control to exercise failure, unavailable-time, and retry behavior.
- Open `/en/lp/residency-cost` and `/en/lp/family-relocation` to review campaign entry points. `/en/links` is the compact link hub.
- Switch among English, Español, Français, Deutsch and עברית on any public page. All public pages, forms, receipts, policies, metadata and artwork are translated. Hebrew at `/he` uses right to left layouts, including server rendering without JavaScript. Language changes retain valid service/package context, family quotes, contact drafts and selected appointment times in memory.
- Open confirmation directly or refresh a completed receipt: it recovers honestly because no receipt is persisted.

## Architecture and editing

Next.js App Router server-renders marketing content; small client components handle conversion interactions. Strict TypeScript and pure domain rules keep commercial data separate from UI and provider behavior. There is no database, authentication service, upload endpoint, payment system, or external SDK.

| Location | Responsibility |
|---|---|
| `src/content/catalog.ts` | Stable service/package IDs and all integer-minor-unit USD fixtures |
| `src/content/` | Localized UI, unique service descriptions, and the preparation guide |
| `src/content/translations/`, `src/lib/i18n/` | Complete Spanish, French, German and Hebrew dictionaries; explicit errors for missing copy; server only editorial text |
| `src/config/` | Replaceable brand, routes, locale availability, and runtime safeguards |
| `src/domain/` | Price formatting, routing, finder transitions, attribution, and time rules |
| `src/application/` | Validated submissions and payload-bound idempotency |
| `src/infrastructure/mock/` | Controllable local lead, booking, and messaging adapters |
| `src/lib/seo/`, `src/lib/analytics/` | Indexability/metadata and sanitized mock events |
| `src/components/`, `src/app/` | Reusable UI, conversion flows, and route composition |
| `public/` | Original local editorial illustration and social preview assets |

Change prices only in the catalog; never copy amounts into a page, translation, metadata, or image. Fixed/range/quote and included/excluded/optional/unknown remain distinct. Editing copy does not approve a commercial offer. Keep actual people, credentials, testimonials, contacts, and legal claims absent until verified and authorized.

For translation edits, see [the language contract](docs/LOCALIZATION.md). Keep each English key and named placeholder identical across dictionaries. Run `npm run assets:social` after editing artwork translations. Authored visible copy avoids hyphens and dash punctuation; route slugs, identifiers and customer supplied data retain their required formatting. Translation completeness does not imply approval by a native speaking professional or staffed support in that language.

Contact drafts, finder answers, and receipts exist only in browser memory. Reloading clears them; safe package/service IDs can remain in the URL. No personal data goes to storage, analytics, URLs, or provider requests. Live adapters require server validation, anti-spam controls, secure storage, retention rules, processor review, and explicit launch approval.

## Delivery documents

- [Source handoff](docs/CODEX_HANDOFF_PARAGUAY_SITE.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Defaults and unresolved business decisions](docs/DECISIONS.md)
- [Routes, translations, and SEO rules](docs/ROUTES_AND_SEO.md)
- [QA evidence](docs/QA_REPORT.md)
- [Launch checklist](docs/LAUNCH_CHECKLIST.md)
- [Firebase setup, deployment and rollback](docs/FIREBASE_HOSTING.md)

Original handoff files remain untouched in the parent workspace. Code is reviewed on `prototype/hebrew` in the public repository. [Issue #7](https://github.com/yonatan-levin/paraguay-residency-site/issues/7) tracks Firebase hosting and public team access. GitHub publication and a hosted demo do not approve the business launch.
