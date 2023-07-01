<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		HeaderTripDetailsLayout,
		TripInfos,
		UserPaymentOverview,
		Participants
	} from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;

	$: buttonInfo = {
		text: $page.url.pathname.includes('debts') ? 'Costs' : 'Debts',
		pathParam: $page.url.pathname.includes('debts') ? 'costs' : 'debts'
	};
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
		<span slot="people" class="flex justify-between">
			<Participants participants={trip.participants} justifyCenter={false} />
			<button
				type="button"
				class="btn variant-filled m-8"
				on:click={() => goto(`/trips/${trip.tripId}/${buttonInfo.pathParam}`)}
				>{buttonInfo.text}</button
			>
		</span>
	</HeaderTripDetailsLayout>
</div>
