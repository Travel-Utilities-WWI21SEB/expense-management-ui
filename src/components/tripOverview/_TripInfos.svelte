<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { calculateDate } from '$utils';

	export let trip: TravelData;
</script>

<p style="padding: 0.5rem;">
	{`${calculateDate(trip.startDate)} - ${calculateDate(trip.endDate)}`}
</p>
<p style="padding: 0.5rem;">
	Location: {trip.location}
</p>
