<script lang="ts">
	import { AppRail, AppRailAnchor, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { CostIcon, GlobeIcon, HomepageIcon, TimeIcon, UserIcon } from '$icons';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<AppRail gap="gap-2" width="w-20" height="h-full" border="">
	<hr class="!border-t-4" />
	<svelte:fragment slot="lead">
		<hr class="!border-t-2" />
		<AppRailAnchor
			href="/"
			selected={$page.url.pathname === '/'}
			on:click={drawerClose}
			title="Home"
		>
			<svelte:fragment slot="lead">
				<HomepageIcon width={12} height={12} />
			</svelte:fragment>
			<h5 class="h5">Home</h5>
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailAnchor
		href="/trips"
		selected={$page.url.pathname === '/trips'}
		on:click={drawerClose}
		title="Trips"
	>
		<svelte:fragment slot="lead">
			<GlobeIcon width={12} height={12} />
		</svelte:fragment>
		<h5 class="h5">Trips</h5>
	</AppRailAnchor>
	<AppRailAnchor
		href="/costs"
		selected={$page.url.pathname === '/costs'}
		on:click={drawerClose}
		title="Costs"
	>
		<svelte:fragment slot="lead">
			<CostIcon width={12} height={12} />
		</svelte:fragment>
		<h5 class="h5">Costs</h5>
	</AppRailAnchor>
	<AppRailAnchor
		href="/history"
		selected={$page.url.pathname === '/history'}
		on:click={drawerClose}
		title="History"
	>
		<svelte:fragment slot="lead">
			<TimeIcon width={12} height={12} />
		</svelte:fragment>
		<h5 class="h5">History</h5>
	</AppRailAnchor>
	<hr class="!border-t-4" />
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor
			href="/profile"
			selected={$page.url.pathname === '/profile'}
			on:click={drawerClose}
			title="Account"
			class=".top-2"
		>
			<svelte:fragment slot="lead">
				<UserIcon width={12} height={12} />
			</svelte:fragment>
			<h5 class="h5">Profile</h5>
		</AppRailAnchor>
		<hr class="!border-t-2" />
	</svelte:fragment>
</AppRail>
