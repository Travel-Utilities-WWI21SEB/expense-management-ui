<script lang="ts">
	import type { Cost } from '$tripDomain';
	import { calculateDate } from '$utils';

	export let cost: Cost;
</script>

<label class="label">
	<span>Input</span>
	<input class="input" type="text" placeholder="Input" />
</label>
