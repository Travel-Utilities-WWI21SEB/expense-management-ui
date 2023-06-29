<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let sortBy = $page.url.searchParams.get('sortBy') ?? 'deducted_at';
	let orderBy = $page.url.searchParams.get('sortOrder') ?? 'desc';

	function changeSortBy(e: any) {
		sortBy = e.target.value;
	}

	function changeOrderBy(e: any) {
		orderBy = e.target.value;
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
	class="btn variant-filled my-2 w-full"
	on:click={() => goto(`?sortBy=${sortBy}&sortOrder=${orderBy}`)}>Apply</button
>

<!-- //Clear Button -->
