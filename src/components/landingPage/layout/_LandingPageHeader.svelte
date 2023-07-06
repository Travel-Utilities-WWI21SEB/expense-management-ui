<script lang="ts">
	import { LanguageSelector, ThemeSwitcher } from '$components';
	import { DarkIcon, LightIcon } from '$icons';
	import { AppBar, modeCurrent } from '@skeletonlabs/skeleton';
</script>

<AppBar
	background="bg-surface-500/25"
	gridColumns="grid-cols-3"
	background="bg-surface-500/25"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	border="border-b border-current"
>
	<svelte:fragment slot="lead">
		<div class="md:hidden block">
			{#if !$modeCurrent}
				<DarkIcon width={70} height={10} />
			{:else}
				<LightIcon width={70} height={10} />
			{/if}
		</div>
	</svelte:fragment>
	<div class="hidden md:block">
		{#if !$modeCurrent}
			<DarkIcon width={70} height={10} />
		{:else}
			<LightIcon width={70} height={10} />
		{/if}
	</div>
	<svelte:fragment slot="trail">
		<!-- LANGUAGE SELECTOR -->
		<LanguageSelector />
		<!-- LANGUAGE SELECTOR -->

		<!-- Theme Switch -->
		<ThemeSwitcher />
		<!-- Theme Switch -->

		<!-- LANGUAGE SELECTOR -->
		<LanguageSelector />
		<!-- LANGUAGE SELECTOR -->
	</svelte:fragment>
</AppBar>
