/**
 * 为 MDX 自动注入常用组件的 import，避免每篇文档手写 import 语句。
 *
 * 背景：
 *   在 MDX 正文里使用组件必须先 import，而本项目文章位于
 *   src/content/post/<分类>/<目录>/index.mdx，逐篇手写
 *   '../../../components/Gallery.astro' 既啰嗦又易错。
 *
 * 注意（已验证）：
 *   仅在编译产物里插入 import 语句并不足以让组件可用——MDX 运行时会优先
 *   从渲染时传入的 components 映射里查找组件，因此仍需页面侧配合：
 *   见 src/pages/post/[...slug].astro 的 <Content components={{ Gallery }} />。
 *   本插件负责作用域那一半，并集中登记"哪些组件对 MDX 全局可用"。
 *
 * 新增全局组件时：往 VIRTUAL_EXPORTS 与 AUTO_IMPORTS 各加一行，
 * 并在文章页的 components 映射里补上。
 */

const VIRTUAL_ID = 'mdx:components';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

/** 对所有 MDX 自动可用的组件 */
const VIRTUAL_EXPORTS = ["export { default as Gallery } from '/src/components/Gallery.astro';"];

/** 与 VIRTUAL_EXPORTS 的导出名一致 */
const AUTO_IMPORTS = ['Gallery'];

export function mdxVirtualComponents() {
	return {
		name: 'mdx-virtual-components',
		resolveId(id) {
			return id === VIRTUAL_ID ? RESOLVED_ID : null;
		},
		load(id) {
			return id === RESOLVED_ID ? VIRTUAL_EXPORTS.join('\n') : null;
		},
	};
}

export function recmaMdxAutoImport() {
	return (tree) => {
		const missing = AUTO_IMPORTS.filter(
			(name) =>
				!tree.body.some(
					(node) =>
						node.type === 'ImportDeclaration' &&
						node.specifiers?.some((s) => s.local?.name === name),
				),
		);
		if (!missing.length) return;

		tree.body.unshift({
			type: 'ImportDeclaration',
			specifiers: missing.map((name) => ({
				type: 'ImportSpecifier',
				imported: { type: 'Identifier', name },
				local: { type: 'Identifier', name },
			})),
			source: { type: 'Literal', value: VIRTUAL_ID },
		});
	};
}
