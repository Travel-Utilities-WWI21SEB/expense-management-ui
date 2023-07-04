<div class="grid grid-cols-7 gap-4">
	<div class="col-span-2"><slot name="main_details" /></div>
	<div class="col-span-2 col-start-3"><slot name="payments" /></div>
	<div class="col-span-2 col-start-5">
		<slot name="people" />
	</div>
	<div class="col-start-7"><slot name="actions" /></div>
</div>
