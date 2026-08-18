// Rehype plugin: 给远程图片（http 外部 URL）补 loading="lazy" 与 decoding="async"，
// 避免整页多张远程图同时 eager 下载并造成布局抖动（CLS）。
// 本地图片由 Astro 自动处理，无需此插件。
export default function rehypeExternalImages() {
	return (tree) => {
		const visit = (node) => {
			if (node.type === 'element' && node.tagName === 'img') {
				const src = node.properties?.src;
				if (typeof src === 'string' && /^https?:\/\//.test(src)) {
					node.properties.loading = 'lazy';
					node.properties.decoding = 'async';
				}
			}
			if (node.children) node.children.forEach(visit);
		};
		visit(tree);
	};
}
