<script lang="ts">
	import { newTripForm } from '$stores';

	const onStartDateChange = () => {
		if (new Date($newTripForm.endDate) < new Date($newTripForm.startDate)) {
			newTripForm.set({ ...$newTripForm, endDate: $newTripForm.startDate });
		}
	};
</script>

<form class="modal-form p-4 space-y-4">
	<label class="label">
		<span>Name</span>
		<input class="input" type="text" bind:value={$newTripForm.name} placeholder="Enter name..." />
	</label>
	<label class="label">
		<span>Location</span>
		<input
			class="input"
			type="text"
			bind:value={$newTripForm.location}
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
			bind:value={$newTripForm.startDate}
			on:change={onStartDateChange}
		/>
	</label>
	<label class="label">
		<span>End Date:</span>
		<input
			min={$newTripForm.startDate}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
			bind:value={$newTripForm.endDate}
		/>
	</label>
</form>
