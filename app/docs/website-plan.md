# dottra.co — content rewrite, SEO diagnosis, and Astro migration plan

**Written:** 14 October 2026
**Repo:** `dottra-site` (deployed to GitHub Pages at https://dottra.co)
**Decision taken:** migrate the site to **Astro**. Content rewrite comes first.

> **Where this file lives and why.** It is in `app/docs/` deliberately. The GitHub Actions workflow builds `app/` and then `rsync -a --delete app/dist/ ./` over the repository root. Anything at the root that is not in `app/dist` gets **deleted** on the next build. Only `.git`, `.github`, `.gitignore`, `app`, `dist` and `node_modules` are excluded. Never put source or docs at the repo root.

---

## 1. How the site works today

- **`app/` is the source. The repository root is the published output.** A GitHub Action (`.github/workflows/deploy.yml`) triggers on pushes to `main` that touch `app/**`, builds, rsyncs `app/dist/` over the root, and commits the result as `"Build site [skip build]"` (the `[skip build]` marker stops it recursing).
- **Pages are generated, not React-rendered.** Despite being a Vite + React project, no public page loads `main.tsx`. `app/scripts/generate-static-pages.ts` (1,085 lines) writes complete HTML, with all copy in `app/scripts/site-content.ts` (641 lines). `bun run build` = `generate:static` → `tsc -b` → `vite build`.
- **13 pages:** home, product, how-it-works, pricing, eligibility, about, support, contact, delete-account, 4 policy pages, blog index + 6 articles.
- **Policy pages are dynamic at build time.** `privacy`, `terms`, `cookies`, `licences` are fetched from Supabase (`published_policies_v`) with the publishable key, read from repo secrets in CI. If the fetch fails, the generator keeps the existing page and warns — it does not fail the build.
- **Also generated:** `sitemap.xml`, `feed.xml`, `robots.txt`, `llms.txt` (an AI-crawler link index), and OG images (`bun run generate:og`, committed under `public/og`).
- **Hosting:** GitHub Pages, custom domain via `CNAME` (`dottra.co`), HTTPS with HSTS.

### Dead weight found
- `app/src/App.tsx` (223 lines) and `app/src/App.css` — leftover Vite scaffolding, loaded by nothing.
- `app/src/types/database.types.ts` — 5,484 generated lines used for a single enum type (`policy_document_key`).
- A `dist/` directory is committed **at the repo root** despite being in `.gitignore`, duplicating the published output.
- Local `main` is **1 commit behind `origin/main`** (the bot's build commit). `delete-account/` exists on the remote root but not locally. **Pull before doing anything.**

---

## 2. Problem 1 — the site sells the product that was just retired

This is the urgent one. Every product page describes the **old per-loan/package model**. The app now runs the revolving credit facility (see `dottra-app/docs/revolving-credit-facility-migration.md`).

| The website currently says | What the app actually does |
|---|---|
| Fixed **credit packages**: 16 salaried amounts K50–K3,000, 8 student amounts K75–K400 | Any draw amount from **K10** up to available credit. No packages exist |
| **Fixed Charge, 20%**, one-time per draw | **Monthly charge**, 20% of the **average daily balance** |
| **30-day term** per draw, "total to repay" shown per draw | **Monthly statement** per calendar month, due 7 days after the statement date |
| Repayment via **registered bank mandate** | Repayment over **mobile money** (MTN, Airtel, Zamtel) |
| "Choose an available credit package" as a journey step | Enter an amount; no package selection step |
| Pricing page publishes a full package table with Fixed Charge and "total to repay" columns | Pricing is: 5% processing fee (min K1), 20% monthly charge on average daily balance, 7-day grace, K10 minimum draw |

**Why this is more than a copy problem.** The pricing page is a *published price list for a credit product* and the terms page is a *contract*. Both now misstate how charges are calculated. That is a regulatory and trust exposure, and it is the first thing an investor or regulator checks. The app's own copy rules forbid the words "loan" and "package"; the website is the last place they survive.

### Exactly where the old model is encoded

| Location | What to change |
|---|---|
| `app/scripts/site-content.ts` lines ~43–66 | `processingFeeRate` (keep 0.05), `fixedChargeRate` → delete, `packageTermDays` → delete, `salariedPackageAmounts` / `studentPackageAmounts` → delete. Add monthly-charge rate, minimum draw, grace days |
| `app/scripts/site-content.ts` — `standardPages` entry `product` | "One account. Reusable access." still says "choose an active credit package". Fixed Charge in the cost list |
| `app/scripts/site-content.ts` — `how-it-works` | Step 4 is literally "Choose an available credit package". Step 6 says "registered bank mandate" |
| `app/scripts/site-content.ts` — `eligibility` | Quotes package ranges (K50–K3,000, K75–K400) and requires registering a bank mandate |
| `app/scripts/site-content.ts` — blog post `introducing-dottra` | Describes packages, Fixed Charge, 30-day terms |
| `app/scripts/site-content.ts` — blog post `use-a-credit-line-with-a-plan` | "choose the smallest available package", Fixed Charge on the confirmation screen |
| `app/scripts/generate-static-pages.ts` — `renderPricingPage()` (~line 708) | The whole page: rate summary cards, the worked example ("select K500, receive K475, repay K600 after 30 days"), and the 16-row package table |
| `app/scripts/generate-static-pages.ts` — `renderHomePage()` (~line 576) | Feature 01 lists "one-time Fixed Charge" |
| **Supabase `published_policies_v`** | `terms` defines "Credit Package" and "Fixed Charge" as legal terms. **Not in this repo** — must be republished from the admin dashboard |
| `app-screenshot.png` (root) and `app/public/` | Shows the retired package UI |

**Division of labour:** the marketing copy (product/how-it-works/eligibility/pricing/blog) can be rewritten in this repo. The **legal text must be republished from the admin console** and needs your sign-off — an agent should not be wording a credit contract.

---

## 3. Problem 2 — the SEO diagnosis (this is not what we assumed)

The working assumption was "the site isn't being indexed, and PHP would fix it." I checked the live site rather than guessing, and that is **not** what is happening.

### What I verified

Fetched `https://dottra.co/` with a Googlebot user agent:

- Returns **HTTP 200** with complete, server-rendered HTML. Real `<h1>Your reusable credit line.</h1>`, real `<title>`.
- **Correct self-referencing canonical** on every page checked (`/`, `/pricing/`, `/product/`, `/blog/`).
- **No `noindex`** anywhere.
- Valid JSON-LD (Organization + WebSite), OG and Twitter cards, per-page titles and descriptions.
- `robots.txt` → `Allow: /` plus a sitemap reference. `sitemap.xml` → 19 URLs, all 200.
- Internal links are plain `<a href>` — fully crawlable.
- HTTPS with HSTS, served from GitHub's CDN (edge region `southafricanorth`).

**And it is indexed.** A `site:dottra.co` search returns the homepage. A search for "dottra Zambia credit line app" ranks **dottra.co first**, above Lupiya, ZamCash, Tandiza and the rest.

### So what is actually wrong

**Only the homepage is indexed, and the site ranks for nothing except the brand name.** That is a content problem, not a rendering problem. Three causes:

1. **Thin content.** The homepage has **337 words** of visible text. Inner pages are short. Google's "Discovered – currently not indexed" bucket is mostly thin pages.
2. **Tiny footprint.** 13 pages total, of which 6 are blog articles on generic personal finance ("Build an emergency fund", "A monthly budget you can keep") that target no Zambian credit search term and compete with the entire internet.
3. **Brutal competition with no authority to match it.** The search for Zambian lending surfaced Lupiya, ZamCash, ZamCredit, Tandiza, Afrimula, iBatFasta, SoloCredit. The site was last built 18 September and has essentially no backlinks.

**Googlebot cannot tell PHP-rendered HTML from Vite-generated HTML.** It sees bytes. Rewriting the same 13 thin pages in PHP or Astro would take a week and move rankings approximately zero.

### A caveat on my own evidence

A `site:` query is a rough instrument. **Google Search Console is the ground truth** and has not been consulted. Before committing to any plan, verify the domain in Search Console and read the Page Indexing report — it names each URL as "Discovered but not indexed", "Crawled but not indexed", or indexed, which tells you precisely whether this is thin content or something else. That is step 1 of the plan below.

---

## 4. Why the PHP sites rank (and what actually transfers)

I read `~/Projects/heptaa-app` (107 PHP files) and `~/Projects/nurse-tendia-blog` (80 PHP files). The SEO engineering there is genuinely good and worth copying — but it is not *why* they rank.

### What those sites do well (copy these ideas)

From `heptaa-app/includes/layout.php` and `includes/views/layout/head.php`:

- **A single `page_start()` entry point** per page that takes `title`, `description`, `keywords`, `path`, `breadcrumbs` and `schema`, and defaults everything else. One place to get the head right, impossible to forget a canonical.
- **A JSON-LD `@graph`**: Organization on every page, plus a BreadcrumbList when there is more than one crumb, plus per-page nodes (`AboutPage`, `Article`, …), all merged into one script tag with `@id` cross-references. This is better than Dottra's current flat array of two objects.
- **Breadcrumbs as data**, driving both the visible trail and the schema.
- **A generated sitemap** (`sitemap.php`) built from live site data, rewritten to `/sitemap.xml`.
- **Clean URLs with 301s** in `.htaccess`: strip `.php`, strip `/index.php`, force HTTPS — all `GET`/`HEAD` only so POST bodies survive.
- **Per-page `og_type`, article published time and author** for content pages.
- **Performance details**: font preloading with `crossorigin`, versioned CSS/JS with one-year cache headers, `mod_deflate`, `Options -Indexes`, a branded 404.
- **Admin-overridable SEO settings** (`site_setting('seo_meta_description')`) with code defaults.

### What actually makes them outrank Dottra

- **Content depth.** Hepta has services, team pages, thought-leadership and publications — dozens of pages, each targeting a distinct query, many of them substantial documents. Dottra has 13 thin pages.
- **Low-competition niche.** "Tax advisory Zambia" has few serious online competitors. "Loan app Zambia" is a knife fight.
- **Age and links.** Those domains have been accumulating crawl history and backlinks.

**Conclusion:** adopt their *patterns* (the `page_start`-style single source of head truth, the `@graph`, breadcrumbs, generated sitemap). Do not adopt PHP expecting a ranking change.

---

## 5. Decision: Astro, not PHP

**Astro**, for this site, for these reasons:

| | Astro | PHP |
|---|---|---|
| Hosting | Keeps GitHub Pages: free, global CDN, zero servers to patch | Needs a host (cPanel), PHP patching, FTP/Actions deploy, a server that can go down |
| Output | Static HTML by default — identical SEO properties to today | Rendered per request; needs caching to match static speed |
| Existing work | Keeps the TypeScript content pipeline and `site-content.ts` almost as-is | Full rewrite of the generator into PHP templates |
| Blog | Content collections: Markdown/MDX with typed frontmatter, schema validation | Hand-rolled, or a database + admin panel |
| Image handling | Built-in `<Image>`: responsive `srcset`, WebP/AVIF, lazy loading, correct dimensions | Manual |
| Right choice when | The site is content that changes on deploy | You need a database, logins, an admin panel (which is exactly why Hepta is PHP) |

Dottra's site is 13 static pages plus four policy documents fetched at build time. It has no logins, no forms that write to a database, no per-request state. A server buys nothing and costs patching.

**What Astro concretely improves over the current setup:**

1. **Replaces 1,085 lines of string-concatenating HTML generator** with components and layouts — far less room for a malformed tag or a missing canonical.
2. **Content collections for the blog**: articles become Markdown with typed frontmatter instead of TypeScript object literals, so writing an article stops being a code change.
3. **Real image pipeline** — the current site ships a 424 KB PNG screenshot and a 646×250 PNG badge with no responsive variants. This is probably the biggest Core Web Vitals win available.
4. **One `<SEO>` component** (modelled on `page_start()`) so title/description/canonical/OG/JSON-LD can never drift per page.
5. **`@astrojs/sitemap` and `@astrojs/rss`** replace hand-written generators.
6. Keeps `generate-og-images.ts` and the Supabase policy fetch (as a build-time loader).

---

## 6. The plan, in order

**Content before framework.** The content is wrong today and will still be wrong after a migration; fixing it first also means the migration ports correct copy instead of porting mistakes twice.

### Phase 0 — Diagnose properly (do first, needs you)
1. **Verify `dottra.co` in Google Search Console** and read the Page Indexing report. This replaces my `site:` guess with facts: which URLs are indexed, which are "Discovered – currently not indexed" (thin), which are "Crawled – currently not indexed". Submit `sitemap.xml`.
2. **Pull the remote build commit** (`git pull`) so local and `origin/main` match before any edits.

### Phase 1 — Fix the content on the current stack (highest urgency)
3. **Rewrite the pricing page** for the revolving model. Replace the 16-row package table with the rate structure (5% processing fee min K1 / 20% monthly charge on average daily balance / 7-day grace / K10 minimum draw) and **one clear worked example**, e.g. *draw K500, receive K475, hold it 30 days, the monthly charge is ~K100 on an average daily balance of K500.* **Have the exact figures checked against `pricing_config_versions` and `facility-math.ts` before publishing** — this is a published price list.
4. **Rewrite product / how-it-works / eligibility** for the draw → statement → repay cycle, mobile-money repayment, free draw amounts, and the freeze/restore behaviour.
5. **Update the two blog posts** that describe packages (`introducing-dottra`, `use-a-credit-line-with-a-plan`).
6. **Republish terms, privacy, cookies, licences** from the admin dashboard with the new definitions (replace "Credit Package" and "Fixed Charge"). **Needs your approval — legal text.**
7. **New screenshots** from the current build, exported at a sensible size, for the site and the Play Store listing.
8. Regenerate OG images (`bun run generate:og`) after the copy settles.

### Phase 2 — Migrate to Astro
9. Scaffold Astro inside `app/` (keep the repo layout and the Action's rsync step; Astro's default output is `dist/`, which the workflow already publishes).
10. Build the shared pieces first: `BaseLayout`, an `<SEO>` component (title, description, canonical, OG, Twitter, JSON-LD `@graph` with Organization + BreadcrumbList + page node), `Header`, `Footer`, `Breadcrumbs`.
11. Port the static pages, moving copy from `site-content.ts` into page frontmatter or `src/content/`.
12. Move the 6 blog articles into a content collection with a typed schema (title, summary, category, publishedAt, readingTime).
13. Keep the Supabase policy fetch as a build-time data loader, preserving the current fallback behaviour (keep the existing page, warn, do not fail the build).
14. Swap the hand-written sitemap/RSS for `@astrojs/sitemap` and `@astrojs/rss`.
15. Replace raw `<img>` with Astro `<Image>` for the screenshot, badge and OG assets.
16. Delete the dead `App.tsx` / `App.css`, drop the 5,484-line generated types file if the policy loader can be typed by hand, and untrack the root `dist/`.
17. **Verify before cutover:** every URL in the old sitemap still resolves (no 404s, no changed paths — URL continuity matters more than anything else here), canonicals are self-referencing, JSON-LD validates, and Lighthouse SEO/performance is at least as good as today.

### Phase 3 — Earn the rankings (the part that actually moves search)
18. **Write content targeting how Zambians actually search.** Not "Build an emergency fund" — pages like:
    - how to borrow money in Zambia using mobile money
    - salary advance vs credit line in Zambia
    - HELSB student funding and short-term credit
    - MTN / Airtel / Zamtel mobile money loan options
    - what to check before taking a loan app in Zambia
    Each one substantial (800+ words), genuinely useful, and internally linked to product/pricing/eligibility.
19. **Thicken the key pages.** The homepage at 337 words is too thin to rank for anything competitive. Product, how-it-works and eligibility should each answer the questions a real applicant asks.
20. **Add FAQ schema** to pricing and eligibility (real questions, real answers) — strong for the question-shaped queries this product attracts.
21. **Get the first backlinks:** the Play Store listing, your own developer site, Zambian startup/fintech directories, any press.
22. **Measure in Search Console** monthly: impressions, average position, which queries appear. Let the data choose the next articles.

---

## 7. Facts a future session should not have to re-derive

- Live site returns 200 with full server-rendered HTML; **it is indexed**; it ranks #1 for "dottra Zambia credit line app"; homepage visible text = **337 words**.
- Published output lives at the repo root and is **regenerated and `--delete`d** on every build from `app/dist/`. Never edit root files; never add root files you want to keep.
- Policy pages come from Supabase at build time, keyed by `policy_document_key`, via `published_policies_v`, using `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (CI secrets). Failure is soft.
- The build commit message must contain `[skip build]` or the workflow recurses (it already does this).
- `pricing_reviewedAt` in `site-content.ts` is `'12 July 2026'`; terms say "Last updated August 13, 2026". Both need updating with the rewrite.
- The current rate constants in `site-content.ts` (`processingFeeRate = 0.05`, `fixedChargeRate = 0.2`, `packageTermDays = 30`) are **duplicated knowledge** of the app's pricing. After the rewrite, consider documenting that they must be checked against `pricing_config_versions` whenever pricing changes — there is no automated link between the app's pricing config and the website's published rates, and a drift here is a mispriced public offer.

### Commands

```bash
cd dottra-site/app
bun install
bun run dev                                   # local dev
SITE_URL=https://dottra.co bun run build      # generate + build
bun run generate:og                           # regenerate OG images
bun run lint
```

---

## 8. Open questions for you

1. **Pricing copy must be signed off.** I can draft the revolving-model pricing page, but the published figures and the worked example need your confirmation against the live `pricing_config_versions` before they go out.
2. **Legal text.** Terms/privacy/cookies/licences are database-driven and define retired concepts. Do you want to draft the new definitions, or should I propose wording for your review and a lawyer's?
3. **Screenshots.** Do you want them from a real device build, or generated from the simulator at a fixed size?
4. **Scope of Phase 3.** How many articles do you want in the first batch? Five substantial, Zambia-specific pages would be a meaningful start; the existing six generic ones could be kept, rewritten with a Zambian angle, or retired.
5. **Blog authorship.** Content collections make articles writable without touching code. Worth deciding whether anyone other than you will write them, since that affects whether a CMS is ever needed (and that is the one scenario where PHP or a headless CMS would come back into the conversation).
