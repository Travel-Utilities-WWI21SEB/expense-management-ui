<script>
	import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<LayoutGrid>
	<Cell spanDevices={{ desktop: 4, tablet: 12, phone: 12 }}>
		<slot name="main_details" />
	</Cell>
	<Cell spanDevices={{ desktop: 4, tablet: 12, phone: 12 }}>
		<slot name="payments" />
	</Cell>
	<Cell spanDevices={{ desktop: 4, tablet: 12, phone: 12 }}>
		<slot name="people" />
	</Cell>
</LayoutGrid>
