<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import SignInComponent from './_SignInComponent.svelte';
	import SignUpComponent from './_SignUpComponent.svelte';

	let tabSet = 0;

	const changeTab = (index: number) => {
		tabSet = index;
	};
</script>

<div class="container md:w-1/2 grid grid-rows-auto grid-flow-col gap-8 h-4/5 md:h-3/5">
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded="rounded-xl"
		class="bg-gray-50 dark:bg-gray-900 w-full rounded-xl"
	>
		<Tab bind:group={tabSet} class="mt-2 mb-2" name="tab1" value={0}>Register</Tab>
		<Tab bind:group={tabSet} class="mt-2 mb-2" name="tab2" value={1}>Login</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<SignUpComponent {changeTab} />
			{:else if tabSet === 1}
				<SignInComponent {changeTab} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
