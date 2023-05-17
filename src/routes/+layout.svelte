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
	import MenuSurface from '@smui/menu-surface';
	import Card, {
		Content as CardContent,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionButtons,
		ActionIcons
	} from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { goto } from '$app/navigation';

	let topAppBar: TopAppBar;
	let surface: MenuSurface;
	let drawerOpened = false;
	$: menuIcon = drawerOpened ? 'menu_open' : 'menu';

	// Navigation to profile page
	function navigateToProfile() {
		// Prevent navigation if already on profile page
		if (window.location.pathname.includes('profile')) return;
		// TO-DO: Replace with correct username
		goto('profile/test', { replaceState: false });
	}

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
			</IconButton>&nbsp;{themeLabel}
			<div class="accountOverlayWrapper">
				<IconButton
					class="material-icons"
					aria-label="account_icon"
					on:click={() => surface.setOpen(true)}
					>account_circle
				</IconButton>
				<MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT">
					<Card>
						<PrimaryAction on:click={navigateToProfile}>
							<Media class="card-media-16x9" aspectRatio="16x9" />
							// TO-DO: Replace with correct data
							<MediaContent class="mdc-typography--body2">
								<h2 class="mdc-typography--headline6" style="margin: 0;">Insert Username</h2>
							</MediaContent>
							<CardContent>
								<h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
									And some other information
								</h3>
							</CardContent>
						</PrimaryAction>
						<Actions>
							<ActionButtons>
								<Button on:click={navigateToProfile}>
									<Label>Profile</Label>
								</Button>
							</ActionButtons>
							<ActionIcons>
								<IconButton class="material-icons" on:click={() => goto('/settings')}
									>settings</IconButton
								>
								<IconButton class="material-icons" on:click={() => goto('/logout')}
									>logout</IconButton
								>
							</ActionIcons>
						</Actions>
					</Card>
				</MenuSurface>
			</div>
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
						<Text>Home</Text>
					</Item>
				</List>
				<Separator />
				<Subheader tag="h6">Overviews</Subheader>
				<List>
					<Item href="/cost" on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">payments</Graphic>
						<Text>Costs</Text>
					</Item>
					<Item href="/trip" on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">connecting_airports</Graphic>
						<Text>Trips</Text>
					</Item>
				</List>
				<Separator />
				<Subheader tag="h6">Miscellaneous</Subheader>
				<List>
					<Item on:click={() => (drawerOpened = !drawerOpened)}>
						<Graphic class="material-icons">history</Graphic>
						<Text>History</Text>
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
		overflow: hidden;
		z-index: 0;
		height: 100vh;
	}

	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		flex-grow: 1;
	}

	* :global(.card-media-16x9) {
		background-image: url(https://placehold.co/320x180?text=16x9);
	}

	.main-content {
		overflow: auto;
		padding: 16px;
		box-sizing: border-box;
	}
</style>
