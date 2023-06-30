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

	function setQueryParameter(parameter: string, value: string) {
		if ($page.url.searchParams.has(parameter)) {
			$page.url.searchParams.delete(parameter);
		}
		$page.url.searchParams.append(parameter, value);
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
		setQueryParameter('sortBy', sortBy);
		setQueryParameter('sortOrder', orderBy);
		goto(`?${$page.url.searchParams.toString()}`);
	}}>Apply</button
>
<button
	type="button"
	class="btn variant-outline my-2 w-full"
	on:click={() => {
		$page.url.searchParams.delete('sortBy');
		$page.url.searchParams.delete('sortOrder');
		goto(`?${$page.url.searchParams.toString()}`);
	}}>Clear</button
>

<!-- //Clear Button -->
