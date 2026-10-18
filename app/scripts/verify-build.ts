// Post-build checks for dist/. Fails (exit 1) on any problem.
//   - every URL from the previous site's sitemap still exists
//   - every internal link and asset reference resolves
//   - one canonical per page, pointing at the page itself; JSON-LD parses
//   - no gradients in any shipped CSS/HTML
//   - site copy (not the database-driven legal text) avoids retired product
//     terms and sales language
//
// Run after a build: bun scripts/verify-build.ts

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const site = 'https://dottra.co';
const problems: string[] = [];
const warnings: string[] = [];

const oldUrls = [
  '/', '/privacy/', '/terms/', '/cookies/', '/licences/', '/product/', '/how-it-works/', '/eligibility/',
  '/about/', '/support/', '/contact/', '/delete-account/', '/pricing/', '/blog/',
  '/blog/introducing-dottra/', '/blog/how-to-get-out-of-debt/', '/blog/a-monthly-budget-you-can-keep/',
  '/blog/build-an-emergency-fund/', '/blog/plan-for-annual-expenses/', '/blog/use-a-credit-line-with-a-plan/',
  '/feed.xml', '/robots.txt', '/sitemap.xml', '/llms.txt', '/manifest.json', '/CNAME',
];

const legalPages = new Set(['/privacy/', '/terms/', '/cookies/', '/licences/']);

// Retired product language and sales language. Checked case-insensitively on
// visible text only.
const banned: [RegExp, string][] = [
  [/\bloans?\b/i, 'the word "loan"'],
  [/\bcredit packages?\b|\bpackage table\b/i, 'retired "package" model'],
  [/\bfixed charge\b/i, 'retired "Fixed Charge"'],
  [/\bbank mandate\b|\bdebit mandate\b/i, 'retired bank mandate repayment'],
  [/\btotal to repay\b/i, 'retired per-draw "total to repay"'],
  [/\b(instant approval|guaranteed|no questions asked|hassle[- ]free|seamless|revolutionary|game[- ]chang|unlock|empower|supercharge|best-in-class|world-class|cutting[- ]edge|act now|don't miss|limited time|sign up today|effortless)\w*/i, 'sales or filler language'],
];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function fileFor(urlPath: string): string | null {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const candidates = clean.endsWith('/')
    ? [join(dist, clean, 'index.html')]
    : [join(dist, clean), join(dist, clean, 'index.html')];
  return candidates.find((p) => existsSync(p)) ?? null;
}

function routeOf(file: string): string {
  const rel = file.slice(dist.length).replace(/\\/g, '/');
  if (rel === '/404.html') return '/404/';
  return rel.replace(/index\.html$/, '');
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

if (!existsSync(dist)) {
  console.error('dist/ not found. Run the build first.');
  process.exit(1);
}

// 1. URL continuity
for (const url of oldUrls) {
  if (!fileFor(url)) problems.push(`missing old URL: ${url}`);
}

const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// 2. Gradients anywhere in shipped CSS/HTML
for (const f of files.filter((p) => /\.(css|html)$/.test(p))) {
  if (/gradient\s*\(/i.test(readFileSync(f, 'utf8'))) problems.push(`gradient found in ${f.slice(dist.length)}`);
}

let linksChecked = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeOf(file);

  // 3. Canonical + JSON-LD + title/description
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  if (route === '/404/') {
    if (canonicals.length !== 0) problems.push('/404/: should not declare a canonical URL');
    if (!/<meta name="robots" content="noindex/.test(html)) problems.push('/404/: should be noindex');
  } else if (canonicals.length !== 1) problems.push(`${route}: expected 1 canonical, found ${canonicals.length}`);
  else if (canonicals[0] !== `${site}${route}`)
    problems.push(`${route}: canonical ${canonicals[0]} does not match the page`);

  if (!/<title>[^<]{10,}<\/title>/.test(html)) problems.push(`${route}: missing or short <title>`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (desc.length < 50) problems.push(`${route}: meta description missing or too short`);
  if (desc.length > 170) warnings.push(`${route}: meta description is ${desc.length} chars (over ~160 may be cut)`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) problems.push(`${route}: expected exactly one <h1>`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      problems.push(`${route}: invalid JSON-LD`);
    }
  }

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(m[0])) problems.push(`${route}: <img> without alt`);
  }

  // 4. Internal links and assets (only srcset is a comma-separated list)
  for (const m of html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    const values = m[1] === 'srcset' ? m[2].split(',').map((s) => s.trim().split(/\s+/)[0]) : [m[2].trim()];
    for (const raw of values) {
      if (!raw || /^(https?:|mailto:|tel:|data:|#|\/\/)/.test(raw)) {
        if (raw.startsWith(`${site}/`)) {
          const path = raw.slice(site.length);
          if (!fileFor(path)) problems.push(`${route}: absolute link to missing ${path}`);
        }
        continue;
      }
      linksChecked++;
      const target = raw.startsWith('/') ? raw : new URL(raw, `${site}${route}`).pathname;
      if (!fileFor(target)) problems.push(`${route}: broken link ${raw}`);
    }
  }

  // 5. Copy rules (legal text comes from the database and is checked separately)
  if (!legalPages.has(route)) {
    const text = visibleText(html);
    for (const [re, label] of banned) {
      const hit = text.match(re);
      if (hit) problems.push(`${route}: ${label}: "...${text.slice(Math.max(0, hit.index! - 40), hit.index! + 40).trim()}..."`);
    }
  }
}

// Legal pages: report retired terms as warnings, because they must be fixed
// by republishing the policy in the admin dashboard, not in this repo.
for (const route of legalPages) {
  const f = fileFor(route);
  if (!f) continue;
  const text = visibleText(readFileSync(f, 'utf8'));
  for (const [re, label] of banned.slice(0, 5)) {
    if (re.test(text)) warnings.push(`${route} (from Supabase) still contains ${label}; republish it in the admin dashboard`);
  }
}

// 6. Feeds and sitemap
const feed = fileFor('/feed.xml');
if (feed && !readFileSync(feed, 'utf8').includes('<item>')) problems.push('feed.xml has no items');
const sitemap = fileFor('/sitemap-0.xml');
if (!sitemap) problems.push('sitemap-0.xml missing');
else {
  const xml = readFileSync(sitemap, 'utf8');
  if (xml.includes('/404')) problems.push('404 page is listed in the sitemap');
  for (const url of oldUrls.filter((u) => u.endsWith('/'))) {
    if (!xml.includes(`<loc>${site}${url}</loc>`)) problems.push(`sitemap is missing ${url}`);
  }
}

console.log(`Checked ${htmlFiles.length} HTML pages and ${linksChecked} internal links.`);
for (const w of warnings) console.log(`WARN  ${w}`);
if (problems.length) {
  for (const p of problems) console.log(`FAIL  ${p}`);
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log('All checks passed.');
