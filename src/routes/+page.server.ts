export const prerender = false;
import type { PageServerLoad } from './$types'
import { illGetSomeCookiesForYou } from "$lib/server/Database";
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const user = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes('Error')) return null;
    if(!user.includes("Error")){
        if(user[4] == "admin")
            redirect(301, "/admin");
        return { user };
    };
};