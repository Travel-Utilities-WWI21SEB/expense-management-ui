<script lang="ts">
	import { goto } from '$app/navigation';
	import { TripCard } from '$components';
	import type { TravelData } from '$tripDomain';
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Carousel from 'svelte-carousel';
	import { i } from '@inlang/sdk-js';

	export let trips: TravelData[];

	let carousel;

	const showArrows = (trips && trips.length > 1) ?? false;
</script>

<div class="relative">
	<!-- Carousel wrapper -->
	<div class="relative overflow-hidden rounded-lg">
		<h1 class="h1 col-start-1 flex justify-center pt-2">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>{i('homepage.noData.tripOverview')}</span
			>
		</h1>
		<hr class="mt-2" />
		{#if trips && trips.length > 0}
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
				{#each trips as trip}
					<button on:click={() => goto(`/trips`)} class="card-hover">
						<TripCard {trip} />
					</button>
				{/each}
			</Carousel>
		{:else}
			<section class=" mt-4">
				<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div class="mx-auto max-w-screen-sm text-center">
						<h1
							class="mb-4 text-2xl tracking-tight font-extrabold lg:text-3xl text-primary-600 dark:text-primary-500"
						>
							{i('homepage.noData.noTrips')}
						</h1>
						<button
							type="button"
							class="btn variant-ghost-primary mb-4 text-lg font-light text-gray-500 dark:text-gray-400"
							on:click={() => goto('/trips')}
						>
							{i('homepage.noData.addTrip')}
						</button>
					</div>
				</div>
			</section>
		{/if}
	</div>
</div>
