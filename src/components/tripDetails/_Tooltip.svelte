<script lang="ts">
	/*
    IMPORTANT NOTE:

    ----Work in progress----

    Müssen wir nochmal überarbeiten
    */
	export let title = '';
	let isHovered = false;
	let x: any;
	let y: any;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		x = event.pageX;
		y = event.pageY;
	}
	function mouseMove(event: MouseEvent) {
		x = event.pageX;
		y = event.pageY;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseover={mouseOver} on:mouseleave={mouseLeave} on:mousemove={mouseMove}>
	<slot />
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
{/if}

<style>
	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
	}
</style>
