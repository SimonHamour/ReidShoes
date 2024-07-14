<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Penjualan Sepatu</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="admin.css">
</svelte:head>
<script>
import { onMount } from 'svelte';

	/**
	 * @type {(arg0: string) => any}
	 */
let showContent;

onMount(() => {
// TODO: CHART HERE

// @ts-ignore
showContent = (contentId) => {
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        // @ts-ignore
        contents[i].style.display = 'none';
    }
    // @ts-ignore
    document.getElementById('content-' + contentId).style.display = 'block';
}
});
</script>
<div class="container-fluid">
    <div class="row">
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" on:click={showContent('dashboard')}>
                            <span data-feather="home"></span>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" on:click={showContent('produk')}>
                            <span data-feather="file"></span>
                            Produk
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" on:click={showContent('pesanan')}>
                            <span data-feather="shopping-cart"></span>
                            Pesanan
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" on:click={showContent('pelanggan')}>
                            <span data-feather="users"></span>
                            Pelanggan
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user">
                            <span data-feather="users"></span>
                            Lihat Profile
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">
                            <span data-feather="users"></span>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div id="content-dashboard" class="content">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                Total Produk
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">150</h5>
                                <p class="card-text">Jumlah produk yang tersedia.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                Total Pesanan
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">75</h5>
                                <p class="card-text">Jumlah pesanan yang diterima.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                Total Pelanggan
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">50</h5>
                                <p class="card-text">Jumlah pelanggan yang terdaftar.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
            </div>

            <div id="content-produk" class="content" style="display: none;">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Produk</h1>
                </div>
                <p>Daftar produk akan ditampilkan di sini.</p>
            </div>

            <div id="content-pesanan" class="content" style="display: none;">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Pesanan</h1>
                </div>
                <p>Daftar pesanan akan ditampilkan di sini.</p>
            </div>

            <div id="content-pelanggan" class="content" style="display: none;">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Pelanggan</h1>
                </div>
                <p>Daftar pelanggan akan ditampilkan di sini.</p>
            </div>
        </main>
    </div>
</div>