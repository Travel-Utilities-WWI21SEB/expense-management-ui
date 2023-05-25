<script lang="ts">
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';

	export let topAppBar: TopAppBar;
</script>

<TopAppBar bind:this={topAppBar} variant="standard" class="navbar">
	<Row>
		<Section>
			<img
				alt="logo"
				src="https://raw.githubusercontent.com/Travel-Utilities-WWI21SEB/expense-management-ui/main/static/logo.jpeg"
				width="50"
				height="50"
			/>
			<Title>Costventures</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton
				class="material-icons"
				aria-label="theme_icon"
				on:click={() => console.log('hooray!')}
				>start
			</IconButton>
			<p class="mdc-typography--button">"Hi"</p>
		</Section>
	</Row>
</TopAppBar>
