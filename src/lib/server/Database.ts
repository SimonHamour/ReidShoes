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

export async function illGetSomeCookiesForYou(getCookies: string) {
    
}

export async function illMakeSomeCookiesForYou() {
    
}

export async function Register(email: string, password: string, phone: string, full_name: string){
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

export async function Login(email: string, password: string){
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
            return [null, true];
        }
    } catch (error) {
        conn.end(0);
        return [(error as Error).message, false];
    }
}
