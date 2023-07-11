<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import type { UserDetails } from '$userDomain';
	import { Banknotes, CreditCard, GlobeAlt, User, UserGroup } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { DebtOverview } from '../../domain/debt/DebtOverview';

	export let data: {
		error: boolean;
		errorCode: string;
		debts: DebtOverview;
		trips: TravelData[];
		user: UserDetails;
	};
	const { error, errorCode, trips, user } = data;

	const tripsJoined = trips ? trips.length : 0;
	const personAmount = trips
		? trips
				.map((trip) => trip.participants)
				.flat()
				.filter((user) => user.hasAcceptedInvite).length || 0
		: [];
	const travelledFor = trips
		? trips
				.map((trip) => {
					// Find affected user
					const selfParticipant = trip.participants.find(
						(participant) => participant.username === data.user.username
					);
					return selfParticipant
						? Math.floor(
								(selfParticipant?.presenceEndDate.getTime() -
									selfParticipant?.presenceStartDate.getTime()) /
									(1000 * 3600 * 24)
						  ) || 1
						: 0;
				})
				.reduce((a, b) => a + b, 0)
		: 0;
	const joinedDays = Math.floor(
		(new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 3600 * 24)
	);
</script>

<div
	class="logo-cloud grid-cols-2 lg:!grid-cols-3 gap-1 [&>.logo-item]:pointer-events-none [&>.logo-item]:variant-ghost-surface [&>.logo-item]:p-3"
>
	<a class="logo-item" href="/">
		<span><Icon src={GlobeAlt} class="w-8 h-8" /></span>
		<span>{tripsJoined} Trips joined</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={User} class="w-8 h-8" /></span>
		<span>{travelledFor} days spent travelling</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={UserGroup} class="w-8 h-8" /></span>
		<span>Travelled with a total of {personAmount} persons</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={Banknotes} class="w-8 h-8" /></span>
		<span>Received a total of {data.debts.totalReceived}€ in debts</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={CreditCard} class="w-8 h-8" /></span>
		<span>Paid back a total of {data.debts.totalSpent}€ in debts</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={GlobeAlt} class="w-8 h-8" /></span>
		<span>Been a part of us for {joinedDays} days</span>
	</a>
</div>
