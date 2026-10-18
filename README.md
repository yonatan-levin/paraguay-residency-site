# Paraguay Next

A six-language website prototype for exploring Paraguay residency, relocation, tax planning and business assistance. The site explains country benefits before paid support, compares provisional packages, offers a needs finder and demonstrates inquiry and appointment journeys.

English, Spanish, French, German, Hebrew and Russian cover the public pages. Hebrew supports right to left rendering. Prices, scope, business policies and regulated claims remain provisional. Lead submissions, bookings, WhatsApp previews and analytics are simulated in memory; no real request or appointment is delivered.

## Quick start

Use Node.js 24 and npm. In PowerShell, from your selected checkout:

```powershell
$repoPath = (git rev-parse --show-toplevel).Trim()
Set-Location -LiteralPath $repoPath
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://127.0.0.1:3000`; the root redirects to `/en`. Use test contact details. To use another port, run `npm run dev -- --port 3100`.

For the production server:

```powershell
npm run build
npm run start
```

The application remains a demo in either run mode. `SITE_MODE=live` deliberately fails. Preview metadata and HTTP headers discourage indexing; the public demo is still accessible to anyone with its URL.

## Explore the site

- Start on the homepage or `/en/why-paraguay` to explore residency distinctions, financial planning and local business considerations.
- Compare provisional packages on `/en/pricing`, then keep the selected package through a simulated inquiry.
- Use `/en/find-my-plan` for recommendations without a contact gate. Family requests carry a quote flag.
- On `/en/book`, try conversation and demo appointment modes, timezones, failures and retries.
- Review campaign pages at `/en/lp/residency-cost` and `/en/lp/family-relocation`, or the compact hub at `/en/links`.
- Switch language during a journey. Private drafts and selected appointment times survive client navigation; reloading clears them. A direct or refreshed receipt displays a recovery state.

## Repository layout

| Location | Contents |
| --- | --- |
| `src/app/`, `src/components/` | Route composition, pages and interactive UI |
| `src/config/`, `src/content/` | Routes, locales, runtime safeguards, catalog and copy |
| `src/domain/`, `src/application/` | Business rules and validated submissions |
| `src/infrastructure/mock/`, `src/lib/` | Mock providers, translations, SEO and events |
| `public/` | Local illustrations and localized social artwork |
| `tests/`, `scripts/` | Automated coverage and maintenance commands |

Catalog prices have one source in `src/content/catalog.ts`. The site has no database, payment processor or live provider integration. See [architecture](docs/ARCHITECTURE.md) for the data flow.

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

The [testing guide](docs/TESTING.md) describes coverage and server targeting. `npm run check:launch` reports missing business launch requirements and is expected to fail for this prototype.

## Documentation

| Document | Subject |
| --- | --- |
| [CLAUDE.md](CLAUDE.md) / [AGENTS.md](AGENTS.md) | Matching agent entrypoints and codebase essentials |
| [Architecture](docs/ARCHITECTURE.md) | Components, data flow, integrations and configuration |
| [Contracts](docs/CONTRACTS.md) | Routes, schemas and behavior that must remain consistent |
| [Operations](docs/OPERATIONS.md) | Local setup, commands, run modes and diagnostics |
| [Deployment](docs/DEPLOYMENT.md) | Environment boundaries and hosting configuration |
| [Testing](docs/TESTING.md) | Test strategy, suites and limits |
| [Decisions](docs/DECISIONS.md) | Dated decisions and corrections |

Specific guides and content contracts:

- [Localization](docs/LOCALIZATION.md) and [Russian localization](docs/RUSSIAN_LOCALIZATION_SPEC.md)
- [Routes and SEO](docs/ROUTES_AND_SEO.md)
- [Firebase setup, deployment and rollback](docs/FIREBASE_HOSTING.md)
- [Launch requirements](docs/LAUNCH_CHECKLIST.md)
- [Benefits and selection contract](docs/VALUE_FIRST_PLAN.md)
- [Tax opportunities and claim sources](docs/TAX_OPPORTUNITIES_SPEC.md)

Original briefs and historical implementation evidence:

- [Source brief](docs/CODEX_HANDOFF_PARAGUAY_SITE.md), [benefits update brief](docs/CODEX_UPDATE_PARAGUAY_NEXT_VALUE_FIRST.md) and [implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Initial QA](docs/QA_REPORT.md), [benefits QA](docs/VALUE_FIRST_QA.md), [tax QA](docs/TAX_OPPORTUNITIES_QA.md) and [Russian validation](artifacts/russian/VALIDATION.md)

These evidence files describe their recorded revisions; they do not establish the behavior of an arbitrary checkout or deployment. Work and release status live in [GitHub issues](https://github.com/yonatan-levin/paraguay-residency-site/issues).
