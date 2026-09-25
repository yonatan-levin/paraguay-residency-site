# Language contract

The public language contract covers English, Spanish, French, German and Hebrew on every public route. This extends the original handoff at the user's explicit request, including Spanish pages that previously linked to English. The internal RTL fixture remains an English engineering route; public Hebrew pages use the same complete route and conversion coverage as the other languages.

## Content and rendering

`src/config/locales.ts` defines the supported languages, their self names and formatting locales. The header uses a native disclosure with ordinary route links, so marketing navigation remains usable without JavaScript. The active language is indicated accessibly. Escape closes the disclosure and returns focus to its trigger.

English copy is the canonical message key. Each other language has a common dictionary and an editorial dictionary in `src/content/translations/`. Common messages cover the catalog, navigation, finder, forms, validation, mock receipts, messaging and metadata. Editorial dictionaries cover service descriptions, guides, about and policy prose; they are imported only by server content rendering. Missing translations and missing named interpolation values throw explicit errors instead of silently showing English.

Translate complete phrases. Preserve `{placeholders}` exactly and interpolate customer or catalog values once. Do not translate service IDs, package IDs, route slugs, provider outcome keys or other technical identifiers. Authored visible wording avoids hyphens and dash punctuation. Customer supplied text, ISO dates and technical paths are not rewritten.

All public routes have reciprocal EN/ES/FR/DE/HE alternates and an English `x-default`. Each locale has a self canonical without query parameters, its own title/description and localized social imagery. The preview always remains noindex. The locale list indicates available content, not business or publication approval.

## Journey state and presentation

The root journey provider survives client navigation between languages. Language links preserve the current equivalent route and safe service/package/campaign identifiers. Draft names, contact details, notes and questionnaire answers stay in memory and are never serialized into the URL. Family quote and finder origin remain attached to the same journey. A receipt language change translates the accepted receipt without creating another submission.

Prices remain the same provisional USD amounts. `Intl.NumberFormat` changes presentation only, never currency or value. `Intl.DateTimeFormat` presents the selected UTC instant in the chosen time zone and locale. Language selection does not change time, commercial scope, mock behavior, consent or prices.

Artwork text is generated locally by `scripts/render-social-assets.mjs`. The original brand name remains a proper name in every language. The hero caption, default social card and campaign cards have translated versions.

## Hebrew direction and mixed content

Hebrew uses route locale `he`, formatting locale `he-IL` and language self name `עברית`. Direction is a locale property: Hebrew is `rtl`; the other supported languages are `ltr`. Server rendered HTML must set both `lang` and `dir` correctly before JavaScript runs. Client language navigation must update both on the existing document, including switching back to a left to right language, without remounting the root journey provider.

Use the existing logical CSS properties and DOM order. Header actions, card rows, forms, lists, progress and footer columns flow from the right on Hebrew pages. Keep mobile columns in the same semantic order. Do not reverse DOM arrays or duplicate layouts. Hebrew headings use normal letter spacing rather than the tighter Latin heading tracking; retain the existing system font stack and design tokens. Preserve wrapping, including the inherited `overflow-wrap: anywhere` protection.

The language disclosure shows all five self names, with each name isolated in its own writing direction. The active item remains indicated with `aria-current`. Keep the disclosure's logical edge anchoring, existing touch targets, keyboard focus order, Escape behavior and mutual exclusion with the mobile menu. Both menus must fit within a 320 CSS pixel viewport when opened. The proper brand name and logo retain their original left to right order within the RTL header and footer. Mirror the navigation arrow in `.round-arrow`; do not mirror the brand symbol, illustration, checkmarks, disclosure chevron or the growth symbol used as a category icon.

| Content | Presentation contract |
| --- | --- |
| Name and notes fields | `dir="auto"` allows Hebrew, Latin and mixed customer input. Labels and errors keep the page direction. Never alter stored input. |
| Email and phone fields | Explicit `dir="ltr"` keeps addresses, the leading plus sign and digit order readable. Preserve the existing autocomplete, labels and validation associations. |
| Time zone identifiers | Display and select as isolated LTR content, including identifiers interpolated into confirmation prose. Labels remain Hebrew. |
| Localized dates and times | Format the same selected UTC instant using `he-IL` and the selected time zone. Isolate the formatted date/time from surrounding prose; do not force a full Hebrew date phrase to LTR. |
| USD amounts and ranges | Preserve `Intl.NumberFormat` currency and bidi controls. Isolate the complete localized price phrase in the locale's direction. A Hebrew range reads minimum, translated connector, maximum; do not reverse values or convert to another currency. |
| English proper names or technical values inside prose | Use isolated runs such as `bdi`; apply `dir="ltr"` to values known to be LTR. Mixed customer text uses automatic direction. |

All initial, selected, invalid, pending, simulated failure, unavailable time, accepted receipt and empty receipt states require Hebrew wording. This includes navigation, visible labels, helper text, validation summaries, accessible names, metadata and messaging previews. A language switch changes presentation only: selected package, family quote, finder result, private contact draft and any accepted receipt remain attached to the same journey. A language switch on an accepted receipt must not submit again.

Hebrew hero and social artwork use real Hebrew text with correct glyph order and punctuation, not a mirrored raster. Retain the English brand as an isolated LTR line. Align Hebrew text to the end of the existing text region, with explicit SVG direction and anchoring as needed; keep text out of the illustration region. Generate the default card, both campaign cards and hero caption locally, then inspect the rendered assets for clipping and mixed direction errors. Translate image titles, descriptions and alternative text too. Authored wording also avoids the Hebrew maqaf character `־` in addition to hyphens and dash punctuation.

## Hebrew acceptance checks

1. Every public route renders in Hebrew with an appropriate title and heading, `lang="he"`, `dir="rtl"`, noindex, a self canonical and reciprocal alternates for all five languages. Unknown locale routes still return 404. The internal fixture remains separate from public language navigation.
2. Direct navigation with JavaScript disabled renders correct Hebrew direction and a usable language disclosure. Client navigation HE to EN to HE updates both document attributes and preserves the equivalent route and safe selection parameters.
3. A journey from package selection or the family finder through booking to an accepted receipt survives Hebrew and LTR language changes. Contact details stay in memory and do not appear in the URL. Reopening a receipt in Hebrew must not create a second request.
4. Check Hebrew, Latin and mixed names/notes, email addresses, international phone numbers, USD fixed prices and ranges, and an appointment using `Asia/Jerusalem`. Digits, plus signs, punctuation and time zone identifiers remain in readable order while the selected instant and prices stay unchanged.
5. At 320, 390, 768 and 1440 CSS pixels, check home, pricing, finder, booking, receipt, a service, a guide, policies and campaign pages, including opened menus and an error summary. There is no unintended horizontal document overflow, clipped content or overlapping action; zoom and longer localized labels remain usable.
6. Keyboard navigation follows semantic DOM order. Focus indicators remain visible, errors link to the corresponding field, radio and checkbox labels activate controls, and the messaging dialog can be closed without losing journey context. Run the existing accessibility checks on Hebrew forms and editorial pages.
7. Validate complete dictionary keys and unchanged interpolation placeholders before rendering. Audit visible authored wording and accessible labels for hyphens, dash punctuation and maqaf. Inspect generated Hebrew artwork and capture unfilled desktop and mobile pages as QA evidence.

## Editing and validation

1. Add or update the canonical English message and all corresponding dictionaries together.
2. Keep common messages out of editorial files when a client form needs them. Keep long service and guide prose in the server editorial files.
3. Keep named placeholders identical. Run unit coverage and the full browser route matrix to catch dictionary omissions and render failures.
4. Run `npm run assets:social` when changing image wording, then inspect the output for clipping.
5. Check at 320 CSS pixels with longer German labels and actual public Hebrew RTL pages, plus keyboard and no JavaScript navigation.

Translations are prototype content. Native language publication review and qualified review of legal/commercial meaning remain required before launch. Offering translated pages does not claim that operational support is staffed in those languages. Current execution evidence is recorded in `QA_REPORT.md`.
