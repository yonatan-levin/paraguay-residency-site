import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import ts from "typescript";

// Verification artifact only. Run against the owner-provided production URL.
const baseURL = process.argv[2];
assert(baseURL, "Pass the production preview URL explicitly.");
const artifactDirectory = dirname(fileURLToPath(import.meta.url));
const repository = resolve(artifactDirectory, "../../..");
const sourcePath = resolve(repository, "src/content/tax-opportunities.ts");
const source = await readFile(sourcePath, "utf8");
const tree = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true);
const taxCopy = {};
function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(tree) === "taxOpportunityCopy") {
    const object = ts.isAsExpression(node.initializer) ? node.initializer.expression : node.initializer;
    for (const member of object.properties) {
      assert(ts.isPropertyAssignment(member) && ts.isStringLiteral(member.initializer));
      taxCopy[member.name.getText(tree)] = member.initializer.text;
    }
  }
  ts.forEachChild(node, visit);
}
visit(tree);
assert(taxCopy.dividendTitle && taxCopy.usExample && taxCopy.paraguayOpportunity);
const locales = ["en", "es", "fr", "de", "he"];
const routes = ["", "why-paraguay", "tax-planning", "company-formation/us", "company-formation/paraguay"];
const decode = (value) => value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const results = [];
for (const locale of locales) {
  const dictionary = locale === "en" ? null : JSON.parse(await readFile(resolve(repository, `src/content/translations/${locale}-editorial.json`), "utf8"));
  const translated = (key) => locale === "en" ? taxCopy[key] : dictionary[taxCopy[key]];
  for (const route of routes) {
    const url = new URL(`/${locale}${route ? `/${route}` : ""}?plan=temporary-guided&utm_campaign=verifier-tax`, baseURL);
    const response = await fetch(url);
    assert.equal(response.status, 200, url.href);
    const html = await response.text();
    const visibleHTML = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
    const text = decode(visibleHTML.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ");
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
    assert(title && description, `Missing metadata ${url}`);
    assert(!title.includes("0%") && !description.includes("0%"), `Unqualified numeric metadata ${url}`);
    assert(robots.includes("noindex"), `Indexable preview ${url}`);
    assert(html.includes(`lang="${locale}"`), `Missing lang ${url}`);
    assert(html.includes(`dir="${locale === "he" ? "rtl" : "ltr"}"`), `Direction mismatch ${url}`);
    assert(html.includes('rel="canonical"'), `Missing canonical ${url}`);
    const expected = route === "why-paraguay" || route === "tax-planning"
      ? ["dividendTitle", "dividendBody", "dividendLimit", "usBody", "usOpportunity", "usExample", "usObligations", "paraguayOpportunity", "paraguayObligations", "counterBody", "residenceBody", "conclusion"]
      : route === "company-formation/us"
        ? ["usBody", "usOpportunity", "usExample", "usObligations", "counterBody", "residenceBody", "conclusion"]
        : route === "company-formation/paraguay"
          ? ["paraguayOpportunity", "paraguayObligations", "residenceBody", "conclusion"]
          : [];
    for (const key of expected) {
      const value = translated(key);
      assert(value?.trim(), `Missing localized ${key} ${locale}`);
      assert(text.includes(value.replace(/\s+/g, " ")), `Not in initial visible HTML: ${locale}/${route} ${key}`);
    }
    const structures = [...visibleHTML.matchAll(/data-tax-structure="([^"]+)"/g)].map((match) => match[1]);
    const expectedStructures = route === "why-paraguay" || route === "tax-planning" ? ["us", "paraguay"] : route === "company-formation/us" ? ["us"] : route === "company-formation/paraguay" ? ["paraguay"] : [];
    assert.deepEqual(structures, expectedStructures, url.href);
    results.push({ locale, route: route || "home", status: response.status, title, description, robots, conditionsInInitialHTML: expected.length, structures, htmlSha256: createHash("sha256").update(html).digest("hex") });
  }
}
const sitemap = await fetch(new URL("/sitemap.xml", baseURL));
const sitemapText = await sitemap.text();
assert.equal(sitemap.status, 200);
assert(!/<url>/.test(sitemapText), "Preview sitemap must remain empty.");
const evidence = { checkedAt: new Date().toISOString(), baseURL, sourceSha256: createHash("sha256").update(source).digest("hex"), pages: results, sitemapEmpty: true };
await writeFile(resolve(artifactDirectory, "initial-html-results.json"), JSON.stringify(evidence, null, 2) + "\n");
console.log(`PASS: ${results.length} localized pages; tax conditions in initial HTML; localized metadata; noindex; empty sitemap.`);
