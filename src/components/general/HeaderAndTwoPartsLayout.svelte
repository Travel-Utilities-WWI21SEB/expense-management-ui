<div class="header">
	<slot name="header" />
</div>
<div class="row">
	<div class="element">
		<slot name="left_element" />
	</div>
	<div class="element">
		<slot name="rigth_element" />
	</div>
</div>

<style>
	.row {
		display: flex;
		justify-content: space-around;
	}

	.element {
		width: 48vw;
		padding: 1rem;
	}

	.header {
		padding: 1rem;
	}
</style>
