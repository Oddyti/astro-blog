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
import { mdxVirtualComponents, recmaMdxAutoImport } from './src/plugins/mdx-auto-import.mjs';

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
	vite: {
		plugins: [mdxVirtualComponents()],
	},
	// recma 插件为每篇 MDX 自动注入常用组件的 import，
	// 这样正文里可以直接用 <Gallery />，无需手写 import
	integrations: [sitemap(), pagefind(), mdx({ recmaPlugins: [recmaMdxAutoImport] })],
});