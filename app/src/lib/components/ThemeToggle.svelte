<script lang="ts">
	// IMPORTANT
	// True means light theme
	// False means dark theme

	// THEME LOGIC

	import { themeStore } from '$lib/stores';
	import { onMount } from 'svelte';

	// Get the initial theme
	function getTheme() {
		if (import.meta.env.SSR) return false;
		const stored = localStorage.getItem('theme');
		if (stored) return stored === 'true';
		else return !window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	// Update the theme, saving it on localStorage and adding the proper CSS
	function applyTheme(theme: boolean) {
		// When pre-rendering, we don't care about theme
		if (import.meta.env.SSR) return;
		// Save the theme for later
		localStorage.setItem('theme', String(theme));
		// Finally, set the class for tailwind
		const body = document.getElementsByTagName('html')[0];
		if (theme) {
			body.classList.remove('dark');
		} else {
			body.classList.add('dark');
		}
	}

	function toggleTheme() {
		// First, set our local variable
		theme = !theme;
	}

	let theme = $state(getTheme());

	// This is called when this component is inserted into the DOM
	onMount(() => {
		theme = getTheme();
		applyTheme(theme);
	});

	// ANIMATION LOGIC

	// A spring is used to animate the icon
	import { spring } from 'svelte/motion';

	// Store both the sun's and the moon's properties
	const props = {
		sun: {
			r: 9,
			transform: 40,
			cx: 12,
			cy: 4,
			opacity: 0
		},
		moon: {
			r: 5,
			transform: 90,
			cx: 30,
			cy: 0,
			opacity: 1
		}
	};
	// Create the configuration for the spring
	const springConfig = {
		stiffness: 0.07,
		damping: 0.17
	};

	// Create the spring
	const propsSpring = spring(props[theme ? 'sun' : 'moon'], springConfig);

	// Reactive declarations: update the spring based on the theme
	$effect(() => {
		propsSpring.set(props[theme ? 'sun' : 'moon']);
	});
	$effect(() => {
		applyTheme(theme);
	});
	// Also propagate theme changes to the entire app
	$effect(() => {
		themeStore.set(theme);
	});
</script>

<!--Toggle the theme when the component is clicked-->
<button onclick={toggleTheme}>
	<!--It's SVG, and it looks good. That's all I know-->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="black"
		class="cursor-pointer"
		style="transform: rotate({$propsSpring.transform}deg)"
	>
		<mask id="myMask2">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<circle cx={$propsSpring.cx} cy={$propsSpring.cy} r="9" fill="black" />
		</mask>

		<circle
			cx="12"
			cy="12"
			r={$propsSpring.r}
			fill={theme ? '#fffde9' : '#231f20'}
			mask="url(#myMask2)"
		/>
		<g stroke={theme ? '#fffde9' : '#231f20'} opacity={$propsSpring.opacity}>
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
	</svg>
</button>
