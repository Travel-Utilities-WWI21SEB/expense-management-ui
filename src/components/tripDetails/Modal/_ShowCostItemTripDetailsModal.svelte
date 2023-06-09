<script lang="ts">
	import type { CostDateAsString } from '$tripDomain';
	import { calculateDate, pickTextColorBasedOnBgColorSimple } from '$utils';
	import { i, language } from '@inlang/sdk-js';

	export let cost: CostDateAsString;

	const dateFormats: {
		[key: string]: string;
		en: string;
		de: string;
		ko: string;
	} = {
		en: 'en-US',
		de: 'de-de',
		ko: 'ko-KR'
	};

	// get the date format based on the current language
	$: dateFormat = dateFormats[language];
	$: startDate = calculateDate(new Date(cost.startDate), dateFormat, 'medium');
	$: endDate =
		cost.endDate && cost.endDate !== cost.startDate
			? calculateDate(new Date(cost.endDate), dateFormat, 'medium')
			: '';
</script>

<div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
	<h1 class="h1 lg:col-span-2 flex justify-center">
		<span
			class="bg-gradient-to-br from-primary-800 to-primary-300 bg-clip-text text-transparent box-decoration-clone truncate"
			>{cost.name}</span
		>
	</h1>

	<div class="flex justify-center lg:col-span-2">
		<h3 class="h3 pr-2 font-semibold">
			{#if cost.endDate !== cost.startDate && cost.endDate}
				Time Period:
			{:else}
				Date:
			{/if}
		</h3>
		<h3 class="h3 font-semibold dark:text-primary-500 text-primary-600">
			{startDate}
			{#if cost.endDate !== cost.startDate && cost.endDate}
				- {endDate}
			{/if}
		</h3>
	</div>

	<div class="flex">
		<h3 class="h3 pr-2 font-semibold">{`Amount: `}</h3>
		<h3 class="h3 font-semibold dark:text-error-500 text-error-500">
			{` ${cost.amount} ${cost.currency === '' ? 'EUR' : cost.currency}`}
		</h3>
	</div>

	<div class="flex align-center">
		<h3 class="h3 pr-2 font-semibold">{i('tripDetails.addCostModal.name')}</h3>
		<h3 class="h3 font-semibold dark:text-primary-500 text-primary-600 truncate">
			{cost.creditor}
		</h3>
	</div>

	<div class="lg:col-span-2">
		<h3 class="h3 font-semibold">Cost allocation:</h3>
		<div class="flex overflow-auto">
			{#each cost.contributors as user}
				<div class="label space-x-2 px-4">
					<span class="truncate font-semibold">{user.username}</span>
					<div class="chip variant-outline-surface rounded-full">{`${user.amount} EUR`}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="text-clip lg:col-span-2 overflow-hidden content-center">
		<p
			style="background-color: {cost.costCategory.color}"
			class="w-full text-sm text-
					text-[{pickTextColorBasedOnBgColorSimple(cost.costCategory.color, '#ffffff', '#000000')}]
					 rounded-full border-0 font-semibold chip variant-filled"
		>
			{cost.costCategory.name}
		</p>
	</div>
</div>
