# Paraguay Next

Paraguay Next is a multilingual Next.js prototype for exploring residency, relocation, tax planning and business assistance in Paraguay. Commercial offers, operator details and regulated content remain provisional. Website lead submissions, appointment selection and analytics use in-memory adapters. User-initiated WhatsApp and Calendly links open real external services; they do not submit website form drafts.

## Commands

Use Node.js 24 and npm from this repository's root. The package engine range is recorded in `package.json`.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm run dev` | Start the loopback development server |
| `npm run typecheck` | Generate Next.js route types and check TypeScript |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests in `tests/unit/` |
| `npm run build` | Build the production application |
| `npm run start` | Serve the production build on loopback |
| `npm run test:e2e` | Run Playwright browser coverage |
| `npm run test:a11y` | Run the Chromium accessibility suite |
| `npm run check:launch` | Report missing live configuration and approvals; expected to reject this prototype |
| `npm run assets:social` | Regenerate localized artwork |
| `npm run perf` | Run mobile Lighthouse against a running server |
| `npm run snapshot` | Write the source manifest under `artifacts/` |

See [operations](docs/OPERATIONS.md) for environment variables and [testing](docs/TESTING.md) for browser setup and coverage.

## Architecture in brief

The App Router renders marketing content on the server. A shared client journey provider holds selection, finder answers, contact drafts, appointment choices and receipts through client navigation. The locale route determines language and direction; Hebrew uses RTL.

| Location | Responsibility |
| --- | --- |
| `src/app/` | Root and localized layouts, route composition, robots and sitemap |
| `src/config/` | Brand, supported locales, route inventory and runtime safeguards |
| `src/content/` | Catalog, UI and editorial copy, localized dictionaries and claim review inputs |
| `src/domain/` | Types, selection, pricing, finder, attribution and benefit rules |
| `src/application/` | Submission validation and payload-bound idempotency |
| `src/infrastructure/mock/` | Local lead, appointment and message adapters |
| `src/lib/` | Translation, SEO policy and sanitized in-memory events |
| `src/components/` | Shared shell, marketing pages and interactive journeys |
| `public/` | Local artwork and social assets |
| `scripts/` | Launch diagnostics, artwork generation, performance and source manifests |
| `tests/` | Vitest and Playwright suites |

There is no database, authentication system, payment processor or provider SDK. Native external contact anchors use configured public destinations and catalog-validated context. Firebase App Hosting serves the server-rendered demo; deployment details live in the dedicated hosting guide.

## Conventions and invariants

- English, Spanish, French, German, Hebrew and Russian share public route coverage. The internal RTL fixture is English only. Locale availability is content availability, not approved business support.
- English phrases are translation keys. Named placeholders match across dictionaries; missing translations and values raise errors. Long editorial dictionaries are server content.
- Stable service and package IDs stay untranslated. Catalog prices use integer USD minor units; locale formatting changes presentation, never value or currency.
- Fixed, range and quote prices remain distinct. Included, excluded, optional and unknown scope remain distinct. Family journeys require quotes rather than an invented household total.
- Safe service, package and campaign IDs can appear in URLs. Personal details, questionnaire answers and receipts stay in browser memory. Refreshing a receipt gives a recovery state.
- Direct contact links use only safe selection context, open a separate tab and require the visitor to send or book on the external provider. They add no embedded widget, credentials or automatic provider request. The [visual/contact contract](docs/VISUAL_CONTACTS.md) owns the destinations, context mapping and skyline license.
- Informational navigation retains selected context. A service inquiry explains incompatible package removal before the action.
- Appointments preserve their UTC instant while display timezone and language change. A locale switch does not submit another request.
- Authored visible copy avoids hyphens and dash punctuation. Technical identifiers and customer input retain their original formatting.
- All preview pages are noindex. Indexability also depends on origin, page, commercial, claim and locale approvals. Noindex is not access control.
- `SITE_MODE=live` fails configuration loading. Integration switches in the example environment do not activate live providers.

## Gotchas

`npm run start` requires a completed build. Playwright can reuse a running server outside CI, so its target may differ from the source being edited. Browser evidence and hosted evidence have separate scopes.

`SITE_URL` supplies the origin for canonical and alternate URLs. Localhost is the fallback; Firebase defines its own origin in `apphosting.yaml`. A public demo and an optimized build do not establish approved legal claims or a business launch.

The legacy mock messaging adapter produces a preview with `sent: false`; visible WhatsApp actions use the external contact link. Mock appointments use generated future slots and controllable outcomes. Real availability and bookings are handled only on the external Calendly page.

## Documentation index

- [README](README.md): overview and quick start
- [Architecture](docs/ARCHITECTURE.md): components, data flow and configuration
- [Contracts](docs/CONTRACTS.md): public behavior and invariants
- [Operations](docs/OPERATIONS.md): commands, run modes and diagnostics
- [Deployment](docs/DEPLOYMENT.md): environments and hosting boundaries
- [Testing](docs/TESTING.md): suites, coverage and limitations
- [Decisions](docs/DECISIONS.md): dated decisions and corrections
- [Visual identity and direct contact](docs/VISUAL_CONTACTS.md): palette, skyline rights and outbound-link contract
- [Localization](docs/LOCALIZATION.md), [routes and SEO](docs/ROUTES_AND_SEO.md), [Firebase hosting](docs/FIREBASE_HOSTING.md): specific guides
- [README document index](README.md#documentation): content specifications and historical evidence
