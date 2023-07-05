<script lang="ts">
	import {
		correctToken,
		errorCode,
		loading,
		startTimer,
		stopTimer,
		timer,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { getErrorMessage, keydownHandler, pasteHandler } from '$utils';
	import { i } from '@inlang/sdk-js';
	import {
		Check,
		Envelope,
		EnvelopeOpen,
		InformationCircle,
		QuestionMarkCircle,
		XMark
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onDestroy } from 'svelte';

	export let keyboardHandler: () => void;
	export let resendToken: () => void;

	// Timer
	let resendTokenInterval = 25;
	let elapsedSeconds: number | null;
	let remaining: number | null;

	const unsubscribe = timer.subscribe((t) => {
		elapsedSeconds = t.elapsedSeconds;
		remaining = resendTokenInterval - elapsedSeconds!;
		if (elapsedSeconds! >= resendTokenInterval) {
			stopTimer();
		}
	});

	$: remainingTime = elapsedSeconds
		? `in ${remaining!} ${i('forms.signup.steps.token.seconds')}`
		: '';
	$: classes = elapsedSeconds ? 'pointer-events-none opacity-50' : '';

	// Token
	$: validToken = !$tokenValues.some((value) => value === '');

	// Resend token
	const resendTokenHandler = () => {
		startTimer();
		// Wait for timer to start, set loading to true to already show spinner
		loading.set(true);
		setTimeout(() => {
			resendToken();
		}, 1000);
	};

	onDestroy(() => {
		unsubscribe();
	});
</script>

<h5 class="h5 text-center">{i('forms.signup.steps.token.description')}</h5>
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
				<Icon src={Check} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.token.correctToken')}</span>
		{:else if validToken}
			{#if $tokenErrorState}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{getErrorMessage($errorCode)}</span>
			{:else}
				<span class="badge-icon variant-filled-warning w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{i('forms.signup.steps.token.incorrectToken')}</span>
			{/if}
		{:else}
			<span class="badge-icon variant-filled-warning w-4 h-4">
				<Icon src={QuestionMarkCircle} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.token.initialValidation')}</span>
		{/if}
	</li>
	{#if !$correctToken}
		<li>
			<span class="badge-icon variant-filled-tertiary w-4 h-4">
				<Icon src={InformationCircle} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.token.receiveCodeMessage')}</span>
		</li>
	{/if}
</ol>
{#if !$correctToken}
	<button
		type="button"
		class="btn btn-sm variant-filled-tertiary flex justify-center center mt-2 {classes}"
		on:click={resendTokenHandler}
	>
		<span>
			{#if elapsedSeconds}
				<Icon src={Envelope} class="w-6 h-6" />
			{:else}
				<Icon src={EnvelopeOpen} class="w-6 h-6" />
			{/if}
		</span>
		<span
			>{i('forms.signup.steps.token.resendCode')}
			{remainingTime}
		</span>
	</button>
{/if}
