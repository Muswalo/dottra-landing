# dottra.co

The public website for Dottra, built with [Astro](https://astro.build) as a
static site and published to GitHub Pages.

## Where things live

| Path | What it is |
| --- | --- |
| `src/pages/` | One file per page. The file name is the URL (`pricing.astro` → `/pricing/`). |
| `src/content/blog/` | Blog articles in Markdown. The file name is the URL slug. |
| `src/data/site.ts` | Company details, navigation, and **the published prices**. |
| `src/components/` | Header, footer, SEO head, photos, sections. |
| `src/styles/` | `base.css` (the original design) and `additions.css`. |
| `src/lib/policies.ts` | Fetches the legal documents from Supabase at build time. |
| `src/assets/` | The app screenshot and photos (optimised to WebP at build). |
| `public/` | Files copied as-is: icons, CNAME, manifest, OG images. |
| `brand/` | Social media kit and its source files (not published). |
| `scripts/` | Image builders and the post-build checks. |

## Common jobs

```bash
bun install
bun run dev          # local preview at http://localhost:4321
bun run build        # production build into dist/
bun run verify       # checks the build (links, old URLs, SEO, copy rules)
bun run check        # TypeScript and Astro diagnostics
```

**Write a blog post.** Add `src/content/blog/my-post.md` with frontmatter
(`title`, `summary`, `category`, `publishedAt`, and optionally `photo` and
`updatedAt`). It appears on the blog, the home page, the RSS feed, the sitemap
and `llms.txt` automatically.

**Change prices.** Edit `pricing` in `src/data/site.ts`. Every figure on the
site, including the worked examples, is calculated from it. It must match the
app's `pricing_config_versions`.

**Replace the app screenshot.** Overwrite `src/assets/app-screenshot.png`.

**Legal pages.** Privacy, terms, cookies and licences come from Supabase
(`published_policies_v`) and are edited in the admin dashboard, not here. Set
`SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to build them; without them the
pages show a "not published yet" notice and the build still succeeds.

## Images

- **Photos** are real photographs of Zambia from Wikimedia Commons under free
  licences. `bun run photos:fetch` downloads them and writes the attribution
  to `src/data/photos.json`; credits show under each photo and on `/credits/`.
- **Open Graph images** (`public/og/*.png`) are built with Inkscape:
  `bun run images:og`.
- **Social media kit** (`brand/social/`) is built with Inkscape:
  `bun run images:social`. See `brand/README.md`.

The Google Play badge is always the official image (`public/google-play-badge.png`),
never redrawn. No gradients anywhere; `bun run verify` fails the build if one
appears.

## Deploying

Pushing changes under `app/` to `main` runs `.github/workflows/deploy.yml`,
which builds the site, runs the checks, and publishes `dist/` to the repository
root for GitHub Pages. Never edit files at the repository root directly; they
are replaced on every build.
