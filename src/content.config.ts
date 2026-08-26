import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const post = defineCollection({
	// Load Markdown/MDX files migrated from the original Hugo blog.
	loader: glob({ base: './src/content/post', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema.
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// Transform string to Date object.
			date: z.coerce.date(),
			draft: z.boolean().default(false),
			description: z.string().default(''),
			slug: z.string().default(''),
			tags: z.array(z.string()).default([]),
			categories: z.array(z.string()).default([]),
			// 空字符串视为无封面；有值时解析为相对本文档目录的图片
			image: z.preprocess(
				(value) => (value === '' || value == null ? undefined : value),
				image().optional(),
			),
		}),
});

export const collections = { post };