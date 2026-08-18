import type { Post } from './posts';

// Resolve the URL slug. Hugo falls back to the folder name when `slug` is empty.
// The glob loader derives a path-based slug for the entry `id` (e.g.
// `records/lyrics`), so we fall back to its last segment.
export function postSlug(post: Post): string {
	if (post.data.slug) return post.data.slug;
	const parts = post.id.split('/');
	return parts[parts.length - 1];
}

export function postPath(post: Post): string {
	return `/post/${postSlug(post)}/`;
}

export function categoryPath(name: string): string {
	return `/categories/${encodeURIComponent(name)}/`;
}

export function tagPath(name: string): string {
	return `/tags/${encodeURIComponent(name)}/`;
}