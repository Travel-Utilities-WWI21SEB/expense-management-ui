<script lang="ts">
	import {TripCarousel, HeaderAndTwoPartsLayout} from "$components";
	import type {TravelData} from "$tripDomain"
	import { allTrips } from '$stores';
	import { modifyTripData } from '$utils';

	let trips: Array<TravelData>
    allTrips.subscribe((storeData) => {
		trips = modifyTripData(storeData);
	});
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		<div class="mdc-elevation--z3">
			<h1>Homepage</h1>
			<hr />
		</div>
	</span>
	<span slot="left_element">
		<div class="mdc-elevation--z3 h-full">
			<TripCarousel {trips}/>
		</div>
	</span>
	<span slot="right_element">
		<div class="mdc-elevation--z3 h-full">
		</div>
	</span>
</HeaderAndTwoPartsLayout>
