<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;

	const endDateTrip = trip.endDate.toISOString().slice(0, 10);
	const startDateTrip = trip.startDate.toISOString().slice(0, 10);

	interface FilterOptions {
		name: string;
		queryParam: string;
		value: string;
		checked: boolean;
	}

	let filterOptions: Array<FilterOptions> = [
		{
			name: 'Minimal Start Date',
			queryParam: 'minDeductionDate',
			value:
				$page.url.searchParams.get('minDeducationDate') ??
				trip.startDate.toISOString().slice(0, 10),
			checked: false
		},
		{
			name: 'Maximal Start Date',
			queryParam: 'maxDeductionDate',
			value:
				$page.url.searchParams.get('maxDeductionDate') ?? trip.endDate.toISOString().slice(0, 10),
			checked: false
		},
		{
			name: 'Minimal End Date',
			queryParam: 'minEndDate',
			value: $page.url.searchParams.get('minEndDate') ?? trip.startDate.toISOString().slice(0, 10),
			checked: false
		},
		{
			name: 'Maximal End Date',
			queryParam: 'maxEndDate',
			value: $page.url.searchParams.get('maxEndDate') ?? trip.endDate.toISOString().slice(0, 10),
			checked: false
		}
	];

	function setQueryParameter(parameter: string, value: string) {
		if ($page.url.searchParams.has(parameter)) {
			$page.url.searchParams.delete(parameter);
		}
		$page.url.searchParams.append(parameter, value);
	}

	function changeDate(e: any, index: number) {
		filterOptions[index] = { ...filterOptions[index], value: e.target.value };
	}
	function onChangeCheck(e: any, index: number) {
		filterOptions[index] = { ...filterOptions[index], checked: e.target.checked };
	}
</script>

{#each filterOptions as option, i}
	<label class="label col-span-2 p-2">
		<input
			class="checkbox"
			type="checkbox"
			value={option.checked}
			on:click={(e) => {
				onChangeCheck(e, i);
			}}
		/>
		<span class="font-semibold">{option.name}</span>
		{#if option.checked}
			<input
				class="input ml-4 my-2"
				type="date"
				bind:value={option.value}
				on:change={(e) => changeDate(e, i)}
			/>
		{/if}
	</label>
{/each}

<button
	type="button"
	class="btn variant-filled my-2 w-full"
	on:click={() => {
		filterOptions.forEach((option) => {
			if (option.checked) {
				setQueryParameter(option.queryParam, option.value);
			} else {
				$page.url.searchParams.delete(option.queryParam);
			}
		});
		goto(`?${$page.url.searchParams.toString()}`);
	}}>Apply</button
>
