<script lang="ts">
	import { ContactIcon, PuzzleIcon, ReviewIcon, SignUpIcon } from '$icons';
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';

	export let tile: number;
</script>

<AppRail border="lg:border-r border-current">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" target="_blank" title="accountTile">
			<SignUpIcon />
			<span>Sign up</span>
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailTile bind:group={tile} name="featureTile" target="featureBox" value={0}>
		<svelte:fragment slot="lead">
			<PuzzleIcon />
		</svelte:fragment>
		<span>Features</span>
	</AppRailTile>
	<AppRailTile bind:group={tile} name="reviewTile" target="reviewBox" value={1}>
		<svelte:fragment slot="lead">
			<ReviewIcon />
		</svelte:fragment>
		<span>Reviews</span>
	</AppRailTile>
	<AppRailTile bind:group={tile} name="contactTile" target="contactBox" value={2}>
		<svelte:fragment slot="lead">
			<ContactIcon />
		</svelte:fragment>
		<span>Contact</span>
	</AppRailTile>
	<!-- --- -->
</AppRail>
