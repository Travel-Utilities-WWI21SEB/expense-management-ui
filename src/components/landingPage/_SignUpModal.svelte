<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import SignInComponent from './signin/_SignInComponent.svelte';
	import SignUpComponent from './signup/_SignUpComponent.svelte';

	export let data: {
		rememberMe: boolean;
		email: string;
	};
	let tabSet = 0;

	const changeTab = (index: number) => {
		tabSet = index;
	};
</script>

<div class="gap-8 flex flex-col flex-shrink bg-gray-50 dark:bg-gray-900 md:w-1/2">
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
				<SignInComponent {changeTab} rememberMeCookie={data.rememberMe} emailCookie={data.email} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
