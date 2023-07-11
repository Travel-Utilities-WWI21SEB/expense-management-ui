<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { i } from '@inlang/sdk-js';

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
	<span>{i("transactionsPage.sortBy")}</span>
	<select
		class="select"
		value={sortBy}
		on:change={(e) => {
			changeSortBy(e);
		}}
	>
		<option value="createdAt">{i("transactionsPage.creationDate")}</option>
		<option value="amount">{i("transactionsPage.amount")}</option>
	</select>
</label>

<label class="label col-span-1">
	<span>{i("transactionsPage.order")}</span>
	<select
		class="select"
		value={orderBy}
		on:change={(e) => {
			changeOrderBy(e);
		}}
	>
		<option value="desc">{i("transactionsPage.descending")}</option>
		<option value="asc">{i("transactionsPage.ascending")}</option>
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
	}}>{i("transactionsPage.applyButton")}</button
>
