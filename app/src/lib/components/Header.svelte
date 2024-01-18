<script>
	// Import internal components
	import ThemeToggle from './ThemeToggle.svelte';
	import Dropdown from './Dropdown.svelte';
	import { page } from '$app/stores';
</script>

<!--Use a nav to make the purpose of this component explicit-->
<nav
	class="bg-cansat-black text-cansat-cream flex flex-col items-center justify-between md:flex-row md:justify-between md:content-center py-6 px-4 md:sticky top-0 z-10 [&>*]:h-min"
>
	<!--Add here a check to see if the app is running on mobile and to see if we are on the archive-->
	{#if false || $page.url.pathname != '/24'}
		<a class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px]" href="/">
			<!--<h2 class="no-underline text-grey-900 not-italic">How I Made A Game</h2>-->
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
		<Dropdown label="Sobre">
			<!--Removed the / behind the # because it was causing issues-->
		<!--<Dropdown label="Sobre">
			<a class="text-cansat-cream dark:text-cansat-black" href="/24#cansat">CanSat</a>
			<a class="text-cansat-cream dark:text-cansat-black" href="/24#project">O&nbsp;Projeto</a>
			<a class="text-cansat-cream dark:text-cansat-black" href="/24#team">A&nbsp;Equipa</a>
		</Dropdown-->
		<a class="text-cansat-cream dark:text-cansat-black" href="/24#cansat">CanSat</a>
		<a class="text-cansat-cream dark:text-cansat-black" href="/24#project">Projeto</a>
		<a class="text-cansat-cream dark:text-cansat-black" href="/24#team">Equipa</a>
		<!--<a class="text-grey-900" href="/24/about">Sobre</a>-->
		<a class="text-cansat-cream" href="/24#blog">Blog</a>
		<a class="text-cansat-cream" href="/24#sponsor">Apoios</a>
		<ThemeToggle />
	</div>
</nav>
