<script lang="ts">
	import { goto } from '$app/navigation';
	import { CrossIcon } from '$icons';
	import { errorMessage, errorState, loading } from '$stores';
	import type { TravelData } from '$tripDomain';
	import type { PageData } from './$types';

	export let data: PageData;

	const acceptTrip = async (currentTrip: TravelData) => {
		loading.set(true);
		errorState.set(false);
		try {
			const response = await fetch(`/api/trips/${currentTrip.tripId}/accept`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ body: presenceTimes, id: currentTrip.tripId })
			});

			const body = await response.json();
			const { error, errorMessage: errorDisplayMessage } = body;

			errorState.set(error);
			errorMessage.set(errorDisplayMessage);
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	const rejectTrip = async (currentTrip: TravelData) => {
		loading.set(true);
		errorState.set(false);
		try {
			const response = await fetch(`/api/trips/${currentTrip.tripId}/decline`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ body: presenceTimes, id: currentTrip.tripId })
			});

			const body = await response.json();
			const { error, errorMessage: errorDisplayMessage } = body;

			errorState.set(error);
			errorMessage.set(errorDisplayMessage);
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	const onRejectClick = async () => {
		await rejectTrip(data.tripData);
		if (!$errorState) {
			goto('/trips');
		}
	};

	const onAcceptClick = async () => {
		await acceptTrip(data.tripData);

		if (!$errorState) {
			goto(`/trips/${data.tripData.tripId}`);
		}
	};

	const presenceTimes = {
		presenceStartDate: data.tripData.startDate.toISOString().substring(0, 10),
		presenceEndDate: data.tripData.endDate.toISOString().substring(0, 10)
	};

	if (data.tripData.hasAcceptedInvite) {
		goto(`/trips/${data.tripData.tripId}`);
	}
</script>

<div class="modal-form card m-8 p-4 space-y-4 lg:mx-64 lg:my-28">
	<h1 class="text-center">Accept your Trip Invitation!</h1>
	<label class="label mx-8">
		<span>Presence in Trip starting on:</span>
		<input
			min={data.tripData.startDate.toISOString().substring(0, 10)}
			max={data.tripData.endDate.toISOString().substring(0, 10)}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
			bind:value={presenceTimes.presenceStartDate}
		/>
	</label>
	<label class="label mx-8">
		<span>Presence in Trip ending on:</span>
		<input
			max={data.tripData.endDate.toISOString().substring(0, 10)}
			min={data.tripData.startDate.toISOString().substring(0, 10)}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
			bind:value={presenceTimes.presenceEndDate}
		/>
	</label>
	<div class="flex justify-center gap-4 p-8">
		<button on:click={onAcceptClick} class="btn variant-filled">Accept</button>
		<button on:click={onRejectClick} class="btn variant-ghost">Reject</button>
	</div>
	{#if $errorState}
		<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
		<span class="flex-auto">{$errorMessage}</span>
	{/if}
</div>
