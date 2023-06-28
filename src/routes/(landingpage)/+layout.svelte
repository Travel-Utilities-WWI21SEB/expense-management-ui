<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.postcss';

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
