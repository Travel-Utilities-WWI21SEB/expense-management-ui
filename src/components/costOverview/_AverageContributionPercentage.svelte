<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let averageContributionPercentage: string;
</script>

<div class="card rounded-lg shadow-md flex flex-col lg:flex-row-reverse items-center h-full">
	<header class="card-header flex">
		<h4 class="h4">Average contribution percentage</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<ProgressRadial class="p-2" value={Number.parseFloat(averageContributionPercentage)}
		>{averageContributionPercentage} %
	</ProgressRadial>
</div>
