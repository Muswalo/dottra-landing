// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = (process.env.SITE_URL || 'https://dottra.co').replace(/\/+$/, '');

// Static output for GitHub Pages. Every page is written as
// <route>/index.html and linked with a trailing slash, which keeps every URL
// from the previous site identical (/pricing/, /blog/<slug>/, ...).
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    assets: '_assets',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && !page.includes('/404'),
      changefreq: 'monthly',
      serialize(item) {
        if (item.url === `${site}/`) {
          item.priority = 1.0;
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.7;
        } else {
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
});
