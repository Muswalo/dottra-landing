import type { APIContext } from 'astro';

// The old site published /sitemap.xml and it may be registered in Search
// Console. Serve a sitemap index there that points at Astro's generated
// sitemap, so the old URL keeps working.
export function GET(context: APIContext) {
  const site = (context.site?.href ?? 'https://dottra.co/').replace(/\/+$/, '');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${site}/sitemap-0.xml</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
