import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const baseURL = process.env.PERF_BASE_URL ?? "http://127.0.0.1:3000";
const output = fileURLToPath(
  new URL("../artifacts/lighthouse/", import.meta.url),
);
const routes = ["/en", "/en/pricing", "/en/lp/residency-cost"];
await mkdir(output, { recursive: true });
const chrome = await launch({
  chromeFlags: ["--headless=new", "--disable-gpu"],
  chromePath: process.env.CHROME_PATH,
});
try {
  const summary = [];
  for (const route of routes) {
    const result = await lighthouse(new URL(route, baseURL).href, {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result) throw new Error(`No Lighthouse result for ${route}`);
    const name = route.replaceAll("/", "_").replace(/^_/, "");
    await writeFile(`${output}/${name}.html`, result.report[0]);
    await writeFile(`${output}/${name}.json`, result.report[1]);
    summary.push({
      route,
      browser: result.lhr.environment.hostUserAgent,
      viewport: result.lhr.configSettings.screenEmulation,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      lcp: result.lhr.audits["largest-contentful-paint"].numericValue,
      cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
      tbt: result.lhr.audits["total-blocking-time"].numericValue,
      failed: Object.entries(result.lhr.audits)
        .filter(([, audit]) => audit.score !== null && audit.score < 1)
        .map(([id]) => id),
    });
  }
  await writeFile(`${output}/summary.json`, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await chrome.kill();
}
