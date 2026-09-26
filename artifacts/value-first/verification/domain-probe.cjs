// Independent read-only verification. Uses repository TypeScript transpilation,
// and reads base files directly from Git without changing the working checkout.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const repo = path.resolve(__dirname, '../../..');
const ts = require(path.join(repo, 'node_modules/typescript'));
const base = process.argv[2];
assert.match(base ?? '', /^[a-f0-9]{40}$/);
const observations = [];
const hashes = {};
function loader(revision) {
  const cache = new Map();
  function read(file) {
    if (revision) return cp.execFileSync('git', ['-C', repo, 'show', `${revision}:${file}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return fs.readFileSync(path.join(repo, file), 'utf8');
  }
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const source = read(file);
    hashes[`${revision ?? 'working-tree'}:${file}`] = crypto.createHash('sha256').update(source).digest('hex');
    if (file.endsWith('.json')) return JSON.parse(source);
    const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, resolveJsonModule: true } }).outputText;
    const module = { exports: {} };
    cache.set(file, module);
    const relativeRequire = request => {
      assert.ok(request.startsWith('.'), `Unexpected external import ${request}`);
      const destination = path.posix.normalize(path.posix.join(path.posix.dirname(file), request));
      if (/\.(ts|json)$/.test(destination)) return load(destination);
      return load(`${destination}.ts`);
    };
    new Function('exports', 'require', 'module', output)(module.exports, relativeRequire, module);
    return module.exports;
  }
  return load;
}
function check(name, action) {
  action();
  observations.push({ name, status: 'PASS' });
}
function approvedRuntime(runtime) {
  return { ...runtime, mode: 'live', siteUrl: 'https://approved.example', productionOrigin: 'https://approved.example', productionOriginApproved: true, approvals: Object.fromEntries(Object.keys(runtime.approvals).map(key => [key, true])) };
}
const previous = loader(base);
const oldSelection = previous('src/domain/selection.ts');
const oldPages = previous('src/config/routes.ts');
const oldSeo = previous('src/lib/seo/metadata.ts');
const oldRuntime = previous('src/config/runtime.ts').runtime;
check('Base lacks Why Paraguay route and service compatibility helper', () => {
  assert.equal(oldPages.getPage('why-paraguay'), undefined);
  assert.equal(oldSelection.selectServiceContext, undefined);
});
check('Base ignores requested benefit fragment', () => {
  assert.equal(oldSelection.journeyHref('en', '', {}, 'benefits'), '/en');
});
check('Base permits approved home without per-claim reviews', () => {
  assert.equal(oldSeo.canIndex({ ...oldPages.getPage('home'), approved: true, contentReviewed: true, commercialApproved: true }, approvedRuntime(oldRuntime), 'en'), true);
});
const current = loader();
const selection = current('src/domain/selection.ts');
const value = current('src/domain/value-first.ts');
const catalog = current('src/content/catalog.ts');
const review = current('src/content/content-review.ts');
const routes = current('src/config/routes.ts');
const seo = current('src/lib/seo/metadata.ts');
const runtime = current('src/config/runtime.ts').runtime;
const analytics = current('src/lib/analytics/events.ts');
const locales = current('src/config/locales.ts').supportedLocales;
const approved = Object.fromEntries(Object.entries(review.claimReviews).map(([id, record]) => [id, {
  content: { ...record.content, author: 'Independent test fixture', reviewer: 'Independent fixture reviewer', status: 'reviewed', approvedAt: '2026-09-26' },
  operator: { status: 'approved', reviewer: 'Independent fixture operator', approvedAt: '2026-09-26' },
  translations: Object.fromEntries(locales.map(locale => [locale, { status: 'approved', reviewer: 'Independent fixture translator', approvedAt: '2026-09-26' }]))
}]));
check('Current route exists in every supported locale', () => {
  for (const locale of locales) assert.ok(routes.getPage('why-paraguay', locale));
});
check('Every package remains selected only for its compatible service', () => {
  for (const plan of catalog.packages) for (const service of catalog.services) {
    const context = { serviceId: plan.serviceId, packageId: plan.id, campaign: 'family-relocation' };
    const result = selection.selectServiceContext(context, service.id);
    assert.equal(result.selection.serviceId, service.id);
    assert.equal(result.selection.campaign, context.campaign);
    assert.equal(result.selection.packageId, plan.serviceId === service.id ? plan.id : undefined);
    assert.equal(result.reason, plan.serviceId === service.id ? undefined : 'package-cleared');
    assert.deepEqual(context, { serviceId: plan.serviceId, packageId: plan.id, campaign: 'family-relocation' });
  }
});
check('Informational motivations never assign a service, plan, or finder answer', () => {
  for (const id of value.motivationIds) {
    const result = value.resolveMotivation(id);
    assert.ok(result);
    assert.deepEqual(Object.keys(result).filter(key => !['id', 'route', 'anchor'].includes(key)), []);
    assert.ok(routes.getPage(result.route));
  }
  for (const invalid of ['', 'constructor', '__proto__', null, true, 0, [], {}, 'MOVE', 'move?email=private@example.com']) assert.equal(value.resolveMotivation(invalid), undefined);
});
check('Anchors preserve sanitized context and reject unregistered values on every locale', () => {
  const context = { packageId: 'temporary-guided', campaign: 'residency-cost' };
  for (const locale of locales) for (const [route, anchors] of Object.entries(value.routeAnchors)) for (const anchor of anchors) {
    const url = new URL(selection.journeyHref(locale, route, context, anchor), 'https://preview.example');
    assert.equal(url.hash, `#${anchor}`);
    assert.equal(url.searchParams.get('plan'), 'temporary-guided');
    assert.equal(url.searchParams.get('service'), 'temporary-residency');
    assert.equal(url.searchParams.get('campaign'), 'residency-cost');
  }
  for (const injected of ['#benefits', 'benefits?email=private@example.com', '__proto__', 'toString', 'https://evil.example']) assert.equal(new URL(selection.journeyHref('en', '', {}, injected), 'https://preview.example').hash, '');
});
check('All affected pages fail closed with draft claims despite approved legacy flags', () => {
  for (const page of routes.pages.filter(page => review.pageClaimDependencies[page.key])) for (const locale of locales) {
    const proposed = { ...page, approved: true, commercialApproved: true, contentReviewed: true };
    assert.equal(seo.canIndex(proposed, approvedRuntime(runtime), locale), false);
    assert.equal(seo.pageMetadata(proposed, locale, approvedRuntime(runtime)).robots.index, false);
    assert.deepEqual(seo.buildSitemap([proposed], approvedRuntime(runtime)), []);
  }
});
check('Approval is locale specific, and every affected page needs all declared claims', () => {
  for (const [key, claimIds] of Object.entries(review.pageClaimDependencies)) for (const locale of locales) {
    assert.deepEqual(review.validatePageClaims({ key, claimIds }, locale, approved), []);
    assert.ok(review.validatePageClaims({ key }, locale, approved).length);
    for (const id of claimIds) {
      const absent = structuredClone(approved);
      delete absent[id];
      assert.ok(review.validatePageClaims({ key, claimIds }, locale, absent).length);
      const noTranslation = structuredClone(approved);
      delete noTranslation[id].translations[locale];
      assert.ok(review.validatePageClaims({ key, claimIds }, locale, noTranslation).length);
    }
  }
});
check('Impossible dates and whitespace approval identities remain blocked', () => {
  for (const invalid of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-01-00', 'not-a-date', ' ']) {
    const mutated = structuredClone(approved);
    mutated['legal-base'].content.approvedAt = invalid;
    assert.ok(review.validatePageClaims(routes.getPage('home'), 'en', mutated).some(error => error.includes('review date')));
  }
  const mutated = structuredClone(approved);
  mutated['legal-base'].content.reviewer = '  ';
  assert.ok(review.validatePageClaims(routes.getPage('home'), 'en', mutated).some(error => error.includes('reviewer')));
});
check('All preview routes remain noindex and all localized canonicals are self referencing', () => {
  for (const page of routes.pages) for (const locale of page.locales) {
    const metadata = seo.pageMetadata(page, locale);
    assert.equal(metadata.robots.index, false);
    assert.equal(metadata.alternates.canonical, `${runtime.siteUrl}/${locale}${page.path ? `/${page.path}` : ''}`);
    for (const equivalent of page.locales) assert.ok(metadata.alternates.languages[equivalent]);
  }
  assert.deepEqual(seo.buildSitemap(routes.pages), []);
});
check('Event serialization strips personal, arbitrary query and prototype data', () => {
  for (const eventId of ['benefit_detail_opened', 'motivation_selected', 'primary_cta_clicked']) {
    const event = analytics.sanitizeEvent({ eventId, routeKey: 'why-paraguay', benefit_id: 'tax-planning', motivation_id: 'second-base', email: 'private@example.com', notes: 'private@example.com', rawQuery: '?email=private@example.com', route: 'https://private@example.com', unknown: 'private@example.com' });
    assert.ok(event);
    assert.equal(JSON.stringify(event).includes('private@example.com'), false);
    assert.equal(event.is_demo, true);
  }
});
const report = { generatedAt: new Date().toISOString(), base, workingTree: cp.execFileSync('git', ['-C', repo, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), status: 'PASS', groups: observations.length, observations, sourceHashes: hashes, limitations: ['Independent transpile-and-execute domain probes; not a production browser or coverage measurement.', 'UI, screenshots, production build and full end-to-end checks are deferred until the coordinated final build.'] };
fs.writeFileSync(path.join(__dirname, 'domain-probe-results.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ status: report.status, groups: report.groups, observations }, null, 2));
