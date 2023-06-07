<script lang="ts">
	import { ArrowIcon } from '$icons';

	export let title: string;
	export let content: string;
	export let path: string;
</script>

<div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-current sm:flex-row">
	<div class="flex-grow text-left mt-6 sm:mt-0">
		<h4 class="h4 mb-2">{title}</h4>
		<p class="leading-relaxed text-base">
			{content}
		</p>
		<a
			href={`/${path}`}
			class="mt-3 text-tertiary-800 dark:text-tertiary-400 inline-flex items-center"
			>Learn More
			<ArrowIcon />
		</a>
	</div>
	<div
		class="sm:w-32 order-none h-32 w-20 ml-10 inline-flex items-center justify-center rounded-full bg-surface-300 dark:bg-surface-500 flex-shrink-0"
	>
		<slot name="icon" />
	</div>
</div>
