<script lang="ts">
    import "../output.css";
    export let pesanan: string[][] = [];
    let dialog: HTMLDialogElement;
    console.log(pesanan.length);
    $: if (dialog && pesanan[0][0]) dialog.showModal();

    const userHead: Array<string> = [];
    userHead.push("ID Transaksi");
    userHead.push("Nama Pembeli");
    userHead.push("ID Keranjang");
    userHead.push("Berapa banyak");
    userHead.push("Total harga");
    userHead.push("Tanggal Transaksi");

</script>
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
 <dialog bind:this={dialog} 
 on:close={() => {pesanan = [[]]}}
 on:click|self={() => {dialog.close()}}>
 <div id="content-pesanan" class="content">
    <div class=" flex flex-col justify-between items-center w-full h-full">
        <div class="relative overflow-auto w-full shadow-md sm:rounded-lg gap-3 flex flex-col sm:flex-row bg-white h-full justify-center items-center">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="text-left">
                        {#each userHead as pesanan}
                            <th scope="col" class=" px-6 py-3">
                                {pesanan}
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each pesanan as p, idxx}
                        <tr class="bg-white overflow-auto w-full border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {#each p as p, idx}
                                <td class="truncate px-6 py-4">
                                    {p}
                                    <input type="hidden" name="i{String(idx)}" value={p} form="i{String(idxx)}">
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</dialog>