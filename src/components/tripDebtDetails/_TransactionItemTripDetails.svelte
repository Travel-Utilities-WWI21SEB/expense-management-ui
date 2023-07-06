<script lang="ts">
	import type { Transaction } from '$tripDomain';
	import { ParticipantIconDebt } from '$components';
	import TransactionItemModalTripdetails from './Modal/_TransactionItemModalTripdetails.svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import TransactionConfirmationModal from './Modal/_TransactionConfirmationModal.svelte';
	import { onMount } from 'svelte';

	export let transaction: Transaction;
	export let needsConfirmation: boolean;

	function selectListItem() {
		const modal: ModalSettings = needsConfirmation
			? {
					type: 'component',
					component: modalConfirmComponent
			  }
			: {
					type: 'component',
					component: modalComponent
			  };
		modalStore.trigger(modal);
	}

	const modalComponent: ModalComponent = {
		ref: TransactionItemModalTripdetails,
		props: { transaction: transaction }
	};
	const modalConfirmComponent: ModalComponent = {
		ref: TransactionConfirmationModal,
		props: { transaction: transaction }
	};
</script>

{#if transaction.isDebt}
	<button
		class="card card-hover {transaction.isConfirmed
			? 'hover:bg-success-100 hover:dark:text-success-900'
			: 'hover:bg-warning-100 hover:dark:text-warning-900'} w-full"
		on:click={() => selectListItem()}
	>
		<div class="grid grid-cols-12 md:gap-2">
			<div
				class="col-span-4 flex justify-center items-center {transaction.isConfirmed
					? 'text-success-700 dark:text-success-500'
					: 'text-warning-700 dark:text-warning-500'}"
			>
				<h3 class="font-semibold h3 mr-1">{transaction.amount}</h3>
				<!-- {`${transaction.currencyCode}`} --> EUR
			</div>
			<div class="col-span-4 flex justify-center items-center">&#8594;</div>
			<div class="col-span-4">
				<ParticipantIconDebt
					participant={transaction.debtor}
					background={transaction.isConfirmed
						? 'bg-success-300 dark:bg-success-500'
						: 'bg-warning-300 dark:bg-warning-500'}
				/>
			</div>
		</div>
	</button>
{:else}
	<button
		class="card card-hover {transaction.isConfirmed
			? 'hover:bg-success-100 hover:dark:text-success-900'
			: 'hover:bg-warning-100 hover:dark:text-warning-900'} w-full"
		on:click={() => selectListItem()}
	>
		<div class="grid grid-cols-12 md:gap-2">
			<div class="col-span-4">
				<ParticipantIconDebt
					participant={transaction.creditor}
					background={transaction.isConfirmed
						? 'bg-success-300 dark:bg-success-500'
						: 'bg-warning-300 dark:bg-warning-500'}
				/>
			</div>
			<div class="col-span-4 flex justify-center items-center w-full">&#8594;</div>
			<div
				class="col-span-4 flex justify-center items-center {transaction.isConfirmed
					? 'text-success-700 dark:text-success-500'
					: 'text-warning-700 dark:text-warning-500'}"
			>
				<h3 class=" font-semibold h3 mr-1">{transaction.amount}</h3>
				<!-- 	{`${debt.currency}`} --> EUR
			</div>
		</div>
	</button>
{/if}
