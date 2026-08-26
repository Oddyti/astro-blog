// @ts-check
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkBilibili from './src/lib/remark-bilibili.mjs';
import rehypeExternalImages from './src/lib/rehype-external-images.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.oddyti.com',
	trailingSlash: 'always',
	markdown: {
		processor: unified({
			remarkPlugins: [remarkBilibili, remarkMath],
			rehypePlugins: [rehypeExternalImages, rehypeKatex],
		}),
		shikiConfig: {
			theme: 'vitesse-light',
		},
	},
	integrations: [sitemap(), pagefind(), mdx()],
});