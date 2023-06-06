<script lang="ts">
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { ModalForm } from '$components';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		ModalForm: {
			// Pass a reference to your custom component
			ref: ModalForm,
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
			component: 'ModalForm',
			title: 'Add new Trip'
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
	<span
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</span>
	<span>Add Trip</span>
</button>
