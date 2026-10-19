# Operations

## Prerequisites and local setup

Use Node.js 24 and npm; `package.json` records the full supported engine range. Commands below run from the selected checkout root in PowerShell:

```powershell
$repoPath = (git rev-parse --show-toplevel).Trim()
Set-Location -LiteralPath $repoPath
npm ci
Copy-Item .env.example .env.local
npm run dev
```

The development server binds to `127.0.0.1:3000`. The root redirects to `/en`. Use `npm run dev -- --port 3100` for another port.

For production rendering locally, run `npm run build`, then `npm run start`. The start command also accepts `-- --port 3100`. A production build remains a demo.

## Environment configuration

| Setting | Behavior |
| --- | --- |
| `SITE_URL` | Origin for metadata, canonical and alternate URLs; defaults to `http://localhost:3000` |
| `SITE_MODE` | Only unset or `demo` is accepted by Next.js configuration; other values throw |
| `ANALYTICS_ENABLED`, `MESSAGING_ENABLED`, `BOOKING_ENABLED` | Documented false values in `.env.example`; not consumed to activate adapters |
| `E2E_BASE_URL` | Playwright target, default `http://127.0.0.1:3000` |
| `E2E_WORKERS` | Playwright parallel worker count |
| `PERF_BASE_URL` | Lighthouse target, default `http://127.0.0.1:3000` |
| `CHROME_PATH` | Optional Chrome executable path for Lighthouse |

Brand, public contact destinations, timezone and approval inputs live in `src/config/`. No credentials are required for local demo journeys or native contact links. Public destinations do not depend on the mock integration switches. Their behavior and safe context are defined in [VISUAL_CONTACTS.md](VISUAL_CONTACTS.md). Hosted build/runtime origin settings live in `apphosting.yaml`; provider details are in [Firebase hosting](FIREBASE_HOSTING.md).

## Commands and output

| Command | Output or action |
| --- | --- |
| `npm run typecheck` | Next.js generated route types and TypeScript diagnostics |
| `npm run lint` | ESLint diagnostics |
| `npm test` / `npm run test:watch` | Vitest once / watch mode |
| `npm run test:e2e` | Playwright suites and HTML report |
| `npm run test:a11y` | Accessibility suite in Chromium |
| `npm run check:launch` | Launch errors and nonzero exit while required approvals are absent |
| `npm run assets:social` | Localized hero SVGs and social PNGs in `public/` |
| `npm run perf` | Mobile Lighthouse HTML/JSON and summary in `artifacts/lighthouse/` |
| `npm run snapshot` | `artifacts/source-manifest.json` |
| `npm run format` | Prettier changes to the configured source, tests, scripts and root config files |

See [testing](TESTING.md) for browser installation, server reuse and the meaning of the suites.

## Demo diagnostics

The booking interface exposes demo outcomes for success, failure and unavailable time. Website conversations and appointments go through local adapters. Direct WhatsApp and Calendly actions open real provider pages in a separate tab. Inspect their destinations without sending a message or finishing an appointment when testing. Refreshing clears website contact drafts and receipts, so an empty receipt after reload is expected.

A live-mode configuration error is intentional. `npm run check:launch` lists missing requirements without provisioning or sending anything. [Launch requirements](LAUNCH_CHECKLIST.md) explain the gaps.

A missing production build prevents `npm run start`; build first. If browser tests use unexpected content, check their target and whether Playwright reused an already-running server. Metadata pointing at localhost on a hosted preview indicates an incorrect `SITE_URL`, not a routing translation issue.
