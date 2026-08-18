import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'post'>;

export async function getAllPosts(): Promise<Post[]> {
	const posts = await getCollection('post');
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function filterTags(tags: string[]): string[] {
	return tags.filter((tag) => tag.trim() !== '');
}

export function filterCategories(categories: string[]): string[] {
	return categories.filter((cat) => cat.trim() !== '');
}

export function getArchive(posts: Post[]): { year: number; count: number }[] {
	const counts = new Map<number, number>();
	for (const post of posts) {
		const year = post.data.date.getFullYear();
		counts.set(year, (counts.get(year) ?? 0) + 1);
	}
	return [...counts.entries()]
		.map(([year, count]) => ({ year, count }))
		.sort((a, b) => b.year - a.year);
}

export function getTagCounts(
	posts: Post[],
	limit?: number,
): [string, number][] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of filterTags(post.data.tags)) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
	return limit ? sorted.slice(0, limit) : sorted;
}

export function getCategoryCounts(
	posts: Post[],
): Map<string, number> {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const cat of filterCategories(post.data.categories)) {
			counts.set(cat, (counts.get(cat) ?? 0) + 1);
		}
	}
	return counts;
}