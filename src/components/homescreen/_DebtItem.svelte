<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Cost, CostDateAsString, TravelData } from '$tripDomain';
	import { calculateDate, pickTextColorBasedOnBgColorSimple } from '$utils';
	import { TripDetailsCostItemModal } from '$components';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		type ToastSettings,
		toastStore
	} from '@skeletonlabs/skeleton';
	import { errorMessage, errorState, loading } from '$stores';
	import { invalidateAll } from '$app/navigation';
	import { currentDebt } from '../../stores/debtStore';
	import type { Debt } from '../../domain/debt/Debt';

	export let debt: Debt;
	export let i: number;
	export let selectionIndex: number;
	export let trip: TravelData;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: i
		});

		currentDebt.set(debt);

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const modalComponent: ModalComponent = {
		ref: TripDetailsCostItemModal,
		props: { debt: debt, trip: trip, onDelete: onDelete }
	};

	async function onDelete(cost: CostDateAsString) {
		modalStore.close();
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: 'Are you sure you want to delete this cost?',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					onDeleteCost(cost);
				} else {
					console.log('cancel pressed');
					const modalCost: ModalSettings = {
						type: 'component',
						component: modalComponent
					};
					modalStore.trigger(modalCost);
				}
			}
		};
		modalStore.trigger(modal);
	}

	async function deleteCost(cost: CostDateAsString, trip: TravelData) {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${trip.tripId}/costs/${cost.costId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const body = await costsResponse.json();

			const { error, errorMessage: errorDisplayMessage } = body;

			errorState.set(error);
			errorMessage.set(errorDisplayMessage);

			return body;
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	}

	async function onDeleteCost(cost: CostDateAsString) {
		const result = await deleteCost(cost, trip);

		const message = result.error
			? `Error: ${result.errorMessage}`
			: `Cost ${cost.name} deleted successfully`;
		const t: ToastSettings = {
			message: message,
			background: result.error ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);

		if (!result.error) {
			await invalidateAll();
			modalStore.close();
		}
	}
</script>

<button
	class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full {selectionIndex ===
	i
		? 'bg-secondary-200  outline outline-1'
		: ''}"
	on:click={() => selectListItem(i)}
>
	<div class="grid grid-cols-12 md:gap-2">
		<div class="col-span-12 sm:col-span-3 grid content-center p-2">
			<div class="text-clip overflow-hidden content-center">
				<p
					class="text-sm text-
					
					 rounded-full border-0 font-semibold m-4 chip variant-filled"
				>
					Test
				</p>
			</div>
		</div>
		<div class="col-span-8 sm:col-span-7 grid content-center p-2">
			
		</div>
		<div class="col-span-4 sm:col-span-2 grid content-center p-2">
			
		</div>
	</div>
</button>
