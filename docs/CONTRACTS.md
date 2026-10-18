# Contracts

The public surface is a multilingual website and its browser journeys. There is no public submission API or live provider endpoint in this prototype.

## Routes, languages and SEO

Public pages share the six locales in `src/config/locales.ts`: `en`, `es`, `fr`, `de`, `he` and `ru`. Route slugs and service/package identifiers stay unchanged across languages. Unknown routes and locales return 404. The internal RTL fixture is available only under English.

The [route and SEO contract](ROUTES_AND_SEO.md) owns canonical, alternate, sitemap and noindex rules. The [localization contract](LOCALIZATION.md) owns translation completeness, interpolation and RTL rendering. A language change changes presentation, preserving journey context, values and appointment instants.

## Catalog and selection

- `src/content/catalog.ts` is the source for commercial fixtures. USD amounts are integers in minor units. Formatting never converts currency or changes amounts.
- Fixed, range and quote prices remain different representations. Scope distinguishes included, excluded, optional and unknown items.
- A package belongs to its catalog service. Invalid IDs and incompatible pairs cannot become accepted submissions.
- Informational browsing preserves selection. Changing inquiry service explains an incompatible package removal before continuing.
- Family results carry a quote requirement; the finder does not fabricate household totals or promise eligibility.

Subject-specific benefit and tax claim boundaries live in [VALUE_FIRST_PLAN.md](VALUE_FIRST_PLAN.md) and [TAX_OPPORTUNITIES_SPEC.md](TAX_OPPORTUNITIES_SPEC.md).

## Submission and provider interfaces

`src/domain/types.ts` defines the internal payload, gateway, result and receipt shapes. `src/application/submission.ts` validates callers through `submissionSchema`.

| Payload area | Meaning |
| --- | --- |
| `mode` | Conversation or appointment |
| `context` | Locale, entry route, valid selection, optional campaign, family/finder context and attribution |
| `contact` | Name, preferred channel, applicable address/phone, optional notes and marketing consent |
| `slotUtc`, `timeZone` | Selected appointment instant and display timezone |

A first name is required. Email is required for appointments and email conversations. WhatsApp conversations require a plausible international number. Appointments require an ISO datetime slot; supplied timezone identifiers must be valid. Field length and phone digit bounds are named in the submission module.

Lead and booking gateways receive a validated payload plus an idempotency key. The controller shares an in-flight promise for identical validated input, reuses an accepted result and rejects a different simultaneous submission. Failures remain retryable; adapter errors become explicit failures.

Mock booking rejects unavailable, expired or nongenerated slots. Successful results produce an explicitly demo receipt with accepted context, any catalog price and appointment instant. No receipt persists across reloads. Changing receipt language does not submit again.

The messaging adapter returns translated preview text, a disabled-send notice and `sent: false`. It does not deliver a WhatsApp message.

## Privacy and event boundaries

Personal contact values, notes, questionnaire answers and receipts stay in memory. Navigation can include safe service, plan and campaign IDs; it does not serialize private drafts. Receipts omit contact details.

Analytics stores sanitized events in memory. Only recognized event names, routes, locales, catalog IDs, campaign/CTA identifiers, finder steps and outcome categories survive sanitization. Arbitrary contact or free-text fields are not event payloads.

## Demo and launch boundaries

`next.config.ts` rejects non-demo `SITE_MODE`; environment toggles cannot create a live integration. Runtime origin and approval inputs fail closed for indexability. Brand, operator, contact, commercial, content, privacy, provider and translation requirements remain represented by the launch diagnostic. [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) describes their business meaning.
