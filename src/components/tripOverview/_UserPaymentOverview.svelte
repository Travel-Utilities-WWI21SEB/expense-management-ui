<script lang="ts">
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div style="padding-top: 2rem; padding-bottom: 2rem; padding-left: 0.5rem; ">
	<strong class="mdc-typography--headline6" style="color: green">
		You will get {trip.userGets}€
	</strong> <br />
	<strong class="mdc-typography--headline6" style="color: red">
		You still need to pay {trip.userDept}€
	</strong>
</div>

<style>
	strong {
		font-weight: bold;
	}
</style>
