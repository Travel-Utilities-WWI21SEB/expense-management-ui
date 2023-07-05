<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import { Accordion, AccordionItem, modalStore } from '@skeletonlabs/skeleton';
</script>

<div class="md:w-3/5 bg-surface-50 dark:bg-surface-500 rounded-lg shadow-xl p-4">
	<h2 class="h2 mb-4">{i('footer.imprint.title')}</h2>
	<Accordion>
		<AccordionItem open>
			<svelte:fragment slot="lead">1</svelte:fragment>
			<svelte:fragment slot="summary">
				<h4 class="h4">{i('footer.imprint.general.title')}</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<p>{i('footer.imprint.general.content')}</p>
				<p>{i('footer.imprint.general.name')}</p>
				<p>{i('footer.imprint.general.address')}</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">2</svelte:fragment>
			<svelte:fragment slot="summary">
				<h4 class="h4">{i('footer.imprint.represented_by.title')}</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<p>{i('footer.imprint.represented_by.name')}</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">3</svelte:fragment>
			<svelte:fragment slot="summary">
				<h4 class="h4">{i('footer.imprint.contact.title')}</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<ul class="mt-2">
					<li class="flex border-y border-current py-2">
						<span class="font-bold w-24">{i('footer.imprint.contact.phone')}:</span>
						<span>{i('footer.imprint.contact.phone_number')}</span>
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">{i('footer.imprint.contact.email')}:</span>
						<span class="overflow-x-auto">{i('footer.imprint.contact.email_address')}</span>
					</li>
				</ul>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">4</svelte:fragment>
			<svelte:fragment slot="summary">
				<h4 class="h4">{i('footer.imprint.disclaimer.title')}</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<h5 class="h4">{i('footer.imprint.disclaimer.content_1')}</h5>
				<p>{i('footer.imprint.disclaimer.content_1_description')}</p>
				<h5 class="h4">{i('footer.imprint.disclaimer.content_2')}</h5>
				<p>{i('footer.imprint.disclaimer.content_2_description')}</p>
				<h5 class="h4">{i('footer.imprint.disclaimer.content_3')}</h5>
				<p>{i('footer.imprint.disclaimer.content_3_description')}</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<button class="btn variant-filled mt-2" on:click={() => modalStore.close()}
		>{i('footer.imprint.close')}</button
	>
</div>
