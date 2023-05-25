<script lang="ts">
    import LayoutGrid, {Cell} from "@smui/layout-grid";
</script>

<LayoutGrid>
    <Cell span={12}>
        <h1 class="text-4xl font-bold text-center">Welcome to the Svelte Material UI demo</h1>
    </Cell>
    <Cell span={8}>
        <h2>Costventures</h2>
    </Cell>
    <Cell span={4}>
        <p class="text-2xl font-bold text-center">This is the homepage</p>
    </Cell>
</LayoutGrid>