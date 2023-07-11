<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: sortBy = $page.url.searchParams.get('sortBy') ?? 'createdAt';
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
		<option value="createdAt">Creation Date</option>
		<option value="amount">Amount</option>
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
