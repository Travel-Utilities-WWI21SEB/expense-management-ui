<script lang="ts">
	import { ProgressRadial, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let averageContributionPercentage: string;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
</script>

<div class="card p-4 w-64 variant-filled-surface" data-popup="popupHover">
	<p>
		The average percentage of expenses you contribute to each trip, calculated based on your total
		contributions.
	</p>
	<div class="arrow variant-filled-surface" />
</div>

<div class="card rounded-lg shadow-md flex flex-col lg:flex-row-reverse items-center h-full">
	<header class="card-header flex [&>*]:pointer-events-none" use:popup={popupHover}>
		<h4 class="h4">Average contribution percentage</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<ProgressRadial class="p-2" value={Number.parseFloat(averageContributionPercentage)}
		>{averageContributionPercentage} %
	</ProgressRadial>
</div>
