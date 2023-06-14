<script>
	import { MailInboxIcon } from '$icons';
</script>

<section>
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-col text-center w-full mb-12">
			<h1 class="h1 title-font mb-4">Contact Us</h1>
			<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
				If there's something you need to tell us, just do it. We won't bite, promised. :)
			</p>
		</div>
		<div class="lg:w-1/2 md:w-2/3 mx-auto">
			<div class="flex flex-wrap -m-2">
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="name" class="leading-7 text-sm">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							class="w-full bg-gray-100 bg-opacity-50 rounded border border-current-300 focus:border-secondary-500 focus:bg-white focus:ring-2 focus:ring-tertiary-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="email" class="leading-7 text-sm">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							class="w-full bg-gray-100 bg-opacity-50 rounded border border-current-300 focus:border-secondary-500 focus:bg-white focus:ring-2 focus:ring-tertiary-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>
				<div class="p-2 w-full">
					<div class="relative">
						<label for="message" class="leading-7 text-sm">Message</label>
						<textarea
							id="message"
							name="message"
							class="w-full bg-gray-100 bg-opacity-50 rounded border border-current-300 focus:border-secondary-500 focus:bg-white focus:ring-2 focus:ring-tertiary-200 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>
				<div class="p-2 w-full flex justify-center">
					<a href="/signup" class="btn btn-lg variant-filled" data-sveltekit-preload-data="hover"
						><span>
							<MailInboxIcon />
						</span>
						<span>Send</span>
					</a>
				</div>
				<div class="p-2 w-full pt-8 mt-8 border-t border-current text-center">
					<p class="text-secondary-600 dark:text-secondary-300">team@costventures.work</p>
					<p class="leading-normal my-5">
						Coblitzallee 1-9
						<br />68163 Mannheim
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
