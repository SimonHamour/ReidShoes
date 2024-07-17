<script lang="ts">
    import "../output.css";
    export let produk_info: Map<string, string> = new Map();
    let dialog: HTMLDialogElement;
    console.log(produk_info.size);
    $: if (dialog && (produk_info.size != 0)) dialog.showModal();
</script>
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
 <dialog bind:this={dialog} 
 on:close={() => {produk_info = new Map()}}
 on:click|self={() => {dialog.close()}}>
    <div 
        id="login-popup" tabindex="-1"
        class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] h-full items-center justify-center popup flex">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow popup-body">
                <button autofocus on:click={() => dialog.close()} type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
                    <svg aria-hidden="true" class="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            ></path>
                    </svg>
                    <span class="sr-only">Close popup</span>
                </button>
                <div class="p-5">
                    <h3 class="text-2xl mb-0.5 font-medium"> </h3>
                    <p class="mb-4 text-sm font-normal text-gray-800"> </p>
                    <div class="mb-7 text-center">
                        <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                            Produk Information
                        </p>
                    </div>
                    <div>
                        {#each produk_info as [key, value]}
                            <input type="text" readonly
                            class="mt-3 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                            placeholder="ID_PRODUK" value={(key != "HARGA" ? key + ": " + value : key + ": Rp. " + value + ",000.-")}>
                        {/each}
                        <button autofocus on:click={() => dialog.close()} type="button"
                            class="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</dialog>