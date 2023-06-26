<script lang="ts">
	import { goto } from '$app/navigation';
	import { LogoutIcon, MenuIcon, SettingsIcon, UserIcon } from '$icons';
	import {
		AppBar,
		LightSwitch,
		drawerStore,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	const drawerOpen = (): void => {
		drawerStore.open({});
	};

	const settingsPopup: PopupSettings = {
		event: 'click',
		target: 'settingsPopup',
		placement: 'bottom'
	};

	const logoutHandler = async (): Promise<void> => {
		const response = await fetch('api/users/logout', {
			method: 'POST'
		});

		const body = await response.json();
		const { success } = body;

		if (success) {
			goto('/');
		}
	};
</script>

<!-- SETTINGS POPUP -->
<div class="btn-group-vertical variant-filled-surface" data-popup="settingsPopup">
	<hr class="!border-t-2 !border-separate" />
	<button type="button" class="btn !bg-transparent">
		<span><UserIcon width={6} height={6} /></span>
		<span>Profile</span>
	</button>
	<hr class="!border-t-2 !border-separate" />
	<button type="button" class="btn !bg-transparent" on:click={logoutHandler}>
		<span><LogoutIcon /></span>
		<span>Logout</span>
	</button>
</div>

<!-- SETTINGS POPUP-->

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

		<!-- Search Bar -->
		<!-- TBD -->
		<!-- Search Bar -->
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch
			bgDark="bg-surface-200/50"
			bgLight="bg-surface-200/50"
			fillLight="gray-500"
			width="w-12 lg:w-16"
			height="h-6 lg:h-8"
			class="mx-auto"
		/>
		<!-- Settings -->
		<button type="button" class="btn-icon variant-ringed" use:popup={settingsPopup}>
			<SettingsIcon width={8} height={8} />
		</button>
		<!-- Settings -->
	</svelte:fragment>
</AppBar>
