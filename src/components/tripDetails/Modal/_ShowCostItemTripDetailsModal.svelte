<script lang="ts">
	import { calculateDate, pickTextColorBasedOnBgColorSimple } from '$utils';
	import type { CostDateAsString } from '$tripDomain';

	export let cost: CostDateAsString;
</script>

<div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
	<h1 class="h1 lg:col-span-2 flex justify-center">
		<span
			class="bg-gradient-to-br from-blue-500 to-pink-500 bg-clip-text text-transparent box-decoration-clone"
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
		<h3 class="h3 font-semibold text-primary-500">
			{calculateDate(new Date(cost.startDate))}
			{#if cost.endDate !== cost.startDate && cost.endDate}
				- {calculateDate(new Date(cost.endDate))}
			{/if}
		</h3>
	</div>

	<div class="flex">
		<h3 class="h3 pr-2 font-semibold">{`Amount: `}</h3>
		<h3 class="h3 font-semibold text-error-500">
			{` ${cost.amount} ${cost.currency === '' ? '€' : cost.currency}`}
		</h3>
	</div>

	<div class="flex align-center">
		<h3 class="h3 pr-2 font-semibold">{`Paid by: `}</h3>
		<h3 class="h3 font-semibold text-primary-500">{cost.creditor}</h3>
	</div>

	<!-- <div class="hidden lg:flex text-clip overflow-hidden content-center">
		<p
			style="background-color: {cost.costCategory.color}"
			class="w-full text-sm text-
					text-[{pickTextColorBasedOnBgColorSimple(cost.costCategory.color, '#ffffff', '#000000')}]
					 rounded-full border-0 font-semibold chip variant-filled"
		>
			{cost.costCategory.name}
		</p>
	</div> -->

	<div class="lg:col-span-2">
		<h3 class="h3 font-semibold">Cost allocation:</h3>
		<div class="flex overflow-auto">
			{#each cost.contributors as user}
				<label class="label space-x-2 px-4">
					<span class="truncate font-semibold">{user.username}</span>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<input disabled type="number" value={user.amount} />
						<select disabled value={user.currencyCode ?? 'EUR'}>
							<option value="EUR">€</option>
						</select>
					</div>
				</label>
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
