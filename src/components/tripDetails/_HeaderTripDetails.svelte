<script lang="ts">
	import {
		HeaderTripDetailsLayout,
		TripInfos,
		UserPaymentOverview,
		Participants
	} from '$components';
	import type { TravelData } from '$tripDomain';
	import { DeleteIcon, EditIcon } from '$icons';

	export let trip: TravelData;
</script>

<div class="card p-2">
	<HeaderTripDetailsLayout>
		<span slot="main_details">
			<h3 class="h3">{trip.name}</h3>
			<TripInfos {trip} />
		</span>
		<span slot="payments">
			<UserPaymentOverview {trip} />
		</span>
		<span slot="people">
			<Participants participants={trip.participants} justifyCenter={false} />
		</span>
		<span slot="actions">
			<div class="flex flex-col gap-2 m-2 justify-center">
				<button class="btn variant-filled w-24"><EditIcon />dEdit</button>
				<button class="btn variant-ghost-error w-24"><DeleteIcon /></button>
			</div>
		</span>
	</HeaderTripDetailsLayout>
</div>
