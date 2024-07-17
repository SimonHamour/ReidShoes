import { createHash } from 'crypto';
import mysql, { type RowDataPacket } from 'mysql2/promise'

export async function Register(email: string, password: string, phone: string, full_name: string){
    const conn = await openConn();
    try {
        let hashPass = createHash('sha256').update(password).digest('hex');
        const [result, fields] = await conn.execute(
            'INSERT INTO users VALUES (?, ?, ?, ?, ?, \'\', \'user\', CURTIME())',
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
            await conn.execute(
                'UPDATE userSession SET session_time = current_date() WHERE email = ?'
                ,[email]
            );
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

export async function UpdateProduk(id_produk:string, stok: number) {
    const conn = await openConn();
    try {
        const [result, fields] = await conn.execute(
            'UPDATE produk SET STOK = ? WHERE id_produk = ?',
            [stok, id_produk]
        );
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }
}

export async function UpdateStatusTransaksi(id_transaksi:string, status: string) {
    const conn = await openConn();
    try {
        const [result, fields] = await conn.execute(
            'UPDATE transaksi SET status = ? WHERE id = ?',
            [status, id_transaksi]
        );
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }
}

export async function getAllUser(LIMIT: number, SKIPTO: number | undefined){
    const conn = await openConn();
    try{
        if(undefined === SKIPTO)
            SKIPTO = 0;
        const [rows, fields] = await conn.execute(
            'SELECT ID_User, email, name, phone, role, address, IF(TIMEDIFF(NOW(), last_seen) > (CAST(\'00:00:00\' AS TIME) + INTERVAL 30 MINUTE), "True", "False") AS TIMEDIFF FROM users LIMIT ?, ?',
            [SKIPTO, LIMIT]
        );
        let userInfo: Array<Array<string>> = [];
        for (let index = 0; index < (rows as RowDataPacket).length; index++) {
            let userInfo2: Array<string> = [];
            userInfo2.push((rows as RowDataPacket)[index]?.ID_User ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.email ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.name ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.phone ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.role ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.address ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.TIMEDIFF ?? "");
            userInfo.push(userInfo2);
        }
        conn.end(0);
        return userInfo;
    }catch(err){
        conn.end(0);
        return (err as Error).message;
    }
}

export async function getAllProduk(LIMIT: number, SKIPTO: number | undefined){
    const conn = await openConn();
    try{
        if(undefined === SKIPTO)
            SKIPTO = 0;
        const [rows, fields] = await conn.execute(
            'SELECT * FROM produk LIMIT ?, ?',
            [SKIPTO, LIMIT]
        );
        let userInfo: Array<Array<string>> = [];
        for (let index = 0; index < (rows as RowDataPacket).length; index++) {
            let userInfo2: Array<string> = [];
            userInfo2.push((rows as RowDataPacket)[index]?.id_produk ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.MERK ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.HARGA ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.STOK ?? "");
            userInfo.push(userInfo2);
        }
        conn.end(0);
        return userInfo;
    }catch(err){
        conn.end(0);
        return (err as Error).message;
    }
}

export async function getAllTransaction(LIMIT: number, SKIPTO: number | undefined){
    const conn = await openConn();
    try{
        if(undefined === SKIPTO)
            SKIPTO = 0;
        const [rows, fields] = await conn.execute(
            'SELECT * FROM transaksi LIMIT ?, ?',
            [SKIPTO, LIMIT]
        );
        let userInfo: Array<Array<string>> = [];
        for (let index = 0; index < (rows as RowDataPacket).length; index++) {
            let userInfo2: Array<string> = [];
            userInfo2.push((rows as RowDataPacket)[index]?.id ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.name ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.produk ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.kuantitas ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.harga ?? "");
            userInfo2.push(String((rows as RowDataPacket)[index]?.tanggal).substring(0,15) ?? "");
            userInfo2.push((rows as RowDataPacket)[index]?.status ?? "");
            userInfo.push(userInfo2);
        }
        conn.end(0);
        return userInfo;
    }catch(err){
        conn.end(0);
        return (err as Error).message;
    }
}

export async function getTotalItems() {
    const conn = await openConn();
    try {
        const [row, field] = await conn.execute(
            'SELECT * FROM (SELECT COUNT(*) AS A FROM users) AS A, (SELECT COUNT(*) AS B FROM produk) AS B, (SELECT COUNT(*) AS C FROM transaksi) AS C;'
        );
        const totalItem: number[] = [];
        totalItem.push(Number((row as RowDataPacket)[0].A));
        totalItem.push(Number((row as RowDataPacket)[0].B));
        totalItem.push(Number((row as RowDataPacket)[0].C));
        conn.end(0);
        return totalItem;
    } catch (error) {
        conn.end(0);
        return [0,0,0];
    }
}

export function getHeadAllUsers() {
    const userHead: Array<string> = [];
    userHead.push("ID_User");
    userHead.push("Email");
    userHead.push("Name");
    userHead.push("Phone Number");
    userHead.push("Role");
    userHead.push("Address");
    userHead.push("Status Online/Offline");
    return userHead;
}

export function getHeadAllProduk() {
    const userHead: Array<string> = [];
    userHead.push("id_produk");
    userHead.push("MERK");
    userHead.push("HARGA");
    userHead.push("STOK");
    userHead.push("UPDATE STOK");
    return userHead;
}

export function getHeadAllTransaction(){
    const userHead: Array<string> = [];
    userHead.push("ID Transaksi");
    userHead.push("Nama Pembeli");
    userHead.push("Produk-nya");
    userHead.push("Berapa banyak");
    userHead.push("Total harga");
    userHead.push("Tanggal Transaksi");
    userHead.push("Status");
    userHead.push("Ganti Status");
    return userHead;
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
            arrayOfError.push("USER Session not found");
            return arrayOfError;
        }
        await conn.execute(
            'UPDATE users SET last_seen = CURTIME() WHERE email = ?',
            [email]
        );
        const [row, field] = await conn.execute(
            'SELECT ID_User, name, phone, role, address, IF(TIMEDIFF(NOW(), last_seen) > (CAST(\'00:00:00\' AS TIME) + INTERVAL 30 MINUTE), "True", "False") AS TIMEDIFF FROM users WHERE email = ?',
            [email]
        );
        let ID_User: string = (row as RowDataPacket)[0]?.ID_User ?? null;
        let name: string = (row as RowDataPacket)[0]?.name ?? null;
        let phone: string = (row as RowDataPacket)[0]?.phone ?? null;
        let role: string = (row as RowDataPacket)[0]?.role ?? null;
        let address: string = (row as RowDataPacket)[0]?.address ?? null;
        let stillAlive: string = (row as RowDataPacket)[0]?.TIMEDIFF ?? null;
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
        userInfo.push(stillAlive);
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
        const getTempSession = await whereIsTheCookies(email, undefined);
        if(getTempSession != "Error")
            return getTempSession;
        await conn.execute(
            'INSERT INTO userSession VALUES (?, ?, CURDATE())',
            [uuid, email]
        );
        return uuid;
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
        let SessionId: string = (rows as RowDataPacket)[0]?.sessionid ?? "Error";
        conn.end(0);
        return SessionId;
    } catch (error) {
        conn.end(0);
        return "Error";
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

export async function dataProdukModal(id_produk: string) {
    const conn = await openConn();
    const data: Map<string, string> = new Map();
    try {
        const [result, fields] = await conn.execute(
            'SELECT * FROM produk WHERE id_produk = ?',
            [id_produk]
        );
        data.set("ID_Produk", (result as RowDataPacket)[0].id_produk?? "1");
        data.set("MERK", (result as RowDataPacket)[0].MERK?? "DUMMY SHOES");
        data.set("HARGA", (result as RowDataPacket)[0].HARGA?? "269");
        data.set("STOK", (result as RowDataPacket)[0].STOK?? "1");
        conn.end(0);
        return data;
    } catch (error) {
        conn.end(0);
        data.set("ERROR", (error as Error).message);
        return data;
    }
}