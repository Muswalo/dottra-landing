import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const site = (context.site?.href ?? 'https://dottra.co/').replace(/\/+$/, '');
  const body = ['User-agent: *', 'Allow: /', 'Disallow: /404/', '', `Sitemap: ${site}/sitemap-index.xml`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
