<script lang="ts">
	import { page } from '$app/stores';
</script>

<!--Display the error code and message-->
<h1>{$page.status}: {$page.error?.message}</h1>
