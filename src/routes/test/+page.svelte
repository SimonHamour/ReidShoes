<script lang="ts">
    import DialogBox from '$lib/DialogBox.svelte';
    import ProdukModal from '$lib/ProdukModal.svelte';
    import TransaksiModal from '$lib/TransaksiModal.svelte';
    import type { PageData } from './$types';
	export let data: PageData;
    let message: string = "Hello world";
    let produk_info: Map<string, string>;
    let pesanan: string[][] = [[]];
    let bool: Boolean = false;
</script>
<button on:click={() => (produk_info = data?.data ?? new Map())}> show modal </button>
<button on:click={() => (bool = true)}> show modal2 </button>
<button on:click={() => (pesanan = [["131231", "Dummy DUmmy", "123123", "21", "22222222", "TODAY"], ["131231", "Dummy DUmmy", "123123", "21", "22222222", "TODAY"], ["131231", "Dummy DUmmy", "123123", "21", "22222222", "TODAY"]])}> show modal3 </button>
<ProdukModal bind:produk_info>
</ProdukModal>

<TransaksiModal bind:pesanan>

</TransaksiModal>

<DialogBox bind:bool message="Hello, World" buttonMessage="Greeting Gentlemen">
</DialogBox>