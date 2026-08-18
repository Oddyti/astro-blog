// @ts-check
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkBilibili from './src/lib/remark-bilibili.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.oddyti.com',
	trailingSlash: 'always',
	markdown: {
		processor: unified({
			remarkPlugins: [remarkBilibili, remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
		shikiConfig: {
			theme: 'vitesse-light',
		},
	},
	integrations: [sitemap(), pagefind()],
});