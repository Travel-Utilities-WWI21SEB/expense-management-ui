<!-- This file was created by inlang.
It is needed in order to circumvent a current limitation of SvelteKit. See https://github.com/inlang/inlang/issues/647
You can remove this comment and modify the file as you like. We just need to make sure it exists.
Please do not delete it (inlang will recreate it if needed). -->

<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	// Import floating ui and skeleton deps
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	// Set floating ui defaults
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<slot />
