<script lang="ts">
	import type { User } from '$userDomain';
	import { ParticipantIcon } from '$components';
	import { i } from '@inlang/sdk-js';

	export let participants: Array<User>;
	export let justifyCenter: boolean;
</script>

<div>
	<div class="flex items-center space-x-2 text-base {justifyCenter ? 'justify-center' : ''}">
		<h4>{i("tripOverview.tripCard.members")}</h4>
		<span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
			>{participants.length}</span
		>
	</div>
	<div
		class="mt-3 flex flex-row flex-wrap -space-x-2 overflow-hidden pl-2 {justifyCenter
			? 'justify-center'
			: ''} "
	>
		{#each participants as participant}
			<ParticipantIcon {participant} />
		{/each}
	</div>
</div>
