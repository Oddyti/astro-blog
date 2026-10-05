/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		/** 当前正在渲染的文章 id（如 'records/wuchao'），由文章页写入，供正文组件读取 */
		postId?: string;
	}
}
