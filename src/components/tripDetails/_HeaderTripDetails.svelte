<script lang="ts">
	import {
		HeaderTripDetailsLayout,
		TripInfos,
		UserPaymentOverview,
		ParticipantIcon
	} from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div class="card p-4">
	<HeaderTripDetailsLayout>
		<span slot="main_details">
			<h3 class="h3">{trip.name}</h3>
			<TripInfos {trip} />
		</span>
		<span slot="payments">
			<UserPaymentOverview {trip} />
		</span>
		<span slot="people">
			<div class="flex flex-row flex-wrap">
				{#each trip.participants as participant}
					<div class="p-1">
						<ParticipantIcon {participant} />
					</div>
				{/each}
			</div>
		</span>
	</HeaderTripDetailsLayout>
</div>
