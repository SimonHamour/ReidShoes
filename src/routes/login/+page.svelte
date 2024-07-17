<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="style1.css">
<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;

	export let form: ActionData;
</script>

<div id="stars"></div>
<div id="stars2"></div>
<div id="stars3"></div>
<div class="section">
  <div class="container">
    <div class="row full-height justify-content-center">
      <div class="col-12 text-center align-self-center py-5">
        <div class="section pb-5 pt-5 pt-sm-3 text-center">
          <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                <label for="reg-log"></label>
          <div class="card-3d-wrap mx-auto">
            <div class="card-3d-wrapper">

                <form action="?/login" method="post" class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3">Log In</h4>
                      <div class="form-group">
                        {#if form?.missing}<p class="error">The email field is required</p>{/if}
                        <input type="email" name="email" value={form?.email ?? ''} required class="form-style" placeholder="Email">
                        <i class="input-icon uil uil-at"></i>
                      </div>	
                      <div class="form-group mt-2">
                        <input type="password" name="password" required class="form-style" placeholder="Password">
                        <i class="input-icon uil uil-lock-alt"></i>
                      </div>
                      {#if form?.successRegis}<p class="error">Register Done, Now Login</p>{/if}
	                    {#if form?.incorrect}<p class="error">Email atau Password Salah!</p>{/if}
                      {#if data?.errorCokkies}<p class="error">{data?.errorCookies}</p>{/if}
                      <button type="submit" class="btn mt-4">Login</button>
                      <p class="mb-0 mt-4 text-center"><a href="" class="link">Forgot your password?</a></p>
                    </div>
                  </div>
                </form>

                <form action="?/register" method="post" class="card-back">
                    <div class="center-wrap">
                        <div class="section text-center">
                            <h4 class="mb-3 pb-3">Sign Up</h4>
                            <div class="form-group">
                                <input type="text" name="full_name" required class="form-style" placeholder="Full Name">
                                <i class="input-icon uil uil-user"></i>
                            </div>	
                            <div class="form-group mt-2">
                                <input type="tel" name="phone" required class="form-style" placeholder="Phone Number">
                                <i class="input-icon uil uil-phone"></i>
                            </div>	
                            <div class="form-group mt-2">
                                <input type="email" name="email" required class="form-style" placeholder="Email">
                                <i class="input-icon uil uil-at"></i>
                            </div>
                            <div class="form-group mt-2">
                                <input type="password" name="password" required class="form-style" placeholder="Password">
                                <i class="input-icon uil uil-lock"></i>
                            </div>
                            {#if form?.error}<p class="error">{form?.error}</p>{/if}
                            <button type="submit" class="btn mt-4">Register</button>
                        </div>
                    </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>