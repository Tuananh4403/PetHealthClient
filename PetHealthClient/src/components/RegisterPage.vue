<template>
  <div class="signup-container">
    <h1>Create an account</h1>
    <div class="text">
      <p><b>Sign up with email</b></p>
      <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
    </div>
    <form>
      <input type="email" placeholder="Email address" />
      <input type="password" placeholder="Password" />
      <button type="submit" class="btn">Continue</button>
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
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-..."
    crossorigin="anonymous"
  />
</template>
<style>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f2f2f2;
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
  background-color: #fff;
  color: #757575;
}

</style>