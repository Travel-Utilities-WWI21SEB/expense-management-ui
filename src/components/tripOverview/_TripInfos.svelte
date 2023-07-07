<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { calculateDate } from '$utils';
	import { i } from '@inlang/sdk-js';

	export let trip: TravelData;
</script>

<p>
	{`${calculateDate(trip.startDate)} - ${calculateDate(trip.endDate)}`}
</p>
<p>
	{i("tripOverview.tripCard.location")} {trip.location}
</p>
