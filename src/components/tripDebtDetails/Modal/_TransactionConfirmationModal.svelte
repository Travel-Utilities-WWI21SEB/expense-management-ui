<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Transaction } from '$tripDomain';
	import { getErrorMessage } from '$utils';
	import { type ToastSettings, toastStore, modalStore } from '@skeletonlabs/skeleton';
	import { currentTransaction, errorCode, errorState, loading } from '$stores';
	import { i } from '@inlang/sdk-js';

	export let transaction: Transaction;
	export let parent: any;

	currentTransaction.subscribe((currTransaction) => (transaction = currTransaction));

	const postConfirmTransaction = async (tripId: string, transactionId: string) => {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(
				`/api/trips/${tripId}/transactions/${transactionId}/accept`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			const body = await costsResponse.json();

			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);
		} catch (error) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	};

	const postRejectTransaction = async (tripId: string, transactionId: string) => {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(
				`/api/trips/${tripId}/transactions/${transactionId}/decline`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			const body = await costsResponse.json();

			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);
		} catch (error) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	};

	const confirmTransaction = async () => {
		await postConfirmTransaction(transaction.trip.tripId, transaction.transactionId);

		let toastMessage = i('toast.transaction') + i('toast.confirmed');
		if (!$errorState) {
			await invalidateAll();
		} else {
			let errorMessage: string = getErrorMessage($errorCode);
			toastMessage = i('toast.error') + errorMessage;
		}
		modalStore.close();
		const t: ToastSettings = {
			message: toastMessage,
			background: $errorState ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);
	};

	const rejectTransaction = async () => {
		await postRejectTransaction(transaction.trip.tripId, transaction.transactionId);

		let toastMessage = i('toast.transaction') + i('toast.rejected');
		if (!$errorState) {
			await invalidateAll();
		} else {
			let errorMessage: string = getErrorMessage($errorCode);
			toastMessage = i('toast.error') + errorMessage;
		}
		modalStore.close();
		const t: ToastSettings = {
			message: toastMessage,
			background: $errorState ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);
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
