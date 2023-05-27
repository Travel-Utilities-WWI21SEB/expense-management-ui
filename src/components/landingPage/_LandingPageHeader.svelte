<script lang="ts">
	import { AppBar, drawerStore, LightSwitch } from '@skeletonlabs/skeleton';
	import { DarkIcon, LightIcon, MenuIcon } from '$icons';
	import { modeCurrent } from '@skeletonlabs/skeleton';

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	border="border-b border-current"
>
	<svelte:fragment slot="lead">
		<!-- Menu (only on small devices) -->
		<button
			type="button"
			class="btn-icon variant-ringed lg:hidden btn btn-sm mr-4"
			on:click={drawerOpen}
		>
			<MenuIcon width={8} height={8} />
		</button>
		<!-- Menu (only on small devices) -->
	</svelte:fragment>
	<!-- <HeaderLogo /> -->
	{#if !$modeCurrent}
		<DarkIcon width={70} height={10} />
	{:else}
		<LightIcon width={70} height={10} />
	{/if}

	<svelte:fragment slot="trail">
		<!-- Theme Switch -->
		<LightSwitch width="w-12 lg:w-16" height="h-6 lg:h-8" />
		<!-- Theme Switch -->
	</svelte:fragment>
</AppBar>
