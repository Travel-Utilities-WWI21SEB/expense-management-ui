<script lang="ts">
	import { SignInComponent, SignUpComponent } from '$components';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	let tabSet = 1;

	const changeTab = (): void => {
		tabSet = tabSet === 0 ? 1 : 0;
	};
</script>

<div class="gap-8 flex flex-col flex-grow">
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded="rounded-xl"
		class="w-full rounded-xl"
		regionList="mx-2"
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
