<script lang="ts">
	import type { TravelData } from "$tripDomain";
	import { TripCard } from "$components";

  let duration = 3000; 
  export let trips: Array<TravelData>
  $: current = 0;
  setInterval(() => {
    if (current == trips.length - 1) {
      current = 0;
    } else {
      current++;
    }
  }, duration);
</script>

<div class="carousel">
  <!-- Carousel wrapper -->
  <div class="wrapper">
    {#each trips as trip, index}
      <div class="item card h-64 {current == index ? 'z-20' : ''}" data-value={index}>
        <TripCard {trip}/>
      </div>
    {/each}
  </div>
  <!-- Slider indicators -->
  <div class="indicators">
    {#each trips as trip, index}
      <button
        on:click={() => {
          current = index;
        }}
        type="button"
        aria-current={current == index ? true : false}
        aria-label={trip.name}
        data-value={index}
      />
    {/each}
  </div>
  <!-- Slider controls -->
  <button
    on:click={() => {
      if (current == 0) {
        current = trips.length - 1;
      } else {
        current--;
      }
    }}
    type="button"
    class="controls top-0 left-0"
    data-carousel-prev=""
  >
    <span class="item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
      <span class="hidden">Previous</span>
    </span>
  </button>
  <button
    on:click={() => {
      if (current == trips.length - 1) {
        current = 0;
      } else {
        current++;
      }
    }}
    type="button"
    class="controls top-0 right-0"
    data-carousel-next=""
  >
    <span class="item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
      <span class="hidden">Next</span>
    </span>
  </button>
</div>

<style>
    
  .carousel {
    @apply relative;
  }
  .carousel .wrapper {
    @apply overflow-hidden relative h-96 rounded-lg;
  }
  .carousel .wrapper .item {
    @apply duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0;
  }
  .carousel .wrapper .item img {
    @apply block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2;
  }
  .carousel .wrapper .item span {
    @apply absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800;
  }
  .carousel .indicators {
    @apply flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2;
  }
  .carousel .indicators [aria-current="true"] {
    @apply w-3 h-3 rounded-full bg-white dark:bg-gray-800;
  }
  .carousel .indicators [aria-current="false"] {
    @apply w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800;
  }
  .carousel .controls {
    @apply flex absolute z-30 justify-center items-center px-4 h-full cursor-pointer focus:outline-none;
  }
  .carousel .controls .item {
    @apply inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30;
  }
  .carousel .controls .item svg {
    @apply w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-100; 
  }

</style>
