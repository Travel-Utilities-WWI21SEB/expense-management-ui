<script lang="ts">
	import { ImprintComponent } from '$components';
	import {
		FacebookIcon,
		InstagramIcon,
		LinkedinIcon,
		TitleLessLogoIcon,
		TwitterIcon
	} from '$icons';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalComponent: ModalComponent = {
		ref: ImprintComponent,
		slot: '<p>Imprint</p>'
	};

	const imprintModal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};
</script>

<footer class="bg-surface-500/25 border-t border-current">
	<div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
		<div class="flex justify-between">
			<div class="my-auto">
				<a href="/" class="flex title-font font-medium items-center justify-start">
					<TitleLessLogoIcon />
					<span class="ml-3 text-lg md:text-xl">Travel Utilities</span>
				</a>
			</div>
			<div class="grid grid-flow-col gap-6 md:gap-8">
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
						Follow us
					</h2>
					<ul class="text-gray-600 dark:text-gray-400 font-medium">
						<li>
							<a href="https://github.com/Travel-Utilities-WWI21SEB/" class="hover:underline"
								>Github</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
					<ul class="text-gray-600 dark:text-gray-400 font-medium">
						<li>
							<button class="hover:underline" on:click={() => modalStore.trigger(imprintModal)}>
								Imprint
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="!border-t-4 my-6" />
		<div class="flex items-center justify-between">
			<span class="text-sm text-gray-500 text-center dark:text-gray-400"
				>© 2023 <a href="https://costventures.works/" class="hover:underline">Travel Utilities</a>.
			</span>
			<div class="flex mt-4 space-x-6 justify-center">
				<a href="https://www.facebook.com/groups/ElonMusk/">
					<FacebookIcon />
				</a>
				<a href="https://twitter.com/mibi61" class="ml-3">
					<TwitterIcon />
				</a>
				<a href="https://www.instagram.com/kevin.r251/" class="ml-3">
					<InstagramIcon />
				</a>
				<a href="https://www.linkedin.com/in/luca-chmielarski-5153171b4/" class="ml-3">
					<LinkedinIcon />
				</a>
			</div>
		</div>
	</div>
</footer>
