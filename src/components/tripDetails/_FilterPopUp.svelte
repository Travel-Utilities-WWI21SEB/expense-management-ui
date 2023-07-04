<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { TravelData } from '$tripDomain';
	import { onMount } from 'svelte';

	export let trip: TravelData;

	const endDateTrip = trip.endDate.toISOString().slice(0, 10);
	const startDateTrip = trip.startDate.toISOString().slice(0, 10);

	interface FilterOptions {
		name: string;
		queryParam: string;
		value: string;
		checked: boolean;
		minValue: string;
		maxValue: string;
		isMin: boolean;
	}

	let filterOptions: Array<FilterOptions> = [
		{
			name: 'Minimal Start Date',
			queryParam: 'minDeductionDate',
			value: startDateTrip,
			checked: false,
			minValue: startDateTrip,
			maxValue: endDateTrip,
			isMin: true
		},
		{
			name: 'Maximal Start Date',
			queryParam: 'maxDeductionDate',
			value: endDateTrip,
			checked: false,
			minValue: startDateTrip,
			maxValue: endDateTrip,
			isMin: false
		},
		{
			name: 'Minimal End Date',
			queryParam: 'minEndDate',
			value: startDateTrip,
			checked: false,
			minValue: startDateTrip,
			maxValue: endDateTrip,
			isMin: true
		},
		{
			name: 'Maximal End Date',
			queryParam: 'maxEndDate',
			value: endDateTrip,
			checked: false,
			minValue: startDateTrip,
			maxValue: endDateTrip,
			isMin: false
		}
	];

	onMount(() => {
		filterOptions = filterOptions.map((option) => {
			return {
				...option,
				checked: $page.url.searchParams.has(option.queryParam),
				value: $page.url.searchParams.get(option.queryParam) ?? option.value
			};
		});
	});

	function setQueryParameter(url: URL, parameter: string, value: string): URL {
		if (url.searchParams.has(parameter)) {
			url.searchParams.delete(parameter);
		}
		url.searchParams.append(parameter, value);
		return url;
	}

	function changeDate(e: any, index: number) {
		filterOptions[index] = { ...filterOptions[index], value: e.target.value };
	}

	function onChangeCheck(e: any, index: number) {
		filterOptions[index] = { ...filterOptions[index], checked: e.target.checked };
	}

	function clearFilter() {
		let url = new URL($page.url);
		filterOptions.forEach((option) => {
			url.searchParams.delete(option.queryParam);
		});
		goto(`?${url.searchParams.toString()}`);

		const newFilterOptions = filterOptions.map((option) => {
			return {
				...option,
				checked: false,
				value: option.isMin ? startDateTrip : endDateTrip
			};
		});
		filterOptions = newFilterOptions;
	}

	$: {
		filterOptions = filterOptions.map((option, i) => {
			return {
				...option,
				minValue: option.isMin ? startDateTrip : filterOptions[i - 1].value,
				maxValue: option.isMin ? filterOptions[i + 1].value : endDateTrip
			};
		});
	}
</script>

{#each filterOptions as option, i}
	<label class="label col-span-2 p-2">
		<input
			class="checkbox"
			type="checkbox"
			bind:checked={option.checked}
			on:click={(e) => {
				onChangeCheck(e, i);
			}}
		/>
		<span class="font-semibold">{option.name}</span>
		{#if option.checked}
			<input
				class="input ml-4 my-2"
				type="date"
				min={option.minValue}
				max={option.maxValue}
				bind:value={option.value}
				on:change={(e) => changeDate(e, i)}
			/>
		{/if}
	</label>
{/each}

<button
	type="button"
	class="btn variant-filled mt-2 w-full"
	on:click={() => {
		let url = new URL($page.url);
		filterOptions.forEach((option) => {
			if (option.checked) {
				url = setQueryParameter(url, option.queryParam, option.value);
			} else {
				url.searchParams.delete(option.queryParam);
			}
		});
		goto(`?${url.searchParams.toString()}`);
	}}>Apply</button
>
<button
	type="button"
	class="btn variant-outline my-2 w-full"
	on:click={() => {
		clearFilter();
	}}>Clear</button
>
