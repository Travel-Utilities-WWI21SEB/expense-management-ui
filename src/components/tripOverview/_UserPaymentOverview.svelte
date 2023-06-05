<script lang="ts">
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div class="p-8">
	<strong class="h6 text-success-500">
		{trip.userGets && trip.userGets > 0 ? `You will get ${trip.userGets}€` : 'Nothing to get.'}
	</strong> <br />
	<strong class="h6 {trip.userDept && trip.userDept > 0 ? 'text-error-500' : 'text-success-500'}">
		{trip.userGets && trip.userGets > 0
			? `You still need to pay ${trip.userDept}€`
			: 'Nothing to pay.'}
	</strong>
</div>

<style>
	strong {
		font-weight: bold;
	}
</style>
