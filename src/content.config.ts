import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:schema';
import { tagSlugs } from './i18n/tags';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      translationKey: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.enum(tagSlugs)).default([]),
      draft: z.boolean().default(false),
    }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      translationKey: z.string(),
      year: z.number(),
      cover: image(),
      coverAlt: z.string().optional(),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      tags: z.array(z.enum(tagSlugs)).default([]),
      featured: z.boolean().default(false),
    }),
});

export const collections = { blog, portfolio };
