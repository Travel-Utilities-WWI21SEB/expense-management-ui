<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { calculateDate } from '$utils';

	export let trip: TravelData;

</script>

<p>
	{`${calculateDate(trip.startDate)} - ${calculateDate(trip.endDate)}`}
</p>
<p>
	Location: {trip.location}
</p>
