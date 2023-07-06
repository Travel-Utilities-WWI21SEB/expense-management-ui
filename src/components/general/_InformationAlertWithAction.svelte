<script lang="ts">
	import { XMark, type IconSource } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let alertHeading: string;

	export let icon: IconSource = XMark;
</script>

<aside class="alert {$$props.class} w-full">
	<!-- Icon -->
	<div>
		<span class="badge-icon w-15 h-15">
			<Icon src={icon} class="w-12 h-12" />
		</span>
	</div>
	<!-- Message -->
	<div class="alert-message">
		<h3 class="h3">{alertHeading}</h3>
	</div>
</aside>
