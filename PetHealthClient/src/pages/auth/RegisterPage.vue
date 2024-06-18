<template>
  <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="sign-up-container">
      <h1>Create a new account</h1>
      <form>
        <input type="text" placeholder="User name" />
        <div class="name-inputs">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          @input="validateEmail"
          @blur="validateEmail"
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit" @click="register">Sign up</button>
        <div class="or">------------- Or -------------</div>
        <div class="social-buttons" @click="registerWithGoogle">
          <button class="google-btn"><i class="fab fa-google"></i> Continue with Google</button>
          <button class="facebook-btn" @click="registerWithFacebook">
            <i class="fab fa-facebook-f"></i> Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  </div>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-..."
    crossorigin="anonymous"
  />
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      backgroundImage: null,
      email: '',
      emailError: '',
      password: ''
    }
  },
  
  mounted() {
    import('@/assets/images/background.png')
      .then((image) => {
        this.backgroundImage = image.default
      })
      .catch((error) => {
        console.error('Error loading image:', error)
      })
  },

  methods: {
    validateEmail() {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address';
      } else {
        this.emailError = '';
      }
    },

    register() {
    if (!this.emailError) {
      axios.post('/api/auth/register', {
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
    }
  },

  registerWithGoogle() {
    axios.post('/api/auth/google')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  },

  registerWithFacebook() {
    axios.post('/api/auth/facebook')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  }
}
</script>


