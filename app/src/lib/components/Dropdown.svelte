<script lang="ts">
	// Use an animation to show/hide the dropdown
	import { slide } from 'svelte/transition';

	// Internal state to keep track of the dropdown
	let isExpanded = false;
	// Prop to control the label shown on the dropdown
	export let label: string;
</script>

<div class="relative top-0 left-0">
	<button
		class="italic underline decoration-[transparent] hover:decoration-cansat-accent duration-500 transition-colors"
		on:click={() => {
			isExpanded = !isExpanded;
		}}
	>
		{label}
		<!--Do some CSS magic to create a nice looking animated arrow-->
		<i
			class="border-solid border-t-0 border-r-[3px] border-b-[3px] border-l-0 inline-block p-1 mx-1 rotate-[45deg] transition-transform duration-500"
			style="transform: rotate({isExpanded ? 225 : 45}deg)"
		/>
	</button>
	<!--Only show the contents if the dropdown is expanded-->
	{#if isExpanded}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!--Hide the dropdown when an item is clicked-->
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
