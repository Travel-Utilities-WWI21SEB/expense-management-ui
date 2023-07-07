<script lang="ts">
	import type { NewTripInputs } from '$tripDomain';
	import {i} from '@inlang/sdk-js';

	export let newTrip: NewTripInputs;

	const onStartDateChange = () => {
		if (new Date(newTrip.endDate) < new Date(newTrip.startDate)) {
			newTrip = { ...newTrip, endDate: newTrip.startDate };
		}
	};
</script>

<form class="modal-form p-4 space-y-4">
	<label class="label">
		<span>{i("tripOverview.addTripModal.nameFieldTitle")}</span>
		<input class="input" type="text" bind:value={newTrip.name} placeholder={i("tripOverview.addTripModal.nameInField")} />
	</label>
	<label class="label">
		<span>{i("tripOverview.addTripModal.locationFieldTitle")}</span>
		<input
			class="input"
			type="text"
			bind:value={newTrip.location}
			placeholder="{i("tripOverview.addTripModal.locationInField")}"
		/>
	</label>
	<label class="label">
		<span>{i("tripOverview.addTripModal.startDateFieldTitle")}</span>
		<input
			min={new Date(Date.now()).toISOString().substring(0, 10)}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
			bind:value={newTrip.startDate}
			on:change={onStartDateChange}
		/>
	</label>
	<label class="label">
		<span>{i("tripOverview.addTripModal.endDateFieldTitle")}</span>
		<input
			min={newTrip.startDate}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
			bind:value={newTrip.endDate}
		/>
	</label>
</form>
