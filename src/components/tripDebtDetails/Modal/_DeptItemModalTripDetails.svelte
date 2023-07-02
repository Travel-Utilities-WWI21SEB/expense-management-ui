<script lang="ts">
	import type { Debt } from '$tripDomain';

	export let debt: Debt;
	export let isDebt: boolean;
	export let parent: any;
</script>

<div class="card p-4 md:w-1/2">
	{#if isDebt}
		<h3 class="p-4 text-error-700 h3">
			{`You owe ${debt.creditor.username} ${debt.amount} ${debt.currency}`}
		</h3>
	{:else}
		<h3 class="p-4 text-success-700 h3">
			{`${debt.debtor.username} owes you ${debt.amount} ${debt.currency}`}
		</h3>
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
	</footer>
</div>
