<script>
	import ThemeToggle from './ThemeToggle.svelte';
	import Dropdown from './Dropdown.svelte';
</script>

<nav
	class="bg-cansat-black text-cansat-cream flex flex-col items-center justify-between md:flex-row md:justify-between md:content-center py-6 px-4 md:sticky top-0 z-10 [&>*]:h-min"
>
	<div
		class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px] w-[90%] md:h-[100%]"
	>
		<br /><br /><br />
	</div>
	<div class="flex gap-6 content-center [&>*]:h-min">
		<Dropdown label="Sobre">
			<!--Removed the / behind the # because it was causing issues-->
			<a class="text-cansat-cream" href="/24#cansat">CanSat</a>
			<a class="text-cansat-cream" href="/24#project">O&nbsp;Projeto</a>
			<a class="text-cansat-cream" href="/24#team">A&nbsp;Equipa</a>
		</Dropdown>
		<!--<a class="text-grey-900" href="/24/about">Sobre</a>-->
		<a class="text-cansat-cream" href="/24#blog">Blog</a>
		<a class="text-cansat-cream" href="/24#sponsor">Apoios</a>
		<ThemeToggle />
	</div>
</nav>
