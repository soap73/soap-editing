import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(10),
    client: z.string().optional(),
    category: z.enum(['youtube', 'court-metrage', 'reseaux-sociaux']).default('youtube'),
    date: z.date(),
    videoUrl: z.string(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    vimeoId: z.string().optional(),
    youtubeId: z.string().optional(),
  }),
});

export const collections = { projects: projectsCollection };
