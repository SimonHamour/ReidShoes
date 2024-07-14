export const prerender = false;

import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { v7 } from 'uuid';
import * as Database from '$lib/server/Database';

export const load: PageServerLoad = async ({ cookies }) => {
	const user = await Database.illGetSomeCookiesForYou(cookies.get('sessionid') ?? "");
    if(user.includes("Error")) return null;
    if(!user.includes("Error")) return redirect(301, "/");
};

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        console.log("Login.....");
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
			return fail(400, { email, missing: true });
		}

        const [error, dbData] = await Database.Login(email.toString(), password.toString());
        
        if(null === error && dbData == true){
            console.log("Login Success");
            cookies.set('sessionid', await Database.illMakeSomeCookiesForYou(v7(), email.toString()), {path: "/"});
            return { success: true };
        }else{
            console.log("Login Failed");
            return fail(400, { email, incorrect: true });
        }
        
    },
    register: async ({ request }) => {
        console.log("Registering.....");
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const full_name = data.get('full_name');
        const phone = data.get('phone');

        if (!email || !password || !phone || !full_name) {
			return fail(400, { email, missing: true });
		}

        const [error, dbData] = await Database.Register(email.toString(), password.toString(), phone.toString(), full_name.toString());
        if(null === error){
            return { successRegis: true };
        }else{
            console.log(error);
            return { error: error }
            //return fail(400, { email, incorrect: true });
        }
    }
} satisfies Actions;

