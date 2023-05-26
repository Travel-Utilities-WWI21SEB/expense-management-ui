<script>
</script>

<div class="wrapper">
	<div class="element w-48">
		<slot name="header" />
	</div>
	<div class="element w-48">
		<slot name="left_element" />
	</div>
	<div class="element w-48">
		<slot name="right_element" />
	</div>
</div>

<style>
	.element {
		width: 100%;
	}
	.wrapper {
		width: 98vw;
	}
</style>
