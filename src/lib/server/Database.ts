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

export async function insertCart(id_produk: number, id_user: string) {
    const conn = await openConn();
    try {
        //Create new cart
        const [tempRes, fields] = await conn.execute(
            'SELECT id_keranjang FROM keranjang WHERE id_user = ?',
            [id_user]
        );
        const sayapKanan = (tempRes as RowDataPacket)[0]?.id_keranjang ?? 0;
        if(sayapKanan != 0){
            const [tempRes2, fields] = await conn.execute(
                'SELECT * FROM (SELECT * FROM keranjang GROUP BY id_keranjang) temp WHERE id_keranjang NOT IN (SELECT produk FROM transaksi t WHERE t.produk = temp.id_keranjang);'
            );
            const [tempRes3, fields2] = await conn.execute(
                'SELECT id_produk FROM keranjang WHERE id_keranjang = ? GROUP BY id_produk HAVING COUNT(*) = 1;',
                [sayapKanan]
            );
            const keduaSayap = (tempRes3 as RowDataPacket)[0]?.id_produk ?? 0;
            if(keduaSayap == id_produk){
                conn.end(0);
                return "Duplicate";
            }
            if((tempRes2 as RowDataPacket)[0].id_keranjang){
                const id = (tempRes2 as RowDataPacket)[0].id_keranjang;
                await conn.execute(
                    'INSERT INTO keranjang VALUES (?, ?, ?)',
                    [id, id_produk, id_user]
                );
                conn.end(0);
                return "True";
            }
        }
        await conn.execute(
            'INSERT INTO keranjang VALUES (?, ?, ?)',
            [Math.floor(Math.random()*999999) + 100000, id_produk, id_user]
        );
        conn.end(0);
        return "True";
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }finally{
        conn.end(0);
    }
}

export async function getIdCart(id_user: string) {
    const conn = await openConn();
    try {
        //Create new cart
        const [tempRes, fields] = await conn.execute(
            'SELECT id_keranjang FROM keranjang WHERE id_user = ?',
            [id_user]
        );
        if((tempRes as RowDataPacket)[0]){
            const [tempRes2, fields] = await conn.execute(
                'SELECT * FROM (SELECT * FROM keranjang GROUP BY id_keranjang) temp WHERE id_keranjang NOT IN (SELECT produk FROM transaksi t WHERE t.produk = temp.id_keranjang);'
            );
            if((tempRes2 as RowDataPacket)[0]){
                const id = (tempRes2 as RowDataPacket)[0].id_keranjang;
                conn.end(0);
                return Number(id);
            }
        }
        conn.end(0);
        return "404";
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    } finally{
        conn.end(0);
    }
}

export async function getCart(id_user: string) {
    const conn = await openConn();
    const results: Array<Array<string>> = [];
    try {
        //Create new cart
        const [tempRes, fields] = await conn.execute(
            'SELECT id_keranjang FROM keranjang WHERE id_user = ?',
            [id_user]
        );
        const sayapKanan = (tempRes as RowDataPacket)[0]?.id_keranjang ?? 0;
        if(sayapKanan != 0){
            const [tempRes2, fields] = await conn.execute(
                'SELECT p.* FROM (SELECT id_produk FROM keranjang temp WHERE id_keranjang NOT IN (SELECT produk FROM transaksi t WHERE t.produk)) joinan LEFT JOIN produk p ON joinan.id_produk = p.id_produk;'
            );
            if((tempRes2 as RowDataPacket)[0]){
                for (let index = 0; index < (tempRes2 as RowDataPacket).length; index++) {
                    const duniaFana: Array<string> = [];
                    duniaFana.push((tempRes2 as RowDataPacket)[index].id_produk);
                    duniaFana.push((tempRes2 as RowDataPacket)[index].MERK);
                    duniaFana.push((tempRes2 as RowDataPacket)[index].HARGA);
                    duniaFana.push((tempRes2 as RowDataPacket)[index].STOK);
                    duniaFana.push((tempRes2 as RowDataPacket)[index].images);
                    results.push(duniaFana);
                }
                conn.end(0);
                return results;
            }
        }
        conn.end(0);
        return "404";
    } catch (error) {
        conn.end(0);
        return (error as Error).message;
    }   finally{
        conn.end(0);
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
    userHead.push("ID Keranjangx");
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

// async function openConn(): Promise<mysql.Connection>{
//         return await mysql.createConnection({
//             host: 'bqq.h.filess.io',
//             port: 3305,
//             user: 'udinsedunia_personalit',
//             password: '8bd3075b30081354c099b1bcbac62409d5847632',
//             database: 'udinsedunia_personalit',
//           });
//     }

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
    }finally{
        conn.end(0);
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

export async function setMidtrans(id_keranjang: number, token: string) {
    const conn = await openConn();
    try {
        await conn.execute(
            'INSERT INTO midtrans (token, id_keranjang) VALUES (?, ?)',
            [token, id_keranjang]
        );
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message
    }finally{
        conn.end(0);
    }
}

export async function setMidtransStatus(id_keranjang: number, status: string) {
    const conn = await openConn();
    try {
        await conn.execute(
            'UPDATE midtrans SET status = ? WHERE id_keranjang = ?',
            [status, id_keranjang]
        );
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message
    }finally{
        conn.end(0);
    }
}

export async function setTransaksi(id_keranjang: number, name: string, totalAmm: number, total: number) {
    const conn = await openConn();
    try {
        await conn.execute(
            'INSERT INTO transaksi (name, produk, kuantitas, harga) VALUES (?, ?, ?, ?)',
            [name, id_keranjang, totalAmm, total]
        );
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message
    }finally{
        conn.end(0);
    }
}

export async function searchBarang(name: string) {
    const conn = await openConn();
    try {
        const [rows, field] = await conn.execute(
            "SELECT * FROM transaksi WHERE name = ? AND status != 'Success';",
            [name]
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
    } catch (error) {
        conn.end(0);
        return (error as Error).message
    }finally{
        conn.end(0);
    }
}

export async function removeProdukKeranjang(id_keranjang: number, id_produk: number) {
    const conn = await openConn();
    try {
        await conn.execute(
            'DELETE FROM keranjang WHERE id_keranjang = ? AND id_produk = ?',
            [id_keranjang, id_produk]
        );
        conn.end(0);
        return "Success";
    } catch (error) {
        conn.end(0);
        return (error as Error).message
    }finally{
        conn.end(0);
    }
}