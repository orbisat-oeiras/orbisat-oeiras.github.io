<script lang="ts">
	import { run } from 'svelte/legacy';

	// Import components
	import PostList from '$lib/components/PostList.svelte';
	// Import types
	import type { PageData } from './$types';
	import { themeStore, isSmallDevice } from '$lib/stores';
	import { onMount } from 'svelte';

	interface Props {
		// Data provided by the server load function
		data: PageData;
	}

	let { data }: Props = $props();
	//THIS CODE IS RELATED TO THE ANIMATION OF THE LOGO TO THE NAVBAR

	// The scroll of the window (how far it has scrolled)
	let scroll: number = $state(0);
	// How long we have to scroll for the animation to finish (essentially, how long is the animation takes)
	const logoAnimationScrollAmount = 500;
	// How much we have scrolled in the animation (0 - 50)
	let scrollPercentage = $state(0);
	let innerWidth: number = $state(0);
	let innerHeight: number = $state(0);
	// Image positioning parameters
	let logoLeft: number = $state(0);
	let logoTop: number = $state(0);
	let logoWidth: number = $state(0);

	function lerp(a: number, b: number, t: number): number {
		return a + t * (b - a);
	}

	// TODO: fix this animation...
	run(() => {
		// Adds to the animationPercentage when we scroll and stops the animation once it is finished
		scrollPercentage =
			scroll >= logoAnimationScrollAmount ? 50 : scroll / (logoAnimationScrollAmount / 50);
		logoLeft = lerp(76, innerWidth / 2, 1 - scrollPercentage * 0.02);
		logoTop = lerp(60, 160 + 0.15 * innerWidth, 1 - scrollPercentage * 0.02);
		logoWidth = lerp(120, innerWidth / 2, 1 - scrollPercentage * 0.02);
	});

	// THIS CODE IS RELATED TO SNAPPING TO THE TEAM PRESENTATION
	// TODO: fix this

	// Bounds for scroll snapping
	let scrollSnapStartAdd: number = 120;
	let scrollSnapStartRemove: number = 200;
	let scrollSnapEndBound: number = 60;

	onMount(() => {
		// If we are on firefox, change the scroll snapping
		// I dont know why this works now, nor why it didnt work before i did this. All I know is DONT REMOVE THIS
		if (navigator.userAgent.search('Firefox') > -1) {
			console.log('FIREFOX');
			scrollSnapStartRemove = 119;
			scrollSnapEndBound = 121;
		}
	});
	// Element bindings
	let scrollSnapStartMarker: HTMLElement = $state();
	let scrollSnapEndMarker: HTMLElement = $state();

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
		isSmallDevice.set(window.matchMedia('(max-width: 700px)').matches);
		//console.log($isSmallDevice);
		//}

		// On small devices, scroll-snapping of the team presentation
		// doesn't feel good, so we disable it
		if ($isSmallDevice) {
			console.log('Small');
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
			startY < scrollSnapStartAdd &&
			endY > scrollSnapEndBound
		) {
			console.log('Adding snap at ' + startY);
			body.classList.add('scrollsnap');
		}
		// If snapping is enabled and we are outside the bounds, disable it
		if (body.classList.contains('scrollsnap') && startY > scrollSnapStartRemove) {
			console.log('Removing snap from start at ' + startY);
			body.classList.remove('scrollsnap');
		}
		if (body.classList.contains('scrollsnap') && endY < scrollSnapEndBound) {
			console.log('Removing snap from end');
			body.classList.remove('scrollsnap');
		}
	}
</script>

<!--Binds the scroll variable to the scroll of the window-->
<svelte:window bind:scrollY={scroll} bind:innerWidth bind:innerHeight onscroll={handleScroll} />

<svelte:head>
	<title>OrbiSat Oeiras 24</title>
</svelte:head>

<!--Add here a check to see if the app is running on mobile-->
{#if !$isSmallDevice}
	<div
		class="fixed translate-x-[-50%] translate-y-[-50%] z-[11]"
		style="left: {logoLeft}px; top: {logoTop}px; width: {logoWidth}px"
	>
		{#if scrollPercentage == 50}
			<a class="m-2 no-underline hover:no-underline transition-none md:m-0 md:w-[120px]" href="/">
				{#if $themeStore}
					<img alt="logotype" src="logo_transparente_claro.png" />
				{:else}
					<img alt="logotype" src="logo_transparente_escuro.png" />
				{/if}
			</a>
		{:else if !$themeStore || scrollPercentage >= 48}
			<img alt="logotype" src="logo_transparente_claro.png" />
		{:else if scrollPercentage <= 48}
			<img alt="logotype" src="logo_transparente_escuro.png" />
		{/if}
	</div>
	<!--This is literally just an empty square to push the content far enough so that we can finish the animation. There is probably a better way to do this-->
	<div class="h-[calc(55vh+160px)]"></div>
{/if}
<h2 id="cansat">CANSAT</h2>
<p>
	O CanSat Portugal é uma competição nacional promovida pela <a href="https://www.esero.pt/"
		>ESERO Portugal</a
	>, em parceria com a Ciência Viva e a Agência Espacial Europeia (<a
		href="https://www.esa.int/Space_in_Member_States/Portugal">ESA</a
	>). Esta competição desafia equipas de estudantes do ensino secundário a construirem um satélite
	com as dimensões de uma lata de refrigerante.
</p>

<h2 id="project">PROJETO</h2>
<h3 id="mission1">MISSÃO PRIMÁRIA</h3>
<p>
	A missão primária, definida pela organização da competição, consiste na medição da temperatura do
	ar e da pressão atmosférica durante o voo do CanSat, da transmissão destes dados para a estação
	terra por telemetria, de 1 em 1 segundo, e ainda na análise destes dados.
</p>
<h3 id="objective">OBJETIVO CIENTÍFICO</h3>
<p>
	O objetivo científico do nosso projeto é recolher dados sobre a saúde e densidade da vegetação na
	área que o CanSat sobrevoar. Esses dados podem ser usados para ajudar agricultores e outras
	entidades, fornecendo-lhes informação relevante. Para obter estes dados, iremos calcular o <em
		>Normalized Difference Vegetation Index</em
	>
	(NDVI), tendo por base o estudo da NASA
	<a href="https://core.ac.uk/download/pdf/42863365.pdf"
		>"Using Landsat Digital Data for Estimating Green Biomass”</a
	>, realizado por D. W. Deering e Robert H. Haas.
</p>
<h3 id="mission2">MISSÃO SECUNDÁRIA</h3>
<p>
	Para realizar o objetivo a que nos propomos, o nosso CanSat irá usar uma câmera para captar
	imagens da área sobrevoada. Esta câmera será modificada para permitir a captação de luz vermelha e
	infravermelha numa só imagem. Decidimos usar esta técnica pois permite obter excelentes
	resultados, como confirmámos através do estudo de Gilles Rabatel <em>et al.</em>
	<a href="https://hal.science/hal-00648439/document"
		>"Getting NDVI spectral bands from a single standard RGB digital camera: a methodological
		approach"</a
	>
	As imagens captadas serão enviadas para a estação terra, onde um
	<!--
		<em
		class="underline decoration-dashed"
		title="Aplicação que mostra os dados recolhidos e processados, organizados de modo a facilitar a sua
			interpretação.">dashboard</em
		>
	-->
	<em>dashboard</em>
	irá processá-las para calcular o NDVI.
</p>

<h2 id="video">VIDEO</h2>
<iframe
	class="pb-10 w-full aspect-[4/3] md:aspect-video"
	src="https://www.youtube.com/embed/XplWaGhc1hQ?si=wIz4CanoSUktHEsP"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
></iframe>

<h2 id="team">EQUIPA</h2>
<div class="people">
	<!--Get a reference to the start of the scroll snapping bounds-->
	<!--This structure is very repetitive, it might be worth it to
		extract a component, or at least use an #each block-->
	<div bind:this={scrollSnapStartMarker} class="person">
		<img src="/team/rita.jpg" alt="Rita Fernandes" />
		<div>
			<h4>Rita Fernandes</h4>
			<div>Coordenação & Hardware</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/gabriel.jpg" alt="Gabriel Neto" />
		<div>
			<h4>Gabriel Neto</h4>
			<div>Desenvolvimento Científico</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/guido.jpg" alt="Guido Rezende" />
		<div>
			<h4>Guido Rezende</h4>
			<div>Programação da Estação Terra</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/levi.jpg" alt="Levi Gomes" />
		<div>
			<h4>Levi Gomes</h4>
			<div>Programação do CanSat</div>
		</div>
	</div>
	<div class="person">
		<img src="/team/miguel.jpg" alt="Miguel Monteiro" />
		<div>
			<h4>Miguel Monteiro</h4>
			<div>Paraquedas & Estrutura</div>
		</div>
	</div>
	<!--Get a reference to the end of the scroll snapping bounds-->
	<div bind:this={scrollSnapEndMarker} class="person">
		<img src="/team/filipa.jpg" alt="Filipa Cheng" />
		<div>
			<h4>Filipa Cheng</h4>
			<div>Divulgação</div>
		</div>
	</div>
</div>

<h2 id="blog">BLOG</h2>
<!--Insert the post list-->
<PostList postList={data.posts} />

<h2 class="pt-10" id="sponsor">Com o apoio de:</h2>
<div class="flex flex-col gap-y-20 [&>*]:w-5/6 [&>*]:md:w-1/2 items-center">
	<img src="/logos/clube2.png" alt="Clube de Ciências ESSS" />
	<img src="/logos/aesjb.png" alt="Agrupamento de Escolas São Julião da Barra" />
	<img src="/logos/inovlabs.png" alt="InovLabs" />
	<img src="/logos/valley.png" alt="Oeiras Valley" />
</div>

<!--The text just ended right at the bottom of the page, and it looked odd,
	so this adds some empty space-->
<div class="py-12"></div>
