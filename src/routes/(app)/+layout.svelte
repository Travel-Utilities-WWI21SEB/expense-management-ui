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

	import { Footer, Header } from '$components';
	import NewSidebar from '../../components/layout/_NewSidebar.svelte';
</script>

<!-- MOBILE ONLY! -->
<Drawer width="w-3/5">
	<NewSidebar />
</Drawer>
<!-- MOBILE ONLY! -->

<AppShell slotSidebarLeft="bg-surface-500/25 w-0 lg:w-1/5 border-r border-current">
	<!-- Header -->
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	<!-- Left sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<NewSidebar />
	</svelte:fragment>
	<!-- Content -->
	<slot />
	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
