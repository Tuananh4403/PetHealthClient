<template>
  <div id="app">
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="sign-in-container">
        <h1>Sign in</h1>
        <p>New user? <router-link to="/register">Create an account</router-link></p>
        <form @submit.prevent="login">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            @input="validateEmail"
            @blur="validateEmail"
          />
          <p v-if="emailError" class="error">{{ emailError }}</p>
          <input v-model="password" type="password" placeholder="Password" />
          <button @click="handleLogin" type="submit">Login</button>
        </form>
        <div class="or">----------Or----------</div>
        <div class="social-buttons">
          <button class="google-btn" @click="loginWithGoogle">
            <i class="fab fa-google"></i> Login with Google
          </button>
          <button class="facebook-btn" @click="loginWithFacebook">
            <i class="fab fa-facebook-f"></i> Login with Facebook
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
import axios from 'axios'
import Cookies from 'js-cookie'
// import { useRouter } from 'vue-router';

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
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address'
      } else {
        this.emailError = ''
      }
    },
    async handleLogin() {
      try {
        let data = JSON.stringify({
          username: 'tes5',
          password: '123'
        })

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:4000/api/auth/authenticate',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        }

        const response = await axios.request(config)
        Cookies.set('auth_token', response.data.token, { expires: 7 })
        const router = this.$router
        router.push('/main') // Redirect to the main page
      } catch (error) {
        console.error(error)
      }
    },

    loginWithGoogle() {
      axios
        .post('/api/auth/google')
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    loginWithFacebook() {
      axios
        .post('/api/auth/facebook')
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>



