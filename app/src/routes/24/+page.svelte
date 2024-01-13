<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let startScrollSnap: HTMLElement;
	let endScrollSnap: HTMLElement;
	let scrollAmount: number;
	let startYBound: number = 200;
	let endYBound: number = 50;
	let isSmall: boolean | undefined = undefined;

	onMount(() => {});

	function handleScroll(e: UIEvent) {
		if (import.meta.env.SSR) return;

		//if (isSmall === undefined) {
		isSmall = window.matchMedia('(max-width: 700px)').matches;
		console.log(isSmall);
		//}

		let startY = startScrollSnap.getBoundingClientRect().top;
		let endY = endScrollSnap.getBoundingClientRect().top;

		//console.log(`startY=${startY}; endY=${endY};`);

		const body = document.getElementsByTagName('html')[0];

		if (isSmall) {
			//console.log('Small');
			return;
		}

		if (!body.classList.contains('scrollsnap') && startY < startYBound && endY > endYBound) {
			console.log('Adding snap');
			body.classList.add('scrollsnap');
		}
		if (body.classList.contains('scrollsnap') && startY > startYBound) {
			console.log('Removing snap from start');
			body.classList.remove('scrollsnap');
		}
		if (body.classList.contains('scrollsnap') && endY < endYBound) {
			console.log('Removing snap from end');
			body.classList.remove('scrollsnap');
		}
	}
</script>

<svelte:head>
	<title>How I Made A Game</title>
</svelte:head>

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
	<div bind:this={startScrollSnap} class="person">
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
	<div bind:this={endScrollSnap} class="person">
		<img src="/team/filipa.png" alt="Filipa Cheng" />
		<div>
			<h4>Filipa Cheng</h4>
			<div>Divulgação</div>
		</div>
	</div>
</div>

<h2 id="blog">Recent Posts</h2>
<PostList postList={data.posts} />
<div class="text-center my-2"><a href="/archive" class="btn text-2xl py-2 px-4">See All</a></div>

<h2 id="sponsor">Com o apoio de:</h2>

<!--The text just ended right at the bottom of the page, and it looked odd, so this adds some empty space-->
<div class="py-12" />
