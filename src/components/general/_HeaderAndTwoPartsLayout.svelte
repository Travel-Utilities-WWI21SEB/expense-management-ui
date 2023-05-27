<script>
</script>

<div class="element py-4 px-4">
	<slot name="header" />
</div>
<div class="xl:grid xl:grid-cols-2 px-4">
	<div class="element py-4">
		<slot name="left_element" />
	</div>
	<div class="element py-4">
		<slot name="right_element" />
	</div>
</div>

<style>
	.element {
		width: 98%;
		align-self: center;
	}
</style>
