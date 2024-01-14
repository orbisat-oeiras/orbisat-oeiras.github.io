<script lang="ts">
	// Import the global css, which is applied to all routes
	import '../app.css';
	// Import the navbar, which is included in all routes
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<!--The actual content of the page is wrapped inside this main,
	which adds an adequate margin to ensure lines of text aren't
	too large-->
<main class="py-0 px-[10%] lg:px-[20%]">
	<slot />
</main>
