<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;

	const endDateTrip = trip.endDate.toISOString().slice(0, 10);
	const startDateTrip = trip.startDate.toISOString().slice(0, 10);

	interface FilterOptions {
		name: string;
		value: string;
		checked: boolean;
	}

	let filterOptions: Array<FilterOptions> = [
		{
			name: 'Minimal Start Date',
			value: trip.startDate.toISOString().slice(0, 10),
			checked: false
		},
		{ name: 'Maximal Start Date', value: trip.endDate.toISOString().slice(0, 10), checked: false },
		{ name: 'Minimal End Date', value: trip.startDate.toISOString().slice(0, 10), checked: false },
		{ name: 'Maximal End Date', value: trip.endDate.toISOString().slice(0, 10), checked: false }
	];

	let minStartDate = trip.startDate.toISOString().slice(0, 10);
	let maxStartDate = trip.endDate.toISOString().slice(0, 10);
	let minEndDate = trip.startDate.toISOString().slice(0, 10);
	let maxEndDate = trip.endDate.toISOString().slice(0, 10);

	let minStartDateChecked = false;
	let maxStartDateChecked = false;
	let minEndDateChecked = false;
	let maxEndDateChecked = false;

	$: hasQueryParams = $page.url.searchParams.has('sort') || $page.url.searchParams.has('sortOrder');

	function setQueryParameter(parameter: string, value: string) {
		if ($page.url.searchParams.has(parameter)) {
			$page.url.searchParams.delete(parameter);
		}
		$page.url.searchParams.append(parameter, value);
	}

	function changeDate(e: any, option: any) {
		option.value = e.target.value;
	}
	function onChangeCheck(e: any, option: any) {
		option.checked = e.target.checked;
		console.log(option);
		console.log(filterOptions);
	}
</script>

{#each filterOptions as option}
	<label class="label col-span-2 p-2">
		<input
			class="checkbox"
			type="checkbox"
			value={option.checked}
			on:click={(e) => {
				onChangeCheck(e, option);
			}}
		/>
		<span class="font-semibold">{option.name}</span>
		<input
			class="input"
			type="date"
			bind:value={option.value}
			on:change={(e) => changeDate(e, option.value)}
		/>
	</label>
{/each}

<!-- <label class="label col-span-2 p-2">
	<input class="checkbox" type="checkbox" value={minStartDateChecked} id="minStartDateChecked" />
	<span class="font-semibold">Minimal Start Date</span>
	<input
		class="input"
		type="date"
		hidden={!minStartDateChecked}
		min={startDateTrip}
		max={endDateTrip}
		bind:value={minStartDate}
		on:change={(e) => changeDate(e)}
	/>
</label>

<label class="label col-span-2 p-2">
	<input
		class="checkbox"
		type="checkbox"
		id="maxStartDateChecked"
		value={maxStartDateChecked}
		on:click={(e) => {
			console.log(e);
			onChangeCheck(e);
		}}
	/>
	<span class="font-semibold">Maximal Start Date</span>
	<input
		class="input"
		type="date"
		hidden={!maxStartDateChecked}
		min={startDateTrip}
		max={endDateTrip}
		bind:value={maxStartDate}
		on:change={(e) => changeDate(e)}
	/>
</label>

<label class="label col-span-2 p-2">
	<input class="checkbox" type="checkbox" value={minEndDateChecked} id="minEndDateChecked" />
	<span class="font-semibold">Minimal End Date</span>
	<input
		class="input"
		type="date"
		hidden={!minEndDateChecked}
		bind:value={minEndDate}
		on:change={(e) => changeDate(e)}
	/>
</label>

<label class="label col-span-2 p-2">
	<input class="checkbox" type="checkbox" value={maxEndDateChecked} id="maxEndDateChecked" />
	<span class="font-semibold">Maximal End Date</span>
	<input
		class="input"
		type="date"
		hidden={!maxEndDateChecked}
		bind:value={maxEndDate}
		on:change={(e) => changeDate(e)}
	/>
</label> -->

<button
	type="button"
	class="btn variant-filled my-2 w-full"
	on:click={() => {
		setQueryParameter('minDeductionDate', minStartDate);
		setQueryParameter('maxDeductionDate', maxStartDate);
		/* setQueryParameter('minDeductionDate', minStartDate);
		setQueryParameter('minDeductionDate', minStartDate); */
		goto(`?${$page.url.searchParams.toString()}`);
	}}>Apply</button
>
