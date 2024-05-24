<template>
  <div id="app">
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="sign-in-container">
        <h1>Sign in</h1>
        <p>New user? <router-link to="/register">Create an account</router-link></p>
        <form>
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Continue</button>
        </form>
        <div class="or">----------Or----------</div>
        <div class="social-login">
          <button class="google-btn">
            <i class="fab fa-google"></i> Continue with Google
          </button>
          <button class="facebook-btn">
            <i class="fab fa-facebook-f"></i> Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-..."
    crossorigin="anonymous"
  />
</template>

<script >
export default {
  data() {
    return {
      backgroundImage: './assets/images/background.png'
    }
  }
}
</script>

<style>
.full-screen-background {
  background-size: cover;
  background-position: center;
  position: fixed;
}
.sign-in-container {
  background-color: #f2f2f2;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  max-width: 400px;
  margin-left: 700px;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type='submit'] {
  background-color: #4285f4;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.or {
  text-align: center;
  margin: 20px 0;
}

.social-login button {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.google-btn {
  background-color: #fff;
  color: #757575;
}

.facebook-btn {
  background-color: #3b5998;
  color: #fff;
}
.social-login button i {
  margin-right: 8px;
}
</style>


