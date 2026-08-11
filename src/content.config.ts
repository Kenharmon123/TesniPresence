import { defineCollection, z } from 'astro:content';

// Sample assets are TypeScript fixtures, not Markdown content collections.
const samples = defineCollection({
  loader: () => [],
  schema: z.object({}).passthrough(),
});

export const collections = { samples };
