<div class="modal-form card m-8 p-4 space-y-4">
	<h1 class="text-center">Accept your Trip Invitation!</h1>
	<label class="label">
		<span>Presence in Trip starting on:</span>
		<input
			min={new Date(Date.now()).toISOString().substring(0, 10)}
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
		/>
	</label>
	<label class="label">
		<span>Presence in Trip ending on:</span>
		<input
			class="input"
			type="date"
			placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
		/>
	</label>
</div>
