<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.postcss';

	// Import floating ui and skeleton deps
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, Drawer, storePopup } from '@skeletonlabs/skeleton';

	// Set floating ui defaults
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { Footer, Header, Sidebar } from '$components';
</script>

<!-- MOBILE ONLY! -->
<Drawer width="w-3/5">
	<Sidebar />
</Drawer>
<!-- MOBILE ONLY! -->

<AppShell slotSidebarLeft="bg-surface-500/25 w-0 lg:w-2/12 border-r border-current">
	<!-- Header -->
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	<!-- Left sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>
	<!-- Content -->
	<slot />
	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
