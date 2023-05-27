<script lang="ts">
	export let title: string;
	export let content: string;
	export let path: string;
</script>

<div
	class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-current sm:flex-row flex-col"
>
	<div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
		<h4 class="h4 mb-2">{title}</h4>
		<p class="leading-relaxed text-base">
			{content}
		</p>
		<a
			href={`/${path}`}
			class="mt-3 text-tertiary-800 dark:text-tertiary-400 inline-flex items-center"
			>Learn More
			<svg
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				class="w-4 h-4 ml-2"
				viewBox="0 0 24 24"
			>
				<path d="M5 12h14M12 5l7 7-7 7" />
			</svg>
		</a>
	</div>
	<div
		class="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-surface-300 dark:bg-surface-500 flex-shrink-0"
	>
		<slot name="icon" />
	</div>
</div>
