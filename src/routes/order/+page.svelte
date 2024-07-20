<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order - Reid Shoes</title>
    <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-ml6NPgFo6xmZwbjn"></script>
</svelte:head>
<form action="?/midTrans" method="post" id="midtrans"></form>
<form action="?/success" method="post" id="success"></form>
<div class="bg-gray-100 h-screen py-8">
    <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-3/4">
                <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="text-left font-semibold">Product</th>
                                <th class="text-left font-semibold">Price</th>
                                <th class="text-left font-semibold">Quantity</th>
                                <th class="text-left font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each ress as _, idx}
                            <tr>
                                
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <img class="h-16 w-16 mr-4" src="{imgProduk[idx]}" alt="{imgProduk[idx]}">
                                            <span class="font-semibold">{nameProduk[idx]}</span>
                                        </div>
                                    </td>
                                    <td class="py-4">Rp {priceProduk[idx]},-</td>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <button on:click={() => {
                                                totalPriceProduk[idx] /= ammProduk[idx];
                                                ammProduk[idx] = ((ammProduk[idx]-1) == 0 ? 1 : ammProduk[idx]-1);
                                                ammTotal = ammProduk.reduce((partialSum, a) => partialSum + a, 0);
                                                console.log(totalPriceProduk[idx]); 
                                            }} class="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span class="text-center w-8">{ammProduk[idx]}</span>
                                            <button on:click={() => {
                                                ammProduk[idx] += 1;
                                                ammTotal = ammProduk.reduce((partialSum, a) => partialSum + a, 0);
                                                totalPriceProduk[idx] *= ammProduk[idx];
                                            }} class="border rounded-md py-2 px-4 ml-2">+</button>
                                            <button class="border rounded-md bg-red-600 py-2 px-4 ml-2">REMOVE</button>
                                        </div>
                                    </td>
                                    <td class="py-4">Rp {totalPriceProduk[idx]}.-</td>
                            </tr>
                            {/each}
                            <!-- More product rows -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="md:w-1/4">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-lg font-semibold mb-4">Buyer Info</h2>
                    <div class="flex justify-between overflow-auto mb-2">
                        <span class="me-2">Name: </span>
                        <span>{(data?.user ?? [])[2]}</span>
                    </div>
                    <div class="flex justify-between overflow-auto mb-2">
                        <span class="me-2">Email:</span>
                        <span>{(data?.user ?? [])[1]}</span>
                    </div>
                    <div class="flex justify-between overflow-auto mb-2">
                        <span class="me-2">Phone: </span>
                        <span>{(data?.user ?? [])[3]}</span>
                    </div>
                    <div class="flex justify-between whitespace-nowrap overflow-scroll mb-2">
                        <span class="me-2">Address:</span>
                        <span>{(data?.user ?? [])[5]}</span>
                    </div>
                    <h2 class="text-lg font-semibold mb-4">Summary</h2>
                    <div class="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>Rp {Subtotal}.-</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>Rp {taxes}.-</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>Rp {shipping}.-</span>
                    </div>
                    <div class="flex whitespace-nowrap overflow-scroll justify-between mb-2">
                        <span class="me-2">Mitra Pengiriman</span>
                        <select name="mitra_pengiriman" required>
                            <option value="JNT">JNT</option>
                            <option value="Si Cepat">Si Cepat</option>
                            <option value="Ninja X-press">Ninja X-press</option>
                        </select>
                    </div>
                    <div class="flex whitespace-nowrap overflow-scroll justify-between mb-2">
                        <span class="me-2">Shipping Method</span>
                        <select form="midtrans" bind:value={udin} on:change={() => {
                            shipping = (udin == "REGULAR" ? 5000 : (udin == "FAST" ? 20000 : (udin == "SAME DAY" ? 45000 : 0)))
                            TOTAL = Subtotal + taxes + shipping;
                        }} name="shipping_method" required>
                            <option value="REGULAR">Regular Delivery (Rp. 5000) - 2-4 hari untuk wilayah Jabodetabek</option>
                            <option value="FAST">Fast Delivery (Rp. 20000) - 1 hari untuk pengiriman langsung</option>
                            <option value="SAME DAY">Same Day Delivery (Rp. 45000) - pengiriman langsung</option>
                        </select>
                    </div>
                    <hr class="my-2">
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Total</span>
                        <span class="font-semibold">Rp {TOTAL},-</span>
                    </div>
                    <input type="hidden" name="total" value="{TOTAL}" form="midtrans">
                    <input type="hidden" name="id_keranjang" value="{data?.currCart ?? ''}" form="midtrans">
                    <input type="hidden" name="total" value="{TOTAL}" form="success">
                    <input type="hidden" name="id_keranjang" value="{data?.currCart ?? ''}" form="success">
                    <input type="hidden" name="status" value="{status}" form="success">
                    <input type="hidden" name="ammTotal" value="{ammTotal}" form="success">
                    {#if form?.transaction_token}
                        <button id="midtransPay" class="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Pay</button>
                    {:else}
                        <button form="midtrans" type="submit" on:click={() => {
                            TOTAL = Subtotal + taxes + shipping;
                        }} class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    import '../../output.css';
    import { onMount } from 'svelte';
    import type { PageData, ActionData } from './$types';
	import { redirect } from '@sveltejs/kit';
	export let data: PageData;
	export let form: ActionData;
    let udin = "";
    let shipping: number = 0;
    let taxes = 15000;
    let Subtotal = 0;
    let TOTAL = Subtotal + taxes + shipping;
    let ress: string[][] = [[]];
    if(typeof data?.res !== 'string')
        ress = data?.res ?? [[]];
    let nameProduk: string[] = [];
    let imgProduk: string[] = [];
    let priceProduk: string[] = [];
    let totalPriceProduk: number[] = [];
    let ammProduk: number[] = [];
    let ammTotal: number = 0;
    ress.forEach(produk => {
        nameProduk.push(produk[1]);
        imgProduk.push(produk[4]);
        priceProduk.push(produk[2]);
        totalPriceProduk.push(Number(produk[2]));
        Subtotal += Number(produk[2]);
        ammProduk.push(1);
    });
    let status = "Pending";
    console.log(form?.transaction_token);
    onMount(()=> {
        let udin = document.getElementById('midtransPay') ?? new HTMLElement();
        const submit: HTMLFormElement = document.getElementById('success') ?? new HTMLFormElement();
    udin.onclick = function(){
            // SnapToken acquired from previous step
            snap.pay(form?.transaction_token, {
            // Optional
            onSuccess: function(result: any){
                status = "success";
                submit.submit();
                console.log(JSON.stringify(result, null, 2));
            },
            // Optional
            onPending: function(result: any){
                /* You may add your own js here, this is just example */ console.log(JSON.stringify(result, null, 2));
            },
            // Optional
            onError: function(result: any){
                status = "failed";
                submit.submit();
                /* You may add your own js here, this is just example */ console.log(JSON.stringify(result, null, 2));
            }
            });
      };
    });
</script>