<script lang="ts">
	// Import the global css, which is applied to all routes
	import '../../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
