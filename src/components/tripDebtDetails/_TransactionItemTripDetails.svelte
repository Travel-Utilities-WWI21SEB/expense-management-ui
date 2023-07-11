<script lang="ts">
	import type { Transaction } from '$tripDomain';
	import { ParticipantIconDebt } from '$components';
	import TransactionItemModalTripdetails from './Modal/_TransactionItemModalTripdetails.svelte';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		toastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import TransactionConfirmationModal from './Modal/_TransactionConfirmationModal.svelte';
	import { deleteTransaction, getErrorMessage } from '$utils';
	import { invalidateAll } from '$app/navigation';
	import { ArrowLongRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { errorCode, errorState } from '$stores';
	import {i} from '@inlang/sdk-js';

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

	const abortTransaction = async (transactionId: string, tripId: string) => {
		modalStore.close();
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: 'Are you sure you want to delete this transaction?',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					onDeleteTransaction(transactionId, tripId);
				} else {
					const modalTransaction: ModalSettings = {
						type: 'component',
						component: modalComponent
					};
					modalStore.trigger(modalTransaction);
				}
			}
		};
		modalStore.trigger(modal);
	};

	const onDeleteTransaction = async (transactionId: string, tripId: string) => {
		const result = await deleteTransaction(transactionId, tripId);

		let toastMessage = i("toast.transaction") + transactionId + i("toast.deleted");
		if (!$errorState) {
			invalidateAll();
			modalStore.close();
		} else {
			let errorMessage: string = getErrorMessage($errorCode);
			toastMessage = i("toast.error") + errorMessage;
		}
		modalStore.close();
		const t: ToastSettings = {
			message: toastMessage,
			background: $errorState ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);
	};

	const modalComponent: ModalComponent = {
		ref: TransactionItemModalTripdetails,
		props: { transaction: transaction, abortTransaction: abortTransaction }
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
			<div class="col-span-4 flex justify-center items-center">
				<Icon src={ArrowLongRight} class="w-6 h-6" />
			</div>
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
			<div class="col-span-4 flex justify-center items-center w-full">
				<Icon src={ArrowLongRight} class="w-6 h-6" />
			</div>
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
