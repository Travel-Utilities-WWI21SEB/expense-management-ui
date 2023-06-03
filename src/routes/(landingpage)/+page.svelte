<script lang="ts">
	import {
		ContactBox,
		LandingPageFeatureBoxLeft,
		LandingPageFeatureBoxRight,
		LandingPageReviewBox,
		SignUpModal,
		StatisticBox
	} from '$components';
	import { GlobeIcon } from '$icons';
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
				<GlobeIcon sidebarIcon={false} />
			</svelte:fragment>
		</LandingPageFeatureBoxLeft>
		<LandingPageFeatureBoxRight
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		>
			<svelte:fragment slot="icon">
				<GlobeIcon sidebarIcon={false} />
			</svelte:fragment>
		</LandingPageFeatureBoxRight>
		<LandingPageFeatureBoxLeft
			title="Create trips with your friends"
			content="Travel the world with your friends and family. Create a trip and invite your friends to join you."
			path="travel"
		>
			<svelte:fragment slot="icon">
				<GlobeIcon sidebarIcon={false} />
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
