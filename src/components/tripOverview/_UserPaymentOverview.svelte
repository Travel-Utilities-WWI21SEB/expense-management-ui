<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { i } from '@inlang/sdk-js';

	export let trip: TravelData;
</script>

<div class="p-8">
	<strong class="h6 text-success-500">
		{trip.userCredit && trip.userCredit > 0
			? i('tripOverview.tripCard.youGet') + trip.userCredit + ' €'
			: i('tripOverview.tripCard.nothingToGet')}
	</strong> <br />
	<strong class="h6 {trip.userDebt && trip.userDebt > 0 ? 'text-error-500' : 'text-success-500'}">
		{trip.userDebt && trip.userDebt > 0
			? i("tripOverview.tripCard.youPay")+ trip.userDebt + ' €'
			: i("tripOverview.tripCard.nothingToPay")}
	</strong>
</div>

<style>
	strong {
		font-weight: bold;
	}
</style>
