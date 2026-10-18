# Architecture

Paraguay Next uses Next.js App Router, React and strict TypeScript. Marketing pages render on the server; interactive conversion components run in the browser. Zod validates simulated submission payloads. There is no persistence backend, authenticated area, payment flow or live provider integration.

## Routing and rendering

`src/config/routes.ts` is the route inventory. The localized catch-all page under `src/app/(site)/[locale]/[[...slug]]/` resolves each page to its template. Unknown locales and routes return not found. The root entry redirects to English.

`src/proxy.ts` derives the locale from the path and replaces the request's internal language header. The root layout uses that value for initial language and direction. Localized navigation updates presentation without replacing the root journey state. Hebrew uses RTL; the internal RTL fixture is an English-only engineering route.

The [route and SEO guide](ROUTES_AND_SEO.md) owns the route inventory, canonical/alternate behavior and indexability policy. The [localization guide](LOCALIZATION.md) owns dictionary and bidirectional presentation details.

## Content and commercial data

`src/content/catalog.ts` owns stable service/package identities, scope and provisional integer-minor-unit USD prices. UI and editorial content are separate from the catalog's commercial values. Common and editorial dictionaries provide translated phrases; editorial imports stay with server content.

Benefit, tax and claim-review content describe qualifications and approval dependencies. The [benefits contract](VALUE_FIRST_PLAN.md) and [tax specification](TAX_OPPORTUNITIES_SPEC.md) contain the subject-specific meaning and source boundaries.

## Journey data flow

1. Marketing links carry valid service, package and campaign context.
2. The root `JourneyProvider` keeps selection, finder answers, attribution, contact draft, appointment choice and receipt in memory.
3. Domain rules resolve compatible selections and finder results. Browsing information retains context; an incompatible service inquiry explains the selection change.
4. The booking component constructs a payload for `src/application/submission.ts`. Zod checks contact, selection, locale and appointment requirements.
5. The submission controller calls a local lead or booking gateway and constructs a demo receipt on success. It shares pending work and accepted outcomes for the same validated payload within that controller.
6. The receipt page reads the in-memory receipt. Direct visits or reloads have no persisted receipt and render recovery guidance.

Mock gateways can simulate failure and unavailable times. Appointment slots are generated from future UTC instants, then formatted for the selected timezone and locale. The messaging gateway generates translated preview text and always returns `sent: false`.

## Data and integrations

Safe identifiers can be included in navigation URLs. Personal details, answers and receipts are held in browser memory, without a database or browser-storage persistence. Analytics accepts allowlisted event identifiers and context, drops arbitrary fields and stores events in memory.

No lead, booking, messaging or analytics provider is configured. The deployment's ordinary page and asset requests remain network traffic; the local integration boundary applies to journey payloads.

## Configuration and hosting

| Source | Responsibility |
| --- | --- |
| `src/config/brand.ts` | Brand identity, contacts, team timezone and approval flags |
| `src/config/locales.ts` | Supported locales, display names, formatting locales and direction |
| `src/config/runtime.ts` | Demo runtime, site origin and launch approval inputs |
| `next.config.ts` | Server headers, build roots and rejection of live mode |
| `apphosting.yaml`, `firebase.json`, `.firebaserc` | Firebase demo target and build/runtime settings |

`SITE_URL` is read from the environment for metadata. Runtime approvals and integration flags are explicitly false in source; example environment switches do not enable providers. The application emits noindex metadata and response headers. The shared SEO policy also checks origin, route, commercial, claim and locale approval inputs.

Firebase App Hosting supplies the Next.js adapter and server runtime. [Deployment](DEPLOYMENT.md) describes environment boundaries; [Firebase hosting](FIREBASE_HOSTING.md) contains provider-specific setup and rollback.
