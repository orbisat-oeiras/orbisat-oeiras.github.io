<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';
	import { themeStore } from '$lib/stores';

	export let data: PageData;
	//THIS CODE IS RELATED TO THE ANIMATION OF THE LOGO TO THE NAVBAR

	// The scroll of the window (how far it has scrolled)
	let scroll: number = 0;
	// How long we have to scroll for the animation to finish (essentially, how long is the animation takes)
	const lim = 500;
	// How much we have scrolled in the animation (0 - 50)
	let scrollPercentage = 0;
	// Image positioning parameters
	let left: number;
	let top: number;
	let width: number;

	function lerp(a: number, b: number, t: number): number {
		return a + t * (b - a);
	}

	$: {
		// Adds to the animationPercentage when we scroll and stops the animation once it is finished
		scrollPercentage = scroll >= lim ? 50 : scroll / (lim / 50);
		left = lerp(6.82, 50, 1 - scrollPercentage * 0.02);
		top = lerp(7.62, 55, 1 - scrollPercentage * 0.02);
		width = lerp(8.12, 50, 1 - scrollPercentage * 0.02);
	}
</script>

<!--Binds the scroll variable to the scroll of the window-->
<svelte:window bind:scrollY={scroll} />

<svelte:head>
	<title>OrbiSat Oeiras 24</title>
</svelte:head>

<!--Add here a check to see if the app is running on mobile-->
{#if !false}
	<div class="logo" style="left: {left}%; top: {top}%; width: {width}%">
		{#if scroll == 500}
			<a class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px]" href="/">
				{#if !$themeStore}
					<img alt="logotype" src="logo_transparente_claro.png" />
				{/if}
			</a>
		{:else if !$themeStore || scroll >= 480}
			<img alt="logotype" src="logo_transparente_claro.png" />
		{:else if scroll <= 480}
			<img alt="logotype" src="logo_transparente_escuro.png" />
		{/if}
	</div>
	<!--This is literally just an empty square to push the content far enough so that we can finish the animation. 
		There is probably a better way to do this-->
	<div class="empty-screen" />
{/if}
<h2 id="project">O Projeto</h2>
<p>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id felis ac odio eleifend dictum
	ultrices a neque. Vestibulum non diam suscipit, interdum justo eget, volutpat enim. Vivamus
	porttitor tempor libero, quis accumsan sapien dictum lobortis. Sed commodo luctus nisl eget
	fringilla. Duis quis sem lacus. Fusce ac luctus orci. In in fringilla elit, nec placerat purus.
	Nulla molestie nibh vel rutrum vulputate. Aliquam vulputate lectus vel ullamcorper consequat.
	Pellentesque ligula enim, dignissim id lacinia a, bibendum iaculis nulla. Quisque.
</p>

<h2 id="team">A Equipa</h2>
<div>
	<img src="/team/rita.png" alt="Rita Fernandes" />
	<h4>Rita Fernandes</h4>
	<p>Coordenação, Hardware</p>
</div>
<div>
	<img src="/team/gabriel.png" alt="Gabriel Neto" />
	<h4>Gabriel Neto</h4>
	<p>Deselvolvimento científico</p>
</div>
<div>
	<img src="/team/guido.png" alt="Guido Rezende" />
	<h4>Guido Rezende</h4>
	<p>Programação da estação terra</p>
</div>
<div>
	<img src="/team/levi.png" alt="Levi Gomes" />
	<h4>Levi Gomes</h4>
	<p>Programação do CanSat</p>
</div>
<div>
	<img src="/team/miguel.png" alt="Miguel Monteiro" />
	<h4>Miguel Monteiro</h4>
	<p>Paraquedas e estrutura</p>
</div>
<div>
	<img src="/team/filipa.png" alt="Filipa Cheng" />
	<h4>Filipa Cheng</h4>
	<p>Divulgação</p>
</div>

<h2 id="blog">Recent Posts</h2>
<PostList postList={data.posts} />
<div class="text-center my-2"><a href="/archive" class="btn text-2xl py-2 px-4">See All</a></div>

<h2 id="sponsor">Com o apoio de:</h2>

<!--The text just ended right at the bottom of the page, and it looked odd, so this adds some empty space-->
<div class="py-12" />

<style>
	.logo {
		position: fixed;
		transform: translate(-50%, -50%);
		z-index: 11;
	}
	.empty-screen {
		height: calc(55vh + 124px);
	}
</style>
