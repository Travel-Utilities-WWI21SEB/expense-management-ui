<script lang="ts">
	import { AppRail, AppRailAnchor, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { CostIcon, GlobeIcon, HomepageIcon, TimeIcon, UserIcon } from '$icons';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<AppRail
	gap="gap-2"
	spacing="space-y-0"
	width="w-20"
	height="h-full"
	border="lg:border-r border-current"
>
	<hr class="!border-t-4" />
	<svelte:fragment slot="lead">
		<hr class="!border-t-2" />
		<AppRailAnchor
			href="/home"
			selected={$page.url.pathname === '/home'}
			on:click={drawerClose}
			title="Home"
		>
			<svelte:fragment slot="lead">
				<HomepageIcon width={8} height={8} />
			</svelte:fragment>
			<span>Home</span>
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
			<GlobeIcon width={8} height={8} />
		</svelte:fragment>
		<span>Trips</span>
	</AppRailAnchor>
	<AppRailAnchor
		href="/costs"
		selected={$page.url.pathname === '/costs'}
		on:click={drawerClose}
		title="Costs"
	>
		<svelte:fragment slot="lead">
			<CostIcon width={8} height={8} />
		</svelte:fragment>
		<span>Costs</span>
	</AppRailAnchor>
	<AppRailAnchor
		href="/history"
		selected={$page.url.pathname === '/history'}
		on:click={drawerClose}
		title="History"
	>
		<svelte:fragment slot="lead">
			<TimeIcon width={8} height={8} />
		</svelte:fragment>
		<span>History</span>
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
			<svelte:fragment slot="lead">
				<UserIcon width={10} height={10} />
			</svelte:fragment>
			<span>Profile</span>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
