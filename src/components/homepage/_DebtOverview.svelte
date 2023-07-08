<script lang="ts">
	import type { TravelData } from '$tripDomain';

	export let trips: TravelData[];
	console.log(trips);

	const openDebts = trips
		? trips
				.map((trip) => trip.userDept)
				.filter((dept) => dept && dept > 0)
				.reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
		: 0;
	const openCredits = trips
		? trips
				.map((trip) => trip.userCredit)
				.filter((credit) => credit && credit > 0)
				.reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
		: 0;
</script>

<div class="relative w-full">
	<div class="relative overflow-hidden rounded-lg w-full">
		<h1 class="h1 col-start-1 flex justify-center">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>Debt overview</span
			>
		</h1>
		<hr class="mt-2" />
		<div class="flex flex-col items-center">
			{#if trips}
				<div class="pt-2 pb-2">
					<p>Open debts: {openDebts}</p>
					<p>Open credits: {openCredits}</p>
				</div>
			{:else}
				<section class="mt-4">
					<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div class="mx-auto max-w-screen-sm text-center">
							<h1
								class="mb-4 text-7xl tracking-tight font-extrabold lg:text-3xl text-primary-600 dark:text-primary-500"
							>
								You don't have any debts yet
							</h1>
							<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
								Try to keep it this way
							</p>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</div>
</div>
