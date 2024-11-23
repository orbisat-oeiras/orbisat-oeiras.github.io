<script lang="ts">
	// Import the global css, which is applied to all routes
	import '../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<!--The actual content of the page is wrapped inside this main,
	which adds an adequate margin to ensure lines of text aren't
	too large-->
<main class="py-0 px-[10%] lg:px-[20%]">
	{@render children?.()}
</main>
