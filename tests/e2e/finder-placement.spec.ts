import { expect, test } from "@playwright/test";
import { supportedLocales } from "../../src/config/locales";

const finderLabels = {
  en: "Find my plan",
  es: "Encontrar mi plan",
  fr: "Trouver ma formule",
  de: "Mein Paket finden",
  he: "מציאת החבילה שלי",
};

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

for (const locale of supportedLocales) {
  for (const [device, viewport] of Object.entries(viewports)) {
    test(`${locale} ${device} homepage exposes the finder in the hero and preserves journey context`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(
        `/${locale}?plan=temporary-guided&campaign=residency-cost`,
      );
      const hero = page.locator('[data-home-section="hero"]');
      const finder = hero.getByRole("link", {
        name: finderLabels[locale],
        exact: true,
      });

      await expect(finder).toBeInViewport();
      await expect(
        page.getByRole("banner").getByRole("link", {
          name: finderLabels[locale],
          exact: true,
        }),
      ).toHaveCount(0);
      await expect(hero.locator('a[href*="/pricing"]')).toBeVisible();
      await expect(hero.locator('a[href$="#benefits"]')).toBeVisible();
      await expect(hero.locator('a[href*="/book"]')).toBeVisible();

      await finder.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/find-my-plan\\?`));
      const destination = new URL(page.url());
      expect(destination.searchParams.get("plan")).toBe("temporary-guided");
      expect(destination.searchParams.get("campaign")).toBe("residency-cost");
      await expect(page.getByTestId("finder-next")).toBeVisible();
    });
  }
}
