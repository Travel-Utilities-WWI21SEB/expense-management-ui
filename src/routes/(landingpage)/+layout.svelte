<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.postcss';

	import { AppShell, Drawer, Modal } from '@skeletonlabs/skeleton';
	import { LandingPageFooter, LandingPageHeader, LandingPageSidebar } from '$components';

	let currentTile = 0;
</script>

<!-- MOBILE ONLY! -->
<Drawer width="w-28 md:w-36" height="max-h-full">
	<h3 class="h3 font-bold">Navigation</h3>
	<hr class="!border-t-4" />
	<LandingPageSidebar tile={currentTile} />
</Drawer>
<!-- MOBILE ONLY! -->

<!-- SIGN UP MODAL -->
<Modal />
<!-- SIGN UP MODAL -->

<AppShell slotSidebarLeft="w-0 lg:w-20">
	<!-- Header -->
	<svelte:fragment slot="header">
		<LandingPageHeader />
	</svelte:fragment>
	<!-- Left sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<LandingPageSidebar tile={currentTile} />
	</svelte:fragment>
	<!-- Content -->
	<slot />
	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<LandingPageFooter />
	</svelte:fragment>
</AppShell>
