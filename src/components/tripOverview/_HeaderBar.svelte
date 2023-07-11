<script lang="ts">
	import { AddTripForm } from '$components';
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { i } from '@inlang/sdk-js';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		AddTripForm: {
			// Pass a reference to your custom component
			ref: AddTripForm
			// Add the component properties as key/value pairs
		}
	};

	function onButtonClick() {
		const modal: ModalSettings = {
			type: 'component',
			// Pass the component registry key as a string:
			component: 'AddTripForm',
			title: i('tripOverview.addTripModal.title')
		};
		modalStore.trigger(modal);
	}
</script>

<Modal components={modalComponentRegistry} />
<h1 class="h1 col-start-1">
	<span
		class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
		>{i('tripOverview.headerTitle')}</span
	>
</h1>
<button
	type="button"
	class="btn variant-filled w-24 h-12 xl:w-56 col-end-7"
	on:click={onButtonClick}
>
	<span>
		<Icon src={Plus} class="w-6 h-6" />
	</span>
	<span>{i('tripOverview.addTripButton')}</span>
</button>
