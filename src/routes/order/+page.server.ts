import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import * as Database from '$lib/server/Database';
import { createRequire } from 'node:module';

export const load: PageServerLoad = async ({ cookies }) => {
	const user = await Database.illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes("Error")) return redirect(303, "/login");
    if(!(user ?? [])[5]) return redirect(303, "/user/?address=null");
    const res = await Database.getCart((user ?? [])[0]);
    const currCart = await Database.getIdCart((user ?? [])[0]);
    if(typeof currCart === 'string') return redirect(303, "/?error=" + currCart);
    if(!user.includes("Error")) return {currCart, res, user };
};

export const actions: Actions = {
    midTrans: async ({ request}) => {
        const data = await request.formData();
        const total = Number(data.get('total') ?? 0);
        const id_keranjang = Number(data.get('id_keranjang') ?? 0);
        const require = createRequire(import.meta.url);
        const midtransClient = require('midtrans-client');
        // Create Core API instance
        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : 'SB-Mid-server-EPN1pBlo4tBJTpS3NZhZ9Q-D',
            clientKey : 'SB-Mid-client-ml6NPgFo6xmZwbjn'
        });
        let parameter = {
            "transaction_details": {
                "order_id": "ID: " + id_keranjang + " Oblong: " + Math.floor(Math.random()*999)+100,
                "gross_amount": total
            }, "credit_card":{
                "secure" : true
            }, "expiry":{
                "unit": "minutes",
                "duration": 3
            }
        };
        let udin = await snap.createTransaction(parameter);
        const getResult = await Database.setMidtrans(id_keranjang, udin.token);
        return {transaction_token: udin.token};
    },
    success: async ({cookies, request}) => {
        const user = await Database.illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
        const data = await request.formData();
        const total = Number(data.get('total') ?? 0);
        const id_keranjang = Number(data.get('id_keranjang') ?? 0);
        const status = String(data.get('status') ?? "Pending");
        const ammTotal = Number(data.get('ammTotal') ?? 0);
        console.log(total, id_keranjang, status, user);
        if(!total || !id_keranjang || !status || user.includes("Error"))
            return fail(400, { missing: true });
        
        const getResult = await Database.setMidtransStatus(id_keranjang, "Success");
        if(getResult != "Success"){
            console.log(getResult);
            return {error:getResult};
        }
        const res = await Database.setTransaksi(id_keranjang, user[2], ammTotal, total);
        if(res != "Success"){
            console.log(res);
            return {error:res};
        }
        return redirect(303, "/");
    },
    remove: async ({cookies, request}) => {
        const data = await request.formData();
        const id_keranjang = Number(data.get('remove') ?? 0);;
        const indexs = Number(data.get('i') ?? 0);
        let id_produk = 0;
        if(!indexs || !id_keranjang )
            return fail(400, { missing: true });
        for (let index = 0; index < indexs; index++) {
            id_produk = Number(data.get(String(index)) ?? 0);
            if(id_produk != 0) break;
        }
        const res = await Database.removeProdukKeranjang(id_keranjang, id_produk);
        return;
    }
} satisfies Actions;