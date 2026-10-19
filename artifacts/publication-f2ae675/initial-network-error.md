# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: finder-placement.spec.ts >> es desktop homepage exposes the finder in the hero and preserves journey context
- Location: tests\e2e\finder-placement.spec.ts:19:5

# Error details

```
Error: page.goto: net::ERR_NETWORK_CHANGED at https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app/es?plan=temporary-guided&campaign=residency-cost
Call log:
  - navigating to "https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app/es?plan=temporary-guided&campaign=residency-cost", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { supportedLocales } from "../../src/config/locales";
  3  | 
  4  | const finderLabels = {
  5  |   en: "Find my plan",
  6  |   es: "Encontrar mi plan",
  7  |   fr: "Trouver ma formule",
  8  |   de: "Mein Paket finden",
  9  |   he: "מציאת החבילה שלי",
  10 | };
  11 | 
  12 | const viewports = {
  13 |   desktop: { width: 1440, height: 900 },
  14 |   mobile: { width: 390, height: 844 },
  15 | };
  16 | 
  17 | for (const locale of supportedLocales) {
  18 |   for (const [device, viewport] of Object.entries(viewports)) {
  19 |     test(`${locale} ${device} homepage exposes the finder in the hero and preserves journey context`, async ({
  20 |       page,
  21 |     }) => {
  22 |       await page.setViewportSize(viewport);
> 23 |       await page.goto(
     |                  ^ Error: page.goto: net::ERR_NETWORK_CHANGED at https://paraguay-prototype--paraguay-residency-site.us-central1.hosted.app/es?plan=temporary-guided&campaign=residency-cost
  24 |         `/${locale}?plan=temporary-guided&campaign=residency-cost`,
  25 |       );
  26 |       const hero = page.locator('[data-home-section="hero"]');
  27 |       const finder = hero.getByRole("link", {
  28 |         name: finderLabels[locale],
  29 |         exact: true,
  30 |       });
  31 | 
  32 |       await expect(finder).toBeInViewport();
  33 |       await expect(
  34 |         page.getByRole("banner").getByRole("link", {
  35 |           name: finderLabels[locale],
  36 |           exact: true,
  37 |         }),
  38 |       ).toHaveCount(0);
  39 |       await expect(hero.locator('a[href*="/pricing"]')).toBeVisible();
  40 |       await expect(hero.locator('a[href$="#benefits"]')).toBeVisible();
  41 |       await expect(hero.locator('a[href*="/book"]')).toBeVisible();
  42 | 
  43 |       await finder.click();
  44 |       await expect(page).toHaveURL(new RegExp(`/${locale}/find-my-plan\\?`));
  45 |       const destination = new URL(page.url());
  46 |       expect(destination.searchParams.get("plan")).toBe("temporary-guided");
  47 |       expect(destination.searchParams.get("campaign")).toBe("residency-cost");
  48 |       await expect(page.getByTestId("finder-next")).toBeVisible();
  49 |     });
  50 |   }
  51 | }
  52 | 
```