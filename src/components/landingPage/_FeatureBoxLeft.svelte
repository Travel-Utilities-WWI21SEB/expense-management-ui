<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import { ArrowLongRight, type IconSource } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let title: string;
	export let content: string;
	export let path: string;
	export let icon: IconSource;
</script>

<div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-current flex-row">
	<div
		class="w-32 h-32 mr-10 inline-flex items-center justify-center rounded-full bg-surface-300 dark:bg-surface-500 flex-shrink-0"
	>
		<Icon src={icon} class="md:w-16 md:h-16 w-10 h-10 mx-auto" />
	</div>
	<div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
		<h4 class="h4 title-font font-medium mb-2">{title}</h4>
		<p class="leading-relaxed text-base">
			{content}
		</p>
		<a
			href={`/${path}`}
			class="mt-3 text-tertiary-800 dark:text-tertiary-400 inline-flex items-center"
			>{i('landingPage.features.redirectMessage')}
			<Icon src={ArrowLongRight} class="w-6 h-6" />
		</a>
	</div>
</div>
