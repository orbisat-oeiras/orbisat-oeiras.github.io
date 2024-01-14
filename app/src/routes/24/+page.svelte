<script lang="ts">
	// Import components
	import PostList from '$lib/components/PostList.svelte';
	// Import types
	import type { PageData } from './$types';
	// Import svelte hooks
	import { onMount } from 'svelte';

	// Data provided by the server load function
	export let data: PageData;

	// Element bindings
	let scrollSnapStartMarker: HTMLElement;
	let scrollSnapEndMarker: HTMLElement;
	// Scroll amount on the window
	let scrollAmount: number;
	// Bounds for scroll snapping
	let scrollSnapStartBound: number = 200;
	let scrollSnapEndBound: number = 50;
	// Flag for a small device (width < 700px)
	let isSmall: boolean | undefined = undefined;

	// On mount is called when the component is added to the DOM
	onMount(() => {});

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
		//if (isSmall === undefined) {
		// Update the small device flag
		isSmall = window.matchMedia('(max-width: 700px)').matches;
		console.log(isSmall);
		//}

		// On small devices, scroll-snapping of the team presentation
		// doesn't feel good, so we disable it
		if (isSmall) {
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

<svelte:head>
	<title>Orbisat Oeiras 2024</title>
</svelte:head>

<!--Get a reference to the scroll amount and register the scroll event-->
<svelte:window bind:scrollY={scrollAmount} on:scroll={handleScroll} />

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
