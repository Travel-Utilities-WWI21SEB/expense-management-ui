<script lang="ts">
	import { page } from '$app/stores';
	import {
		CostIcon,
		DarkIcon,
		GlobeIcon,
		HomepageIcon,
		LightIcon,
		TimeIcon,
		UserIcon
	} from '$icons';
	import { drawerStore, modeCurrent } from '@skeletonlabs/skeleton';

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');

	const drawerClose = () => {
		drawerStore.close();
	};
</script>

<div class="h-full">
	<div class="sidebar-header flex items-center justify-center py-4">
		{#if !$modeCurrent}
			<DarkIcon width={70} height={10} />
		{:else}
			<LightIcon width={70} height={10} />
		{/if}
	</div>

	<nav class="list-nav p-4">
		<ul>
			<li class="my-px">
				<span class="flex font-medium text-sm px-4 my-4 uppercase">Homepage</span>
			</li>
			<li>
				<a href="/home" class={classesActive('/home')} on:click={drawerClose}>
					<span class="badge">
						<HomepageIcon width={8} height={8} />
					</span>
					<span class="flex-auto">Home</span>
				</a>
			</li>
			<li class="my-px">
				<span class="flex font-medium text-sm px-4 my-4 uppercase">Trips</span>
			</li>
			<li>
				<a href="/trips" class={classesActive('/trips')} on:click={drawerClose}>
					<span class="badge">
						<GlobeIcon sidebarIcon={true} />
					</span>
					<span class="flex-auto">Trips</span>
				</a>
			</li>
			<li>
				<a href="/costs" class={classesActive('/costs')} on:click={drawerClose}>
					<span class="badge">
						<CostIcon width={8} height={8} />
					</span>
					<span class="flex-auto">Costs</span>
				</a>
			</li>
			<li>
				<a href="/history" class={classesActive('/history')} on:click={drawerClose}>
					<span class="badge">
						<TimeIcon width={8} height={8} />
					</span>
					<span class="flex-auto">History</span>
				</a>
			</li>
			<li class="my-px">
				<span class="flex font-medium text-sm px-4 my-4 uppercase">Account</span>
			</li>
			<li>
				<a href="/profile" class={classesActive('/profile')} on:click={drawerClose}>
					<span class="badge">
						<UserIcon width={8} height={8} />
					</span>
					<span class="flex-auto">Profile</span>
				</a>
			</li>
			<li>
				<a href="/notifications" class={classesActive('/notifications')} on:click={drawerClose}>
					<span class="badge">
						<TimeIcon width={8} height={8} />
					</span>
					<span class="flex-auto">Notifications</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
