<script lang="ts">
	import type { Transaction } from '$tripDomain';
	import { ParticipantIconDebt } from '$components';
	import { ArrowLongRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { goto } from '$app/navigation';

	export let transaction: Transaction;
	console.log(transaction);

	const onTransactionClick = () => {
		goto(`/trips/${transaction.trip.tripId}/debts`);
	};
</script>

<button
	class="card card-hover w-full p-4 my-2 hover:bg-surface-300 hover:dark:bg-surface-500"
	on:click={() => onTransactionClick()}
>
	<div class="grid grid-cols-3 pb-2">
		<h1>{`Trip: ${transaction.trip.name}`}</h1>
		<p>{`Created: ${transaction.createdAt}`}</p>
	</div>
	{#if transaction.isDebt}
		<div class="outline outline-offset-2 outline-1 w-full">
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
		</div>
	{:else}
		<div class="outline outline-offset-2 outline-1 w-full">
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
		</div>
	{/if}
</button>
