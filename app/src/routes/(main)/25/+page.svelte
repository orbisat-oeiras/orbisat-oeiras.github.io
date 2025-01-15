<script lang="ts">
	// Import components
	import PostList from '$lib/components/PostList.svelte';
	import Header from '$lib/components/Header.svelte';
	import TeamPresentation from '../TeamPresentation.svelte';
	// Import types
	import type { PageData } from './$types';
	import { themeStore, isSmallDevice } from '$lib/stores';
	import { onMount } from 'svelte';

	// Team data
	const teamMembers = [
		{ src: '/team/25/levi.jpg', name: 'Levi Gomes', desc: 'Coordenação & Firmware' },
		{ src: '/team/25/antonio.jpg', name: 'António Marques', desc: 'Eletrónica' },
		{ src: '/team/25/gustavo.jpg', name: 'Gustavo Carmo', desc: 'Estrutura & Divulgação' },
		{ src: '/team/25/diogo.jpg', name: 'Diogo Ribeiro', desc: 'Paraquedas & Recuperação' },
		{ src: '/team/25/marcelo.jpg', name: 'Marcelo Lago', desc: 'Groundstation' },
		{ src: '/team/25/rodrigo.jpg', name: 'Rodrigo Ferreira', desc: 'Telecomunicações' }
	];

	interface Props {
		// Data provided by the server load function
		data: PageData;
	}

	let { data }: Props = $props();

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	gsap.registerPlugin(ScrollTrigger);

	// CODE FOR THE LOGO ANIMATION
	let logoImage: HTMLImageElement | undefined = $state();
	let trigger: ScrollTrigger | undefined = $state();

	onMount(() => {
		trigger = ScrollTrigger.create({
			animation: gsap.from('#logo', {
				top: '50vh',
				yPercent: -50,
				left: '50vw',
				xPercent: -50,
				scale: 5
			}),
			scrub: true,
			trigger: 'main',
			start: 'top bottom',
			endTrigger: 'main',
			end: 'top 240px',
			onLeave: (_) => {
				console.log('onLeave');

				if (logoImage && $themeStore) {
					logoImage.src = '/logo_transparente_claro.png';
				}
			},
			onEnterBack: (_) => {
				console.log('onLeave');

				if (logoImage && $themeStore) {
					logoImage.src = '/logo_transparente_escuro.png';
				}
			}
		});
	});
</script>

<svelte:head>
	<title>OrbiSat Oeiras 25</title>
</svelte:head>
{#if $isSmallDevice}
	<Header />
{:else}
	<Header showLogo={false} />
	<div id="logo" class="fixed top-6 left-4 translate-x-0 translate-y-0 h-auto w-[120px] z-[999]">
		<a class="m-2 no-underline hover:no-underline transition-none md:m-0" href="/">
			{#if $themeStore && (!trigger?.progress || trigger.progress < 1)}
				<img
					bind:this={logoImage}
					class="w-auto h-full"
					src="/logo_transparente_escuro.png"
					alt=""
				/>
			{:else}
				<img
					bind:this={logoImage}
					class="w-auto h-full"
					src="/logo_transparente_claro.png"
					alt=""
				/>
			{/if}
		</a>
	</div>
	<div class="container h-[calc(100vh)]"></div>
{/if}

<!--The actual content of the page is wrapped inside this main,
	which adds an adequate margin to ensure lines of text aren't
	too large-->
<main class="py-0 px-[10%] lg:px-[20%]">
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
		A missão primária, definida pela organização da competição, consiste na medição da temperatura
		do ar e da pressão atmosférica durante o voo do CanSat, da transmissão destes dados para a
		estação terra por telemetria, de 1 em 1 segundo, e ainda na análise destes dados.
	</p>
	<h3 id="mission2">MISSÃO SECUNDÁRIA</h3>
	<p>TODO</p>

	<h2 id="video">VIDEO</h2>
	<iframe
		class="pb-10 w-full aspect-[4/3] md:aspect-video"
		src="https://www.youtube.com/embed/XplWaGhc1hQ?si=wIz4CanoSUktHEsP"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe>
	<h2 id="team" class="mb-[-80px]">EQUIPA</h2>
</main>
<TeamPresentation {teamMembers} />
<main class="py-0 px-[10%] lg:px-[20%]">
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
</main>
