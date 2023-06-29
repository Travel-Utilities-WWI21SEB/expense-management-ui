<script lang="ts">
	import type { NewTripInputs } from '$tripDomain';

	export let newTrip: NewTripInputs;

	const onStartDateChange = () => {
		if (new Date(newTrip.endDate) < new Date(newTrip.startDate)) {
			newTrip = { ...newTrip, endDate: newTrip.startDate };
		}
	};
</script>

<form class="modal-form p-4 space-y-4">
	<label class="label">
		<span>Name</span>
		<input class="input" type="text" bind:value={newTrip.name} placeholder="Enter name..." />
	</label>
	<label class="label">
		<span>Location</span>
		<input
			class="input"
			type="text"
			bind:value={newTrip.location}
			placeholder="Enter location..."
		/>
	</label>
	<label class="label">
		<span>Start Date:</span>
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
		<span>End Date:</span>
		<input
			min={newTrip.startDate}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
			bind:value={newTrip.endDate}
		/>
	</label>
</form>
