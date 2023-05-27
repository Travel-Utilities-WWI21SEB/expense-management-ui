<script lang="ts">
	import { AppBar, drawerStore, LightSwitch } from '@skeletonlabs/skeleton';
	import { BagIcon, MenuIcon, SettingsIcon } from '$icons';

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
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
		<BagIcon width={12} height={12} />
	</svelte:fragment>
	<!-- Title -->
	<h1 class="h1 font-bold tracking-widest hidden lg:block">Costventures</h1>
	<!-- Title -->
	<svelte:fragment slot="trail">
		<!-- Search Bar -->
		<!-- TBD -->
		<!-- Search Bar -->

		<!-- Theme Switch -->
		<LightSwitch width="w-12 lg:w-16" height="h-6 lg:h-8" />
		<!-- Theme Switch -->

		<!-- Settings -->
		<button type="button" class="btn-icon variant-ringed">
			<SettingsIcon width={8} height={8} />
		</button>
		<!-- Settings -->
	</svelte:fragment>
</AppBar>
