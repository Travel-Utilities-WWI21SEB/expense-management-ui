<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { calculateDate } from '$utils';

	export let trip: TravelData;
</script>

<h2 class="mdc-typography--subtitle1" style="padding: 0.5rem;">
	{`${calculateDate(trip.startDate)} - ${calculateDate(trip.endDate)}`}
</h2>
<h2 class="mdc-typography--subtitle1" style="padding: 0.5rem;">
	Location: {trip.location}
</h2>
