<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { TripCard } from '$components';
	import { goto } from '$app/navigation';

	let duration = 5000;
	export let trips: Array<TravelData>;
	$: currentTrip = 0;
	let timer = setInterval(() => setInitialInterval(), duration);
	function setInitialInterval() {
		if (currentTrip == trips.length - 1) {
			currentTrip = 0;
		} else {
			currentTrip++;
		}
	}
	function slideCarousel(direction: string) {
		let buttonDirection = direction === 'left' ? 0 : trips.length - 1;
		if (currentTrip == buttonDirection) {
			currentTrip = direction === 'left' ? trips.length - 1 : 0;
		} else {
			direction === 'left' ? currentTrip-- : currentTrip++;
		}
		clearInterval(timer);
		timer = setInterval(() => setInitialInterval(), duration);
	}

	function onTripCardClick() {
		goto(`/trips`);
	}
</script>

<div class="carousel relative">
	<!-- Carousel wrapper -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="wrapper relative card-hover h-96 rounded-lg" on:click={() => onTripCardClick()}>
		{#each trips as trip, index}
			<div class="item duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 card h-fit p-4 {currentTrip == index ? 'z-20' : ''}" data-value={index}>
				<TripCard {trip} />
			</div>
		{/each}
		</div>
	<!-- Slider indicators -->
	<div class="indicators flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
		{#each trips as trip, index}
			<button
				on:click={() => {
					currentTrip = index;
				}}
				type="button"
				aria-current={currentTrip == index ? true : false}
				aria-label={trip.name}
				data-value={index}
			/>
		{/each}
	</div>
	<!-- Slider controls -->
	<button
		on:click={() => slideCarousel('left')}
		type="button"
		class="controls top-0 left-0 flex absolute z-30 justify-center items-center px-4 h-full cursor-pointer focus:outline-none"
		data-carousel-prev=""
	>
		<span class="item card-hover inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-100"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</span>
	</button>
	<button
		on:click={() => slideCarousel('right')}
		type="button"
		class="controls top-0 right-0 absolute z-30 justify-center items-center px-4 h-full cursor-pointer focus:outline-none"
		data-carousel-next=""
	>
		<span class="item card-hover inline-flex justify-center align-middle items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 text-white sm:w-6 sm:h-6 dark:text-gray-100"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</span>
	</button>
</div>

<style>
	.carousel .indicators [aria-current='true'] {
		@apply w-3 h-3 rounded-full bg-white dark:bg-gray-800;
	}
	.carousel .indicators [aria-current='false'] {
		@apply w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800;
	}
</style>
