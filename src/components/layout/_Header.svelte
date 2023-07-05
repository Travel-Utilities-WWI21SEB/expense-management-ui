<script lang="ts">
	import { goto } from '$app/navigation';
	import { LanguageSelector, ThemeSwitcher } from '$components';
	import { i } from '@inlang/sdk-js';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import { ArrowLeftOnRectangle, Bars3, MagnifyingGlass } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
			<Icon src={Bars3} theme="solid" class="w-8 h-8" />
		</button>
		<!-- Menu (only on small devices) -->
	</svelte:fragment>
	<!-- Search Bar -->
	<div
		class="input-group input-group-divider grid-cols-[auto_1fr_auto] hidden md:flex md:w-2/3 lg:w-1/2"
	>
		<div class="input-group-shim">
			<Icon src={MagnifyingGlass} theme="solid" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
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
		<!-- LIGHT SWITCH -->
		<ThemeSwitcher />
		<!-- LANGUAGE SELECTOR -->
		<LanguageSelector />
		<!-- Logut -->
		<button type="button" class="btn variant-ringed my-auto" on:click={logoutHandler}>
			<span>
				<Icon src={ArrowLeftOnRectangle} theme="solid" class="w-6 h-6" />
			</span>
			<span class="hidden md:block">{i('header.logout')}</span>
		</button>
	</svelte:fragment>
</AppBar>
