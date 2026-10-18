import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog articles live in src/content/blog/<slug>.md. The filename is the URL:
// src/content/blog/salary-advance-vs-credit-facility.md -> /blog/salary-advance-vs-credit-facility/
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(110),
    // Used for the meta description and article lists. Keep it under ~160 chars.
    summary: z.string().max(200),
    category: z.enum(['Using Dottra', 'Mobile money', 'Students', 'Salaried workers', 'Money management']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Dottra team'),
    // Optional key from src/data/photos.json.
    photo: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
