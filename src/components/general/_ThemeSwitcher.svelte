<script lang="ts">
	import { activeTheme } from '$stores';
	import {
		ListBox,
		ListBoxItem,
		getModeOsPrefers,
		modeCurrent,
		popup,
		setInitialClassState,
		setModeCurrent,
		setModeUserPrefers,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { ComputerDesktop, Moon, Sun } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';

	const themes = [
		{
			id: 'light',
			name: 'Light',
			icon: Sun,
			class: 'fill-warning-300'
		},
		{
			id: 'dark',
			name: 'Dark',
			icon: Moon,
			class: 'fill-warning-600'
		},
		{
			id: 'system',
			name: 'System',
			icon: ComputerDesktop,
			class: 'theme-system'
		}
	];

	const determineActiveIcon = (newTheme: string) => {
		switch (newTheme) {
			case 'light':
				return Sun;
			case 'dark':
				return Moon;
			case 'system':
				return getModeOsPrefers() ? Sun : Moon;
			default:
				return ComputerDesktop;
		}
	};

	$: activeIcon = determineActiveIcon($activeTheme);
	$: activeClass = themes.find((theme) => theme.id === $activeTheme)?.class;

	const onClickHandler = (e: MouseEvent): void => {
		// Get value from the clicked item
		const { value } = e.target as HTMLInputElement;
		activeTheme.set(value);
		let newTheme: boolean;

		switch (value) {
			case 'light':
				newTheme = true;
				break;
			case 'dark':
				newTheme = false;
				break;
			case 'system':
				newTheme = getModeOsPrefers();
				break;
			default:
				newTheme = false;
		}

		setModeUserPrefers(newTheme);
		setModeCurrent(newTheme);
	};

	// Popup
	const themePopup: PopupSettings = {
		event: 'focus-click',
		target: 'themePopup',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	// Lifecycle
	onMount(() => {
		if ($activeTheme !== '') {
			let newTheme = $activeTheme === 'system' ? getModeOsPrefers() : $activeTheme === 'light';
			setModeCurrent(newTheme);
			return;
		}

		if ('modeUserPrefers' in localStorage) {
			setModeCurrent(JSON.parse(localStorage.getItem('modeUserPrefers') as string));
		} else {
			setModeCurrent(getModeOsPrefers());
			activeTheme.set('system');
			return;
		}

		activeTheme.set($modeCurrent ? 'light' : 'dark');
	});
</script>

<svelte:head>
	<!-- Workaround for a svelte parsing error: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	<!-- Disabling the XSS error, since we prevent this by disallowing external sources in our svelte config -->
	<!-- eslint-disable -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<!-- THEME SWITCH POPUP -->
<div class="card shadow-xl py-2 z-50" data-popup="themePopup">
	<ListBox>
		{#each themes as theme}
			<ListBoxItem
				bind:group={$activeTheme}
				class="p-2"
				name={theme.id}
				value={theme.id}
				on:click={(e) => onClickHandler(e)}
			>
				<svelte:fragment slot="lead">
					<Icon src={theme.icon} class="w-6 h-6" />
				</svelte:fragment>
				<svelte:fragment slot="trail">{theme.name}</svelte:fragment>
			</ListBoxItem>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
<!-- THEME SWITCH POPUP -->

<button type="button" class="btn-icon variant-ringed my-auto" use:popup={themePopup}>
	<span>
		<Icon src={activeIcon} class={`w-6 h-6 ${activeClass}`} />
	</span>
</button>
