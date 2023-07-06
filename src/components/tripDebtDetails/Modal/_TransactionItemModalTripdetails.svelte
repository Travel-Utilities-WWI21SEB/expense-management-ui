<script lang="ts">
	import type { Transaction } from '$tripDomain';

	export let transaction: Transaction;
	export let parent: any;
</script>

<div class="card p-4 md:w-1/2">
	{#if transaction.isDebt}
		<h3 class="p-4 text-warning-700 dark:text-warning-500 h3">
			{`You paid ${transaction.debtor.username} ${transaction.amount} EUR`}
		</h3>
		{#if !transaction.isConfirmed}
			<p class="pl-4 text-error-700 dark:text-error-500 font-semibold">
				{`This transaction is not confirmed by ${transaction.debtor.username}`}
			</p>
		{/if}
	{:else}
		<h3 class="p-4 text-success-700 dark:text-success-500 h3">
			{`${transaction.creditor.username} paid you ${transaction.amount} EUR`}
		</h3>
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
	</footer>
</div>
