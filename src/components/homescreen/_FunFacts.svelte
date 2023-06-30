<script lang="ts">
	import type { Debt } from '$debtDomain';

	// export let debts: Array<Debt>;

	let selectionIndex = -1;


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card h-full card-hover p-4">
	<h3 class="h3 flex justify-center p-2">Fun Facts</h3>
    <div class="grid grid-rows-1 grid-flow-col gap-4">
        <div class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full">
            <h4 class="h4 flex justify-center p-2">People you travel often with</h4>
            <ul class="list place-content-stretch">
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Skeleton</span>
                </li>
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Skeleton</span>
                </li>
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Skeleton</span>
                </li>
            </ul>
        </div>
        <div class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full">
            <h4 class="h4 flex justify-center p-2">Most Expensive Categories</h4>
            <ul class="list place-content-stretch">
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Miete</span>
                </li>
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Essen</span>
                </li>
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Fun</span>
                </li>
            </ul>
        </div>
        <div class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full">
            <h4 class="h4 flex justify-center p-2">Current Travel Destinations</h4>
            <ul class="list place-content-stretch">
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Palo Alto</span>
                </li>
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">New Zealand</span>
                </li>
                <li>
                    <span>(icon)</span>
                    <span class="flex-auto">Canada</span>
                </li>
            </ul>
        </div>
</div>
	
</div>
