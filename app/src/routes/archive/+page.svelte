<script lang="ts">
	// TODO: I think this route can be removed
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Post Archive</h2>
<PostList postList={data.posts} />
