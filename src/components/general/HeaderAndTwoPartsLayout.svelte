<div class="wrapper">
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
</div>

<style>
	.wrapper {
		width: 98vw;
	}

	.row {
		display: flex;
		justify-content: space-around;
	}

	.element {
		width: 48vw;
		margin: 1rem;
	}

	.header {
		margin: 1rem;
	}
</style>
