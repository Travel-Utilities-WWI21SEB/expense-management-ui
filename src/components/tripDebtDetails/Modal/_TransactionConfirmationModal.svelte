<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Transaction } from '$tripDomain';
	import { deleteTransaction, getErrorMessage } from '$utils';
	import { type ToastSettings, toastStore, modalStore } from '@skeletonlabs/skeleton';

	export let transaction: Transaction;
	export let parent: any;

	const postConfirmTransaction = async () => {
		console.log('confirm transaction');
		return { error: false, errorCode: '' };
	};

	const confirmTransaction = async () => {
		const result = await postConfirmTransaction();

		const { errorCode } = result;
		const message = result.error
			? `Error: ${getErrorMessage(errorCode)}`
			: `Transaction  confirmation not implemented yet`; //TODO: confirm transaction
		const t: ToastSettings = {
			message: message,
			background: result.error ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);

		if (!result.error) {
			await invalidateAll();
			modalStore.close();
		}
	};

	const rejectTransaction = async () => {
		const result = await deleteTransaction(transaction.transactionId, transaction.trip.tripId);

		const { errorCode } = result;
		const message = result.error
			? `Error: ${getErrorMessage(errorCode)}`
			: `Transaction  deleted successfully`;
		const t: ToastSettings = {
			message: message,
			background: result.error ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);

		if (!result.error) {
			await invalidateAll();
			modalStore.close();
		}
	};
</script>

<div class="card p-4 md:w-1/2">
	<h3 class="h3 p-4">
		<span
			class="bg-gradient-to-br from-primary-800 to-primary-300 bg-clip-text text-transparent box-decoration-clone"
			>Confirm or reject transaction
		</span>
	</h3>
	<p class="pl-4 pb-4">
		{`Do you want to confirm that ${transaction.debtor.username} paid you ${transaction.amount} EUR?`}
	</p>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2 variant-filled" on:click={parent.onClose}>Close</button>
		<button class="btn border-2 variant-filled-error" on:click={rejectTransaction}>Reject</button>
		<button class="btn border-2 variant-filled-success" on:click={confirmTransaction}
			>Confirm</button
		>
	</footer>
</div>
