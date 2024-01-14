import { writable } from 'svelte/store';

// Give all the app access to the current theme
export const themeStore = writable(true);
