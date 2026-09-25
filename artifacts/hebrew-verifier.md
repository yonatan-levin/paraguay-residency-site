# Hebrew verification

MODE: VERIFICATION  
ROLE: VERIFIER  
Tier: S2  
Status: VERIFIED for the assigned scope

## Claim and scope

Verify Hebrew public coverage and RTL against `docs/LOCALIZATION.md`, including translation inventory, appointment state ownership, preview safeguards and rendered metadata/assets. Source comparison uses `artifacts/hebrew-baseline-src`. The root agent owns the complete browser and responsive suite. This verifier did not rebuild, restart the preview, modify source, or perform external GitHub actions.

Initially checked optimized build `3z0UzeAWrmbjyx3M7GwoF`, then checked the bounded shell correction on rebuilt `Z4gZdLWq2bcEoQckTmphI`, locally served on 2026-09-24. Git HEAD at inspection was the initial repository commit `0672b54372b6574c5a22b983623f4044784423ee`; implementation files were uncommitted, so HEAD is not a fingerprint of this verified implementation.

## Independently executed checks

| Check | Result | Evidence |
| --- | --- | --- |
| Unit tests | PASS | `npm test`: 65 tests across 6 files passed. First run identified a stale four-language expected metadata object; root corrected it and the complete rerun passed. |
| TypeScript | PASS | `npm run typecheck`: generated route types and `tsc --noEmit` exited successfully. |
| Lint | PASS | `npm run lint`: exit 0, no errors or warnings reported. |
| Hebrew dictionaries | PASS | 459 common and 361 editorial entries exactly match the independent source inventories. No missing/extra/empty values, placeholder mismatches, ASCII/Unicode dash punctuation or Hebrew maqaf. |
| Hebrew SSR routes | PASS | All 29 public routes return HTTP 200, Hebrew title and H1, `lang="he"`, `dir="rtl"`, self canonical, EN/ES/FR/DE/HE alternates plus English x-default, localized OG image, and noindex header/meta. |
| Authoritative locale | PASS | Spoofed `x-site-locale` on `/he` still renders Hebrew RTL; the reverse on `/en` renders English LTR. `/xx` returns 404. |
| Hebrew assets | PASS | Hero SVG returns 200 at 860 by 1000. Default and both campaign PNGs return 200 at 1200 by 630. All four retain the noindex header. |
| Asset visual inspection | PASS | Independently viewed all three Hebrew OG PNGs: correct Hebrew glyph order/punctuation and right alignment, no observed clipping or artwork overlap, English brand remains LTR. Hero SVG title and description are Hebrew. |
| Editorial separation | PASS | `server-only` import remains. A unique long Hebrew editorial sentence appears in `/he/paraguay-residency` server HTML and in none of the 18 `.next/static` JavaScript chunks. |
| Live mode protection | PASS | Isolated Node import with `SITE_MODE=live` rejects with the expected live-mode-unavailable error. `next.config.ts` SHA256 remains `0e2e3c9628752cc7810ab9ad6c257395271871a85de4b97d54d2c1f7047d5519`. |

## Source inspection

`config/runtime.ts`, `lib/seo/metadata.ts`, `infrastructure/mock/gateways.ts`, `application/submission.ts`, `domain/selection.ts`, `lib/analytics/events.ts` and `proxy.ts` are byte-identical to the Hebrew baseline. The runtime remains demo with all approvals and external integrations false. No live integration, price conversion or private URL serialization was introduced.

The root journey provider now owns appointment mode, chosen time zone and selected UTC slot beside the private contact draft. Booking initializes a detected zone only if no chosen zone exists. This structurally preserves choices across locale route remounts; browser behavior is covered by root's appointment transition checks. Selection links still serialize only allowed service/package/campaign identifiers. Existing finder origin invalidation checks continue to suppress a result that no longer matches the selected service/package. Receipts remain in root memory and are rendered without resubmission on a language change.

Server HTML direction comes from the path-authoritative locale header. Client shell updates both `document.documentElement.lang` and `.dir` without moving the provider. Customer names/notes use automatic direction; email, phone and time zone identifiers use LTR; price and localized dates use isolated locale-direction runs. The proper brand stays LTR, and only the navigation arrow is mirrored by the added CSS rule.

## Corrected finding

Root's first browser run reported 213 passes and 2 failures out of 215: the Hebrew language menu could close after opening during initial hydration. FRONTEND changed the pathname effect to close disclosures only on an actual path change, preserving a menu opened before hydration. Independently inspected the bounded source correction and the deterministic regression test, which holds JavaScript, opens the native disclosure, releases scripts, proves React validation is active, and asserts the disclosure remains open. The pre-fix failure is recorded in `artifacts/hebrew-hydration-red.txt`.

After the correction this verifier independently reran TypeScript and lint successfully, checked the fresh build ID, and repeated the Hebrew SSR/noindex/editorial bundle probe successfully. Root ran the complete browser suite on that build; the directly inspected `artifacts/hebrew-e2e.txt` records **217 passed in 48.3 seconds**, including the delayed hydration regression and all 145 public language routes. No unresolved finding remains within this verifier's assigned scope.

## Limits

Full browser state transitions, responsive behavior and accessibility execution are owned by root/QA; they were intentionally not rerun by this verifier. Coverage percentage was not measured. Native language and professional legal/commercial publication review remain unapproved launch requirements.

HANDOFF_TO: REVIEWER
