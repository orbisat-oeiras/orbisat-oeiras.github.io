<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	const teamMembers = [
		{ src: '/team/rita.jpg', name: 'Rita Fernandes', desc: 'Coordenação & Hardware' },
		{ src: '/team/gabriel.jpg', name: 'Gabriel Neto', desc: 'Desenvolvimento Científico' },
		{ src: '/team/guido.jpg', name: 'Guido Rezende', desc: 'Programação da Estação Terra' },
		{ src: '/team/levi.jpg', name: 'Levi Gomes', desc: 'Programação do CanSat' },
		{ src: '/team/miguel.jpg', name: 'Miguel Monteiro', desc: 'Paraquedas & Estrutura' },
		{ src: '/team/filipa.jpg', name: 'Filipa Cheng', desc: 'Divulgação' }
	];

	onMount(() => {
		const sections = document.querySelectorAll('.team-member');

		// Pin each section and auto-scroll to next one after unpinning
		sections.forEach((section, index) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top top', // Pin section when it reaches the top of the viewport
				end: '+=100%', // Pin it for one viewport height
				pin: true, // Pin the section
				scrub: true, // Smooth scrolling
				onLeave: () => {
					if (index < sections.length - 1) {
						// Smooth scroll to next section after unpinning
						gsap.to(window, {
							scrollTo: sections[index + 1], // Scroll to the next section
							duration: 0.4,
							ease: 'power2.inOut'
						});
					}
				},
				onLeaveBack: () => {
					if (index > 0) {
						// Smooth scroll back to previous section when coming back up
						gsap.to(window, {
							scrollTo: sections[index - 1], // Scroll back to previous section
							duration: 0.4,
							ease: 'power2.inOut'
						});
					}
				}
			});
		});

		// Refresh ScrollTrigger after content is loaded
		ScrollTrigger.refresh();
	});
</script>

<div class="relative">
	{#each teamMembers as member, i (member.name)}
		<section class="team-member h-screen flex flex-col">
			<div class="shrink-0 h-[120px]"></div>
			{#if i % 2 === 0}
				<div class="grow flex flex-row items-center">
					<!--svelte-ignore a11y-missing-attribute-->
					<img src={member.src} class="h-[calc(100vh_-_120px)]" />
					<div class="w-1/2 flex flex-col items-start pl-10">
						<!-- svelte-ignore a11y_missing_attribute-->
						<h4 class="w-fit text-3xl">{member.name}</h4>
						<div class="w-fit text-3xl">{member.desc}</div>
					</div>
				</div>
			{:else}
				<div class="grow flex flex-row-reverse items-center">
					<!--svelte-ignore a11y-missing-attribute-->
					<img src={member.src} class="h-[calc(100vh_-_120px)]" />
					<div class="w-1/2 flex flex-col items-end pr-10">
						<!-- svelte-ignore a11y_missing_attribute-->
						<h4 class="w-fit text-3xl">{member.name}</h4>
						<div class="w-fit text-3xl">{member.desc}</div>
					</div>
				</div>
			{/if}
		</section>
	{/each}
</div>

<!--
<img
					class="object-cover relative w-auto md:right-[10vw] lg:right-[20vw] self-center h-screen"
					src={member.src}
				/>
-->
