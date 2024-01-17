<script lang="ts">
	import type { Post } from '$lib/server/post.type';
	import PostComponent from './PostComponent.svelte';
	export let postList: Post[];

	// Carousel implementation
	// Width of the carousel
	let current_width = 0;
	// Container for the carouusel items
	let container: HTMLElement;

	// ????
	let scroll_left = 0;
	let scroll_width = 0;

	// Scroll left to the next item
	function left() {
		container.scrollBy(-current_width, 0);
	}

	// Scroll right to the next item
	function right() {
		container.scrollBy(current_width, 0);
	}
	function scroll() {
		scroll_left = container.scrollLeft;
		scroll_width = container.scrollWidth;
	}
</script>

<div class="flex overflow-hidden gap-2 justify-between w-full">
	<button
		class="text-cansat-black bg-cansat-cream border-cansat-cream border-2 rounded border-none p-4"
		on:pointerdown={left}
		style="opacity: {scroll_left == 0 ? '0' : '1'}"
	>
		<slot name="left_button">&lt;</slot>
	</button>
	<div
		class="
	flex flex-grow overflow-auto overflow-x-auto snap-x snap-mandatory scroll-smooth [&>*]:snap-start [&>*]:flex-shrink-0 [&>*]:w-full [&::-webkit-scrollbar]:hidden"
		bind:clientWidth={current_width}
		bind:this={container}
		on:scroll={scroll}
	>
		{#each postList as post}
			<PostComponent {post} />
		{/each}
	</div>
	<button
		class="text-cansat-black bg-cansat-cream border-cansat-cream border-2 rounded border-none p-4"
		on:pointerdown={right}
		style="opacity: {Math.abs(scroll_left + current_width - scroll_width) < 3 ? '0' : '1'}"
	>
		<slot name="right_button">&gt;</slot>
	</button>
</div>
