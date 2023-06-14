<script lang="ts">
	export let text: string;
	export let colorGradient: string;
</script>

<h1 class="h1 mx-2 tracking-wider">
	<span class="bg-gradient-to-br {colorGradient} bg-clip-text text-transparent box-decoration-clone"
		>{text}</span
	>
</h1>
