<script lang="ts">
	import {
		TripDetailsHeader,
		TripDetailsCostOverview,
		HeaderAndTwoPartsLayout,
		TripDetailsDashboard
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
			<div class="h-full">
				<TripDetailsCostOverview costs={data.costsData} trip={data.tripData} />
			</div>
		{/if}
	</span>
	<span slot="right_element">
		{#if data.tripData}
			<div class="h-full">
				<TripDetailsDashboard trip={data.tripData} />
			</div>
		{/if}
	</span>
</HeaderAndTwoPartsLayout>
