# Visual identity and direct contact contract

## Palette and skyline

The interface uses Paraguay inspired red, deep blue and white. Primary action buttons are red, headings/navigation and large anchor sections are blue, and white or pale blue surfaces preserve legibility. Semantic errors retain clear text and borders; information is never conveyed by color alone. Shared CSS tokens own the palette. Existing layout, pricing access and the central plan finder remain available at every breakpoint and in Hebrew RTL.

The homepage uses a local optimized photograph of Asuncion's skyline and Costanera. The source is [Costanera aerial by Cmasi](https://commons.wikimedia.org/wiki/File:Costanera_aerial.jpg), licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The derivative preserves the photographed buildings and shoreline while using AI to soften light and color and reduce compression. It is identified as AI edited, credits the author, links the source/license and remains under the same license. It is location illustration, not evidence of present conditions. The original and editing prompt are retained with asset provenance.

The homepage photograph has no visible caption. The About page contains the localized photo credit, source link, AI editing disclosure and license link, accessible through the shared About navigation. The image retains its descriptive alternative text.

## Contact destinations and placement

The owner supplied WhatsApp `+972544941176` and [the 30 minute Calendly link](https://calendly.com/yonatanlevin-esteaoeste/30min). Native outbound links are available from the home hero, shared footer, contact page and booking page. The existing internal booking journey remains accessible. The contact page identifies Yonatan Levin without inventing credentials, availability guarantees, an office, an email address or staffed language support.

WhatsApp opens a draft at `https://wa.me/972544941176`; the visitor decides whether to send. Calendly opens the supplied event page; only completion on Calendly creates a real appointment. Both open a separate tab with `noopener noreferrer`, preserving the website and its in-memory draft. No SDK, embedded widget, provider API or automatic outbound request is added.

## Safe context

Outbound links derive only allowlisted, catalog-validated service/package identifiers, campaign category and locale from the existing journey. WhatsApp's draft includes localized service/package names and any family quote flag. Calendly carries those categories through supported UTM parameters: `utm_source=paraguay-next`, `utm_medium=website`, `utm_content=<package ID>`, `utm_term=<service ID>`, and `utm_campaign=<recognized campaign>` when available. A family quote marker may be appended to the fixed medium category. No raw incoming UTM values are forwarded.

Names, phone/email drafts, notes, questionnaire answers, receipt data, appointment times and arbitrary URL values are never serialized into outbound links. An unknown or incompatible selection is normalized using the existing catalog rules. External systems do not receive drafts before a visitor clicks. The phone destination itself is owner-approved public contact data.

## Preview boundaries and languages

Banner, contact descriptions, footer and privacy text distinguish live external contact links from simulated website forms. All six locales include complete new labels, descriptions and image alternatives. Newly authored visible copy avoids dash punctuation. The existing WhatsApp preview adapter may remain for its legacy contract but the visible contact action uses the approved outbound destination.

Provisional prices, noindex headers/metadata, empty preview sitemap, local lead/booking/analytics adapters, guarded live mode and professional-review requirements remain unchanged. Adding a public contact link does not approve offers or enable payment, form delivery or a business launch.

## Acceptance surfaces

End-to-end coverage exercises homepage image and palette, approved contact destinations across all locales, package and campaign context after navigation/language changes, privacy of form drafts, safe new-tab behavior, keyboard/no-JavaScript access, responsive layouts and existing conversion regression. External requests are intercepted in automated tests; tests never send a WhatsApp message or create a Calendly appointment. Main-agent visual inspection covers desktop, narrow mobile and Hebrew layouts.
