<script>
	import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<div class="wrapper">
	<LayoutGrid>
		<Cell spanDevices={{ desktop: 12, tablet: 12, phone: 12 }}>
			<div class="element">
				<slot name="header" />
			</div>
		</Cell>
		<Cell spanDevices={{ desktop: 6, tablet: 6, phone: 12 }}>
			<div class="element">
				<slot name="left_element" />
			</div>
		</Cell>
		<Cell spanDevices={{ desktop: 6, tablet: 6, phone: 12 }}>
			<div class="element">
				<slot name="rigth_element" />
			</div>
		</Cell>
	</LayoutGrid>
</div>

<style>
	.wrapper {
		width: 98vw;
	}
</style>
