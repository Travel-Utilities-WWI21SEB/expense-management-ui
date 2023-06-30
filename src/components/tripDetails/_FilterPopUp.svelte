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
	}

	let filterOptions = [
		{
			name: 'Minimal Start Date',
			queryParam: 'minDeductionDate',
			value:
				$page.url.searchParams.get('minDeducationDate') ??
				trip.startDate.toISOString().slice(0, 10),
			checked: $page.url.searchParams.has('minDeducationDate')
		},
		{
			name: 'Maximal Start Date',
			queryParam: 'maxDeductionDate',
			value:
				$page.url.searchParams.get('maxDeductionDate') ?? trip.endDate.toISOString().slice(0, 10),
			checked: $page.url.searchParams.has('maxDeductionDate')
		},
		{
			name: 'Minimal End Date',
			queryParam: 'minEndDate',
			value: $page.url.searchParams.get('minEndDate') ?? trip.startDate.toISOString().slice(0, 10),
			checked: $page.url.searchParams.has('minEndDate')
		},
		{
			name: 'Maximal End Date',
			queryParam: 'maxEndDate',
			value: $page.url.searchParams.get('maxEndDate') ?? trip.endDate.toISOString().slice(0, 10),
			checked: $page.url.searchParams.has('masEndDate')
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
		console.log(filterOptions);
	});

	console.log(filterOptions);

	function setQueryParameter(url: URL, parameter: string, value: string): URL {
		if (url.searchParams.has(parameter)) {
			url.searchParams.delete(parameter);
		}
		url.searchParams.append(parameter, value);
		return url;
	}

	function changeDate(e: any, index: number) {
		filterOptions[index] = { ...filterOptions[index], value: e.target.value };
		console.log(filterOptions[index]);
	}

	function onChangeCheck(e: any, index: number) {
		filterOptions[index] = { ...filterOptions[index], checked: e.target.checked };
		console.log(filterOptions[index]);
	}

	function clearFilter() {
		let url = new URL($page.url);
		filterOptions.forEach((option) => {
			url.searchParams.delete(option.queryParam);
		});

		const newFilterOptions = filterOptions.map((option) => {
			return {
				...option,
				checked: false
			};
		});
		filterOptions = newFilterOptions;

		goto(`?${url.searchParams.toString()}`);
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
			console.log(option);
			if (option.checked) {
				url = setQueryParameter(url, option.queryParam, option.value);
			} else {
				url.searchParams.delete(option.queryParam);
			}
		});
		console.log(url.toString());
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
