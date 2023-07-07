<script lang="ts">
	import {
		TripDetailsHeader,
		HeaderAndTwoPartsLayout,
		TransactionOverviewTripDetails
	} from '$components';
	import { DebtOverviewTripDetails } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		{#if data.tripData}
			<div class="">
				<TripDetailsHeader trip={data.tripData} />
			</div>
		{/if}
	</span>
	<span slot="left_element">
		{#if data.tripData && data.debtData}
			<div class="h-full">
				<DebtOverviewTripDetails debts={data.debtData} />
			</div>
		{/if}
	</span>
	<span slot="right_element">
		{#if data.tripData}
			<div class="h-full">
				<TransactionOverviewTripDetails
					transactions={data.transactionData}
					trip={data.tripData}
					currentUserId={data.currentUserId}
				/>
			</div>
		{/if}
	</span>
</HeaderAndTwoPartsLayout>
