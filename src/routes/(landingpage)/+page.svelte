<script lang="ts">
	import {
		CatchPhraseText,
		ContactBox,
		LandingPageFeatureBoxLeft,
		LandingPageFeatureBoxRight,
		LandingPageReviewBox,
		SignUpModal,
		StatisticBox
	} from '$components';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	export let data;

	// Sign Up Modal
	const modalComponent: ModalComponent = {
		ref: SignUpModal,
		props: {
			data: {
				rememberMe: data.rememberMe,
				email: data.email
			}
		}
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
	<CatchPhraseText
		text="Travel."
		colorGradient="dark:from-blue-400 from-blue-600 dark:to-cyan-400 to-cyan-600"
	/>
	<CatchPhraseText
		text="Spend."
		colorGradient="dark:from-red-400 from-red-600 dark:to-yellow-400 to-yellow-600"
	/>
	<CatchPhraseText
		text="Divide."
		colorGradient="dark:from-pink-400 from-pink-600 dark:to-violet-400 to-violet-600"
	/>
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
		/>
		<LandingPageFeatureBoxRight
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		/>
		<LandingPageFeatureBoxLeft
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		/>
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
				jobTitle="Chief Executive Officer"
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
