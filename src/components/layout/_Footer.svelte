<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	border="border-t border-current"
>
	<svelte:fragment slot="lead"
		><span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
			>© 2023 <a href="https://expenseui.c930.net/" class="hover:underline">Travel Utilities™</a>.
		</span>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<button type="button" class="btn variant-filled">Impressum</button>
	</svelte:fragment>
</AppBar>
