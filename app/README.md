# Dottra Website

Static, multipage public website for Dottra at <https://dottra.co>.

The build generates complete HTML for the homepage, product pages, pricing,
eligibility, company pages, policy pages, the blog index, and every article. No
public page depends on client-side routing or client-side rendering.

Core product copy, current package data, and hard-coded articles live in
`scripts/site-content.ts`. Page rendering and search-discovery files are built by
`scripts/generate-static-pages.ts`.

## Development

```bash
cd app
bun install
bun run dev
```

## Build

```bash
cd app
SITE_URL=https://dottra.co bun run build
```

The build generates:

- Static product, pricing, company, and policy pages
- A static blog index and standalone article pages
- Sitemap, RSS, robots, and AI-readable link index files
- A production site in `dist`

Open Graph images live in `public/og`. Regenerate them after copy changes with:

```bash
bun run generate:og
```

Policy pages are generated from Supabase when these values are available:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The GitHub Pages workflow reads those values from repository secrets.
