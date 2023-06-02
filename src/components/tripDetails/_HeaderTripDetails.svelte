<script lang="ts">
	import {
		HeaderTripDetailsLayout,
		TripInfos,
		UserPaymentOverview,
		Participants
	} from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div class="card p-2">
	<HeaderTripDetailsLayout>
		<span slot="main_details">
			<h3 class="h3">{trip.name}</h3>
			<TripInfos {trip} />
		</span>
		<span slot="payments">
			<UserPaymentOverview {trip} />
		</span>
		<span slot="people">
			<Participants participants={trip.participants} justifyCenter={false} />
		</span>
	</HeaderTripDetailsLayout>
</div>
