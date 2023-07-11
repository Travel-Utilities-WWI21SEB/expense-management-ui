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
	import aleksLogo from '$lib/assets/aleksIcon.jpg';
	import justinLogo from '$lib/assets/justinIcon.jpg';
	import nicoLogo from '$lib/assets/nicoIcon.jpg';
	import { i } from '@inlang/sdk-js';
	import {
		Avatar,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { CreditCard, GlobeEuropeAfrica, Users } from '@steeze-ui/heroicons';

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

<div class="flex justify-center md:flex-row flex-col items-center m-4 p-4">
	<CatchPhraseText
		text={i('landingPage.banner.catchPhrase.first')}
		colorGradient="dark:from-blue-400 from-blue-600 dark:to-cyan-400 to-cyan-600"
	/>
	<CatchPhraseText
		text={i('landingPage.banner.catchPhrase.second')}
		colorGradient="dark:from-red-400 from-red-600 dark:to-yellow-400 to-yellow-600"
	/>
	<CatchPhraseText
		text={i('landingPage.banner.catchPhrase.third')}
		colorGradient="dark:from-pink-400 from-pink-600 dark:to-violet-400 to-violet-600"
	/>
</div>

<hr class="!border-t-8 !border-double" />

<!-- SIGN UP -->
<section id="registrationBox">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
			<h2 class="h2 flex-grow sm:pr-16 text-center">
				{i('landingPage.register.title')}
			</h2>
			<button
				class="btn btn-lg variant-filled mt-8 mx-auto lg:m-0"
				data-sveltekit-preload-data="hover"
				on:click={openModal}
			>
				{i('landingPage.register.button')}
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
			title={i('landingPage.features.travel.title')}
			content={i('landingPage.features.travel.description')}
			path="features/travel"
			icon={GlobeEuropeAfrica}
		/>
		<LandingPageFeatureBoxRight
			title={i('landingPage.features.spend.title')}
			content={i('landingPage.features.spend.description')}
			path="features/spend"
			icon={CreditCard}
		/>
		<LandingPageFeatureBoxLeft
			title={i('landingPage.features.divide.title')}
			content={i('landingPage.features.divide.description')}
			path="features/divide"
			icon={Users}
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
				quote={i('landingPage.reviews.aleks')}
				name="ALEKS GEORGIEV"
				jobTitle="Senior Product Designer"
			>
				<svelte:fragment slot="icon">
					<Avatar class="mx-auto mb-4 w-20 h-20" rounded="rounded-full" src={aleksLogo} />
				</svelte:fragment>
			</LandingPageReviewBox>
			<hr class="!border-t-2 lg:border-0 !border-double" />
			<LandingPageReviewBox
				quote={i('landingPage.reviews.thomas')}
				name="JUSTIN SCHWAB"
				jobTitle="Spast"
			>
				<svelte:fragment slot="icon">
					<Avatar class="mx-auto mb-4 w-20 h-20" rounded="rounded-full" src={justinLogo} />
				</svelte:fragment>
			</LandingPageReviewBox>
			<hr class="!border-t-2 lg:border-0 !border-double" />
			<LandingPageReviewBox
				quote={i('landingPage.reviews.nico')}
				name="NICO NIEBISCH"
				jobTitle="Chief Executive Officer"
			>
				<svelte:fragment slot="icon">
					<Avatar class="mx-auto mb-4 w-20 h-20" rounded="rounded-full" src={nicoLogo} />
				</svelte:fragment>
			</LandingPageReviewBox>
		</div>
	</div>
</section>
<!-- TESTIMONIALS -->

<hr class="!border-t-8 !border-double" />

<!-- STATISTICS -->
<section id="statisticBox">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4 text-center">
			<StatisticBox title={i('landingPage.stats.users')} kpi="23k" />
			<StatisticBox title={i('landingPage.stats.subscribers')} kpi="18.2K" />
			<StatisticBox title={i('landingPage.stats.investors')} kpi="35" />
			<StatisticBox title={i('landingPage.stats.team')} kpi="1" />
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
