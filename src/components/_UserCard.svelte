<!-- <script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@smui/button';
	import Card, {
		PrimaryAction,
		Media,
		MediaContent,
		Content,
		Actions,
		ActionButtons,
		ActionIcons
	} from '@smui/card';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/list';
	import MenuSurface from '@smui/menu-surface';

	export let surface: MenuSurface;

	function navigateToProfile() {
		// Prevent navigation if already on profile page
		if (window.location.pathname.includes('profile')) return;
		// TO-DO: Replace with correct username
		goto('profile/test', { replaceState: false });
	}
</script>

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
					<h2 class="mdc-typography--headline6">Insert Username</h2>
				</MediaContent>
				<Content>
					<h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
						And some other information
					</h3>
				</Content>
			</PrimaryAction>
			<Actions>
				<ActionButtons>
					<Button on:click={navigateToProfile}>
						<Label class="mdc-typography--button">Profile</Label>
					</Button>
				</ActionButtons>
				<ActionIcons>
					<IconButton class="material-icons" on:click={() => goto('/settings')}>settings</IconButton
					>
					<IconButton class="material-icons" on:click={() => goto('/logout')}>logout</IconButton>
				</ActionIcons>
			</Actions>
		</Card>
	</MenuSurface>
</div>

<style>
	* :global(.card-media-16x9) {
		background-image: url(https://placehold.co/320x180?text=16x9);
	}
</style>
 -->
