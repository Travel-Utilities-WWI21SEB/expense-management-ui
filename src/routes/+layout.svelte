<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { AppShell, Drawer } from '@skeletonlabs/skeleton';
	import { Footer, Header, Sidebar } from '$components';
</script>

<!-- MOBILE ONLY! -->
<Drawer>
	<h3 class="h3">Navigation</h3>
	<hr class="!border-t-4" />
	<Sidebar />
</Drawer>
<!-- MOBILE ONLY! -->

<AppShell slotSidebarLeft="w-0 lg:w-20">
	<!-- Header -->
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- Left sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>
	<!-- Content -->
	<slot />
	<!-- Footer -->
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>
