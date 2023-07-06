<div class="md:grid md:grid-cols-7 md:gap-4">
	<div class="md:col-span-2"><slot name="main_details" /></div>
	<div class="md:col-span-2 md:col-start-3"><slot name="payments" /></div>
	<div class="md:col-span-2 md:col-start-5">
		<slot name="people" />
	</div>
	<div class="md:col-start-7"><slot name="actions" /></div>
	<div class="md:col-span-7"><slot name="toggle" /></div>
</div>
