<script lang="ts">
	import type { Debt } from '$tripDomain';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { DebtItemModalTripDetails, ParticipantIconDebt } from '$components';
	import { ArrowLongRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let debt: Debt;
	export let index: number;
	export let isDebt: boolean;

	function selectListItem(i: number) {
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const modalComponent: ModalComponent = {
		ref: DebtItemModalTripDetails,
		props: { debt: debt, isDebt: isDebt }
	};
</script>

{#if isDebt}
	<button
		class="card card-hover hover:bg-error-100 hover:dark:text-error-900 w-full"
		on:click={() => selectListItem(index)}
	>
		<div class="grid grid-cols-12 md:gap-2">
			<div class="col-span-4 flex justify-center items-center text-error-700 dark:text-error-500">
				<h3 class="font-semibold h3 mr-1">{debt.amount}</h3>
				{`${debt.currency}`}
			</div>
			<div class="col-span-4 flex justify-center items-center">
				<Icon src={ArrowLongRight} class="w-6 h-6" />
			</div>
			<div class="col-span-4">
				<ParticipantIconDebt
					participant={debt.creditor}
					background="bg-error-300 dark:bg-error-500"
				/>
			</div>
		</div>
	</button>
{:else}
	<button
		class="card card-hover hover:bg-success-100 hover:dark:text-success-900 w-full"
		on:click={() => selectListItem(index)}
	>
		<div class="grid grid-cols-12 md:gap-2">
			<div class="col-span-4">
				<ParticipantIconDebt
					participant={debt.debtor}
					background="bg-success-300 dark:bg-success-500"
				/>
			</div>
			<div class="col-span-4 flex justify-center items-center w-full">
				<Icon src={ArrowLongRight} class="w-6 h-6" />
			</div>
			<div
				class="col-span-4 flex justify-center items-center text-success-700 dark:text-success-500"
			>
				<h3 class=" font-semibold h3 mr-1">{debt.amount}</h3>
				{`${debt.currency}`}
			</div>
		</div>
	</button>
{/if}
