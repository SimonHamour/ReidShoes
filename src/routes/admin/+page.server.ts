export const prerender = false;
import type { Actions, PageServerLoad } from './$types'
import { getAllUser, getHeadAllUsers, getAllProduk, getHeadAllProduk, illGetSomeCookiesForYou, UpdateProduk, getAllTransaction, getHeadAllTransaction, UpdateStatusTransaksi } from "$lib/server/Database";
import { error, redirect, fail} from '@sveltejs/kit';

//Check if 30 they are not active
//SELECT IF(TIMEDIFF(NOW(), last_seen) > (CAST('00:00:00' AS TIME) + INTERVAL 30 MINUTE), "True", "False") AS TIMEDIFF FROM users;

export const load = async ({ url, fetch, cookies }: Parameters<PageServerLoad>[0]) => {
    const Current_User = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    const LIMIT = Number(url.searchParams.get('limit')) || 10;
    const SKIP = Number(url.searchParams.get('skip')) || 0;
    const current_page = String(url.searchParams.get('current') ?? "dashboard");
    async function allUsers(limit: number = 10, skip: number = 0) {
        if((limit-skip) != 10) throw error(400, 'Bad Request');
        const res = await getAllUser(LIMIT, SKIP);
        return res;
    }
    async function allProduk(limit: number = 10, skip: number = 0) {
        if((limit-skip) != 10) throw error(400, 'Bad Request');
        const res = await getAllProduk(LIMIT, SKIP);
        return res;
    }
    async function allTransaction(limit: number = 10, skip: number = 0) {
        if((limit-skip) != 10) throw error(400, 'Bad Request');
        const res = await getAllTransaction(LIMIT, SKIP);
        return res;
    }
    let users: Array<Array<string>> | string = "";
    let produk: Array<Array<string>> | string = "";
    let pesanan: Array<Array<string>> | string = "";
    if(current_page === "pelanggan"){
        users = await allUsers(LIMIT, SKIP);
        produk = await allProduk();
        pesanan = await allTransaction();
    }else if(current_page === "produk"){
        users = await allUsers();
        produk = await allProduk(LIMIT, SKIP);
        pesanan = await allTransaction();
    }else if(current_page === "pesanan"){
        users = await allUsers();
        pesanan = await allTransaction(LIMIT, SKIP);
        produk = await allProduk();
    }else{
        users = await allUsers();
        produk = await allProduk();
        pesanan = await allTransaction();
    }
    const userHead = getHeadAllUsers();
    const produkHead = getHeadAllProduk();
    const pesananHead = getHeadAllTransaction();
    if(typeof users === 'string'){
        console.log(users);
        throw error(400, 'Bad Request: users');
    }

    if(typeof produk === 'string'){
        console.log(produk);
        throw error(400, 'Bad Request: produk');
    }

    if(typeof pesanan === 'string'){
        throw error(400, 'Bad Request: pesanan');
    }

    if(Current_User.includes("Error")) 
        redirect(303, "/login");
    
    console.log(pesanan.length);
    if(!Current_User.includes("Error")){
        if(Current_User[4] == "user")
            redirect(301, "/");
        return { Current_User, users: users, products: produk, pesanan: pesanan, current: current_page, userHead: userHead, productHead: produkHead, pesananHead: pesananHead};
    };
};

export const actions: Actions = {
    editStok: async ({ request}) => {
        const data = await request.formData();
        const id_produk = data.get('0')?.toString();
        const stok = Math.abs(Number(data.get('3')?.toString())) || 0;
        if (!id_produk || !stok) 
			return fail(400, { missing: true });

		const result = await UpdateProduk(id_produk, stok);
        if(result != "Success")
            return fail(400, { missing: true });
        return {};
    },
    editStatus: async ({request}) => {
        const data = await request.formData();
        const id_produk = data.get('i0')?.toString();
        const stok = data.get('i6')?.toString();
        console.log(id_produk);
        console.log(stok);
        if (!id_produk || !stok) 
			return fail(400, { missing: true });
        const result = await UpdateStatusTransaksi(id_produk, stok);
        if(result != "Success")
            return fail(400, { missing: true });
        return {};
    }
} satisfies Actions;

