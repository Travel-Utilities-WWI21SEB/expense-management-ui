<script lang="ts">
	import { i } from '@inlang/sdk-js';
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
		{i("debtsPage.hoverOverCoveredDebts")}
	</p>
	<div class="arrow variant-filled-surface" />
</div>

<div class="card rounded-lg shadow-md flex flex-col lg:flex-row-reverse items-center h-full">
	<header class="card-header flex [&>*]:pointer-events-none" use:popup={popupHover}>
		<h4 class="h4">{i("debtsPage.coveredDebts")}</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<ProgressRadial class="p-2" value={Number.parseFloat(coveredDebtsPercentage)}>
		{coveredDebtsPercentage} %
	</ProgressRadial>
</div>
