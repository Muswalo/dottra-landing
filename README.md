# Dottra Landing Site

Public landing site for Dottra at <https://dottra.co>.

## Development

```bash
bun install
bun run dev
```

## Build

```bash
SITE_URL=https://dottra.co bun run build
```

The build generates:

- Static legal and company pages
- A production site in `dist`

Open Graph images live in `public/og`. Regenerate them after copy changes with:

```bash
bun run generate:og
```

Policy pages are generated from Supabase when these values are available:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The GitHub Pages workflow reads those values from repository secrets.
