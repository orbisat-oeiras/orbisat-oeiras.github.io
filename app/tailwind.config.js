/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			grey: {
				100: '#14131D',
				200: '#282C36',
				300: '#41454E',
				400: '#5E6167',
				500: '#808080',
				600: '#9D9C9C',
				700: '#BAB8B7',
				800: '#D8D5D2',
				900: '#F5F2ED'
			},
			accent: {
				100: '#072323',
				200: '#0A4342',
				300: '#0B6362',
				400: '#098381',
				500: '#05A3A1',
				600: '#2BB6B4',
				700: '#59C9C8',
				800: '#8FDCDB',
				900: '#CCEFEF'
			},
			cansat: {
				black: '#231f20',
				dark1: '#312E2F',
				dark2: '#3F3C3F',
				dark3: '#4B494D',
				grey: '#58595b',
				light1: '#918e87',
				light2: '#b7b3a7',
				light3: '#ddd6c3',
				light4: '#fef9e8',
				cream: '#fffde9',
				white: '#ffffff',
				accent: '#dd5928'
			}
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
