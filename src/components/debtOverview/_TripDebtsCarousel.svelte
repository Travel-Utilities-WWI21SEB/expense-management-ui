<script lang="ts">
	import { goto } from '$app/navigation';
	import { i } from '@inlang/sdk-js';
	import { ArrowLeft, ArrowRight, Banknotes, CreditCard } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Carousel from 'svelte-carousel';

	type mapTripToDebts = {
		tripId: string;
		tripName: string;
		openDebt: number;
		openCredit: number;
		amountOpenDebts: number;
		amountOpenCredits: number;
	};

	export let mappedTrips: mapTripToDebts[] = [];
	export let showArrows = false;
	let carousel: any;
</script>

<div class="card rounded-lg shadow-md">
	<header class="card-header flex justify-center">
		<h4 class="h4">{i('debtsPage.tripCarousel')}</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<section class="p-4">
		<Carousel
			bind:this={carousel}
			let:showPrevPage
			let:showNextPage
			autoplay={true}
			autoplayDuration={4000}
			pauseOnFocus={true}
			arrows={showArrows}
		>
			<div slot="prev" class="mt-2 ml-2">
				<button
					class="btn-icon variant-ghost-primary w-6 h-6 md:w-8 md:h-8"
					on:click={() => showPrevPage()}
				>
					<Icon src={ArrowLeft} class="w-4 h-4 md:w-6 md:h-6" />
				</button>
			</div>
			<div slot="next" class="mt-2 mr-2">
				<button
					class="btn-icon variant-ghost-primary w-6 h-6 md:w-8 md:h-8"
					on:click={() => showNextPage()}
				>
					<Icon src={ArrowRight} class="w-4 h-4 md:w-6 md:h-6" />
				</button>
			</div>
			{#each mappedTrips as mappedTrip}
				<div class="card !bg-initial flex flex-col items-center">
					<button
						class="btn variant-ghost-primary m-4"
						on:click={() => goto(`trips/${mappedTrip.tripId}/debts`)}
					>
						<h4 class="h4">{mappedTrip.tripName}</h4>
					</button>
					<div
						class="logo-cloud grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-4 [&>.logo-item]:pointer-events-none [&>.logo-item]:p-3"
					>
						<a class="logo-item variant-ghost-success" href="/">
							<span><Icon src={Banknotes} class="w-8 h-8" /></span>
							<span
								>{mappedTrip.amountOpenCredits}
								{i('debtsPage.openCreditsAccouting')}
								{mappedTrip.openCredit}€</span
							>
						</a>
						<a class="logo-item variant-ghost-warning" href="/">
							<span><Icon src={CreditCard} class="w-8 h-8" /></span>
							<span
								>{mappedTrip.amountOpenDebts}
								{i('debtsPage.openDebtsAccouting')}
								{mappedTrip.openDebt}€</span
							>
						</a>
					</div>
				</div>
			{/each}
		</Carousel>
	</section>
</div>
