import { readFileSync } from 'node:fs';

// 内联 public/ 下的像素 SVG 图标，黑色 fill 替换为 currentColor 以适配主题。
export function icon(name: string): string {
	return readFileSync(`./public/${name}.svg`, 'utf-8')
		.replace(/<\?xml[^>]*\?>/, '')
		.replace('<svg', '<svg viewBox="0 0 96 96"')
		.replace(/fill="#000000"/g, 'fill="currentColor"');
}
