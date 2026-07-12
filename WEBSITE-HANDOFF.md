# Dottra Website Handoff

## Direction

The website is a static, multipage company site. Every route contains complete semantic HTML at build time. Product copy, rate tables, and articles do not depend on client-side JavaScript or client-side routing.

The homepage is intentionally concise. Detailed product information belongs on dedicated pages so the site reads as a stable financial platform rather than a promotional startup page.

## Public Pages

| Route | Purpose |
| --- | --- |
| `/` | Minimal product introduction and primary app action |
| `/product/` | Reusable credit-line overview |
| `/how-it-works/` | Verification, limit, draw, confirmation, delivery, and repayment process |
| `/pricing/` | Current rate summary and complete static package table |
| `/eligibility/` | Salaried and student requirements |
| `/blog/` | Static article index |
| `/about/` | Company purpose and Zambia focus |
| `/support/` | Account-help routes and security guidance |
| `/contact/` | Company, support, privacy, and registered-office contacts |
| `/terms/`, `/privacy/`, `/cookies/`, `/licences/` | Published policy pages |

The build also generates `sitemap.xml`, `feed.xml`, `robots.txt`, and `llms.txt`.

Each article includes static sharing links for WhatsApp, LinkedIn, and X. These links work without client-side JavaScript.

## Product Narrative

Preferred vocabulary:

- reusable digital credit line
- available credit
- approved credit limit
- credit package
- draw and amount drawn
- Processing Fee
- one-time Fixed Charge
- amount received
- total to repay
- repayment date
- available again
- draw, repay, reuse

Keep Dottra positioned as an account with repeatable access. Do not frame the product as a one-time cash transaction, a salary rescue, or guaranteed emergency money.

Do not promise arbitrary amounts, automatic approval, permanent availability, immediate provider processing, or a fixed future price. Customers choose from active packages, and each draw remains subject to current eligibility, available credit, package availability, account controls, and provider processing.

The educational article about getting out of debt is intentionally about managing existing obligations. It does not define or position the Dottra product.

The exact registered company name appears only where company or legal identification is required.

## Current Pricing

Catalogue checked against the active app backend on 12 July 2026:

| Audience | Current packages | Processing Fee | Fixed Charge | Term |
| --- | --- | ---: | ---: | ---: |
| Salaried | K50 to K3,000 across the published package table | 5% | 20% once | 30 days |
| Government-sponsored students | K75 to K400 across the published package table | 5% | 20% once | 30 days |

Calculation:

- Amount received = selected amount minus the 5% Processing Fee.
- Total to repay = selected amount plus the one-time 20% Fixed Charge.
- Example: select K500, receive K475, repay K600 after 30 days.

The Fixed Charge is set once for the completed draw. There is no registration, membership, or subscription fee.

The catalogue is database-managed. Recheck it before each public release. The in-app confirmation remains the final source for an individual draw.

Website rate constants and package arrays are in `app/scripts/site-content.ts`. The package-table rendering is in `app/scripts/generate-static-pages.ts`.

## Blog

All articles are hard-coded in `app/scripts/site-content.ts` and rendered as independent HTML pages. The current set is authored by Emmanuel Muswalo:

1. Introducing Dottra: your reusable credit line.
2. How to get out of debt: a practical plan.
3. A monthly budget you can actually keep.
4. Build an emergency fund one salary cycle at a time.
5. Plan for annual expenses before they arrive.
6. Use a credit line without losing sight of your budget.

When adding an article:

1. Add the article record to `blogPosts` in `app/scripts/site-content.ts`.
2. Add its HTML input to `app/vite.config.ts`.
3. Run the full build so the article, blog index, RSS feed, sitemap, and AI-readable index are regenerated.

## App Screenshots

Current hero asset:

- Source: `app/public/app-screenshot.png`
- Current dimensions: `1046 x 1860`
- Used on: homepage hero and launch article

Replace this before the final public release with an anonymised production capture. The current image contains a personal name and account activity.

Capture Android source screens at `1080 x 2400` or `1440 x 3200` in portrait orientation. Use the same device frame, theme, and realistic but fictional account state throughout. Remove real names, phone numbers, NRC details, wallet numbers, transaction references, notifications, and status-bar clutter.

Recommended files:

| File | Screen | Intended placement |
| --- | --- | --- |
| `app/public/screenshots/dashboard.webp` | Available credit and account activity | Homepage hero |
| `app/public/screenshots/package-selection.webp` | Active package choices | Product or how-it-works page |
| `app/public/screenshots/cost-confirmation.webp` | Processing Fee, amount received, Fixed Charge, date, and total | Pricing page |
| `app/public/screenshots/repayment-status.webp` | Scheduled repayment and restored credit state | How-it-works page |
| `app/public/screenshots/security.webp` | PIN or biometric authorisation | Product page |

Export WebP or AVIF derivatives for the website and retain the full-resolution PNG source outside the deployed public folder. Target less than 700 KB per portrait website image where visual quality allows it.

Other image sizes:

| Asset | Dimensions | Suggested path |
| --- | ---: | --- |
| Blog cover | `1600 x 900` | `app/public/blog/<article-slug>.webp` |
| Social/Open Graph image | `1200 x 630` | `app/public/og/<page-slug>.png` |
| Wide editorial photograph | `1800 x 1200` | `app/public/blog/<article-slug>-editorial.webp` |

The Google Play action uses Google's official current English badge at `app/public/google-play-badge.png`. Keep its colours, aspect ratio, internal spacing, and wording unchanged.

Use Zambia-specific photography only when usage rights are clear. Avoid distressed subjects, cash-in-hand images, generic bank cards, or any visual that makes Dottra appear to be a one-time cash service.

## Build And Review

From `dottra-site/app`:

```bash
bun run lint
bun run build
bun run dev
```

The production build writes every route to `app/dist`. The repository workflow publishes `app/dist` to the site root after changes reach the main branch.

Before release:

- Recheck the live rate catalogue and update the reviewed date.
- Replace the current screenshot with anonymised captures.
- Confirm Google Play and App Store status.
- Confirm supported mobile-money providers and student institutions.
- Have current product claims, policy pages, and registered-company details reviewed.
- Regenerate Open Graph images after headline or brand-copy changes.
- Review the homepage, pricing table, blog index, and one full article at desktop and mobile widths.
