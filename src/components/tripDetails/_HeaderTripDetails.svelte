<script lang="ts">
	import {
		HeaderTripDetailsLayout,
		TripInfos,
		UserPaymentOverview,
		Participants,
		EditTripModal
	} from '$components';
	import type { NameExistsInterface, TravelData } from '$tripDomain';
	import { EditIcon } from '$icons';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';

	export let trip: TravelData;

	const onDeleteClick = () => {
		modalStore.close();
		const alertModal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Are you sure?',
			body: 'This action cannot be undone.',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					// Delete
					modalStore.close();
				} else {
					modalStore.trigger(tripModal);
				}
			}
		};
		modalStore.trigger(alertModal);
	};

	const tripModalComponent: ModalComponent = {
		ref: EditTripModal,
		props: {
			onDeleteClick: onDeleteClick,
			newTrip: {
				...trip,
				startDate: trip.startDate.toISOString().substring(0, 10),
				endDate: trip.endDate.toISOString().substring(0, 10)
			},
			newCostCategories: trip.costCategories.map((c): NameExistsInterface => {
				return { name: c.name, isNew: false };
			}),
			newCostCategoryColors: trip.costCategories.map((c): string => {
				return c.color;
			}),
			selectedUsers: trip.participants.map((p): NameExistsInterface => {
				return { name: p.username, isNew: false };
			})
		}
	};

	const tripModal: ModalSettings = {
		type: 'component',
		component: tripModalComponent
	};
</script>

<div class="card p-2">
	<HeaderTripDetailsLayout>
		<span slot="main_details">
			<div class="h-full flex items-center md:items-start justify-center flex-col mx-8">
				<h3 class="h3 text-left">{trip.name}</h3>
				<TripInfos {trip} />
			</div>
		</span>
		<span slot="payments">
			<div class="h-full flex items-center justify-center">
				<UserPaymentOverview {trip} />
			</div>
		</span>
		<span slot="people">
			<div class="h-full flex items-center justify-center">
				<Participants participants={trip.participants} justifyCenter={false} />
			</div>
		</span>
		<span slot="actions">
			<div class="h-full flex items-center justify-center">
				<button
					class="btn variant-filled w-24 m-4"
					on:click={() => {
						modalStore.trigger(tripModal);
					}}><EditIcon /></button
				>
			</div>
		</span>
	</HeaderTripDetailsLayout>
</div>
