<script lang="ts">
	import type { Post } from '$lib/server/post.type';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();
</script>

<div class="w-auto relative overflow-hidden min-h-[35vh]">
	{#if post.cover_image_exists}
		<img src={'/' + post.cover_image} alt="" class="pt-5 w-10/12 mx-auto" />
		<p class="text-right mr-4 text-sm italic text-light-muted dark:text-dark-muted">
			- Posted on {post.date_string}
		</p>
		<h2 class="text-center mt-2 mb-1">{post.title}</h2>
	{:else}
		<h2 class="text-center mt-2 mb-1">{post.title}</h2>
		<p class="text-right mr-4 text-sm italic text-light-muted dark:text-dark-muted">
			- Posted on {post.date_string}
		</p>
	{/if}
	<!--
	<ul class="flex flex-wrap items-center ml-4 list-none">
		{#each post.tags as tag}
			<li>
				<a href={'/tag/' + tag} class="tag">{tag}</a>
			</li>
		{/each}
	</ul>
	-->
	<p class="text-lg py-1 mb-10 mx-4 indent-0">{post.excerpt}</p>
	<a
		class="group btn duration-150 absolute bottom-0 w-full rounded-none"
		href={'/blog' + post.path.slice(11).slice(0, -3)}
		><span
			class="transition-all duration-150 relative inline-block after:transition-all after:duration-150 after:content-['»'] after:opacity-0 after:absolute after:top-0 after:right-[-20px] group-hover:pr-6 group-hover:after:opacity-100 group-hover:after:right-0"
			><span class="transition-color duration-150 text-light-ui-fg dark:text-dark-ui-fg"
				>Read More</span
			></span
		></a
	>
</div>
