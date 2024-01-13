<script lang="ts">
	import { slide } from 'svelte/transition';

	let isExpanded = false;
	export let label: string;
</script>

<div class="relative top-0 left-0">
	<button
		class="italic"
		on:click={() => {
			isExpanded = !isExpanded;
		}}
		>{label}
		<i
			class="border-solid border-t-0 border-r-[3px] border-b-[3px] border-l-0 inline-block p-1 mx-1 rotate-[45deg]"
		/></button
	>
	{#if isExpanded}
		<div
			class="absolute bg-cansat-grey p-2 mt-1 text-cansat-cream rounded-md w-fit [&_*]:w-fit"
			transition:slide
		>
			<slot />
		</div>
	{/if}
</div>

<style>
</style>
