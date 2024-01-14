<script lang="ts">
	// Import components
	import PostList from '$lib/components/PostList.svelte';
	// Import types
	import type { PageData } from './$types';
	import { themeStore } from '$lib/stores';

	// Data provided by the server load function
	export let data: PageData;
	//THIS CODE IS RELATED TO THE ANIMATION OF THE LOGO TO THE NAVBAR

	// The scroll of the window (how far it has scrolled)
	let scroll: number = 0;
	// How long we have to scroll for the animation to finish (essentially, how long is the animation takes)
	const logoAnimationScrollAmount = 500;
	// How much we have scrolled in the animation (0 - 50)
	let scrollPercentage = 0;
	let innerWidth: number = 0;
	let innerHeight: number = 0;
	// Image positioning parameters
	let logoLeft: number;
	let logoTop: number;
	let logoWidth: number;

	function lerp(a: number, b: number, t: number): number {
		return a + t * (b - a);
	}

	$: {
		// Adds to the animationPercentage when we scroll and stops the animation once it is finished
		scrollPercentage = scroll >= logoAnimationScrollAmount ? 50 : scroll / (logoAnimationScrollAmount / 50);
		logoLeft = lerp(76, innerWidth / 2, 1 - scrollPercentage * 0.02);
		logoTop = lerp(60, 160 + 0.15 * innerWidth, 1 - scrollPercentage * 0.02);
		logoWidth = lerp(120, innerWidth / 2, 1 - scrollPercentage * 0.02);
  }
  
  // THIS CODE IS RELATED TO SNAPPING TO THE TEAM PRESENTATION

	// Element bindings
	let scrollSnapStartMarker: HTMLElement;
	let scrollSnapEndMarker: HTMLElement;
	// Bounds for scroll snapping
	let scrollSnapStartBound: number = 200;
	let scrollSnapEndBound: number = 50;
	// Flag for a small device (width < 700px)
	let isSmallDevice: boolean | undefined = undefined;

	// This event is triggered when the user scrolls the main page
	function handleScroll(e: UIEvent) {
		// Scrolling should be client-side only, so we disable all the fancy
		// stuff on the server to prevent  it from getting confused
		if (import.meta.env.SSR) return;

		/* Compute the small device flag only once and cache it
		   This is currently disabled to allow changes in the smallness
		   of a device, e.g., turning a mobile device on its side. If
		   we decide to reenable it, maybe it should move to onMount()
		*/
		//if (isSmallDevice === undefined) {
		// Update the small device flag
		isSmallDevice = window.matchMedia('(max-width: 700px)').matches;
		console.log(isSmallDevice);
		//}

		// On small devices, scroll-snapping of the team presentation
		// doesn't feel good, so we disable it
		if (isSmallDevice) {
			//console.log('Small');
			return;
		}

		// Get the top coordinates of the snap bounds markers,
		// relative to the viewport
		let startY = scrollSnapStartMarker.getBoundingClientRect().top;
		let endY = scrollSnapEndMarker.getBoundingClientRect().top;

		//console.log(`startY=${startY}; endY=${endY};`);

		// Get a reference to the body
		const body = document.getElementsByTagName('html')[0];
		// If snapping is disabled and we are inside the bounds, enable it
		if (
			!body.classList.contains('scrollsnap') &&
			startY < scrollSnapStartBound &&
			endY > scrollSnapEndBound
		) {
			console.log('Adding snap');
			body.classList.add('scrollsnap');
		}
		// If snapping is enabled and we are outside the bounds, disable it
		if (body.classList.contains('scrollsnap') && startY > scrollSnapStartBound) {
			console.log('Removing snap from start');
			body.classList.remove('scrollsnap');
		}
		if (body.classList.contains('scrollsnap') && endY < scrollSnapEndBound) {
			console.log('Removing snap from end');
			body.classList.remove('scrollsnap');
		}
	}
</script>

<!--Binds the scroll variable to the scroll of the window-->
<svelte:window bind:scrollY={scroll} bind:innerWidth bind:innerHeight on:scroll={handleScroll} />

<svelte:head>
	<title>OrbiSat Oeiras 24</title>
</svelte:head>

<!--Add here a check to see if the app is running on mobile-->
{#if !isSmallDevice}
	<div
		class="fixed translate-x-[-50%] translate-y-[-50%] z-[11]"
		style="left: {logoLeft}px; top: {logoTop}px; width: {logoWidth}px"
	>
		{#if scrollPercentage == 50}
			<a class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px]" href="/">
				<img alt="logotype" src="logo_transparente_claro.png" />
			</a>
		{:else if !$themeStore || scrollPercentage >= 48}
			<img alt="logotype" src="logo_transparente_claro.png" />
		{:else if scrollPercentage <= 48}
			<img alt="logotype" src="logo_transparente_escuro.png" />
		{/if}
	</div>
	<!--This is literally just an empty square to push the content far enough so that we can finish the animation. 
		There is probably a better way to do this-->
	<div class="h-[calc(55vh+160px)]" />
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
<div class="people">
	<!--Get a reference to the start if the scroll snapping bounds-->
	<!--This structure is very repetitive, it might be worth it to
		extract a component, or at least use an #each block-->
	<div bind:this={scrollSnapStartMarker} class="person">
		<img src="/team/rita.png" alt="Rita Fernandes" />
		<div>
			<h4>Rita Fernandes</h4>
			<div>Coordenação, Hardware</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/gabriel.png" alt="Gabriel Neto" />
		<div>
			<h4>Gabriel Neto</h4>
			<div>Deselvolvimento científico</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/guido.png" alt="Guido Rezende" />
		<div>
			<h4>Guido Rezende</h4>
			<div>Programação da estação terra</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/levi.png" alt="Levi Gomes" />
		<div>
			<h4>Levi Gomes</h4>
			<div>Programação do CanSat</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/miguel.png" alt="Miguel Monteiro" />
		<div>
			<h4>Miguel Monteiro</h4>
			<div>Paraquedas e estrutura</div>
		</div>
	</div>
	<!--Get a reference to the start if the scroll snapping bounds-->
	<div bind:this={scrollSnapEndMarker} class="person">
		<img src="/team/filipa.png" alt="Filipa Cheng" />
		<div>
			<h4>Filipa Cheng</h4>
			<div>Divulgação</div>
		</div>
	</div>
</div>

<h2 id="blog">Recent Posts</h2>
<!--Insert the post list-->
<!--TODO: implement the carousel-->
<PostList postList={data.posts} />
<!--TODO: after the carousel is added, this won't be needed-->
<div class="text-center my-2"><a href="/archive" class="btn text-2xl py-2 px-4">See All</a></div>

<h2 id="sponsor">Com o apoio de:</h2>

<!--The text just ended right at the bottom of the page, and it looked odd,
	so this adds some empty space-->
<div class="py-12" />
