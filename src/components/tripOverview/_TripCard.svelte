<script lang="ts">
	import {
		DonutChart,
		Participants,
		TripInfos,
		UserPaymentOverview,
		InformationAlertWithAction
	} from '$components';
	import type { TravelData } from '$tripDomain';
	import { i } from '@inlang/sdk-js';
	import { Envelope } from '@steeze-ui/heroicons';

	export let trip: TravelData;
</script>

<div class="flex flex-col items-center">
	<h3 class="h3 justify-center p-4">
		{trip.name}
	</h3>
	<div class="md:grid md:grid-cols-2">
		<div class="flex flex-col justify-center">
			<TripInfos {trip} />
			{#if trip.hasAcceptedInvite}
				<UserPaymentOverview {trip} />
			{:else}
				<div class="m-8">
					<InformationAlertWithAction
						icon={Envelope}
						alertHeading={i('tripOverview.tripCard.acceptTrip.acceptInvitation')}
						class="variant-ghost-warning"
					/>
				</div>
			{/if}
			<Participants participants={trip.participants} justifyCenter={true} />
		</div>
		<div class="pr-4 pb-4">
			{#if trip.data && trip.hasAcceptedInvite}
				<h6 class="h6 p-4 flex justify-center">
					{trip.totalCost
						? i('tripOverview.tripCard.totalCost') + trip.totalCost + ' €'
						: i('tripOverview.tripCard.totalCost') + ' 0€'}
				</h6>
				<DonutChart data={trip.data} />
			{:else}
				<div class="flex justify-center">
					<h6 class="h6 p-4">{i('tripOverview.tripCard.noAccessMessage')}</h6>
				</div>
				<div class="flex justify-center">
					<div class="mx-6 placeholder-circle w-72 animate-pulse" />
				</div>
			{/if}
		</div>
	</div>
</div>
