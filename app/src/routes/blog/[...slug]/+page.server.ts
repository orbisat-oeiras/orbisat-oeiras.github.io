// Import svelte internals
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// Import post related things from lib
import { getPostList } from '$lib/server/post';
import type { Post } from '$lib/server/post.type';
// Import the file system module to read post files
import fs from 'fs';
// Import markdown function to parse post contents
import markdown from '$lib/server/markdown';

export const load = (({ params }) => {
	// Compute the current post path
	const path = './src/posts/' + params.slug + '.md';
	// Declare return variables
	// This is necessary because they are set inside a try blockk
	// but must exist outside of it's scope in order to be returned
	let post: Post;
	let html: string;
	let previousPostPath: string | undefined;
	let nextPostPath: string | undefined;
	try {
		// Get the post list
		const postList = getPostList();
		// Get the current post from the list
		const i = postList.findIndex((post) => post.path === path);
		// Use indexing because we want an invalid index to throw
		post = postList[i];
		// Parse the markdown
		html = markdown(post.content);
		// Use at because an invalid index is fine
		// (this might be the first or last post)
		previousPostPath = postList.at(i + 1)?.path;
		nextPostPath = postList.at(i - 1)?.path;
	} catch (e) {
		// For backwards compatibility
		// The previous blog separated paths in the blog route
		// by _ (cause next doesn't support variadic dynamic routes, w Svelte)
		// so we do a simple redirect to ensure legacy links still work
		if (path.includes('_') && fs.existsSync(path.replaceAll('_', '/'))) {
			redirect(301, '/blog/' + params.slug.replaceAll('_', '/'));
		}
		// If the link isn't a legacy one, then it points to an unexisting post
		// So we respond with a 404 (Not Found) error
		error(404, {
        			message: 'Post not found: ' + params.slug,
        			pwd: process.cwd()
        		});
	}

	return {
		post: post,
		innerHTML: html,
		previousPostPath: '/blog/' + previousPostPath?.slice(12).slice(0, -3),
		nextPostPath: '/blog/' + nextPostPath?.slice(12).slice(0, -3)
	};
}) satisfies PageServerLoad;
