<script lang="ts">
	import type { Debt, TravelData } from '$tripDomain';

	/* export let name: string; */
	export let debt: Debt;
	export let trip: TravelData;
	export let parent: any;
</script>

<div class="card p-4 md:w-1/2">
	<div class="p-4">Hallo</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
	</footer>
</div>
