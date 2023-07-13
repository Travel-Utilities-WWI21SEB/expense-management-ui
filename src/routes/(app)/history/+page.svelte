<script lang="ts">
	import { HistoryItem, SortTransactionsPopup } from '$components';
	import type { PopupSettings } from '@skeletonlabs/skeleton/';
	import { popup } from '@skeletonlabs/skeleton';
	import { i } from '@inlang/sdk-js';

	export let data;

	const popUpSorting: PopupSettings = {
		event: 'click',
		target: 'SortingPopUp',
		placement: 'bottom'
	};
</script>

<div class="p-4">
	<div class="card p-2 rounded-lg shadow-xl grid grid-cols-2">
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
			>
				{i('transactionsPage.title')}
			</span>
		</h1>
		<button class="btn variant-filled w-24 justify-self-end m-4" use:popup={popUpSorting}
			>{i('transactionsPage.sortButton')}</button
		>
	</div>
	{#if data.transactionHistory}
		<ul class="list p-2 max-h-[500px] overflow-auto">
			{#each data.transactionHistory as transaction}
				<li>
					<HistoryItem {transaction} />
				</li>
			{/each}
		</ul>
	{:else}
		<section class=" mt-4">
			<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div class="mx-auto max-w-screen-sm text-center">
					<h1
						class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
					>
						404
					</h1>
					<p
						class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
					>
						{i('transactionsPage.noTransactions')}
					</p>
					<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
						{i('transactionsPage.noTransactionsExplanation')}
					</p>
					<a
						href="trips"
						class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
						>{i('transactionsPage.goToTrips')}</a
					>
				</div>
			</div>
		</section>
	{/if}
</div>

<div class="card p-4 shadow-xl w-72 grid grid-cols-2" data-popup="SortingPopUp">
	<SortTransactionsPopup />
</div>
