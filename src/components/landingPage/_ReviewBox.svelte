<script lang="ts">
	export let quote: string;
	export let name: string;
	export let jobTitle: string;
</script>

<div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
	<div class="h-full text-center">
		<slot name="icon" />
		<blockquote class="blockquote">{quote}</blockquote>
		<span class="inline-block h-1 w-10 rounded bg-secondary-600 mt-6 mb-4" />
		<h6 class="h6 tracking-wider">{name}</h6>
		<p class="text-surface-400 dark:text-surface-300">{jobTitle}</p>
	</div>
</div>
