<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import Drawer, {
		AppContent,
		Content,
		Header,
		Title as DrawerTitle,
		Subtitle
	} from '@smui/drawer';
	import IconButton from '@smui/icon-button';
	import List, { Item, Graphic, Separator, Subheader, Text } from '@smui/list';
	import { UserCard } from '$components';
	import type MenuSurface from '@smui/menu-surface';

	let topAppBar: TopAppBar;
	let surface: MenuSurface;
	let drawerOpened = false;
	$: menuIcon = drawerOpened ? 'menu_open' : 'menu';

	// Theme related variables and functions
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
			<IconButton
				class="material-icons"
				aria-label="menu_icon"
				on:click={() => (drawerOpened = !drawerOpened)}>{menuIcon}</IconButton
			>
			<Title>Expense Management</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="theme_icon" on:click={switchTheme}
				>{themeIcon}
			</IconButton>
			<p class="mdc-typography--button">{themeLabel}</p>
			<UserCard {surface} />
		</Section>
	</Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
	<div class="drawer-container">
		<Drawer variant="dismissible" bind:open={drawerOpened}>
			<Header>
				<DrawerTitle>Travel Utilities</DrawerTitle>
				<Subtitle>Expense Management</Subtitle>
			</Header>
			<Content>
				<Separator />
				<Subheader tag="h6">General</Subheader>
				<List>
					<Item href="/" on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">home</Graphic>
						<Text class="mdc-typography--button">Home</Text>
					</Item>
				</List>
				<Separator />
				<Subheader tag="h6">Overviews</Subheader>
				<List>
					<Item href="/cost" on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">payments</Graphic>
						<Text class="mdc-typography--button">Costs</Text>
					</Item>
					<Item href="/trip" on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">connecting_airports</Graphic>
						<Text class="mdc-typography--button">Trips</Text>
					</Item>
				</List>
				<Separator />
				<Subheader tag="h6">Miscellaneous</Subheader>
				<List>
					<Item on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">history</Graphic>
						<Text class="mdc-typography--button">History</Text>
					</Item>
				</List>
			</Content>
		</Drawer>

		<AppContent>
			<div class="main-content">
				<slot />
			</div>
		</AppContent>
	</div>
</AutoAdjust>

<style>
	.drawer-container {
		position: relative;
		display: flex;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: auto;
		z-index: 0;
		height: 93vh;
	}

	* :global(.app-content) {
		flex: auto;
		position: relative;
		flex-grow: 1;
	}

	.main-content {
		padding: 16px;
		box-sizing: border-box;
		width: 99vw;
	}
</style>
