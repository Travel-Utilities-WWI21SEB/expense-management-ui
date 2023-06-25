<script lang="ts">
	import {
		CheckIcon,
		ClosedEnvelopeIcon,
		CrossIcon,
		InfoIcon,
		OpenEnvelopeIcon,
		QuestionMarkIcon
	} from '$icons';
	import { correctToken, errorMessage, tokenErrorState, tokenValues } from '$stores';
	import { keydownHandler, pasteHandler } from '$utils';

	export let keyboardHandler: () => void;
	export let resendToken: () => void;

	// Timer
	let resendTokenInterval = 25;
	let resendTokenTimer = 0;
	$: remainingTime = resendTokenTimer > 0 ? `in ${resendTokenTimer} seconds` : '';

	// Decrease timer if it's greater than 0
	$: if (resendTokenTimer > 0) {
		setTimeout(() => {
			resendTokenTimer--;
		}, 1000);
	}

	// Token
	$: validToken = !$tokenValues.some((value) => value === '');

	// Resend token
	const resendTokenHandler = () => {
		resendTokenTimer = resendTokenInterval;
		resendToken();
	};
</script>

<h5 class="h5 text-center">Please enter the code we sent to your email!</h5>
<form
	class="grid grid-flow-col grid-cols-6 lg:gap-x-4"
	novalidate
	on:keydown={(e) => keydownHandler(e, keyboardHandler)}
	on:paste={(e) => pasteHandler(e, keyboardHandler)}
>
	{#each $tokenValues as _, index}
		<input
			class="input text-center variant-form-material"
			title="token{index + 1}"
			maxlength="1"
			type="text"
			placeholder=""
			autocomplete="off"
			disabled={$correctToken}
			bind:value={$tokenValues[index]}
		/>
	{/each}
</form>
<ol class="list flex flex-col">
	<li>
		{#if $correctToken}
			<span class="badge-icon variant-filled-success w-4 h-4 justify-center">
				<CheckIcon />
			</span>
			<span class="flex-auto">Token is correct!</span>
		{:else if validToken}
			{#if $tokenErrorState}
				<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
				<span class="flex-auto">{$errorMessage}</span>
			{:else}
				<span class="badge-icon variant-filled-warning w-4 h-4"><CrossIcon /></span>
				<span class="flex-auto">Token is incorrect!</span>
			{/if}
		{:else}
			<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span>
			<span class="flex-auto">Enter the code to start validation</span>
		{/if}
	</li>
	{#if !$correctToken}
		<li>
			<span class="badge-icon variant-filled-tertiary w-4 h-4"><InfoIcon /></span>
			<span class="flex-auto">Didn't receive a code?</span>
		</li>
	{/if}
</ol>
{#if !$correctToken}
	<button
		type="button"
		class="btn btn-sm variant-filled-tertiary flex justify-center center mt-2 {resendTokenTimer > 0
			? 'pointer-events-none opacity-50'
			: ''}"
		on:click={resendTokenHandler}
	>
		<span>
			{#if resendTokenTimer > 0}
				<ClosedEnvelopeIcon />
			{:else}
				<OpenEnvelopeIcon />
			{/if}
		</span>
		<span>Get a new one {remainingTime}</span>
	</button>
{/if}
