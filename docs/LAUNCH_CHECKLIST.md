# Public-launch approval checklist

**This application is a local demonstration. No public deployment is authorized.** Passing tests or a production build does not approve the business, its offers, its content, or live integrations. All gate owners below are responsibilities to assign to real people; no approval is inferred from a placeholder name, source link, benchmark price, or implementation date.

The prototype remains in demo mode, with provisional prices and noindex previews. A hosted review deployment, if later explicitly authorized, also needs access control; noindex is not access control.

## Required business and operating approvals

| Gate | Accountable owner | Approval status | Required evidence |
|---|---|---|---|
| Business name, domain and legal operator | Business owner | Not supplied | Written approved brand/domain/legal entity and the relationship, if any, to other businesses |
| Production origin and ownership | Business / engineering owner | Not supplied | Exact approved origin, domain control, ownership record and environment separation |
| Contact details, staffed languages and support hours | Operations owner | Not supplied | Verified email/phone/address where published, response expectations and named lead owner |
| Team and professional responsibilities | Business / professional lead | Not supplied | Real identities, publication consent, verified credentials, operator versus external-professional boundaries |
| Catalog delivery scope | Commercial / operations owner | Not approved | Signed per-package scope, exclusions, dependencies, required travel and aftercare commitments |
| Final commercial terms | Commercial owner | Not approved | Approved fees/taxes, inclusions, third-party charges, recurring obligations, cancellation/refunds |
| Family applications | Commercial owner | Not supplied | Child/couple/family pricing, shared-fee policy and quote rules; no inferred household total |
| Residency/permanent/investor content | Qualified residency reviewer | Not reviewed | Route-by-route factual approval, source records, reviewer identity and genuine review date |
| Tax/company/accounting/banking content | Qualified professional reviewers | Not reviewed | Applicable jurisdiction and responsibility review; no automatic tax/bank/account outcomes |
| Property/license/retirement/citizenship content | Qualified professional reviewers | Not reviewed | Scope and claim approval; no guaranteed citizenship, legal thresholds or timing invented from marketing |
| Images, biographies, testimonials and proof | Content / rights owner | Not supplied | Rights/license files, model/publication permissions, authenticated claims and testimonials |
| Translation publication | Language / content owner | Not approved | Native language review of English, Spanish, French, German and Hebrew full journeys, errors, policies, metadata and image captions; qualified review of legal and commercial meaning; staffed languages confirmed separately |
| Privacy, terms, disclaimer and consent basis | Legal / privacy owner | Draft only | Jurisdiction-appropriate approved policies, controller/processors, lawful basis and separate optional marketing consent |
| Operational response and complaints | Operations owner | Not supplied | Named lead ownership, response commitments, escalation and cancellation/refund procedure |

## Required engineering and integration gates

| Gate | Accountable owner | Approval status | Required evidence |
|---|---|---|---|
| Real lead service | Engineering / operations owner | Mock only | Approved provider, server validation, safe retry/idempotency, error handling and end-to-end accepted-request evidence |
| Calendar service | Engineering / operations owner | Mock only | Approved account/timezone/duration, availability/concurrency checks, cancellation flow and successful real integration tests |
| WhatsApp contact | Operations / privacy owner | Sending disabled | Approved number, message scope, explicit-user-action behavior and verified destination |
| CRM and processor review | Privacy / engineering owner | Not configured | Approved endpoints, processor agreement/review, access ownership and tested data contract |
| Personal data protection | Security / privacy owner | Prototype memory only | Secure server storage/transport, least-privilege access, retention/deletion policy, secret management and incident procedure |
| Abuse prevention | Security / engineering owner | Not implemented for live collection | Server-side rate limiting, anti-spam, validation, safe error reporting and abuse tests |
| Monitoring without personal payload logs | Operations / engineering owner | Not configured | Alerting, service ownership, sanitized logs, failure triage and recovery exercises |
| Analytics and consent | Marketing / privacy owner | Local/no-op only | Consent/lawful-basis review, event/property allowlist, retention, downstream stage definitions and provider tests |
| Live-readiness validator | Engineering owner | Requires final acceptance | Actionable errors for missing identity, origin, approvals, providers and secure operating controls; never silently falls back to live |
| Metadata and crawl policy | SEO / content owner | Preview noindex | Approved production canonicals, complete reciprocal translations, redirect map, source-of-truth sitemap and no draft URLs |
| Search-console ownership | SEO / domain owner | Not configured | Ownership verification plan and responsible operator; no assumption that sitemap submission guarantees indexing |
| Functional/browser regression | QA owner | See `QA_REPORT.md` | Passing business/state tests, all route/CTA checks, Chromium mobile/desktop and WebKit evidence on the final build |
| Accessibility and responsive behavior | QA / design owner | See `QA_REPORT.md` | Keyboard/error/focus checks, automated scans, 200% zoom, 320 CSS-pixel reflow, no blocked CTAs or overflow |
| Native mobile browsers | QA owner | Separate real-device check required | iOS/Android and relevant social in-app browser checks; emulation is not equivalent evidence |
| Performance | Engineering / QA owner | Current Hebrew mobile sample: home 92, pricing and campaign 85; 90 aim not met throughout | Resolve GitHub issue #2, repeat audits across all languages, review asset budget and define the field plan for LCP/INP/CLS; earlier four language scores of 77 to 87 are historical; see current QA report |
| Live integration rollback | Engineering / operations owner | Not configured | Ability to disable sending/tracking, restore safe mode, preserve accepted request integrity and communicate outages |
| Deployment authorization | Business owner | Not granted | Explicit approval of reviewed release and target; credentials provisioned through approved secure process |

## Fail-closed release policy

Changing the runtime label is not sufficient to launch. An attempted live configuration must fail with actionable missing-input errors while any required gate remains unapproved. Keep content approval separate from price/scope approval. Do not manufacture evidence, use competitor contacts, enable real endpoints, invent real team facts, or remove noindex to obtain a green build or SEO score.

Before an approved live release, the responsible owners must reconcile this checklist with the final catalog/content and the exact validated artifact. Business approval remains separate from engineering test results. Future provider work requires its own implementation and security review; the mock adapters do not already solve storage, spam prevention, retention, or operating responsibility.
