<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

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
	<span>Sort by</span>
	<select
		class="select"
		value={sortBy}
		on:change={(e) => {
			changeSortBy(e);
		}}
	>
		<option value="deducted_at">Start Date</option>
		<option value="end_date">End Date</option>
		<option value="amount">Amount</option>
		<option value="id_cost_category">Cost Category</option>
		<option value="description">Name</option>
	</select>
</label>

<label class="label col-span-1">
	<span>Order</span>
	<select
		class="select"
		value={orderBy}
		on:change={(e) => {
			changeOrderBy(e);
		}}
	>
		<option value="desc">Descending</option>
		<option value="asc">Ascending</option>
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
	}}>Apply</button
>
<button
	type="button"
	class="btn variant-outline my-2 w-full"
	on:click={() => {
		let url = new URL($page.url);
		url.searchParams.delete('sortBy');
		url.searchParams.delete('sortOrder');
		goto(`?${url.searchParams.toString()}`);
	}}>Clear</button
>

<!-- //Clear Button -->
