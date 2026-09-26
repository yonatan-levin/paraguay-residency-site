import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { translate } from "../../src/lib/i18n/common";
import { isLocale, supportedLocales } from "../../src/config/locales";

const placeholders = (value: string) =>
  [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

describe("translation contract", () => {
  it("recognizes all requested languages and rejects arbitrary locale values", () => {
    expect(supportedLocales).toEqual(["en", "es", "fr", "de", "he"]);
    for (const value of [undefined, null, "FR", "xx", "en-US", "../en"])
      expect(isLocale(value)).toBe(false);
  });
  for (const group of ["common", "editorial"]) {
    it(`${group} dictionaries have identical complete keys, matching parameters and no dash punctuation`, () => {
      const dictionaries = ["es", "fr", "de", "he"].map(
        (locale) =>
          JSON.parse(
            readFileSync(
              new URL(
                `../../src/content/translations/${locale}-${group}.json`,
                import.meta.url,
              ),
              "utf8",
            ),
          ) as Record<string, string>,
      );
      for (const dictionary of dictionaries) {
        expect(Object.keys(dictionary).sort()).toEqual(
          Object.keys(dictionaries[0]).sort(),
        );
        for (const [key, value] of Object.entries(dictionary)) {
          expect(value.trim(), key).not.toBe("");
          expect(placeholders(value), key).toEqual(placeholders(key));
          expect(value, key).not.toMatch(/[-\u05be\u2010-\u2015]/);
          expect(value, key).not.toContain("(en inglés)");
        }
      }
    });
  }
  it("fails visibly on missing messages or parameters, rather than displaying English fallback", () => {
    expect(() => translate("fr", "Deliberately absent translation")).toThrow(
      /Missing fr translation/,
    );
    expect(() => translate("de", "Step {step} of {total}")).toThrow(
      /Missing translation value/,
    );
    expect(
      translate("fr", "Step {step} of {total}", { step: 2, total: 5 }),
    ).toContain("2");
  });
});
