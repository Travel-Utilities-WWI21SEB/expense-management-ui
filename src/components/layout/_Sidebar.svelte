<script lang="ts">
	import { page } from '$app/stores';
	import { DarkIcon, LightIcon } from '$icons';
	import { i } from '@inlang/sdk-js';
	import { drawerStore, modeCurrent } from '@skeletonlabs/skeleton';
	import { Banknotes, Clock, CreditCard, GlobeAlt, Home, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
				<span class="flex font-medium text-sm px-4 my-4 uppercase"
					>{i('sidebar.homepage.title')}</span
				>
			</li>
			<li>
				<a
					href="/home"
					class={classesActive('/home')}
					on:click={drawerClose}
					data-sveltekit-preload-data="hover"
				>
					<span class="badge">
						<Icon src={Home} theme="solid" class="w-8 h-8 mx-auto" />
					</span>
					<span class="flex-auto">{i('sidebar.homepage.home')}</span>
				</a>
			</li>
			<li class="my-px">
				<span class="flex font-medium text-sm px-4 my-4 uppercase">{i('sidebar.trips.title')}</span>
			</li>
			<li>
				<a
					href="/trips"
					class={classesActive('/trips')}
					on:click={drawerClose}
					data-sveltekit-preload-data="hover"
				>
					<span class="badge">
						<Icon src={GlobeAlt} theme="solid" class="w-8 h-8 mx-auto" />
					</span>
					<span class="flex-auto">{i('sidebar.trips.trips')}</span>
				</a>
			</li>
			<li class="my-px">
				<span class="flex font-medium text-sm px-4 my-4 uppercase"
					>{i('sidebar.overviews.title') || 'Overview'}</span
				>
			</li>
			<li>
				<a
					href="/costs"
					class={classesActive('/costs')}
					on:click={drawerClose}
					data-sveltekit-preload-data="hover"
				>
					<span class="badge">
						<Icon src={Banknotes} theme="solid" class="w-8 h-8 mx-auto" />
					</span>
					<span class="flex-auto">{i('sidebar.overview.costs') || 'Costs'}</span>
				</a>
			</li>
			<li>
				<a
					href="/debts"
					class={classesActive('/debts')}
					on:click={drawerClose}
					data-sveltekit-preload-data="hover"
				>
					<span class="badge">
						<Icon src={CreditCard} theme="solid" class="w-8 h-8 mx-auto" />
					</span>
					<span class="flex-auto">{i('sidebar.overview.debts') || 'Debts'}</span>
				</a>
			</li>
			<li>
				<a
					href="/history"
					class={classesActive('/history')}
					on:click={drawerClose}
					data-sveltekit-preload-data="hover"
				>
					<span class="badge">
						<Icon src={Clock} theme="solid" class="w-8 h-8 mx-auto" />
					</span>
					<span class="flex-auto">{i('sidebar.trips.history')}</span>
				</a>
			</li>
			<li class="my-px">
				<span class="flex font-medium text-sm px-4 my-4 uppercase"
					>{i('sidebar.account.title')}</span
				>
			</li>
			<li>
				<a
					href="/profile"
					class={classesActive('/profile')}
					on:click={drawerClose}
					data-sveltekit-preload-data="hover"
				>
					<span class="badge">
						<Icon src={User} theme="solid" class="w-8 h-8 mx-auto" />
					</span>
					<span class="flex-auto">{i('sidebar.account.profile')}</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
