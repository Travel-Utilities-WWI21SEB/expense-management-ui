<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Debt, TravelData } from '$tripDomain';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { DebtItemModalTripDetails, ParticipantIconDebt } from '$components';

	export let debt: Debt;
	export let i: number;
	export let selectionIndex: number;
	export let trip: TravelData;
	export let isDebt: boolean;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: i
		});

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const modalComponent: ModalComponent = {
		ref: DebtItemModalTripDetails,
		props: { debt: debt, trip: trip }
	};
</script>

{#if isDebt}
	<button
		class="card card-hover hover:bg-error-100 hover:dark:text-error-900 w-full {selectionIndex === i
			? 'bg-error-200  outline outline-1'
			: ''}"
		on:click={() => selectListItem(i)}
	>
		<div class="grid grid-cols-12 md:gap-2">
			<div class="col-span-4 flex justify-center text-center">
				{debt.amount}
			</div>
			<div class="col-span-4 flex justify-center items-center">&#8594;</div>
			<div class="col-span-4">
				<ParticipantIconDebt
					participant={debt.debtor}
					background="bg-error-300 dark:bg-error-500"
				/>
			</div>
		</div>
	</button>
{:else}
	<button
		class="card card-hover hover:bg-success-100 hover:dark:text-success-900 w-full {selectionIndex ===
		i
			? 'bg-success-200  outline outline-1'
			: ''}"
		on:click={() => selectListItem(i)}
	>
		<div class="grid grid-cols-12 md:gap-2">
			<div class="col-span-4">
				<ParticipantIconDebt
					participant={debt.creditor}
					background="bg-success-300 dark:bg-success-500"
				/>
			</div>
			<div class="col-span-4 flex justify-center items-center w-full">&#8594;</div>
			<div class="col-span-4 flex justify-center items-center">
				<h3 class="text-success-700 dark:text-success-500 font-semibold h3 mr-1">{debt.amount}</h3>
				{`${debt.currency}`}
			</div>
		</div>
	</button>
{/if}
