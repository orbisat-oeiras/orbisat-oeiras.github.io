import { writable } from 'svelte/store';

// Give all the app access to the current theme
export const themeStore = writable(true);
// Flag for a small device (width < 700px)
export const isSmallDevice = writable(false);
