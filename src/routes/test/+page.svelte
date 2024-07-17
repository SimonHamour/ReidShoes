<script lang="ts">
    import ProdukModal from '$lib/ProdukModal.svelte';
    import type { PageData } from './$types';
	export let data: PageData;
    let produk_info: Map<string, string>;
</script>
<button on:click={() => (produk_info = data?.data ?? new Map())}> show modal </button>

<ProdukModal bind:produk_info>
</ProdukModal>