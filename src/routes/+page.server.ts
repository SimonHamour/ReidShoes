export const prerender = false;
import type { PageServerLoad } from './$types'
import { illGetSomeCookiesForYou, insertCart } from "$lib/server/Database";
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const user = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes('Error')) return null;
    if(!user.includes("Error")){
        if(user[4] == "admin")
            redirect(301, "/admin");
        return { user };
    };
    return { user }
};

export const actions: Actions = {
    addProduct: async ({ cookies, request }) => {
        const user = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
        if(user.includes('Error')) return redirect(301, "/login");
        if(!user.includes("Error")){
            if(user[4] == "admin")
                redirect(301, "/admin");
        };
        const data = await request.formData();
        const produk = data.get('produk');
        if (!produk) {
			return fail(400, { produk, missing: true });
		}else{
            const res = await insertCart(Number(produk), (user ?? [])[0]);
            if(res == "Duplicate")
                return {duplicate: true};
            else if(res != "True")
                return { error: res };
            else
                return {added: true};
        }
        
    }
} satisfies Actions;