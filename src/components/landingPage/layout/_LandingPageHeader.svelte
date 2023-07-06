<script lang="ts">
	import { LanguageSelector, ThemeSwitcher } from '$components';
	import { DarkIcon, LightIcon } from '$icons';
	import { AppBar, getModeOsPrefers } from '@skeletonlabs/skeleton';
	import { activeTheme } from '../../../stores/landingPageStore';

	const icons = [
		{ theme: 'dark', component: DarkIcon },
		{ theme: 'light', component: LightIcon }
	];

	const mapTheme = (bool: boolean) => {
		console.log('checking bool', bool);
		console.log('checking bool', bool ? 'light' : 'dark');
		return bool ? 'light' : 'dark';
	};

	$: currentTheme = $activeTheme === 'system' ? mapTheme(getModeOsPrefers()) : $activeTheme;
	$: console.log('active theme', $activeTheme);
	$: activeIcon = icons.find((icon) => icon.theme === currentTheme)?.component;
	$: console.log('active icon', activeIcon?.name);
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
