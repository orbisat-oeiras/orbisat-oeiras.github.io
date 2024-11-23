<script lang="ts">
	import type { PageData } from './$types';

	// Data loaded on the server

	// Import Giscus to handle comments
	import Giscus from '@giscus/svelte';
	// Get a reference to the theme state (light or dark)
	import { themeStore } from '$lib/stores';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Update Giscus whenever the theme changes
	themeStore.subscribe((value) => {
		try {
			// Get the Giscus iframe
			const iframe = document
				.querySelector('giscus-widget')!
				.shadowRoot!.querySelector<HTMLIFrameElement>('iframe');
			if (!iframe || !iframe.contentWindow) return;
			// Send a message to Giscus (through the iframe)
			// telling it to change theme
			iframe.contentWindow.postMessage(
				{
					giscus: {
						setConfig: {
							theme: value ? 'light' : 'dark'
						}
					}
				},
				'https://giscus.app'
			);
		} catch (e) {
			// This only happens when pre-rendering
			// Build doesn't like empty blocks...
			console.log('Failed to communicate with Giscus, this is likely fine');
		}
	});
</script>

<h2 class="no-underline text-center text-5xl my-6">{data.post.title}</h2>
<!--Posts are allowed to not have an image, so handle it properly-->
{#if data.post.cover_image_exists}
	<img src={'/' + data.post.cover_image} alt="" />
{/if}
<p
	class="text-right before:content-['-Posted_on_'] text-sm italic text-light-muted dark:text-dark-muted"
>
	{data.post.date_string}
</p>
<!--This div has all these styles because it must style all
	of the post's content as well as itself-->
<div
	class="text-lg [&_h2]:mt-4 [&_h3]:mt-4 [&_h4]:mt-4 [&_ul]:list-disc [&_ul]:list-inside [&_p]:indent-5 [&_img]:mt-6 [&_code]:text-[length:inherit] [&_pre]:bg-light-special-bg [&_pre]:text-light-special-fg [&_.line-number]:bg-light-special-muted [&_pre]:dark:bg-dark-special-bg [&_pre]:dark:text-dark-special-fg [&_.line-number]:dark:bg-dark-special-muted [&_pre]:rounded [&_pre]:overflow-x-scroll [&_pre]:border-2 [&_.line-number]:text-accent-100 [&_.line-number]:dark:text-accent-900 [&_.line-number]:sticky [&_.line-number]:left-0 [&_.line-number]:px-1 [&_.line-number]:text-right [&_td]:pl-1 [&_blockquote]:border-l-4 [&_blockquote]:border-accent-500 [&_blockquote]:bg-accent-900 [&_blockquote]:dark:bg-accent-200 [&_blockquote_p]:indent-0 [&_blockquote]:p-3 [&_blockquote]:pl-2 [&_blockquote]:mx-5 [&_blockquote]:my-3 [&_eq]:contents"
>
	<!--Inject the rendered markdown-->
	{@html data.innerHTML}
</div>

<!--Add links to the previous and next posts,
	if they exist-->
<d class="flex mt-8">
	{#if data.previousPostPath !== '/blog/undefined'}
		<a
			class="group btn duration-150 inline-block px-5 py-0 text-center w-1/2 rounded-r-none"
			href={data.previousPostPath}
		>
			<span
				class="relative transition-all before:content-['«'] before:absolute before:opacity-0 before:left-[-20px] before:top-0 before:transition-all before:duration-150 group-hover:before:opacity-100 group-hover:before:left-0 group-hover:pl-6"
				><span class="transition-color duration-150 text-light-ui-fg dark:text-dark-ui-fg"
					>Previous Post</span
				></span
			>
		</a>
	{:else}
		<!--just so the next one stays on the right,
		there are probably better solutions to this, but it's
		only going to happen on one post so...-->
		<div class="w-1/2"></div>
	{/if}
	{#if data.nextPostPath !== '/blog/undefined'}
		<a
			class="group btn duration-150 inline-block px-5 py-0 text-center w-1/2 rounded-l-none"
			href={data.nextPostPath}
		>
			<span
				class="relative transition-all duration-150 after:content-['»'] after:absolute after:opacity-0 after:right-[-20px] after:top-0 after:transition-all group-hover:after:opacity-100 group-hover:after:right-0 group-hover:pr-6"
				><span class="transition-color duration-150 text-light-ui-fg dark:text-dark-ui-fg"
					>Next Post</span
				></span
			>
		</a>
	{/if}
</d>

<Giscus
	repo="levimcgomes/levimcgomes.github.io"
	repoId="R_kgDOH_rqaA"
	category="Blog Comments"
	categoryId="DIC_kwDOH_rqaM4CVNZX"
	mapping="pathname"
	strict="0"
	reactionsEnabled="1"
	emitMetadata="0"
	inputPosition="top"
	lang="en"
	theme={$themeStore ? 'light' : 'dark'}
	loading="lazy"
/>
