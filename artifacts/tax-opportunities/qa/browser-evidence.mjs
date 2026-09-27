// Read-only QA runner. Operates the existing local preview through agent-browser.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../../..');
const require = createRequire(resolve(repo, 'package.json'));
const baseline = JSON.parse(readFileSync(resolve(here, '../before/manifest.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(resolve(here, '../source-manifest.json'), 'utf8'));
const binary = process.env.QA_BROWSER_BINARY;
if (!binary) throw new Error('QA_BROWSER_BINARY must identify the installed agent-browser executable.');
const session = process.env.QA_BROWSER_SESSION;
if (!session) throw new Error('QA_BROWSER_SESSION must be a task-specific derived session name.');
const origin = process.env.QA_ORIGIN ?? baseline.origin;
const buildId = readFileSync(resolve(repo, '.next/BUILD_ID'), 'utf8').trim();
// Large enough for the local axe source and full audit result; overflow throws.
const MAX_OUTPUT_BYTES = Number(process.env.QA_MAX_OUTPUT_BYTES ?? 16 * 1024 * 1024);
const COMMAND_TIMEOUT_MS = Number(process.env.QA_COMMAND_TIMEOUT_MS ?? 60000);
const records = [];
function cli(args, input) {
  const run = spawnSync(binary, ['--session', session, '--json', ...args], {
    cwd: repo, encoding: 'utf8', input, maxBuffer: MAX_OUTPUT_BYTES, timeout: COMMAND_TIMEOUT_MS,
  });
  if (run.error || run.status !== 0) throw new Error(`${args[0]} failed: ${run.error ?? run.stderr}\n${run.stdout}`);
  const payload = JSON.parse(run.stdout.trim());
  if (!payload.success) throw new Error(JSON.stringify(payload));
  return payload.data;
}
const evaluate = (code) => cli(['eval', '--stdin'], code).result;
function save(name, value) { writeFileSync(resolve(here, name), JSON.stringify(value, null, 2) + '\n'); }
function assert(condition, message) { if (!condition) throw new Error(message); }
function inspect() {
  return evaluate(`({url:location.href,title:document.title,lang:document.documentElement.lang,dir:document.documentElement.dir,width:innerWidth,height:innerHeight,dpr:devicePixelRatio,scroll:document.documentElement.scrollWidth,robots:document.querySelector('meta[name="robots"]')?.content,userAgent:navigator.userAgent})`);
}
function open(route) { cli(['open', new URL(route, origin).href]); cli(['wait', '--load', 'networkidle']); }
function step(name) { const page=inspect(); records.push({name,...page}); return page; }
function click(selector) { cli(['click', selector]); cli(['wait','--load','networkidle']); }
function paramsCheck(page, plan, service) {
  const params = new URL(page.url).searchParams;
  assert(params.get('plan') === plan, `Unexpected plan: ${page.url}`);
  assert(params.get('campaign') === 'residency-cost', `Campaign lost: ${page.url}`);
  if(service) assert(params.get('service') === service, `Service mismatch: ${page.url}`);
}
const phase = process.argv[2];
mkdirSync(here,{recursive:true});
if (phase === 'journeys') {
  cli(['set','viewport','1440','900','1']);
  open('/en/why-paraguay?plan=temporary-guided&campaign=residency-cost');
  step('Why entry');
  cli(['click','#financial-planning a[href*="/company-formation/us?"]']);
  cli(['wait','--load','networkidle']);
  paramsCheck(step('US informational'), 'temporary-guided','temporary-residency');
  click('.language-switcher summary');
  click('.language-switcher a[lang="de"]');
  paramsCheck(step('German same route'), 'temporary-guided','temporary-residency');
  assert(new URL(inspect().url).pathname === '/de/company-formation/us','Locale route mismatch');
  click('.header-booking');
  paramsCheck(step('German booking'), 'temporary-guided','temporary-residency');
  assert(evaluate('document.querySelector("main").innerText').includes('Begleitet'),'Selected package missing');
  cli(['reload']); cli(['wait','--load','networkidle']);
  paramsCheck(step('German booking refresh'), 'temporary-guided','temporary-residency');
  for (const [route, plan, service] of [
    ['company-formation/us','us-business-setup','us-company'],
    ['company-formation/us','temporary-guided','us-company'],
    ['tax-planning','tax-planning','tax-planning'],
    ['tax-planning','temporary-guided','tax-planning'],
  ]) {
    open(`/en/${route}?plan=${plan}&campaign=residency-cost`);
    const container = route === 'tax-planning' ? '.tax-opportunities .service-inquiry' : '.service-inquiry';
    const inquiry = evaluate(`document.querySelector(${JSON.stringify(container)}).innerText`);
    const incompatible = plan === 'temporary-guided';
    assert(inquiry.includes('This service has a different scope') === incompatible, 'Compatibility notice mismatch');
    records.push({name:route+' inquiry before',plan,incompatible,inquiry});
    click(container+' a');
    paramsCheck(step(route+' inquiry after'), incompatible ? null : plan, service);
    assert(new URL(inspect().url).pathname === '/en/book','Inquiry did not reach booking');
  }
  open('/en/why-paraguay?plan=temporary-guided&campaign=residency-cost');
  cli(['set','viewport','390','844','1']);
  click('.language-switcher summary'); click('.language-switcher a[lang="he"]');
  paramsCheck(step('Hebrew Why mobile'), 'temporary-guided','temporary-residency');
  click('.mobile-menu summary');
  click('.mobile-menu a[href*="/pricing?"]');
  paramsCheck(step('Hebrew pricing mobile'), 'temporary-guided','temporary-residency');
  open('/en/why-paraguay');
  cli(['press','Tab']);
  const firstFocus = evaluate('({tag:document.activeElement.tagName,text:document.activeElement.innerText,href:document.activeElement.getAttribute("href")})');
  assert(firstFocus.text === 'Skip to content','First keyboard focus not skip link');
  cli(['press','Enter']);
  records.push({name:'Keyboard skip link',firstFocus,active: evaluate('({tag:document.activeElement.tagName,id:document.activeElement.id})')});
  cli(['focus','.mobile-menu summary']); cli(['press','Enter']);
  assert(evaluate('document.querySelector(".mobile-menu").open'),'Keyboard menu did not open');
  cli(['press','Escape']);
  assert(!evaluate('document.querySelector(".mobile-menu").open'),'Escape did not close menu');
  records.push({name:'Keyboard mobile menu open and Escape',status:'PASS'});
  save('journeys.json',{capturedAt:new Date().toISOString(),session,buildId,records});
  console.log(`PASS: ${records.length} journey/keyboard evidence records`);
}
if (phase === 'captures' || phase === 'capture-structures') {
  const shots = [...baseline.shots,
    {route:'/en/why-paraguay',width:1440,height:900,file:'en-structures-desktop.png',selector:'.tax-opportunities .benefit-grid'},
    {route:'/he/why-paraguay',width:390,height:844,file:'he-dividend-mobile.png',selector:'[data-tax-case="foreign-dividends"]'},
  ];
  for(const shot of shots) {
    if(phase === 'capture-structures' && shot.file !== 'en-structures-desktop.png') continue;
    cli(['set','viewport',String(shot.width),String(shot.height),'1']); open(shot.route);
    const selector = shot.selector ?? (shot.file==='en-why-financial-desktop.png' ? '#financial-planning h2' : null);
    const alignment = shot.file === 'en-structures-desktop.png' ? 'start' : 'center';
    if(selector) evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:${JSON.stringify(alignment)}})`);
    else evaluate('scrollTo(0,0)');
    const actual = inspect();
    assert(new URL(actual.url).pathname === new URL(shot.route,origin).pathname, 'Capture URL drifted');
    const file = resolve(here,'../after',shot.file);
    cli(['screenshot',...(!selector ? ['--full'] : []),file]);
    records.push({...shot,...actual,fullPage:!selector,alignment:selector?alignment:null,capturedAt:new Date().toISOString()});
  }
  if(phase === 'capture-structures') {
    const prior=JSON.parse(readFileSync(resolve(here,'../after/manifest.json'),'utf8'));
    prior.shots=prior.shots.map(shot=>records.find(replacement=>replacement.file===shot.file)??shot);
    prior.capturedAt=new Date().toISOString();
    writeFileSync(resolve(here,'../after/manifest.json'),JSON.stringify(prior,null,2)+'\n');
    console.log('PASS: extra structures screenshot recaptured with top alignment');
  } else {
  const result = {tool:'agent-browser',session,sourceFingerprint:manifest.sourceSha256,sourceManifest:'../source-manifest.json',buildId,origin,capturedAt:new Date().toISOString(),shots:records};
  writeFileSync(resolve(here,'../after/manifest.json'),JSON.stringify(result,null,2)+'\n');
  console.log(`PASS: ${records.length} fresh screenshots`);
  }
}
if(phase === 'responsive') {
  for(const locale of ['en','es','fr','de','he']) {
    open(`/${locale}/why-paraguay`);
    for(const width of [320,360,390,768,1440]) {
      cli(['set','viewport',String(width),width<768?'844':'900','1']);
      const data = evaluate(`(()=>{const financial=document.querySelector('#financial-planning');const visible=e=>!!(e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden');return {url:location.href,lang:document.documentElement.lang,dir:document.documentElement.dir,width:innerWidth,content:document.documentElement.scrollWidth,structures:[...financial.querySelectorAll('[data-tax-structure]')].map(e=>({id:e.dataset.taxStructure,visible:visible(e),text:e.innerText,box:e.getBoundingClientRect().toJSON()})),cases:[...financial.querySelectorAll('[data-tax-case]')].map(e=>({id:e.dataset.taxCase,visible:visible(e),text:e.innerText})),actions:[...financial.querySelectorAll('a[href^="/"]')].map(e=>({text:e.innerText,href:e.getAttribute('href'),visible:visible(e),box:e.getBoundingClientRect().toJSON()})),hiddenDisclosures:financial.querySelectorAll('details').length,robots:document.querySelector('meta[name="robots"]').content};})()`);
      assert(data.content <= data.width,`${locale} overflow at ${width}`);
      assert(data.structures.length===2 && data.structures.every(e=>e.visible),'Structures missing');
      assert(data.cases.length===2 && data.cases.every(e=>e.visible),'Cases missing');
      assert(data.actions.every(e=>e.visible && e.box.x>=0 && e.box.right<=width),'Action clipped or hidden');
      assert(data.hiddenDisclosures===0,'Qualifications hidden in disclosure');
      assert(data.robots.includes('noindex'),'Preview indexable');
      assert(data.dir===(locale==='he'?'rtl':'ltr'),'Wrong direction');
      records.push(data);
    }
  }
  save('responsive.json',{capturedAt:new Date().toISOString(),buildId,records});
  console.log(`PASS: ${records.length} locale/viewport checks`);
}
if(phase === 'axe') {
  const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
  for(const route of ['/en/why-paraguay','/es/why-paraguay','/fr/why-paraguay','/de/why-paraguay','/he/why-paraguay','/en/tax-planning','/en/company-formation/us','/en/company-formation/paraguay']) {
    cli(['set','viewport','390','844','1']); open(route);
    evaluate(axeSource);
    const result=evaluate(`(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {url:r.url,timestamp:r.timestamp,testEngine:r.testEngine,testEnvironment:r.testEnvironment,violations:r.violations,incomplete:r.incomplete,passes:r.passes.map(x=>({id:x.id,nodes:x.nodes.length})),inapplicable:r.inapplicable.map(x=>x.id)};})()`);
    save('axe-'+route.slice(1).replaceAll('/','-')+'.json',result);
    records.push({route,violations:result.violations.length,incomplete:result.incomplete.map(x=>({id:x.id,nodes:x.nodes.length})),passes:result.passes.length});
    assert(result.violations.length===0,`Axe violations ${route}`);
  }
  save('axe-summary.json',{capturedAt:new Date().toISOString(),records});
  console.log(`PASS: ${records.length} axe audits; ${records.reduce((n,r)=>n+r.violations,0)} violations`);
}
if(phase === 'zoom') {
  for(const locale of ['en','de','he']) {
    cli(['set','viewport','720','450','2']); open(`/${locale}/why-paraguay#financial-planning`);
    const page=inspect();
    assert(page.dpr===2 && page.width===720 && page.scroll<=720,'Equivalent 200% viewport failed');
    evaluate('document.querySelector("[data-tax-case=foreign-dividends]").scrollIntoView({block:"start"})');
    const cards=evaluate(`Array.from(document.querySelectorAll('[data-tax-structure], [data-tax-case]')).map(e=>({key:e.dataset.taxStructure??e.dataset.taxCase,width:e.getBoundingClientRect().width,visible:!!e.getClientRects().length}))`);
    assert(cards.length===4 && cards.every(e=>e.visible && e.width<=720),'Zoom content hidden/clipped');
    cli(['screenshot',resolve(here,`zoom-${locale}.png`)]);
    records.push({...page,cards,model:'1440x900 desktop represented by 720x450 CSS viewport, deviceScaleFactor2; not native browser zoom'});
  }
  save('zoom.json',{capturedAt:new Date().toISOString(),records});
  console.log(`PASS: ${records.length} equivalent 200% reflow checks`);
}
if(phase === 'diagnostics') {
  const result={capturedAt:new Date().toISOString(),page:inspect(),console:cli(['console']),errors:cli(['errors']),network:cli(['network','requests'])};
  save('diagnostics.json',result);
  console.log(`Recorded ${result.network.requests.length} requests, ${result.console.messages.length} console messages and ${result.errors.errors.length} page errors.`);
}
if(phase === 'contrast') {
  const audits=JSON.parse(readFileSync(resolve(here,'axe-summary.json'),'utf8'));
  const channel=c=>{c/=255;return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4;};
  const luminance=color=>{const channels=color.match(/\d+/g).map(Number).map(channel);return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;};
  cli(['set','viewport','390','844','1']);
  for(const row of audits.records) {
    open(row.route);
    const style=evaluate(`(()=>{const e=document.querySelector('.mobile-menu summary');return {url:location.href,text:e.innerText,color:getComputedStyle(e).color,background:getComputedStyle(document.querySelector('.site-header')).backgroundColor,name:e.getAttribute('aria-label'),visible:!!e.getClientRects().length};})()`);
    const ratio=(luminance(style.background)+0.05)/(luminance(style.color)+0.05);
    assert(ratio>=3 && style.visible && style.name,'Menu glyph review failed');
    records.push({...style,contrastRatio:ratio,review:'Shared mobile menu glyph; computed color against opaque header background. Axe could not classify non-text character.'});
  }
  save('contrast-review.json',{capturedAt:new Date().toISOString(),records});
  console.log(`PASS: ${records.length} incomplete menu contrast entries reviewed`);
}
