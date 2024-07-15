<template>
  <div id="app">
    <div class="header">
      <img src="@/assets/images/Logo.png" alt="Logo" class="logo" />
      <div class="contact-info">
        <img src="@/assets/images/phone.png" alt="Phone" class="icon" /><span>0819790919</span>
        <img src="@/assets/images/address.png" alt="Address" class="icon" /><span>8A, Le Van Viet Street, District 9, Thu Duc City</span>
      </div>

    </div>
   
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <h2 class="welcome-text" @mouseover="animateText" @click="animateText">Welcome To Our Service</h2>
      <img src="@/assets/images/DogLogin.png" alt="Dog" class="background-image" />
      <div class="sign-in-container">
        <h1>Sign in</h1>
        <p>New user? <router-link to="/register">Create an account</router-link></p>
        <form @submit.prevent="handleLogin">
          <input
            placeholder="Email"
            v-model="email"
            type="email"
            @input="validateEmail"
            @blur="validateEmail"
          />
          <p v-if="emailError" class="error">{{ emailError }}</p>
          <input v-model="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
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
import { apiClient } from '@/api/axios';
import { getToken, getUserRole } from '@/utils/auth';

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
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        if(getUserRole().includes('Customer')){
          this.$router.push('/customer/main'); 
        }
        if(getUserRole().includes('Doctor')){
          this.$router.push('/record-list'); 
        }
      } catch (error) {
        console.error('Login failed:', error);
       
      }
    },

    loginWithGoogle() {
      apiClient
        .post('/api/auth/google')
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    loginWithFacebook() {
      apiClient
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

<style scoped>
.header {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  color: white;
}

.logo {
  width: 50px; 
  margin-right: 20px; 
}

.contact-info {
  display: flex;
  align-items: center;
}

.contact-info .icon {
  width: 20px; 
  margin-right: 5px;
}

.contact-info span {
  margin-right: 20px; 
}

.welcome-text {
  font-size: 35px;
  color: #ffffff;
  text-align: right;
  margin-top: 200px;
  margin-right: 350px;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  right: 10px;
  top: 10px;
  animation: slide-in 1s forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.welcome-text:hover {
  animation: sparkle 1s infinite;
}

@keyframes sparkle {
  0% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e7d637, 0 0 20px #ff00ff, 0 0 25px #e7d637, 0 0 30px #ff00ff, 0 0 35px #e7d637;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #ff00ff, 0 0 15px #0f5836, 0 0 20px #ff00ff, 0 0 25px #5e439c, 0 0 30px #814a81, 0 0 35px #ff00ff;
  }
}


.full-screen-background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2; 
}

.background-image {
  width: 40%; 
  height: 70%; 
  object-fit: cover; 
  margin-right: 20px; 
}

.sign-in-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  max-width: 400px;
  margin-top: 20px; 
  text-align: center;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type='email']:focus,
input[type='password']:focus {
  border-color: #811410;
  box-shadow: 0 0 8px rgba(129, 20, 16, 0.5);
}

button[type='submit'] {
  background-color: #811410;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button[type='submit']:hover {
  background-color: #a1231e;
  transform: scale(1.05);
}

.error {
  color: red;
}
</style>


