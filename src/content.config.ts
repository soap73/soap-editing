import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    videoUrl: z.string().optional().default(''),
    videoFile: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional().default(''),
    client: z.string().optional(),
    category: z.enum(['youtube', 'court-metrage', 'reseaux-sociaux', 'cache']).optional().default('youtube'),
    date: z.date().optional().default(new Date()),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
    vimeoId: z.string().optional(),
    youtubeId: z.string().optional(),
    aspectRatio: z.enum(['16:9', '9:16', '1:1']).optional().default('16:9'),
    preview: z.string().optional(),
  }),
});

export const collections = { projects: projectsCollection };
