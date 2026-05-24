import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const produkCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/produk" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    priceLow: z.number().optional(),
    priceHigh: z.number().optional(),
    // keyword target spesifik KGR (Keyword Golden Ratio)
    seoKeyword: z.string().optional(),
    image: image().optional(),
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().optional(),
    author: z.string().default('Tim Barokah Abadi'),
    seoKeyword: z.string().optional(),
  })
});

export const collections = {
  'produk': produkCollection,
  'blog': blogCollection,
};
