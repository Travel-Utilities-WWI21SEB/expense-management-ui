<script lang="ts">
	import { goto } from '$app/navigation';
	import { DarkIcon, LightIcon, LogoutIcon, MenuIcon, SettingsIcon, UserIcon } from '$icons';
	import {
		AppBar,
		LightSwitch,
		drawerStore,
		modeCurrent,
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

		const { success } = await response.json();

		if (success) {
			goto('/');
		}
	};
</script>

<!-- SETTINGS POPUP -->
<div class="card p-4 flex flex-col flex-grow" data-popup="settingsPopup">
	<div class="btn-group-vertical variant-ghost">
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
</div>
<!-- SETTINGS POPUP-->

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
		<!-- Logo -->
	</svelte:fragment>
	{#if !$modeCurrent}
		<DarkIcon width={70} height={10} />
	{:else}
		<LightIcon width={70} height={10} />
	{/if}
	<svelte:fragment slot="trail">
		<!-- Search Bar -->
		<!-- TBD -->
		<!-- Search Bar -->

		<!-- Theme Switch -->
		<LightSwitch width="w-12 lg:w-16" height="h-6 lg:h-8" />
		<!-- Theme Switch -->

		<!-- Settings -->
		<button type="button" class="btn-icon variant-ringed" use:popup={settingsPopup}>
			<SettingsIcon width={8} height={8} />
		</button>
		<!-- Settings -->
	</svelte:fragment>
</AppBar>
