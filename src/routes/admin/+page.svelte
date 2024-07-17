<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Penjualan Sepatu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="admin.css">
</svelte:head>

<div class="w-screen h-screen overflow-auto flex flex-row relative gap-1">
    
        <nav class="fixed sm:relative z-10 flex flex-col h-screen overflow-hidden items-center justify-center min-w-[240px] font-sans text-base font-normal text-gray-700">
            <div class="w-full h-full">
                <dh-component>
                    <div class="flex flex-no-wrap h-full">
                        <!-- Sidebar starts -->
                        <!-- Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] -->
                        <div class=" min-h-full w-72 relative bg-gray-800 shadow flex-col justify-between hidden sm:flex">
                            <div class="px-8">
                                <div class="mt-10 h-16 w-full flex items-center">
                                    <img src="images/logo.png" alt="Udin">
                                </div>
                                <ul class="mt-12">
                                    <!-- svelte-ignore a11y-missing-attribute -->
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <li class="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent('dashboard')} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grid" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                                                <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                                                <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                                                <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                                            </svg>
                                            <span class="text-sm ml-2">Dashboard</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent('produk')} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
                                            </svg>
                                            <span class="text-sm ml-2">Products</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent('pesanan')} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-compass" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                                                <circle cx="12" cy="12" r="9"></circle>
                                            </svg>
                                            <span class="text-sm ml-2">Pesanan</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent('pelanggan')} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
                                            </svg>
                                            <span class="text-sm ml-2">Customer</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-8 border-t border-gray-700">
                                <ul class="w-full flex items-center justify-between bg-gray-800">
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="show notifications" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                                                <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                                            </svg>
                                        </button>
                                    </li>
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="open chats" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-messages" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
                                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
                                            </svg>
                                        </button>
                                    </li>
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="open settings" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </button>
                                    </li>
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="open logs" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-archive" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <rect x="3" y="4" width="18" height="4" rx="2"></rect>
                                                <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"></path>
                                                <line x1="10" y1="12" x2="14" y2="12"></line>
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-64 relative bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out" id="mobile-nav">
                            <button aria-label="toggle sidebar" id="openSideBar" class="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800" on:click={sidebarHandler(true)}>
                                <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-adjustments" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="6" cy="10" r="2" />
                                    <line x1="6" y1="4" x2="6" y2="8" />
                                    <line x1="6" y1="12" x2="6" y2="20" />
                                    <circle cx="12" cy="16" r="2" />
                                    <line x1="12" y1="4" x2="12" y2="14" />
                                    <line x1="12" y1="18" x2="12" y2="20" />
                                    <circle cx="18" cy="7" r="2" />
                                    <line x1="18" y1="4" x2="18" y2="5" />
                                    <line x1="18" y1="9" x2="18" y2="20" />
                                </svg>
                            </button>
                            <button aria-label="Close sidebar" id="closeSideBar" class="hidden h-10 w-10 bg-gray-800 absolute left-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white" on:click={sidebarHandler(false)}>
                                <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                            <div class="px-8">
                                <div class="mt-10 h-16 w-full flex items-center">
                                    <img src="images/logo.png" alt="Udin">
                                </div>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <ul class="mt-12">
                                    <li class="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent("dashboard")} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grid" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                                                <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                                                <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                                                <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                                            </svg>
                                            <span class="text-sm ml-2">Dashboard</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent('produk')} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
                                            </svg>
                                            <span class="text-sm ml-2">Products</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent('pesanan')} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-compass" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                                                <circle cx="12" cy="12" r="9"></circle>
                                            </svg>
                                            <span class="text-sm ml-2">Pesanan</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                                        <a on:click={showContent("pelanggan")} class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
                                            </svg>
                                            <span class="text-sm ml-2">Customer</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-8 border-t border-gray-700">
                                <ul class="w-full flex items-center justify-between bg-gray-800">
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="show notifications" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                                                <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                                            </svg>
                                        </button>
                                    </li>
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                       <button aria-label="open chats" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                           <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-messages" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                               <path stroke="none" d="M0 0h24v24H0z"></path>
                                               <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
                                               <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
                                           </svg>
                                       </button>
                                    </li>
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="open settings" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </button>
                                    </li>
                                    <li class="cursor-pointer text-white pt-5 pb-3">
                                        <button aria-label="open logs" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-archive" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <rect x="3" y="4" width="18" height="4" rx="2"></rect>
                                                <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"></path>
                                                <line x1="10" y1="12" x2="14" y2="12"></line>
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Sidebar ends -->
                    </div>
                </dh-component>
            </div>
        </nav>

        <main class="relative flex flex-col bg-gray-900 h-screen overflow-auto w-full p-4 shadow-xl shadow-blue-gray-900/5"> 
            <div id="content-dashboard" class="content">
                <div class="flex flex-col gap-3 justify-between items-center relative w-full h-fit bg-transparent shadow-xl shadow-blue-gray-900/5 rounded-xl">
                    <div class="flex flex-col sm:flex-row gap-3 justify-between items-center w-full h-fit bg-transparent rounded-xl">
                        
                            <div class="max-w-sm rounded overflow-hidden bg-slate-200 shadow-lg">
                                <div class=" items-center whitespace-nowrap font-bold text-xl uppercase m-2 p-2 w-full h-fit bg-slate-500 rounded-lg ">
                                    Total Produk
                                </div>
                                <div class="px-6 py-4">
                                    <div class="font-bold text-blue-600 text-xl mb-2">150</div>
                                    <p class="text-gray-500 text-base">
                                        Jumlah produk yang tersedia.
                                    </p>
                                </div>
                            </div>
    
                            <div class="max-w-sm rounded overflow-hidden bg-slate-200 shadow-lg">
                                <div class=" items-center whitespace-nowrap font-bold text-xl uppercase m-2 p-2 w-full h-fit bg-slate-500 rounded-lg ">
                                    Total Pesanan
                                </div>
                                <div class="px-6 py-4">
                                    <div class="font-bold text-blue-600 text-xl mb-2">75</div>
                                    <p class="text-gray-500 text-base">
                                        Jumlah pesanan yang diterima.
                                    </p>
                                </div>
                            </div>
    
                            <div class="max-w-sm rounded overflow-hidden bg-slate-200 shadow-lg">
                                <div class=" items-center whitespace-nowrap font-bold text-xl uppercase m-2 p-2 w-full h-fit bg-slate-500 rounded-lg ">
                                    Total Pelanggan
                                </div>
                                <div class="px-6 py-4">
                                    <div class="font-bold text-blue-600 text-xl mb-2">50</div>
                                    <p class="text-gray-500 text-base">
                                        Jumlah pelanggan yang terdaftar.
                                    </p>
                                </div>
                            </div>
    
                    </div>
                    <div class="relative w-full flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div class="pt-6 px-2 pb-0">
                        <div id="line-chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- TODO: MAKE THE CUSTOMER PAGE PRETTIER -->
            <div id="content-pelanggan" class="content" style="display: none;">
                <div class=" flex flex-col justify-between items-center w-full h-full">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg gap-3 flex flex-col sm:flex-row w-full bg-white h-full justify-center items-center">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr class="text-left">
                                    {#each (data?.userHead ?? []) as user}
                                        <th scope="col" class=" whitespace-nowrap px-6 py-3">
                                            {user}
                                        </th>
                                    {/each}
                                </tr>
                            </thead>
                            <tbody>
                                {#each (data?.users ?? []) as users}
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {#each users as user}
                                        <td class="truncate -> px-6 py-4">
                                            {user === "False" ? "Online" : (user === "True" ? "Offline" : user)}
                                        </td>
                                    {/each}
                                </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center gap-4 w-full rounded-xl mt-3 justify-center  bg-white">
                        <a href="/admin?limit={pageSize}&skip={pageSize * (current_page-1 == 0 ? 1 : current_page-1)}"
                          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            aria-hidden="true" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                          </svg>
                          Previous
                        </a>
                        <div class="flex items-center gap-2">
                            {#each Array(totalPages) as _, idx}
                            <a href="/admin?limit={pageSize}&skip={pageSize * idx}&current={page_now}"
                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg {current_page === idx ? 'bg-gray-900' : 'bg-slate-600'} text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {idx + 1}
                                </span>
                            </a>
                            {/each}
                        </div>
                        <a href="/admin?limit={pageSize}&skip={pageSize * (current_page+1 > totalPages ? totalPages : current_page+1)}"
                          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button">
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            aria-hidden="true" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                          </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div id="content-produk" class="content" style="display: none;">
                <div class=" flex flex-col justify-between items-center w-full h-full">
                    <div class="relative overflow-auto shadow-md sm:rounded-lg gap-3 flex flex-col sm:flex-row w-full bg-white h-full justify-center items-center">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr class="text-left">
                                    {#each (data?.productHead ?? []) as product}
                                        <th scope="col" class=" whitespace-nowrap px-6 py-3">
                                            {product}
                                        </th>
                                    {/each}
                                </tr>
                            </thead>
                            <tbody>
                                {#each (data?.products ?? []) as products, idxx}
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <form action="?/editStok&current={page_now}" method="post" id="{String(idxx)}"></form>
                                        {#each products as product, idx}
                                            <td class="truncate -> px-6 py-4">
                                                {#if idx != 3}
                                                    {product}
                                                    <input type="hidden" name="{String(idx)}" value={product} form="{String(idxx)}">
                                                {:else}
                                                    <input min="0" max="100000" type="number" name="{String(idx)}" id="" form="{String(idxx)}" value={product}>
                                                {/if}
                                            </td>
                                        {/each}
                                        <td class="px-6 py-4">
                                            <button class="relative" type="submit" form="{String(idxx)}">
                                                <span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                                <span class="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">Submit Stok</span>
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="flex items-center gap-4 w-full rounded-xl mt-3 justify-center  bg-white">
                        <a href="/admin?limit={pageSize}&skip={pageSize * (current_pageProduct-1 == 0 ? 1 : current_pageProduct-1)}"
                          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            aria-hidden="true" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                          </svg>
                          Previous
                        </a>
                        <div class="flex items-center gap-2">
                            {#each Array(totalPagesProduct) as _, idx}
                            <a href="/admin?limit={pageSize}&skip={pageSize * idx}&current={page_now}"
                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg {current_pageProduct === idx ? 'bg-gray-900' : 'bg-slate-600'} text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {idx + 1}
                                </span>
                            </a>
                            {/each}
                        </div>
                        <a href="/admin?limit={pageSize}&skip={pageSize * (current_pageProduct+1 > totalPagesProduct ? totalPagesProduct : current_pageProduct+1)}"
                          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button">
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            aria-hidden="true" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                          </svg>
                        </a>
                    </div>
                </div>
            </div> 

            <!-- TODO: MASIH BLM BISA UPDATE STATUS PEMESANAN
            TODO: MEMPECANTIK TABLE-NYA -->
            <div id="content-pesanan" class="content" style="display: none;">
                <div class=" flex flex-col justify-between items-center w-full h-full">
                    <div class="relative overflow-auto w-full shadow-md sm:rounded-lg gap-3 flex flex-col sm:flex-row w-full bg-white h-full justify-center items-center">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs overflow-auto w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr class="text-left">
                                    {#each (data?.pesananHead ?? []) as pesanan}
                                        <th scope="col" class=" px-6 py-3">
                                            {pesanan}
                                        </th>
                                    {/each}
                                </tr>
                            </thead>
                            <tbody>
                                {#each (data?.pesanan ?? []) as p, idxx}
                                    <tr class="bg-white overflow-auto w-full border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <form action="?/editStatus&current={page_now}" method="post" id="i{String(idxx)}"></form>
                                        {#each p as p, idx}
                                            <td class="truncate px-6 py-4">
                                                {#if idx != 6}
                                                    {p}
                                                    <input type="hidden" name="i{String(idx)}" value={p} form="i{String(idxx)}">
                                                {:else}
                                                    <input type="text" class="w-auto sm:-mx-2" maxlength="10" name="i{String(idx)}" id="" form="i{String(idxx)}" value={p}>
                                                {/if}
                                            </td>
                                        {/each}
                                        <td class="truncate px-6 py-4">
                                            <button class="relative" type="submit" form="i{String(idxx)}">
                                                <span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                                <span class="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">Update Status</span>
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="flex items-center gap-4 w-full rounded-xl mt-3 justify-center  bg-white">
                        {#if current_pagePesanan-1 > 0}
                            <a href="/admin?limit={pageSize}&skip={pageSize * (current_pagePesanan-1 == 0 ? 1 : current_pagePesanan-1)}"
                                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                aria-hidden="true" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                                </svg>
                                Previous
                            </a>
                        {/if}
                        <div class="flex items-center gap-2">
                            {#each Array(totalPagesPesanan) as _, idx}
                            <a href="/admin?limit={pageSize}&skip={pageSize * idx}&current={page_now}"
                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg {current_pagePesanan === idx ? 'bg-gray-900' : 'bg-slate-600'} text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {idx + 1}
                                </span>
                            </a>
                            {/each}
                        </div>
                        <a style="{(current_page == 0 ? 1 : current_page)+1 > totalPagesPesanan ? 'pointer-events: none;' : ''}" href="/admin?limit={pageSize}&skip={pageSize * (current_pagePesanan+1 > totalPagesPesanan ? totalPagesPesanan : current_pagePesanan+1)}"
                            class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                              aria-hidden="true" class="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                            </svg>
                          </a>
                    </div>
                </div>
            </div>
        </main>
</div>

<script lang="ts">
import { onMount } from 'svelte'
import { page } from '$app/stores'
import type { PageData, ActionData } from './$types';
export let data: PageData;
export let form: ActionData;
let showContent: (contentId: string) => void;
const chartConfig = {
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  chart: {
    type: "line",
    height: 240,
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#020617"],
  stroke: {
    lineCap: "round",
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    labels: {
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};
let sidebarHandler: any;
let page_now = data?.current === null ? "dashboard" : data?.current;
onMount(() => {
    import('https://cdn.jsdelivr.net/npm/apexcharts').then(() => {
        const chart = new ApexCharts(document.querySelector("#line-chart"), chartConfig);
        chart.render();
  });
    showContent = (contentId: string) => {
        let contents = document.getElementsByClassName('content');
        for (var i = 0; i < contents.length; i++) {
            
            (contents[i] as HTMLElement).style.display = 'none';
        }
        let checkNull = document.getElementById('content-' + contentId);
        if(null !== checkNull)
            checkNull.style.display = 'block';
        page_now = contentId;
    }
    showContent(page_now ?? "dashboard");
    var sideBar = document.getElementById("mobile-nav") ?? new HTMLElement;
    var openSidebar = document.getElementById("openSideBar") ?? new HTMLElement;
    var closeSidebar = document.getElementById("closeSideBar") ?? new HTMLElement;
    sideBar.style.transform = "translateX(-260px)";
    
    sidebarHandler = (flag: any) => {
        if (flag) {
            sideBar.style.transform = "translateX(0px)";
            openSidebar.classList.add("hidden");
            closeSidebar.classList.remove("hidden");
        } else {
            sideBar.style.transform = "translateX(-260px)";
            closeSidebar.classList.add("hidden");
            openSidebar.classList.remove("hidden");
        }
    }
});

let pageSize = 10;
$: totalItems = (data?.users ?? []).length ?? 0;
$: totalPages = Math.ceil(totalItems / pageSize);
$: current_page = (Number($page.url.searchParams.get('skip')) || 0) / pageSize;

$: totalItemsProduct = (data?.products ?? []).length ?? 0;
$: totalPagesProduct = Math.ceil(totalItemsProduct / pageSize);
$: current_pageProduct = (Number($page.url.searchParams.get('skip')) || 0) / pageSize;

$: totalItemsPesanan = (data?.pesanan ?? []).length ?? 0;
$: totalPagesPesanan = Math.ceil(totalItemsPesanan / pageSize);
$: current_pagePesanan = (Number($page.url.searchParams.get('skip')) || 0) / pageSize;

</script>
