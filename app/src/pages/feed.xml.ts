import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// Kept at /feed.xml so existing subscribers keep receiving new articles.
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  return rss({
    title: 'Dottra blog',
    description: 'Practical guides on money, mobile money and credit in Zambia.',
    site: context.site ?? 'https://dottra.co',
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: '<language>en-zm</language>',
  });
}
