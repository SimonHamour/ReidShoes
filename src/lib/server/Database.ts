import { createHash } from 'crypto';
import mysql, { type RowDataPacket } from 'mysql2/promise'

export async function Register(email: string, password: string, phone: string, full_name: string){
    const conn = await openConn();
    try {
        let hashPass = createHash('sha256').update(password).digest('hex');
        const [result, fields] = await conn.execute(
            'INSERT INTO users VALUES (?, ?, ?, ?, ?, \'\', \'user\')',
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
            return [null, false];
        }
    } catch (error) {
        conn.end(0);
        return [(error as Error).message, false];
    }
}

async function checkUser(id_user: string, password: string){
    const conn = await openConn();
    try {
        let hashPass = createHash('sha256').update(password).digest('hex');
        const [rows, fields] = await conn.execute(
            'SELECT password FROM users WHERE ID_User = ?',
            [id_user]
        );
        let getPassword: string = (rows as RowDataPacket)[0]?.password ?? "";
        if(hashPass == getPassword){
            conn.end(0);
            return ["", true];
        }else{
            conn.end(0);
            return ["", false];
        }
    } catch (error) {
        conn.end(0);
        return [(error as Error).message, false];
    }
}

export async function Update(id_user: string, current_password: string, address: string, phone: string, full_name: string, password: string | undefined){
    const conn = await openConn();
    try {
        let hashPass: string = "";
        if(undefined !== password)
            hashPass = createHash('sha256').update(password).digest('hex');
        const [error, isCurPass] = await checkUser(id_user, current_password);
        if(null !== error)
            if(isCurPass != true && error == "")
                return "Error: Password is wrong";
            else if(typeof error === 'string' && error != "")
                return error;
        if(password !== undefined){
            const [result, fields] = await conn.execute(
                'UPDATE users SET password = ?, name = ?, phone = ?, address = ? WHERE ID_User = ?',
                [hashPass, full_name, phone, address, id_user]
            );
        }else{
            const [result, fields] = await conn.execute(
                'UPDATE users SET name = ?, phone = ?, address = ? WHERE ID_User = ?',
                [full_name, phone, address, id_user]
            );
        }
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }
}

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
    const conn = await openConn();
    let arrayOfError: Array<string> = [];
    try {
        if([''].includes(getCookies)){
            conn.end(0);
            arrayOfError.push("Error");
            arrayOfError.push("No Session is detected");
            return arrayOfError;
        }
        const [rows, fields] = await conn.execute(
            'SELECT email FROM userSession WHERE sessionId = ?',
            [getCookies]
        );
        let email: string = (rows as RowDataPacket)[0]?.email ?? null;
        if(null === email){
            conn.end(0);
            arrayOfError.push("Error");
            arrayOfError.push("Session not found");
            return arrayOfError;
        }
        const [row, field] = await conn.execute(
            'SELECT ID_User, name, phone, role, address FROM users WHERE email = ?',
            [email]
        );
        let ID_User: string = (row as RowDataPacket)[0]?.ID_User ?? null;
        let name: string = (row as RowDataPacket)[0]?.name ?? null;
        let phone: string = (row as RowDataPacket)[0]?.phone ?? null;
        let role: string = (row as RowDataPacket)[0]?.role ?? null;
        let address: string = (row as RowDataPacket)[0]?.address ?? null;
        if(null === ID_User){
            conn.end(0);
            arrayOfError.push("Error");
            arrayOfError.push("User not found");
            return arrayOfError;
        }
        conn.end(0);
        let userInfo: Array<string> = [];
        userInfo.push(ID_User);
        userInfo.push(email);
        userInfo.push(name);
        userInfo.push(phone);
        userInfo.push(role);
        userInfo.push(address);
        return userInfo;
    } catch (error) {
        conn.end(0);
        arrayOfError.push("Error");
        arrayOfError.push((error as Error).message);
        return arrayOfError;
    }
}

export async function illMakeSomeCookiesForYou(uuid: string, email: string) {
    const conn = await openConn();
    try {
        const [result, fields] = await conn.execute(
            'INSERT INTO userSession VALUES (?, ?, CURDATE())',
            [uuid, email]
        );
        conn.end(0);
        return whereIsTheCookies(email, conn);
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }
}

export async function whereIsTheCookies(email: string, conn: mysql.Connection | undefined) {
    if(undefined === conn) conn = await openConn();
    try {
        const [rows, fields] = await conn.execute(
            'SELECT sessionid FROM userSession WHERE email = ?',
            [email]
        );
        let SessionId: string = (rows as RowDataPacket)[0]?.sessionid ?? null;
        conn.end(0);
        return SessionId;
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }
}

export async function iAteTheCookies(uuid: string) {
    const conn = await openConn();
    try {
        const [result, fields] = await conn.execute(
            'DELETE FROM userSession WHERE sessionid = ?',
            [uuid]
        );
        conn.end(0);
        return [null, result];
    } catch (error) {
        conn.end(0);
        return [(error as Error).message, null];
    }
}