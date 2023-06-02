<script>
</script>

<div class="element py-4 px-4">
	<slot name="header" />
</div>
<div class="xl:grid h-full xl:grid-cols-2 px-4 place-items-stretch">
	<div class="element py-4 h-full">
		<slot name="left_element" />
	</div>
	<div class="element py-4 content-start h-full">
		<slot name="right_element" />
	</div>
</div>

<style>
	.element {
		width: 98%;
	}
</style>
