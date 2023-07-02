<script lang="ts">
	import { TripDetailsHeader, HeaderAndTwoPartsLayout } from '$components';
	import { DebtOverviewTripDetails } from '$components';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		{#if data.tripData}
			<div class="">
				<TripDetailsHeader trip={data.tripData} />
			</div>
		{/if}
	</span>
	<span slot="left_element">
		{#if data.tripData && data.debtData}
			<div class="h-full">
				<DebtOverviewTripDetails debts={data.debtData} />
			</div>
		{/if}
	</span>
	<span slot="right_element">
		{#if data.tripData}
			<div class="h-full" />
		{/if}
	</span>
</HeaderAndTwoPartsLayout>
