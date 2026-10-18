import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { kwacha, percent, pricing, site } from '@/data/site';

// llms.txt: a plain-text index of the site for AI assistants and crawlers.
export async function GET(context: APIContext) {
  const base = (context.site?.href ?? site.url).replace(/\/+$/, '');
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.legalName}, ${site.address.street}, ${site.address.locality}, Zambia. PACRA ${site.pacra}.`,
    '',
    'Key facts:',
    `- Reusable credit facility: one credit limit, draw any amount from ${kwacha(pricing.minimumDraw)} up to available credit, paid to mobile money (MTN, Airtel, Zamtel).`,
    `- Processing fee: ${percent(pricing.processingFeeRate)} of each draw, minimum ${kwacha(pricing.processingFeeMinimum)}, deducted from the amount received.`,
    `- Monthly charge: ${percent(pricing.monthlyChargeRate)} of the average daily balance for the calendar month.`,
    `- Monthly statement when a balance is owed; payment due ${pricing.gracePeriodDays} days after the statement date. No late fees; an overdue statement temporarily freezes the facility.`,
    '- For salaried employees and government-sponsored students at supported Zambian universities. Android app on Google Play.',
    '',
    '## Pages',
    `- [Product](${base}/product/): what the credit facility is and how it works`,
    `- [How it works](${base}/how-it-works/): from sign-up to the first statement`,
    `- [Pricing](${base}/pricing/): fees, the monthly charge and worked examples`,
    `- [Eligibility](${base}/eligibility/): who can apply and what documents are needed`,
    `- [Help](${base}/support/): common questions and how to contact support`,
    `- [About](${base}/about/): the company`,
    `- [Contact](${base}/contact/): support, company and privacy contacts`,
    '',
    '## Articles',
    ...posts.map((p) => `- [${p.data.title}](${base}/blog/${p.id}/): ${p.data.summary}`),
    '',
    '## Legal',
    `- [Terms of Service](${base}/terms/)`,
    `- [Privacy Policy](${base}/privacy/)`,
    `- [Cookie Policy](${base}/cookies/)`,
    `- [Licences](${base}/licences/)`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
