<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	let topAppBar: TopAppBar;
	let lightTheme =
		typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;

	$: themeIcon = lightTheme ? 'light_mode' : 'dark_mode';
	$: themeLabel = lightTheme ? 'Switch to dark theme' : 'Switch to light theme';

	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');

		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;
		document.head
			.querySelector<HTMLLinkElement>('link[href$="/smui-dark.css"]')
			?.insertAdjacentElement('afterend', themeLink);
	}
</script>

<TopAppBar bind:this={topAppBar} variant="standard" class="navbar">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>Expense Management</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="account_icon">account_circle</IconButton>
			<IconButton class="material-icons" aria-label="theme_icon" on:click={switchTheme}
				>{themeIcon}
			</IconButton>&nbsp;{themeLabel}
			<IconButton class="material-icons" aria-label="settings_icon">settings</IconButton>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar} class="auto-adjust">
	<div class="container">
		<slot />
	</div>
</AutoAdjust>
