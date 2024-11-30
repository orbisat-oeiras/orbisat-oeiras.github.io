import type { PageServerLoad } from './$types';
import { getPostList } from '$lib/server/post';

// Get the post list and set it as the page data
export const load = (() => {
	return { posts: getPostList({ limit: 6, year: 2025 }) };
}) satisfies PageServerLoad;
