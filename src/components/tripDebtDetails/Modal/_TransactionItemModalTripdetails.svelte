<script lang="ts">
	import { currentTransaction } from '$stores';
	import type { Transaction } from '$tripDomain';
	import { i } from '@inlang/sdk-js';

	export let transaction: Transaction;
	export let parent: any;
	export let abortTransaction: (transactionId: string, tripId: string) => void;

	currentTransaction.subscribe((currTransaction) => (transaction = currTransaction));
</script>

<div class="card p-4 md:w-1/2">
	{#if transaction.isDebt}
		<h3 class="p-4 text-warning-700 dark:text-warning-500 h3">
			{i('tripDetails.debtsTab.youPaid') +
				transaction.debtor.username +
				': ' +
				transaction.amount +
				' EUR'}
		</h3>
		{#if !transaction.isConfirmed}
			<p class="pl-4 pb-4 text-error-700 dark:text-error-500 font-semibold">
				{i('tripDetails.debtsTab.notConfirmedYet')}
				{transaction.debtor.username}
			</p>
		{/if}
	{:else}
		<h3 class="p-4 text-success-700 dark:text-success-500 h3">
			{transaction.creditor.username}
			{i('tripDetails.debtsTab.paidYou')}
			{transaction.amount} "EUR"
		</h3>
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}
			>{i('transactionsPage.closeButton')}</button
		>
		{#if !transaction.isConfirmed}
			<button
				type="button"
				class="btn border-2 variant-filled-error"
				on:click={() => abortTransaction(transaction.transactionId, transaction.trip.tripId)}
				>{i('transactionsPage.abortButton')}</button
			>
		{/if}
	</footer>
</div>
