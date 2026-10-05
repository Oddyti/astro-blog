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
			// 创建时间：归档、列表、排序都以它为准
			date: z.coerce.date(),
			// 更新时间：可选，仅文章页显示；空字符串视为未填
			updated: z.preprocess(
				(value) => (value === '' || value == null ? undefined : value),
				z.coerce.date().optional(),
			),
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