# Paraguay identity and direct contact QA

## Scope and tested behavior

The incremental change preserves the previously hosted six-language application and replaces its green palette with red actions, blue structure and light surfaces. It adds the local AI edited Asuncion skyline and owner-approved WhatsApp and Calendly anchors to home, contact, booking and the shared footer. Website forms, appointment simulations, catalog prices and noindex controls retain their previous boundaries.

The owner confirmed S1. The accepted contract is [VISUAL_CONTACTS.md](../../docs/VISUAL_CONTACTS.md). Work and final release status belong in [issue 16](https://github.com/yonatan-levin/paraguay-residency-site/issues/16); this report records validation evidence, not a live deployment claim.

## Evidence

| Check | Observed result | Evidence |
| --- | --- | --- |
| Baseline before implementation | New skyline and direct-anchor checks failed for their absent features | [red.txt](red.txt) |
| TypeScript and lint | Passed on integrated implementation | Root command exit 0 |
| Existing logic/component suite | 137 passed | Baseline suite and root integration rerun; final committed-head run recorded in issue |
| First new browser checks | 10 passed, one incorrect test selector; corrected to the actual field ID | [new-e2e.txt](new-e2e.txt) |
| Integrated browser regression | 337 passed, including 22 new desktop/mobile checks | [e2e.txt](e2e.txt) |
| Production build | Passed after the final caption-spacing correction | [build.txt](build.txt) |
| Documentation | Eight fixed entry/guides checked, 83 relative links valid, CLAUDE and AGENTS identical | [docs-check.json](docs-check.json) |
| Independent source review | No actionable findings in task source, copy, tests or docs; tests/browser not delegated to reviewer | Main-agent issue record includes reviewer result and final head |

The browser suite covers Chromium desktop, 390px mobile journeys, WebKit smoke, all six public locales, Hebrew direction, no-JavaScript marketing/contact anchors, package/campaign preservation, family context, invalid query normalization, private-draft exclusion, and original form success/failure/retry and receipt behavior. Accessibility includes axe checks, keyboard use, reflow at 320, 360, 390, 768 and 1440px, and emulated zoom.

WhatsApp keyboard activation and Calendly clicks were intercepted by the browser tests. No test sent a real message, created an appointment or contacted a payment provider. Tests confirm no automatic requests to external contact services before a click. A private draft remains on the original website after opening a separate tab, including after a language switch.

## Visual evidence

- [Before desktop](before-home-desktop.png): prior hosted green theme and illustration.
- [After desktop](after-home-desktop.png): red/blue identity, skyline, attribution and contact actions.
- [Hebrew mobile top](after-he-390-top.png) and [skyline detail](after-he-390-skyline.png): main-agent inspected RTL, readable actions, image and credit without horizontal overflow.
- [Russian contact mobile](after-ru-contact-mobile.png): translated contact choices, public number, footer and preserved package context.
- [English mobile page](after-home-mobile.png) and [Hebrew mobile page](after-home-he-mobile.png): full-page layout evidence. Fixed conversion controls remain viewport anchored during full-page screenshots.

The skyline master, licensed source, editing prompt and optimized asset details are retained in [skyline-provenance.md](skyline-provenance.md) and [skyline-asset.json](skyline-asset.json). The site asset is 1536 by 1024 pixels and 361,594 bytes. AI editing is disclosed; architectural survey accuracy and current city conditions are not claimed.

## Limits and release verification

The integrated 337-test run preceded a caption-spacing correction and the explicit exclusion of local task checkpoints from Firebase upload. The final committed head must be rebuilt and pass the full gate again; its exact SHA, CI result, landing/security review and any hosted verification are recorded in issue 16 and the pull request. A local pass does not establish a deployed revision or third-party account delivery.

The installed agent-browser advertised an unavailable `a11y` command; its diagnostic command stalled and was stopped. Accessibility evidence comes from the passing Playwright axe checks, not that unavailable command. No browser tooling or harness configuration was changed.

Native speaker/professional review of commercial and regulated content remains pending. No live form service, storage, payments, credentials, billing change or business launch is part of this update. Existing separately tracked follow-ups are unchanged. The required fixed project documents and setup instructions are linked from [README](../../README.md).
