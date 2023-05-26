<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { HomepageIcon, UserIcon } from '$icons';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<ol class="breadcrumb mt-1">
			<li class="crumb">
				<a class="anchor" href="/home">
					<HomepageIcon width={6} height={6} />
				</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<a class="anchor" href="/profile">
					<UserIcon width={6} height={6} />
				</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li>C930</li>
		</ol>
	</svelte:fragment>
	<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
		>© 2023 <a href="https://expenseui.c930.net/" class="hover:underline">Travel Utilities™</a>.
	</span>
	<svelte:fragment slot="trail">
		<button type="button" class="btn variant-filled">Impressum</button>
	</svelte:fragment>
</AppBar>
