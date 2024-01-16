import { redirect } from '@sveltejs/kit';
import { page } from '$app/stores';

/* The current domain (orbisat-oeiras.github.io) will most
   likely be re-used in the future. To allow the addition
   of future content without losing past content, each years
   actual site will be wrapped in a route with the year's
   last two digits. The root route always redirects to the
   current year's home page.
   TODO: should this be 301 (moved permanently) or 302 (moved temporarily)?
*/
export function load({ params, url }) {
	console.log(url);
	throw redirect(302, '/24/' + params.url);
}
