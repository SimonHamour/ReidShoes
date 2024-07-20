<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<link rel="stylesheet" href="style.css">
<script lang="ts">

    import DialogBox from '$lib/DialogBox.svelte';
    import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;
    import { onMount } from 'svelte';
    let bool = (form?.duplicate || form?.error || form?.added) ? true : false;
    let isChecked = false;
    let menuClick: any;
    let next: any;
    let prev: any;
    onMount(()=> {
        let menu = document.querySelector('#menu-bar');
        let navbar = document.querySelector('.navbar');

        menuClick = () =>{
            if(null === menu || null === navbar){
                return;
            }
            menu.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        }

        window.onscroll = () =>{
            if(null === menu || null === navbar){
                return;
            }
            menu.classList.remove('fa-times');
            navbar.classList.remove('active');
        }

        let slides = document.querySelectorAll('.slide-container');
        let index = 0;

        next = () => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
        }

        prev = () => {
        slides[index].classList.remove('active');
        index = (index - 1 + slides.length) % slides.length;
        slides[index].classList.add('active');
        }

        document.querySelectorAll('.featured-image-1').forEach(image_1 =>{
        image_1.addEventListener('click', () =>{
            var src = image_1.getAttribute('src');
            let doc = document.querySelector('.big-image-1');
            if(null === doc) return;
            doc.setAttribute("src", src === null ? "" : src);
        });
        });

        document.querySelectorAll('.featured-image-2').forEach(image_2 =>{
        image_2.addEventListener('click', () =>{
            var src = image_2.getAttribute('src');
            let doc = document.querySelector('.big-image-2');
            if(null === doc) return;
            doc.setAttribute("src", src === null ? "" : src);
        });
        });

        document.querySelectorAll('.featured-image-3').forEach(image_3 =>{
        image_3.addEventListener('click', () =>{
            var src = image_3.getAttribute('src');
            let doc = document.querySelector('.big-image-3');
            if(null === doc) return;
            doc.setAttribute("src", src === null ? "" : src);
        });
        });

        document.addEventListener('DOMContentLoaded', () => {
        const heartButtons = document.querySelectorAll('.fa-heart');

        heartButtons.forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = '/logout';
            });
        });
        });
        
    });
    
</script>
<DialogBox bind:bool message="{(form?.error ? form?.error : (form?.duplicate ? 'Duplikasi: Produk sudah ditambahkan' : (form?.added ? 'Produk ditambahkan' : (data?.error ? data?.error : ''))))}" buttonMessage="Ok">
</DialogBox>
<header>
    <div style="padding: 20px; text-align: center;">
        <label class="switch">
          <input type="checkbox" on:change={() => {
            isChecked = !isChecked;
            const toggleLabel = document.getElementById('toggleLabel');
            const elementsToTranslate = document.querySelectorAll('[data-en]');
        
            if(null !== toggleLabel){
                if (isChecked) {
                    toggleLabel.textContent = 'Indonesian';
                    elementsToTranslate.forEach(el => {
                        console.log("Indonesia");
                        console.log(el);
                        el.textContent = el.getAttribute('data-id');
                    });
                } else {
                    toggleLabel.textContent = 'English';
                    elementsToTranslate.forEach(el => {
                        console.log("English");
                        console.log(el);
                        el.textContent = el.getAttribute('data-en');
                    });
                }
            }
        }} id="languageToggle">
          <span class="slider round"></span>
        </label>
        <span id="toggleLabel">English</span>
      </div>
    <div id="menu-bar" on:click={menuClick} class="fas fa-bars"></div>
    <form action="?/addProduct" method="post" id="addProduct"></form>
    <form action="?/addProduct" method="post" id="addProduct2"></form>

    <a href="#" class="logo">
        <img src="images/logo.png" alt="REID Logo" style="height: 90px; vertical-align: middle;">
        REID SHOES
    </a>

    <nav class="navbar">
        <a href="#home" data-en="home" data-id="home">home</a>
        <a href="#products" data-en="products" data-id="produk">products</a>
        <div class="dropdown">
            <a href="#acara" class="dropbtn" data-en="categories" data-id="kategori">categories</a>
            <div class="dropdown-content">
                <a href="" data-en="Special Occasion" data-id="Acara Spesial">Special Occasion</a>
                <a href="" data-en="Casual" data-id="casual">Casual</a>
                <a href="" data-en="Work Styling" data-id="Styling Kerja">Work Styling</a>
            </div>
        </div>
        <a href="#featured" data-en="featured products" data-id="Produk Terfavorit">featured</a>
        <a href="#review" data-en="reviews" data-id="Ulasan">review</a>
    </nav>

    <div class="icons">
        <a href="/logout" class="fas fa-heart"></a>
        <a href="/order" class="fas fa-shopping-cart"></a>
        {#if !data?.user}<a href="/login" class="fas fa-user"></a>{/if}
        {#if data?.user}<a href="/user" class="fas fa-user"></a>{/if}
    </div>

</header>

<!-- Header Section Ends -->

<!-- Home Section Starts -->

<section class="home" id="home">
    <div class="slide-container active">
        <div class="slide">
            <div class="content">
                <span data-en="Executive Oxford" data-id="Oxford Eksekutif">Executive Oxford</span>
                <h3 data-en="Executive Oxford" data-id="Oxford Eksekutif">Executive Oxford</h3>
                <p data-en="Classic leather oxford shoes with laces for formal events." data-id="Sepatu kulit pantofel klasik dengan tali untuk acara resmi.">Classic leather oxford shoes with laces for formal events.</p>
                <input type="hidden" name="produk" value="1" form="addProduct">
                <button class="btn" type="submit" form="addProduct" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
                <br><br><br>
            </div>
            <div class="image">
                <img src="images/eo3.png" class="shoe">
                <img src="" class="text" alt="">
            </div>
        </div>
    </div>

    <div class="slide-container">
        <div class="slide">
            <div class="content">
                <span data-en="Lingard Black Dress Shoes Men" data-id="Sepatu Dress Black Lingard untuk Pria">Sepatu Dress Black Lingard untuk Pria</span>
                <h3 data-en="Lingard Black Dress Shoes Men" data-id="Sepatu Dress Black Lingard untuk Pria">Lingard Black Dress Shoes Men</h3>
                <p data-en="Minimalist yet still maintaining the essence of classic formal. Reid Lingard Black, your go-to shoe for day and evening." data-id="Minimalis tetapi tetap mengedepankan esensi klasik formal. Reid Lingard Black, sepatu andalan Anda untuk siang dan malam.">Lingard Black Dress Shoes Men</p>
                <input type="hidden" name="produk" value="2" form="addProduct2">
                <button class="btn" type="submit" form="addProduct2" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
                <br><br><br>
            </div>
            <div class="image">
                <img src="images/shoes2.png" class="shoe">
            </div>
        </div>
    </div>

    <div class="slide-container">
        <div class="slide">
            <div class="content">
                <span data-en="UrbanEdge Leather Shoes" data-id="Sepatu Kulit UrbanEdge">UrbanEdge Leather Shoes</span>
                <h3 data-en="UrbanEdge Leather Shoes" data-id="Sepatu Kulit UrbanEdge">UrbanEdge Leather Shoes</h3>
                <p data-en="Shoes with a modern design that are suitable for urban life, but still maintain classic leather elements." data-id="Sepatu dengan desain modern yang cocok untuk kehidupan perkotaan, tetapi tetap mempertahankan unsur-unsur kulit yang klasik.">UrbanEdge Leather Shoes</p>
                <form action="?/addProduct" method="post" id="addProduct3"></form>
                <input type="hidden" name="produk" value="3" form="addProduct3">
                <button class="btn" type="submit" form="addProduct3" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
                <br><br><br>
            </div>
            <div class="image">
                <img src="images/uel.png" class="shoe" alt="">
            </div>
        </div>
    </div>

    <div id="prev" class="fas fa-chevron-left" on:click={prev}></div>
    <div id="next" class="fas fa-chevron-right" on:click={next}></div>

</section>

<!-- Home Section Ends -->

<!-- Service Section Starts -->

<section class="service">

    <div class="box-container">

        <div class="box">
            <i class="fas fa-shipping-fast"></i>
            <h3 data-en="fast delivery" data-id="pengiriman cepat">fast delivery</h3>
            <p data-en="With our fast delivery service, we ensure that your order will be delivered on time." data-id="Dengan layanan pengiriman cepat kami, kami memastikan pesanan Anda akan diterima tepat waktu.">With our fast delivery service, we ensure that your order will be delivered on time</p>
        </div>

        <div class="box">
            <i class="fas fa-undo"></i>
            <h3 data-en="10 days replacements" data-id="10 hari penggantian">10 days replacements</h3>
            <p data-en="With our 10 day replacement policy, we ensure that your order will be delivered on time." data-id="Dengan kebijakan penggantian 10 hari, kami memastikan pesanan Anda akan diterima tepat waktu.">With our 10 day replacement policy, we ensure that your order will be delivered on time.</p>
        </div>
    </div>

</section>

<!-- Service Section Ends -->

<!-- Products Section Starts -->

<section class="products" id="products">

    <h1 data-en="latest products" data-id="Produk terbaru" class="heading"> latest <span>products</span> </h1>

    <div class="box-container">

        <div class="box">

            <img src="images/produk2.png" alt="" style="height: 150px; width: 150px;">
            <div class="content">
                <h3 data-en="Orca Black Derby Shoes" data-id="Sepatu kulit Orca">Orca Black Derby Shoes</h3>
                <div class="price">Rp.259.000 <span>Rp.518.000</span></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <form action="?/addProduct" method="post" id="addProduct4"></form>
                <input type="hidden" name="produk" value="4" form="addProduct4">
                <button class="btn" type="submit" form="addProduct4" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            </div>
        </div>

        <div class="box">

            <img src="images/produk3.png" alt="" style="height: 200px; width: 200px;">
            <div class="content">
                <h3 data-en="Reid oslo black boots shoes man" data-id="Reid oslo sepatu bot hitam pria">Reid oslo black boots shoes man</h3>
                <div class="price">Rp.280.000 <span>Rp.600.000</span></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <form action="?/addProduct" method="post" id="addProduct5"></form>
                <input type="hidden" name="produk" value="5" form="addProduct5">
                <button class="btn" type="submit" form="addProduct5" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            </div>
        </div>

        <div class="box">

            <img src="images/produk4.png" alt="" style="height: 200px; width: 200px;">
            <div class="content">
                <h3 data-en="Archer Suede Tan Loafer Shoes" data-id="Sepatu Pemanah Tan Suede">Archer Suede Tan Loafer Shoes</h3>
                <div class="price">Rp.230.000 <span>Rp.450.000</span></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <form action="?/addProduct" method="post" id="addProduct6"></form>
                <input type="hidden" name="produk" value="6" form="addProduct6">
                <button class="btn" type="submit" form="addProduct6" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            </div>
        </div>

        <div class="box">

            <img src="images/produk5.png" alt="" style="height: 200px; width: 200px;">
            <div class="content">
                <h3 data-en="Reid Daxon Black" data-id="Reid Daxon Hitam">Reid Daxon Black
                </h3>
                <div class="price">Rp.259.000 <span>Rp.525.000</span></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <form action="?/addProduct" method="post" id="addProduct7"></form>
                <input type="hidden" name="produk" value="7" form="addProduct7">
                <button class="btn" type="submit" form="addProduct7" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            </div>
        </div>

        <div class="box">

            <img src="images/produk6.png" alt="" style="height: 200px; width: 200px;">
            <div class="content">
                <h3 data-en="Chelsea Black Boots Shoes" data-id="Sepatu Boots Hitam Chelsea">Chelsea Black Boots Shoes</h3>
                <div class="price">Rp.269.000 <span>Rp.540.000</span></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <form action="?/addProduct" method="post" id="addProduct8"></form>
                <input type="hidden" name="produk" value="8" form="addProduct8">
                <button class="btn" type="submit" form="addProduct8" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            </div>
        </div>

        <div class="box">

            <img src="images/produk7.png" alt="" style="height: 200px; width: 200px;">
            <div class="content">
                <h3 data-en="Cerberus Brown Derby Shoes" data-id="Sepatu Derby Cerberus Coklat">Cerberus Brown Derby Shoes</h3>
                <div class="price">Rp.239.000 <span>Rp.478.000</span></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <form action="?/addProduct" method="post" id="addProduct18"></form>
                <input type="hidden" name="produk" value="18" form="addProduct18">
                <button class="btn" type="submit" form="addProduct18" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            </div>
        </div>

    </div>

</section>

<!-- Products Section Ends -->

<!-- Featured Section Starts -->

<section class="featured" id="featured">

    <h1 class="heading"> <span>featured</span> products </h1>

    <div class="row">

        <div class="image-container">
            <div class="small-image">
                <img src="images/produk1.png" class="featured-image-1" alt="">
                <img src="images/produk1.1.png" class="featured-image-1" alt="">
                <img src="images/produk1.3.png" class="featured-image-1" alt="">
                <img src="images/produk1.4.png" class="featured-image-1" alt="">
            </div>
            <div class="big-image">
                <img src="images/produk1.png" class="big-image-1" alt="">
            </div>
        </div>

        <div class="content">
            <h3 data-en="Lingard Black Dress Shoes Men" data-id="Lingard Sepatu Hitam Pria">Lingard Black Dress Shoes Men</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <p data-en="Minimalist concept yet still maintaining the essence of classic formal. Reid Lingard Black, your go-to shoe for day and evening." data-id="Konsep minimalis dan kesederhanaan namun tetap mengedepankan esensi klasik formal. Reid Lingard Black, sepatu andalan Anda untuk siang dan malam.">Konsep minimalis dan kesederhanaan namun tetap mengedepankan esensi klasik formal. Reid Lingard Black, sepatu andalan Anda untuk siang dan malam.</p>
            <p data-en="-Formal shoes" data-id="-sepatu formal">-sepatu formal</p><p data-en="-Black color" data-id="-warna hitam">-warna hitam</p>
            <div class="price">Rp.240.000 <span data-en="Price: Rp.480.000" data-id="Harga: Rp.480.000">Rp.480.000</span></div>
            <button class="btn" type="submit" form="addProduct2" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            <br><br><br>

        </div>
    </div>

    <div class="row">

        <div class="image-container">
            <div class="small-image">
                <img src="images/eo.png" class="featured-image-2" alt="">
                <img src="images/eo1.png" class="featured-image-2" alt="">
                <img src="images/eo2.png" class="featured-image-2" alt="">
                <img src="images/eo3.png" class="featured-image-2" alt="">
            </div>
            <div class="big-image">
                <img src="images/eo.png" class="big-image-2" alt="">
            </div>
        </div>

        <div class="content">
            <h3 data-en="Executive Oxford" data-id="Oxford Eksekutif">Executive Oxford</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <p data-en="Classic leather oxford shoes with laces for formal events. Modern design with semi leather upper." data-id="Sepatu kulit pantofel klasik dengan tali untuk acara resmi.Desain modern dengan tali pada bagian atas yang berupa leather semi.">Sepatu Kulit Pantofel Klasik Dengan Tali Untuk Acara Resmi. Modern design dengan tali pada bagian atas yang berupa leather semi.</p>
            <p data-en="- Ankle Boots Shoes" data-id="-sepatu tepung kaki">-sepatu tempurung kaki</p>
            <p data-en="- Modern Design" data-id="-desain modern">-desain modern</p>    
            <p data-en="- Upper Semi Leather" data-id="-punggung semi kulit">-punggung semi kulit</p>
            <div class="price">Rp.239.000 <span data-en="Price: Rp.496.000" data-id="Harga: Rp.496.000">Rp.496.000</span></div>
            <button class="btn" type="submit" form="addProduct1" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            <br><br><br>

        </div>

    </div>

    <div class="row">

        <div class="image-container">
            <div class="small-image">
                <img src="images/uel.png" class="featured-image-3" alt="">
                <img src="images/uel1.png" class="featured-image-3" alt="">
                <img src="images/uel2.png" class="featured-image-3" alt="">
                <img src="images/uel3.png" class="featured-image-3" alt="">
            </div>
            <div class="big-image">
                <img src="images/uel2.png" class="big-image-3" alt="">
            </div>
        </div>

        <div class="content">
            <h3 data-en="UrbanEdge Leather Shoes" data-id="Sepatu Kulit UrbanEdge">UrbanEdge Leather Shoes</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <p data-en="Shoes with a modern design that are suitable for urban life, but still maintain classic leather elements." data-id="Sepatu dengan desain modern yang cocok untuk kehidupan perkotaan, tetapi tetap mempertahankan unsur-unsur kulit yang klasik.">Sepatu Dengan Desain Modern Yang Cocok Untuk Kehidupan Perkotaan, Tetapi Tetap Mempertahankan Unsur-Unsur Kulit Yang Klasik.</p>
            <p data-en="- Dress Shoes" data-id="-Sepatu Dress">- Dress Shoes</p>
            <p data-en="- Upper Leather" data-id="-Punggung Kulit">- Upper Leather</p>
            <p data-en="- Color Black" data-id="-Warna Hitam">- Color Hitam</p>
            <div class="price">Rp.250.000 <span data-en="Price: Rp.495.000" data-id="Harga: Rp.495.000">Rp.495.000</span></div>
            <button class="btn" type="submit" form="addProduct3" data-en="add to cart" data-id="tambah ke keranjang">add to cart</button>
            <br><br><br>

        </div>

    </div>

</section>

<!-- Featured Section Ends -->

<!-- Review Section Starts -->

<section class="review" id="review">

    <h1 class="heading"> customer <span>review</span> </h1>

    <div class="box-container">

        <div class="box">
            <i class="fas fa-quote-left"></i>
            <div class="user">
                <img src="images/pic-1.png" alt="">
                <h3>john deo</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
        </div>

        <div class="box">
            <i class="fas fa-quote-left"></i>
            <div class="user">
                <img src="images/pic-2.png" alt="">
                <h3>john deo</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
        </div>

        <div class="box">
            <i class="fas fa-quote-left"></i>
            <div class="user">
                <img src="images/pic-3.png" alt="">
                <h3>john deo</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
        </div>

    </div>

</section>

<!-- Review Section Ends -->

<!-- Footer Section Starts -->

<section class="footer">

    <div class="box-container">

        <div class="box">
            <h3>our stores</h3>
            <a href="#">Jakarta</a>
            <a href="#">Bogor</a>
            <a href="#">Depok</a>
            <a href="#">Tangerang</a>
            <a href="#">Bekasi</a>
        </div>

        <div class="box">
            <h3>quick links</h3>
            <a href="#home">home</a>
            <a href="#products">products</a>
            <a href="#featured">featured</a>
            <a href="#review">review</a>
        </div>

        {#if (data?.user !== undefined)}
            <div class="box">
                <h3>extra links</h3>
                <a href="#">my account</a>
                <a href="#">my order</a>
                <a href="#">my favorite</a>
            </div>
        {/if}
        <div class="box">
            <h3>follow us</h3>
            <a href="#">facebook</a>
            <a href="#">twitter</a>
            <a href="#">instagram</a>
        </div>
    
    </div>
    
    <div class="credit">created by <span>REID SHOES</span> | all rights reserved!</div>
    
    </section>
    
    <!-- Footer Section Ends -->
    
