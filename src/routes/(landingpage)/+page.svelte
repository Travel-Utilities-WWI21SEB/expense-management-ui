<script lang="ts">
	import {
		ContactBox,
		LandingPageFeatureBoxLeft,
		LandingPageFeatureBoxRight,
		LandingPageReviewBox,
		SignUpModal,
		StatisticBox
	} from '$components';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	// Sign Up Modal
	const modalComponent: ModalComponent = {
		ref: SignUpModal
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	const openModal = () => {
		modalStore.trigger(modal);
	};
</script>

<div class="flex justify-center m-4 p-4">
	<h1 class="h1 mx-2 tracking-wider">
		<span
			class="bg-gradient-to-br dark:from-blue-400 from-blue-600 dark:to-cyan-400 to-cyan-600 bg-clip-text text-transparent box-decoration-clone"
			>Travel.</span
		>
	</h1>
	<h1 class="h1 mx-2 tracking-wider">
		<span
			class="bg-gradient-to-br dark:from-red-400 from-red-600 dark:to-yellow-400 to-yellow-600 bg-clip-text text-transparent box-decoration-clone"
			>Spend.</span
		>
	</h1>
	<h1 class="h1 mx-2 tracking-wider">
		<span
			class="bg-gradient-to-br dark:from-pink-400 from-pink-600 dark:to-violet-400 to-violet-600 bg-clip-text text-transparent box-decoration-clone"
			>Divide.</span
		>
	</h1>
</div>

<hr class="!border-t-8 !border-double" />

<!-- SIGN UP -->
<section id="registrationBox">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
			<h2 class="h2 flex-grow sm:pr-16 text-center">
				Get started with Costventures today by creating a free account.
			</h2>
			<button
				class="btn btn-lg variant-filled mt-8 mx-auto lg:m-0"
				data-sveltekit-preload-data="hover"
				on:click={openModal}
			>
				Register
			</button>
		</div>
	</div>
</section>

<hr class="!border-t-8 !border-double" />
<!-- SIGN UP -->

<!-- FEATURES -->
<section id="featureBox">
	<div class="container px-5 py-24 mx-auto">
		<LandingPageFeatureBoxLeft
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		>
			<svelte:fragment slot="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="sm:w-16 sm:h-16 w-10 h-10"
				>
					<path
						d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z"
					/>
				</svg>
			</svelte:fragment>
		</LandingPageFeatureBoxLeft>
		<LandingPageFeatureBoxRight
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		>
			<svelte:fragment slot="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="sm:w-16 sm:h-16 w-10 h-10"
				>
					<path
						d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z"
					/>
				</svg>
			</svelte:fragment>
		</LandingPageFeatureBoxRight>
		<LandingPageFeatureBoxLeft
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		>
			<svelte:fragment slot="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="sm:w-16 sm:h-16 w-10 h-10"
				>
					<path
						d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z"
					/>
				</svg>
			</svelte:fragment>
		</LandingPageFeatureBoxLeft>
	</div>
</section>
<!-- FEATURES -->

<hr class="!border-t-8 !border-double" />

<!-- TESTIMONIALS -->
<section id="testimonialBox">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:flex lg:flex-wrap -m-4">
			<LandingPageReviewBox
				imageLink="/aleksIcon.jpg"
				quote="Mashallah einfach die beste Software"
				name="ALEKS GEORGIEV"
				jobTitle="Senior Product Designer"
			/>
			<hr class="!border-t-2 lg:border-0 !border-double" />
			<LandingPageReviewBox
				imageLink="/justinIcon.jpg"
				quote="Brutales Produkt"
				name="JUSTIN SCHWAB"
				jobTitle="Spast"
			/>
			<hr class="!border-t-2 lg:border-0 !border-double" />
			<LandingPageReviewBox
				imageLink="/nicoIcon.jpg"
				quote="Seit ich Costventures benutze kann ich endlich sehen wie broke ich bin."
				name="NICO NIEBISCH"
				jobTitle="CEO"
			/>
		</div>
	</div>
</section>
<!-- TESTIMONIALS -->

<hr class="!border-t-8 !border-double" />

<!-- STATISTICS -->
<section id="statisticBox">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4 text-center">
			<StatisticBox title="Users" kpi="23k" />
			<StatisticBox title="Subscribers" kpi="18.2K" />
			<StatisticBox title="Investors" kpi="35" />
			<StatisticBox title="Talented Team" kpi="1" />
		</div>
	</div>
</section>
<!-- STATISTICS -->

<hr class="!border-t-8 !border-double" />

<!-- CONTACT US -->
<div id="contactBox">
	<ContactBox />
</div>
<!-- CONTACT US -->
