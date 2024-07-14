export const prerender = false;
import type { PageServerLoad } from './$types'
import { illGetSomeCookiesForYou } from "$lib/server/Database";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const user = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes("Error")) {
        redirect(303, "/login");
    };
    if(!user.includes("Error")){
        if(user[4] == "user")
            redirect(301, "/");
        return { user };
    };
};