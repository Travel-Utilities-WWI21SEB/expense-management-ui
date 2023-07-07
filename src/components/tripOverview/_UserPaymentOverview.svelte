<script lang="ts">
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div class="p-8">
	<strong class="h6 text-success-500">
		{trip.userCredit && trip.userCredit > 0
			? `You will get ${trip.userCredit}€`
			: 'Nothing to get.'}
	</strong> <br />
	<strong class="h6 {trip.userDebt && trip.userDebt > 0 ? 'text-error-500' : 'text-success-500'}">
		{trip.userDebt && trip.userDebt > 0
			? `You still need to pay ${trip.userDebt}€`
			: 'Nothing to pay.'}
	</strong>
</div>

<style>
	strong {
		font-weight: bold;
	}
</style>
