<script lang="ts">
	import { ProgressRadial, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let coveredDebtsPercentage: string;
	console.log(coveredDebtsPercentage);

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<div class="card p-4 w-64 variant-filled-surface" data-popup="popupHover">
	<p>
		The covered debts percentage is the percentage of your total debts that you have already paid
		back. This is calculated based on the total amount of debts you have accumulated and the total
		amount of debts you have paid back.
	</p>
	<div class="arrow variant-filled-surface" />
</div>

<div class="card rounded-lg shadow-md flex flex-col lg:flex-row-reverse items-center h-full">
	<header class="card-header flex [&>*]:pointer-events-none" use:popup={popupHover}>
		<h4 class="h4">Covered debts percentage</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<ProgressRadial class="p-2" value={Number.parseFloat(coveredDebtsPercentage)}
		>{coveredDebtsPercentage} %
	</ProgressRadial>
</div>
