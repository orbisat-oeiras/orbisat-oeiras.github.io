<script lang="ts">
	import type { Post } from '$lib/server/post.type';
	import { themeStore } from '$lib/stores';
	import PostComponent from './PostComponent.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		postList: Post[];
		left_button?: Snippet;
		right_button?: Snippet;
	}

	let { postList, left_button, right_button }: Props = $props();

	// Carousel implementation
	// Width of the carousel
	let current_width = $state(0);
	// Container for the carouusel items
	let container: HTMLElement | undefined = $state();

	// ????
	let scroll_left = $state(0);
	let scroll_width = $state(0);

	// Scroll left to the next item
	function left() {
		container?.scrollBy(-current_width, 0);
	}

	// Scroll right to the next item
	function right() {
		container?.scrollBy(current_width, 0);
	}

	function scroll() {
		if (container) {
			scroll_left = container.scrollLeft;
			scroll_width = container.scrollWidth;
		}
	}
</script>

{#if postList.length >= 1}
	<div class="flex overflow-hidden justify-between w-full">
		<button
			class="dark:text-cansat-black dark:bg-cansat-cream text-cansat-cream bg-cansat-grey border-cansat-cream border-2 rounded-none rounded-l border-none p-4"
			onpointerdown={left}
			style="background-color: {scroll_left == 0 ? '#b7b3a7' : $themeStore ? '#58595b' : '#fffde9'}"
		>
			{#if left_button}{@render left_button()}{:else}&lt;{/if}
		</button>
		<div
			class="flex flex-grow overflow-auto overflow-x-auto snap-x snap-mandatory scroll-smooth [&>*]:snap-start [&>*]:flex-shrink-0 [&>*]:w-full [&::-webkit-scrollbar]:hidden"
			bind:clientWidth={current_width}
			bind:this={container}
			onscroll={scroll}
		>
			{#each postList as post}
				<PostComponent {post} />
			{/each}
		</div>
		<button
			class="dark:text-cansat-black dark:bg-cansat-cream text-cansat-cream bg-cansat-grey border-cansat-cream border-2 rounded-none rounded-r border-none p-4"
			onpointerdown={right}
			style="background-color: {Math.abs(scroll_left + current_width - scroll_width) < 3
				? '#b7b3a7'
				: $themeStore
					? '#58595b'
					: '#fffde9'}"
		>
			{#if right_button}{@render right_button()}{:else}&gt;{/if}
		</button>
	</div>
{:else}
	<h4 class="no-underline text-center py-10">
		Até à data não temos <em>posts</em>, mas estejam preparados para futuras publicações.
	</h4>
{/if}
