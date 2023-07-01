<script lang="ts">
	import {
		TripDetailsHeader,
		TripDetailsCostOverview,
		HeaderAndTwoPartsLayout,
		TripDetailsCostDashboard
	} from '$components';
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
		{#if data.tripData && data.costsData}
			<div class="h-full" />
		{/if}
	</span>
	<span slot="right_element">
		{#if data.tripData}
			<div class="h-full" />
		{/if}
	</span>
</HeaderAndTwoPartsLayout>
