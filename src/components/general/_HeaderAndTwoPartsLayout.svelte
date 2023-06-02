<div class="px-4 py-2">
	<slot name="header" />
</div>
<div class="xl:grid xl:grid-cols-2 px-4 place-items-stretch">
	<div class="element xl:pr-2 pb-4">
		<slot name="left_element" />
	</div>
	<div class="element xl:pl-2 pb-4 content-start">
		<slot name="right_element" />
	</div>
</div>
