export const prerender = true;
import type { PageServerLoad } from './$types'
import { illGetSomeCookiesForYou } from "$lib/server/Database";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const user = await illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes("Error")) return null;
    if(!user.includes("Error")){
        if(user[4] == "user")
            redirect(307, "/");
        return { user };
    };
};