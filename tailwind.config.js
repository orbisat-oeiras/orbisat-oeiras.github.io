// Colour aliases
let colours = {
	dark1: '#312E2F',
	dark2: '#4E4A4C',
	dark3: '#6C6869',
	dark4: '#898586',
	light1: '#A6A4A3',
	light2: '#C3C3C1',
	light3: '#E1E1E1',
	light4: '#FEFEFE',
	black: '#231F20',
	grey: '#58595B',
	cream: '#FFFDE9',
	white: '#FEFEFE',
	accent: '#DD5928'
};

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			light: {
				bg: colours.cream,
				fg: colours.black,
				muted: colours.dark3,
				ui: {
					bg: colours.grey,
					fg: colours.white,
					muted: colours.light2
				},
				special: {
					bg: colours.light4,
					fg: colours.grey,
					muted: colours.light3
				}
			},
			dark: {
				bg: colours.grey,
				fg: colours.cream,
				muted: colours.light3,
				ui: {
					bg: colours.light3,
					fg: colours.black,
					muted: colours.dark3
				},
				special: {
					bg: colours.dark1,
					fg: colours.white,
					muted: colours.dark2
				}
			},
			invariant: {
				bg: colours.black,
				fg: colours.cream,
				muted: colours.white,
				ui: {
					bg: colours.grey,
					fg: colours.cream,
					muted: colours.light2
				}
			},
			accent: colours.accent
		},
		fontFamily: {
			open: ['Open Sans', 'sans-serif']
		},
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '700px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		}
	},
	plugins: []
};
