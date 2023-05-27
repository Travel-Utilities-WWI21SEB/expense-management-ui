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
						><span
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									fill-rule="evenodd"
									d="M5.478 5.559A1.5 1.5 0 016.912 4.5H9A.75.75 0 009 3H6.912a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H15a.75.75 0 000 1.5h2.088a1.5 1.5 0 011.434 1.059l2.213 7.191H17.89a3 3 0 00-2.684 1.658l-.256.513a1.5 1.5 0 01-1.342.829h-3.218a1.5 1.5 0 01-1.342-.83l-.256-.512a3 3 0 00-2.684-1.658H3.265l2.213-7.191z"
									clip-rule="evenodd"
								/>
								<path
									fill-rule="evenodd"
									d="M12 2.25a.75.75 0 01.75.75v6.44l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 011.06-1.06l1.72 1.72V3a.75.75 0 01.75-.75z"
									clip-rule="evenodd"
								/>
							</svg>
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
