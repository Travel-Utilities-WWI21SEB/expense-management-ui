<script lang="ts">
	import { Accordion, AccordionItem, modalStore } from '@skeletonlabs/skeleton';
</script>

<div class="md:w-3/5 bg-surface-50 dark:bg-surface-500 rounded-lg shadow-xl p-4">
	<h2 class="h2 mb-4">Imprint (in german only)</h2>
	<Accordion>
		<AccordionItem open>
			<svelte:fragment slot="lead">1</svelte:fragment>
			<svelte:fragment slot="summary"><h4 class="h4">Generell</h4></svelte:fragment>
			<svelte:fragment slot="content">
				<p>Angaben gemäß § 5 TMG</p>
				<p>Kevin Kemal Rieger</p>
				<p>Schulzenstraße 4</p>
				<p>68259 Mannheim</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">2</svelte:fragment>
			<svelte:fragment slot="summary"><h4 class="h4">Vertreten durch</h4></svelte:fragment>
			<svelte:fragment slot="content"><p>Kevin Kemal Rieger</p></svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">3</svelte:fragment>
			<svelte:fragment slot="summary"><h4 class="h4">Kontakt</h4></svelte:fragment>
			<svelte:fragment slot="content">
				<ul class="mt-2">
					<li class="flex border-y border-current py-2">
						<span class="font-bold w-24">Telefon:</span>
						<span>+49 152 09707882</span>
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">Email:</span>
						<span class="overflow-x-auto">team@mail.costventures.works</span>
					</li>
				</ul>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">4</svelte:fragment>
			<svelte:fragment slot="summary"><h4 class="h4">Haftungsausschluss</h4></svelte:fragment>
			<svelte:fragment slot="content">
				<h5 class="h4">Haftung für Inhalte</h5>
				<p>
					Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
					Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
					Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
					allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
					jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
					überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
					hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
					den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
					erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
					Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
					entfernen.
				</p>
				<h5 class="h4">Haftung für Links</h5>
				<p>
					Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
					Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
					Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
					Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
					mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
					Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
					ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
					Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
				</p>
				<h5 class="h4">Datenschutz</h5>
				<p>
					Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich.
					Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder
					eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger
					Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte
					weitergegeben. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
					Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der
					Daten vor dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen der
					Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht
					ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
					widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
					Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
				</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<button class="btn variant-filled mt-2" on:click={() => modalStore.close()}>Close</button>
</div>
