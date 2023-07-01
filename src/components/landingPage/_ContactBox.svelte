<script lang="ts">
	import { MailInboxIcon } from '$icons';
	import { i } from '@inlang/sdk-js';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

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

	const submitHandler = async (e: MouseEvent) => {
		// Get form data
		const name = (document.getElementById('name') as HTMLInputElement).value;
		const email = (document.getElementById('email') as HTMLInputElement).value;
		const message = (document.getElementById('message') as HTMLInputElement).value;

		// Send email
		const response = await fetch('/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, message })
		});

		const { error, errorMessage } = await response.json();
		let toast: ToastSettings;

		if (error) {
			toast = {
				background: 'variant-filled-error',
				message: errorMessage,
				autohide: true,
				timeout: 5000
			};
		} else {
			resendTokenTimer = resendTokenInterval;

			toast = {
				background: 'variant-filled-success',
				message: 'Your message was sent successfully!',
				autohide: true,
				timeout: 5000
			};
		}

		// Clear form
		(document.getElementById('name') as HTMLInputElement).value = '';
		(document.getElementById('email') as HTMLInputElement).value = '';
		(document.getElementById('message') as HTMLInputElement).value = '';

		// Show toast
		toastStore.trigger(toast);
	};
</script>

<section>
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-col text-center w-full mb-12">
			<h1 class="h1 title-font mb-4">{i('landingPage.contactBox.title')}</h1>
			<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
				{i('landingPage.contactBox.message')}
			</p>
		</div>
		<div class="lg:w-1/2 md:w-2/3 mx-auto">
			<form class="flex flex-wrap group -m-2" novalidate>
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="name" class="leading-7 text-sm">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							class="input peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
							placeholder="Thomas"
							minlength="3"
							required
						/>
						<span
							class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
						>
							{i('landingPage.contactBox.invalidName')}
						</span>
					</div>
				</div>
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="email" class="leading-7 text-sm">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							class="input peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
							placeholder="thomas@ing.de"
							required
						/>
						<span
							class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
						>
							{i('landingPage.contactBox.invalidEmail')}
						</span>
					</div>
				</div>
				<div class="p-2 w-full">
					<div class="relative">
						<label for="message" class="leading-7 text-sm"
							>{i('landingPage.contactBox.label')}</label
						>
						<textarea
							id="message"
							name="message"
							rows={6}
							class="textarea"
							placeholder={i('landingPage.contactBox.placeholder')}
							required
						/>
					</div>
				</div>
				<div class="p-2 w-full flex justify-center">
					<button
						class="btn btn-lg variant-filled {resendTokenTimer > 0
							? 'pointer-events-none opacity-50'
							: ''} group-invalid:pointer-events-none group-invalid:opacity-50"
						on:click={submitHandler}
					>
						<span>
							<MailInboxIcon />
						</span>
						<span>{i('landingPage.contactBox.button')} {remainingTime}</span>
					</button>
				</div>
				<div class="p-2 w-full pt-8 mt-8 border-t border-current text-center">
					<p class="text-secondary-600 dark:text-secondary-300">team@mail.costventures.works</p>
					<p class="leading-normal my-5">
						Coblitzallee 1-9
						<br />68163 Mannheim
					</p>
				</div>
			</form>
		</div>
	</div>
</section>
