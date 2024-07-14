<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil Pengguna</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 1rem 0;
            text-align: center;
        }
        nav {
            background-color: #444;
            padding: 0.5rem;
            text-align: center;
        }
        nav a {
            color: #fff;
            margin: 0 1rem;
            text-decoration: none;
        }
        .container {
            width: 80%;
            margin: 2rem auto;
            padding: 2rem;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1, h2 {
            text-align: center;
            margin-bottom: 2rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
        }
        .form-group input {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .form-group button {
            padding: 0.5rem 1rem;
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        .track-order {
            text-align: center;
            margin: 2rem 0;
        }
        .track-order input {
            padding: 0.5rem;
            width: 300px;
            max-width: 100%;
        }
        .track-order button {
            padding: 0.5rem 1rem;
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 1rem 0;
        }
    </style>
</svelte:head>

<header>
    <h1>Profil Pengguna</h1>
</header>

<nav>
    <a href="#edit-profile">Edit Profil</a>
    <a href="#track-order">Lacak Pesanan</a>
</nav>

<div class="container">
    <section id="edit-profile">
        <h2>Edit Profil</h2>
        <form id="profile-form" method="post" action="?/editUser">
            <div class="form-group">
                <label for="id">ID USER:</label>
                <input type="text" readonly id="iduser" name="id_user" value={data?.user[0] ?? ""}>
            </div>
            <div class="form-group">
                <label for="name">Nama:</label>
                <input type="text" required id="name" name="name" value={data?.user[2] ?? ""}>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" readonly id="email" name="email" value={data?.user[1] ?? ""}>
            </div>
            <div class="form-group">
                <label for="address">Nomor Telepon:</label>
                <input type="text" required id="phone" name="phone" value={data?.user[3] ?? ""}>
            </div>
            <div class="form-group">
                <label for="address">Alamat:</label>
                <input type="text" required id="address" name="address" value={data?.user[5] ?? ""}>
            </div>
            <div class="form-group">
                <label for="address">Role:</label>
                <input type="text" readonly id="role" name="role" value={data?.user[4] ?? ""}>
            </div>
            <div class="form-group">
                <label for="address">Cureent Password:</label>
                <input type="password" required id="currpass" name="currpass">
                {#if form?.missing}<p class="error">The Re-password field is required</p>{/if}
            </div>
            <div class="form-group">
                <label for="address">Password:</label>
                <input type="password" id="password" name="password">
            </div>
            <div class="form-group">
                <label for="address">Re-Type Password:</label>
                <input type="password" id="repass" name="repass">
                {#if form?.missing}<p class="error">The Re-password field is required</p>{/if}
            </div>
            <div class="form-group">
                <button type="submit">Simpan</button>
            </div>
        </form>
        {#if form?.success}<p class="error">Sukses Edit</p>{/if}
        {#if form?.result}<p class="error">{form.result}</p>{/if}
    </section>

    <section id="track-order">
        <h2>Lacak Pesanan Anda</h2>
        <div class="track-order">
            <input type="text" id="order-id" placeholder="Masukkan ID Pesanan">
            <button on:click={trackOrder}>Lacak</button>
        </div>
        <div id="order-status"></div>
    </section>
</div>

<footer>
    <p>&copy; 2024 REID SHOES. All rights reserved.</p>
</footer>

<script lang="ts">
	import { onMount } from "svelte";
    import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;


    let trackOrder: any = () => {};
    onMount(()=> {
    // @ts-ignore
    trackOrder = () => {
        // @ts-ignore
        var orderId = document.getElementById("order-id").value;
        var orderStatus = document.getElementById("order-status");

        // Logika pelacakan pesanan (simulasi)
        if(orderId === "12345") {
            // @ts-ignore
            orderStatus.innerHTML = "<p>Status Pesanan: Sedang dikirim</p>";
        } else {
            // @ts-ignore
            orderStatus.innerHTML = "<p>ID Pesanan tidak ditemukan</p>";
        }
    } 
    });
</script>

