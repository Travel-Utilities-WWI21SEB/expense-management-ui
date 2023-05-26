<script lang="ts">
	import { AppRail, AppRailAnchor, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { CostIcon, GlobeIcon, HomepageIcon, TimeIcon, UserIcon } from '$icons';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<AppRail gap="gap-10" width="w-20" border="">
	<hr class="!border-t-4" />
	<svelte:fragment slot="lead">
		<hr class="!border-t-2" />
		<AppRailAnchor
			href="/"
			selected={$page.url.pathname === '/'}
			on:click={drawerClose}
			title="Home"
		>
			<HomepageIcon width={12} height={12} />
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
		<GlobeIcon width={12} height={12} />
		<h5 class="h5">Trips</h5>
	</AppRailAnchor>
	<AppRailAnchor
		href="/costs"
		selected={$page.url.pathname === '/costs'}
		on:click={drawerClose}
		title="Costs"
	>
		<CostIcon width={12} height={12} />
		<h5 class="h5">Costs</h5>
	</AppRailAnchor>
	<AppRailAnchor
		href="/history"
		selected={$page.url.pathname === '/history'}
		on:click={drawerClose}
		title="History"
	>
		<TimeIcon width={12} height={12} />
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
		>
			<UserIcon width={12} height={12} />
			<h5 class="h5">Profile</h5>
		</AppRailAnchor>
		<hr class="!border-t-2" />
	</svelte:fragment>
</AppRail>
