<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import type { UserDetails } from '$userDomain';
	import { Banknotes, CreditCard, GlobeAlt, User, UserGroup } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { DebtOverview } from '../../domain/debt/DebtOverview';
	import { i } from '@inlang/sdk-js';

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
		<span>{tripsJoined} {i("homepage.tripsJoined")}</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={User} class="w-8 h-8" /></span>
		<span>{travelledFor} {i("homepage.daysSpentTravelling")}</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={UserGroup} class="w-8 h-8" /></span>
		<span>{i("homepage.travelledWith")} {personAmount} {i("homepage.people")}</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={Banknotes} class="w-8 h-8" /></span>
		<span>{i("homepage.receiveInFront")} {data.debts.totalSpent}{i("homepage.receiveBack")}</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={CreditCard} class="w-8 h-8" /></span>
		<span>{i("homepage.paidInFront")} {data.debts.totalSpent}{i("homepage.paidBackBack")}</span>
	</a>
	<a class="logo-item" href="/">
		<span><Icon src={GlobeAlt} class="w-8 h-8" /></span>
		<span>{i("homepage.partOfUs")} {joinedDays} {i("homepage.days")}</span>
	</a>
</div>
