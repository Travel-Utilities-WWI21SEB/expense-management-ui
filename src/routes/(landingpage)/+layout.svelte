<script lang="ts">
	import { Footer, LandingPageHeader } from '$components';
	import { AppShell, Modal, Toast } from '@skeletonlabs/skeleton';
</script>

<!-- SIGN UP MODAL -->
<Modal />
<!-- SIGN UP MODAL -->

<!-- NOTIFICATION TOASTS -->
<Toast />
<!-- NOTIFICATION TOASTS -->

<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header">
		<LandingPageHeader />
	</svelte:fragment>
	<!-- Content -->
	<slot />
	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
