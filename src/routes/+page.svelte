<script lang="ts">
	import { HomepageBottomPart, HomepageHeader, HomepageTopPart } from '$components';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import type TopAppBar from '@smui/top-app-bar';
	import AutoAdjust from '@smui/top-app-bar/src/AutoAdjust.svelte';

	let topAppBar: TopAppBar;
</script>

<HomepageHeader {topAppBar} />

<div class="layoutWrapper">
	<AutoAdjust {topAppBar}>
		<LayoutGrid style="height: 100%; border: 1px solid var(--mdc-theme-secondary, #333);">
			<Cell align="top" span={12}>
				<HomepageTopPart />
			</Cell>
			<Cell align="bottom" span={12}>
				<HomepageBottomPart />
			</Cell>
		</LayoutGrid>
	</AutoAdjust>
</div>

<style>
	.layoutWrapper {
		background-color: #331a6a;
		height: 98vh;
		padding: 0.5rem;
	}
</style>
