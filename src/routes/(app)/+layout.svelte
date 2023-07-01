<script lang="ts">
	import { Footer, Header, Sidebar } from '$components';
	import { AppShell, Drawer, Modal, Toast } from '@skeletonlabs/skeleton';
</script>

<!-- MOBILE ONLY! -->
<Drawer width="w-3/5">
	<Sidebar />
</Drawer>
<!-- MOBILE ONLY! -->

<Toast zIndex="z-[999]" />

<!-- MODAL PLACEHOLDER -->
<Modal />
<!-- MODAL PLACEHOLDER -->

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
