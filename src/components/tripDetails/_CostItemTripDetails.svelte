<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { TripDetailsCostItemModal } from '$components';
	import { errorCode, errorState, loading } from '$stores';
	import type { Cost, CostDateAsString, TravelData } from '$tripDomain';
	import { calculateDate, getErrorMessage, pickTextColorBasedOnBgColorSimple } from '$utils';
	import {
		modalStore,
		toastStore,
		type ModalComponent,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { currentCost } from '../../stores/costStore';
	import {i} from '@inlang/sdk-js';

	export let cost: Cost;
	export let id: number;
	export let selectionIndex: number;
	export let trip: TravelData;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: id
		});

		currentCost.set(cost);

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const modalComponent: ModalComponent = {
		ref: TripDetailsCostItemModal,
		props: { cost: cost, trip: trip, onDelete: onDelete }
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

			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);

			return body;
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	}

	async function onDeleteCost(cost: CostDateAsString) {
		const result = await deleteCost(cost, trip);

		const message = result.error
			? `Error: ${getErrorMessage(result.errorCode)}`
			: `The cost item ${cost.name} was deleted successfully`;
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
	id
		? 'bg-secondary-200  outline outline-1'
		: ''}"
	on:click={() => selectListItem(id)}
>
	<div class="grid grid-cols-12 md:gap-2">
		<div class="col-span-12 sm:col-span-3 grid content-center sm:p-2">
			<div class="text-clip overflow-hidden content-center">
				<p
					style="background-color: {cost.costCategory.color}"
					class="text-sm text-
					text-[{pickTextColorBasedOnBgColorSimple(cost.costCategory.color, '#ffffff', '#000000')}]
					 rounded-full border-0 font-semibold m-4 chip variant-filled truncate"
				>
					{cost.costCategory.name}
				</p>
			</div>
		</div>
		<div class="col-span-8 sm:col-span-7 grid content-center px-2 pb-2 sm:p-2">
			<div class="text-clip overflow-hidden text-left truncate">
				{cost.name}
				<br />
				{calculateDate(cost.startDate)}
				{#if cost.endDate} - {calculateDate(cost.endDate)} {/if}
			</div>
		</div>
		<div class="col-span-4 sm:col-span-2 grid content-center px-2 pb-2 sm:p-2">
			<div class="text-clip font-semibold overflow-hidden w-full text-rigth text-error-500">
				{cost.amount + ' ' + (cost.currency === '' ? '€' : cost.currency)}
			</div>
		</div>
	</div>
</button>
