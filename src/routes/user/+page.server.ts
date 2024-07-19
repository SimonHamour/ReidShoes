import { illGetSomeCookiesForYou, searchBarang, Update } from "$lib/server/Database";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "../$types";

export const prerender = false;

export const load: PageServerLoad = async ({ cookies }) => {
    const user = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes("Error")){
        redirect(303, "/login");
    };
    if(!user.includes("Error")){
        
        return { user };
    };
};

export const actions: Actions = {
    editUser: async ({ cookies, request }) => {
        const data = await request.formData();
		const name: string = data.get('name')?.toString() ?? "";
        const phone: string = data.get('phone')?.toString() ?? "";
        const address: string = data.get('address')?.toString() ?? "";
        const current_password: string = data.get('currpass')?.toString() ?? "";
        const password: string = data.get('password')?.toString() ?? "";
        const repassword: string = data.get('repass')?.toString() ?? "";
        const id_user: string = data.get('id_user')?.toString() ?? "";

        let result: string = "";
        if(!password){
            if(!current_password)
                return fail(400, { current_password, missing: true });
            result = await Update(id_user, current_password, address, phone, name, undefined);
        }else{
            if(!repassword)
                return fail(400, { repassword, missing: true });
            if(!current_password)
                return fail(400, { current_password, missing: true });
            result = await Update(id_user, current_password, address, phone, name, password);
        }
        if(result == "Success")
            return { success: true }
        else
            return { result }

    },
    trackorder: async ({request}) => {
        const data = await request.formData();
		const name: string = data.get('nama')?.toString() ?? "";
        
        const res = await searchBarang(name);
        if(typeof res !== "string")
            return {res};
        else
            return {error: res};
    }
} satisfies Actions;