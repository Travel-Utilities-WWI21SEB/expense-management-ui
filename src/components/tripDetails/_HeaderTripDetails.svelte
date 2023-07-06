<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		EditTripModal,
		HeaderTripDetailsLayout,
		Participants,
		TripInfos,
		UserPaymentOverview
	} from '$components';
	import { errorCode, errorState, loading } from '$stores';
	import type { NameExistsInterface, TravelData } from '$tripDomain';
	import { getErrorMessage } from '$utils';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		type ToastSettings,
		toastStore,
		SlideToggle,
		TabAnchor,
		TabGroup
	} from '@skeletonlabs/skeleton';
	import { Pencil } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let trip: TravelData;

	let isCostsPage = $page.url.pathname.includes('costs');

	$: buttonInfo = {
		text: $page.url.pathname.includes('debts') ? 'Costs' : 'Debts',
		pathParam: $page.url.pathname.includes('debts') ? 'costs' : 'debts'
	};

	async function deleteTrip(trip: TravelData) {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${trip.tripId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const body = await costsResponse.json();

			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);

			return body;
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	}

	const onTripDelete = async () => {
		await deleteTrip(trip);
		let toastMessage = `Trip ${trip.name} deleted successfully`;

		if (!$errorState) {
			goto('/trips');
			modalStore.close();
		} else {
			toastMessage = `Error: ${getErrorMessage($errorCode)}`;
		}
		modalStore.close();
		const t: ToastSettings = {
			message: toastMessage,
			background: $errorState ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);
	};

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
					onTripDelete();
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
			tripId: trip.tripId,
			onDeleteClick: onDeleteClick,
			newTrip: {
				name: trip.name,
				location: trip.location,
				startDate: trip.startDate.toISOString().substring(0, 10),
				endDate: trip.endDate.toISOString().substring(0, 10)
			},
			newCostCategories: trip.costCategories.map((c): NameExistsInterface => {
				return { id: c.costCategoryId, name: c.name, isNew: false };
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
					}}
				>
					<Icon src={Pencil} class="w-6 h-6" />
				</button>
			</div>
		</span>
		<span slot="toggle">
			<div class="h-full flex items-center justify-center">
				<TabGroup justify="justify-center">
					<TabAnchor
						href="/trips/{trip.tripId}/costs"
						selected={$page.url.pathname.includes('costs')}
					>
						<span>Costs</span>
					</TabAnchor>
					<TabAnchor
						href="/trips/{trip.tripId}/debts"
						selected={$page.url.pathname.includes('debts')}
					>
						<span>Debts</span>
					</TabAnchor>
				</TabGroup>
			</div>
		</span>
	</HeaderTripDetailsLayout>
</div>
