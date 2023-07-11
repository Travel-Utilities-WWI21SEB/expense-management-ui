<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { i } from '@inlang/sdk-js';

	$: sortBy = $page.url.searchParams.get('sortBy') ?? 'deducted_at';
	$: orderBy = $page.url.searchParams.get('sortOrder') ?? 'desc';

	function changeSortBy(e: any) {
		sortBy = e.target.value;
	}

	function changeOrderBy(e: any) {
		orderBy = e.target.value;
	}

	function setQueryParameter(url: URL, parameter: string, value: string): URL {
		if (url.searchParams.has(parameter)) {
			url.searchParams.delete(parameter);
		}
		url.searchParams.append(parameter, value);
		return url;
	}
</script>

<label class="label col-span-1">
	<span>{i("tripDetails.sortModal.sortBy")}</span>
	<select
		class="select"
		value={sortBy}
		on:change={(e) => {
			changeSortBy(e);
		}}
	>
		<option value="deducted_at">{i("tripDetails.sortModal.startDate")}</option>
		<option value="end_date">{i("tripDetails.sortModal.endDate")}</option>
		<option value="amount">{i("tripDetails.sortModal.amount")}</option>
		<option value="id_cost_category">{i("tripDetails.sortModal.costCategory")}</option>
		<option value="description">{i("tripDetails.sortModal.name")}</option>
	</select>
</label>

<label class="label col-span-1">
	<span>{i("tripDetails.sortModal.order")}</span>
	<select
		class="select"
		value={orderBy}
		on:change={(e) => {
			changeOrderBy(e);
		}}
	>
		<option value="desc">{i("tripDetails.sortModal.descending")}</option>
		<option value="asc">{i("tripDetails.sortModal.ascending")}</option>
	</select>
</label>

<button
	type="button"
	class="btn variant-filled mt-2 w-full"
	on:click={() => {
		let url = new URL($page.url);
		setQueryParameter(url, 'sortBy', sortBy);
		setQueryParameter(url, 'sortOrder', orderBy);
		goto(`?${url.searchParams.toString()}`);
	}}>{i("tripDetails.sortModal.applyButton")}</button
>
<button
	type="button"
	class="btn variant-outline my-2 w-full"
	on:click={() => {
		let url = new URL($page.url);
		url.searchParams.delete('sortBy');
		url.searchParams.delete('sortOrder');
		goto(`?${url.searchParams.toString()}`);
	}}>{i("tripDetails.sortModal.clearButton")}</button
>

<!-- //Clear Button -->
