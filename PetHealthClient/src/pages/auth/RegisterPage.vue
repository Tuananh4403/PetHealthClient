<template>
  <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="signup-container">
      <h1>Create a new account</h1>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="User name" />
        <div class="name-inputs">
          <input v-model="firstName" type="text" placeholder="First Name" />
          <input v-model="lastName" type="text" placeholder="Last Name" />
        </div>
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          @input="validateEmail"
          @blur="validateEmail"
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <input v-model="phone" type="text" placeholder="Phone Number" />
        <input v-model="password" type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit" >Sign up</button>
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
import { apiClient } from '@/api/axios';
import { toastSuccess, toastWarning } from '@/utils/toast';

export default {
  data() {
    return {
      backgroundImage: null,
      email: '',
      emailError: '',
      password: '',
      username: '',
      firstName: '',
      lastName: '',
      phone:''
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
      apiClient.post('/api/auth/register', {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password,
          roleId: 2,
          isCustomer: true
      })
      .then(response => {
      const data = response.data;
      if (data.success) {
        toastSuccess(data.message || 'Registration successful');
        // You might want to redirect the user or clear the form here
        const router = this.$router;
        router.push('/'); 
      } else {
        toastWarning(data.message || 'An error occurred during registration');
      }
    })};
  },

  registerWithGoogle() {
    apiClient.post('/api/auth/google')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  },

  registerWithFacebook() {
    apiClient.post('/api/auth/facebook')
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
<style scoped>
.full-screen-background {
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-container {
  max-width: 450px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f2f2f2;
  align-items: center;
}

.name-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

input[type='email'],
input[type='password'],
input[type='text'] {
  width: 100%;
  padding: 12px 20px;
  margin: 6px 0;
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
  margin: 10px 0;
}

.social-buttons button {
  width: 100%;
  padding: 12px 20px;
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

.error {
  color: red;
}
</style>