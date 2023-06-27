<script lang="ts">
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { AddTripForm } from '$components';
	import { newTripForm } from '$stores';
	import { PlusIcon } from '$icons';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		AddTripForm: {
			// Pass a reference to your custom component
			ref: AddTripForm,
			// Add the component properties as key/value pairs
			props: { background: 'bg-red-500' },
			// Provide a template literal for the default component slot
			slot: '<p>Skeleton</p>'
		}
	};

	function onButtonClick() {
		const modal: ModalSettings = {
			type: 'component',
			// Pass the component registry key as a string:
			component: 'AddTripForm',
			title: 'Add new Trip',
			response: () => {
				newTripForm.set({
					name: '',
					location: '',
					startDate: new Date(Date.now()).toISOString().substring(0, 10),
					endDate: new Date(Date.now()).toISOString().substring(0, 10)
				});
			}
		};
		modalStore.trigger(modal);
	}
</script>

<Modal components={modalComponentRegistry} />
<h1 class="h1 col-start-1">
	<span
		class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
		>Your trips</span
	>
</h1>
<button
	type="button"
	class="btn variant-filled w-24 h-12 xl:w-56 col-end-7"
	on:click={onButtonClick}
>
	<span><PlusIcon /> </span>
	<span>Add Trip</span>
</button>
