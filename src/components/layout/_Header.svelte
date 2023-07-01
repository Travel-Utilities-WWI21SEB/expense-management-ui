<script lang="ts">
	import { goto } from '$app/navigation';
	import { LogoutIcon, MenuIcon, SearchIcon } from '$icons';
	import { i } from '@inlang/sdk-js';
	import { AppBar, LightSwitch, drawerStore } from '@skeletonlabs/skeleton';
	import LanguageSelector from '../general/_LanguageSelector.svelte';

	const drawerOpen = (): void => {
		drawerStore.open({});
	};

	const logoutHandler = async (): Promise<void> => {
		const response = await fetch('/api/users/logout', {
			method: 'POST'
		});

		const body = await response.json();
		const { success } = body;

		if (success) {
			goto('/');
		}
	};
</script>

<AppBar background="bg-surface-500/25" border="border-b border-current">
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
	<!-- Search Bar -->
	<div
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] hidden md:flex md:w-2/3 lg:w-1/2"
	>
		<div class="input-group-shim">
			<SearchIcon />
		</div>
		<input
			type="search"
			id="default-search"
			class="w-full border border-current rounded-lg"
			placeholder={i('header.search')}
			required
		/>
	</div>
	<!-- Search Bar -->
	<svelte:fragment slot="trail">
		<!-- LANGUAGE SELECTOR -->
		<LanguageSelector />
		<!-- Logut -->
		<button type="button" class="btn variant-ringed pt-2" on:click={logoutHandler}>
			<span>
				<LogoutIcon />
			</span>
			<span class="hidden md:block">{i('header.logout')}</span>
		</button>
		<!-- LIGHT SWITCH -->
		<LightSwitch width="w-16" height="h-8" class="mx-auto border border-surface rounded-full" />
	</svelte:fragment>
</AppBar>
