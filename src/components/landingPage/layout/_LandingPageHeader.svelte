<script lang="ts">
	import { LanguageSelector, ThemeSwitcher } from '$components';
	import { DarkIcon, LightIcon } from '$icons';
	import { activeTheme } from '$stores';
	import { AppBar, getModeOsPrefers } from '@skeletonlabs/skeleton';

	const icons = [
		{ theme: 'dark', component: DarkIcon },
		{ theme: 'light', component: LightIcon }
	];

	const mapTheme = (bool: boolean) => (bool ? 'light' : 'dark');

	$: currentTheme = $activeTheme === 'system' ? mapTheme(getModeOsPrefers()) : $activeTheme;
	$: activeIcon = icons.find((icon) => icon.theme === currentTheme)?.component;
</script>

<AppBar
	gridColumns="grid-cols-3"
	background="bg-surface-500/25"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	border="border-b border-current"
>
	<svelte:fragment slot="lead">
		<div class="md:hidden block">
			<svelte:component this={activeIcon} width={70} height={10} />
		</div>
	</svelte:fragment>
	<div class="hidden md:block">
		<svelte:component this={activeIcon} width={70} height={10} />
	</div>
	<svelte:fragment slot="trail">
		<!-- Theme Switch -->
		<ThemeSwitcher />
		<!-- Theme Switch -->

		<!-- LANGUAGE SELECTOR -->
		<LanguageSelector />
		<!-- LANGUAGE SELECTOR -->
	</svelte:fragment>
</AppBar>
