<script lang="ts">
	// Import internal components
	import ThemeToggle from './ThemeToggle.svelte';
	import Dropdown from './Dropdown.svelte';
	import { page } from '$app/stores';
	import { isSmallDevice } from '$lib/stores';
	import { onMount } from 'svelte';

	let { showLogo = true } = $props();

	onMount(() => {
		// TODO: Why is this here??
		isSmallDevice.set(window.matchMedia('(max-width: 700px)').matches);
	});
</script>

<!--Use a nav to make the purpose of this component explicit-->
<nav
	class="bg-invariant-bg text-invariant-fg dark:bg-invariant-bg dark:text-invariant-fg flex flex-col items-center justify-between md:flex-row md:justify-between md:content-center py-6 px-4 md:sticky top-0 z-10 [&>*]:h-min"
	style={$isSmallDevice ? 'margin-bottom: 40px' : ''}
>
	{#if showLogo}
		<a class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px]" href="/">
			<img class="w-[90%] md:h-[100%] md:w-auto md:m-0" src="/logo_transparente_claro.png" alt="" />
		</a>
	{:else}
		<div
			class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px] w-[90%] md:h-[100%]"
		>
			<br /><br /><br />
		</div>
	{/if}
	<div class="flex gap-6 content-center [&>*]:h-min">
		<!--Removed the / behind the # because it was causing issues-->
		<!--<Dropdown label="Sobre">
			<a href="/24#cansat"
				><span class="transition-colors duration-reset text-light-ui-fg dark:text-dark-ui-fg"
					>CanSat</span
				></a
			>
			<a href="/24#project"
				><span class="transition-colors duration-reset text-light-ui-fg dark:text-dark-ui-fg"
					>O&nbsp;Projeto</span
				></a
			>
			<a href="/24#team"
				><span class="transition-colors duration-reset text-light-ui-fg dark:text-dark-ui-fg"
					>A&nbsp;Equipa</span
				></a
			>
		</Dropdown>-->
		<a class="text-invariant-fg dark:text-invariant-fg" href="/24#cansat">CanSat</a>
		<a class="text-invariant-fg dark:text-invariant-fg" href="/24#project">Projeto</a>
		<a class="text-invariant-fg dark:text-invariant-fg" href="/24#team">Equipa</a>
		<!--<a class="text-grey-900" href="/24/about">Sobre</a>-->
		<a class="text-invariant-fg dark:text-invariant-fg" href="/24#blog">Blog</a>
		<a class="text-invariant-fg dark:text-invariant-fg" href="/24#sponsor">Apoios</a>
		<ThemeToggle />
	</div>
</nav>
