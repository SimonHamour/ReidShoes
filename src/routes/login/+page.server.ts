export const prerender = false;

import { fail, json } from '@sveltejs/kit';
import type { Actions } from '../$types';
import { createHash } from 'crypto';
import mysql, { type RowDataPacket } from 'mysql2/promise';


async function openConn(): Promise<mysql.Connection>{
    return await mysql.createConnection({
        host: 'fr9.h.filess.io',
        port: 3305,
        user: 'ReidShoes_freedompen',
        password: '5445e0df8c0838128111b3146cd71f8b025fe29d',
        database: 'ReidShoes_freedompen',
      });
}

async function illGetSomeCookiesForYou(getCookies: string) {
    
}

async function illMakeSomeCookiesForYou() {
    
}

async function Register(email: string, password: string, phone: string, full_name: string){
    const conn = await openConn();
    try {
        let hashPass = createHash('sha256').update(password).digest('hex');
        const [result, fields] = await conn.execute(
            'INSERT INTO users VALUES (?, ?, ?, ?, ?)',
            [Math.floor(Math.random()*999999) + 100000, email, hashPass, full_name, phone]
        );
        conn.end(0);
        return [null, result];
    } catch (error) {
        conn.end(0);
        return [(error as Error).message, null];
    }
}

async function Login(email: string, password: string){
    const conn = await openConn();
    try {
        let hashPass = createHash('sha256').update(password).digest('hex');
        const [rows, fields] = await conn.execute(
            'SELECT password FROM users WHERE email = ?',
            [email]
        );
        let getPassword: string = (rows as RowDataPacket)[0]?.password ?? "";
        if(hashPass == getPassword){
            conn.end(0);
            return [null, true];
        }else{
            conn.end(0);
            return [null, false];
        }
    } catch (error) {
        conn.end(0);
        return [(error as Error).message, false];
    }
}

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        console.log("Login.....");
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
			return fail(400, { email, missing: true });
		}

        const [error, dbData] = await Login(email.toString(), password.toString());
        
        if(null === error && dbData == true){
            console.log("Login Success");
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

        const [error, dbData] = await Register(email.toString(), password.toString(), phone.toString(), full_name.toString());
        if(null === error){
            return { successRegis: true };
        }else{
            console.log(error);
            return { error: error }
            //return fail(400, { email, incorrect: true });
        }
    }
} satisfies Actions;