<script lang="ts">
	import { i, language, loadResource, switchLanguage } from '@inlang/sdk-js';
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { De, Kr, Us } from 'svelte-flag-icons';

	let languages = [
		{ id: 'en', title: i('header.languages.en'), icon: Us },
		{ id: 'ko', title: i('header.languages.ko'), icon: Kr },
		{ id: 'de', title: i('header.languages.de'), icon: De }
	];

	let comboboxValue: string = language;

	$: activateLanguageTitle = languages.find((language) => language.id === comboboxValue)?.title;
	$: activateLanguageIcon = languages.find((language) => language.id === comboboxValue)?.icon;

	const languageCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'languageCombobox',
		placement: 'bottom',
		middleware: {
			offset: {
				// This is to offset the popup with the right border
				crossAxis: -30
			}
		},
		closeQuery: '.listbox-item'
	};

	const switchLanguageHandler = async (e: MouseEvent) => {
		const value = (e.target as HTMLButtonElement).value;
		console.log(`Switching language to: ${value}`);
		await switchLanguage(value);

		// Switch language titles for the current language
		languages = languages.map((language) => {
			language.title = i(`header.languages.${language.id}`);
			return language;
		});
	};

	// TODO: This is not working yet, why the fuck does Skeleton not propagate the hover event for listitems??????
	const preloadLanguageHandler = async (e: CustomEvent) => {
		const language = (e.target as HTMLButtonElement).value;
		console.log(`Preloading language: ${language}`);
		await loadResource(language);
	};
</script>

<!-- LANGUAGE POPUP -->
<div class="card shadow-xl py-2 mr-4 z-50" data-popup="languageCombobox">
	<ListBox rounded="rounded-none">
		{#each languages as language}
			<ListBoxItem
				bind:group={comboboxValue}
				name={language.title}
				value={language.id}
				on:click={switchLanguageHandler}
				on:mouseover={preloadLanguageHandler}
			>
				<svelte:fragment slot="lead">
					<svelte:component this={language.icon} size="20" tabindex="-1" />
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span>{language.title}</span>
				</svelte:fragment>
			</ListBoxItem>
		{/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
<!-- LANGUAGE POPUP -->

<div class="my-auto">
	<button
		type="button"
		class="btn variant-ringed-surface pt-2 justify-between"
		use:popup={languageCombobox}
	>
		<span>
			<svelte:component this={activateLanguageIcon} class="w-6 h-6" />
		</span>
		<span class="hidden md:block">{activateLanguageTitle}</span>
	</button>
</div>
