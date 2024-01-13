<script>
	import ThemeToggle from './ThemeToggle.svelte';
	import Dropdown from './Dropdown.svelte';
</script>

<nav
	class="bg-cansat-black text-cansat-cream flex flex-col items-center justify-between md:flex-row md:justify-between md:content-center py-6 px-4 md:sticky top-0 z-10 [&>*]:h-min"
>
	<a class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[10%]" href="/">
		<!--<h2 class="no-underline text-grey-900 not-italic">How I Made A Game</h2>-->
		<img class="w-[90%] md:w-[100%] md:m-0" src="/logo_transparente_claro.png" alt="" />
	</a>
	<div class="flex gap-6 content-center [&>*]:h-min">
		<Dropdown label="Sobre">
			<a class="text-cansat-cream" href="/24/about#cansat">CanSat</a>
			<a class="text-cansat-cream" href="/24/about#project">O&nbsp;Projeto</a>
			<a class="text-cansat-cream" href="/24/about#team">A&nbsp;Equipa</a>
		</Dropdown>
		<!--<a class="text-grey-900" href="/24/about">Sobre</a>-->
		<a class="text-cansat-cream" href="/24/blog">Blog</a>
		<a class="text-cansat-cream" href="/24/sponsor">Patrocínios</a>
		<ThemeToggle />
	</div>
</nav>
