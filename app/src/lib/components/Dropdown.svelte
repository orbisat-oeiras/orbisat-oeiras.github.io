<script lang="ts">
	import { slide } from 'svelte/transition';

	let isExpanded = false;
	export let label: string;
</script>

<div class="relative top-0 left-0">
	<button
		class="italic underline decoration-[transparent] hover:decoration-cansat-accent duration-500 transition-colors"
		on:click={() => {
			isExpanded = !isExpanded;
		}}
		>{label}
		<i
			class="border-solid border-t-0 border-r-[3px] border-b-[3px] border-l-0 inline-block p-1 mx-1 rotate-[45deg]"
		/></button
	>
	{#if isExpanded}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				isExpanded = false;
			}}
			class="absolute p-2 mt-1 bg-cansat-grey text-cansat-cream dark:bg-cansat-cream rounded-md w-fit [&_*]:w-fit shadow-[0_4px_8px_0_rgb(0_0_0_/_20%),_0_6px_20px_0_rgb(0_0_0_/_19%)]"
			transition:slide
		>
			<slot />
		</div>
	{/if}
</div>

<style>
</style>
