<template>
  <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="signup-container">
      <h1>Create Your Account</h1>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="User name" @input="validateUserName" @blur="validateUserName" />
        <p v-if="userNameError" class="error">{{ userNameError }}</p>
        <div class="first-name-inputs">
          <input v-model="firstName" type="text" placeholder="First Name" @input="validateFirstName" @blur="validateFirstName" />
          <p v-if="firstNameError" class="error">{{ firstNameError  }}</p>
        </div>
        <div class="last-name-inputs">
          <input v-model="lastName" type="text" placeholder="Last Name" @input="validateLastName" @blur="validateLastName"/>
          <p v-if="lastNameError" class="error">{{ lastNameError }}</p>
        </div>
         
        
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          @input="validateEmail"
          @blur="validateEmail"
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <input v-model="phone" type="text" placeholder="Phone Number" @input="validatePhone" @blur="validatePhone"/>
        <p v-if="phoneError" class="error">{{ phoneError }}</p>
        <input v-model="password" type="password" placeholder="Password" @input="validatePassword" @blur="validatePassword"/>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <input v-model="passwordConfirm" type="password" placeholder="Confirm Password" @input="validateConfirmPassword" @blur="validateConfirmPassword"/>
        <p v-if="passwordConfirmError" class="error">{{ passwordConfirmError }}</p>
        <button type="submit" >Sign up</button>
        <button type="button" @click="reset">Reset</button>
       
      </form>
    </div>
  </div>
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-..."
    crossorigin="anonymous"
  /> -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
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
      passwordError:'',
      passwordConfirm:'',
      passwordConfirmError:'',
      username: '',
      userNameError:'',
      firstName: '',
      firstNameError:'',
      lastName: '',
      lastNameError:'',
      phone:'',
      phoneError:''
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
        this.emailError = 'Please enter a valid email address. For example "example@example.com"';
      } else {
        this.emailError = '';
      }
    },
    validatePhone(){
      const phoneRegrex = /^[0-9]{10}$/
      if (!phoneRegrex.test(this.phone)){
        this.phoneError = 'Please enter phone number enough 10 number from 0 to 9';
      } else {
        this.phoneError='';
      }
    },
    validateUserName(){
      if(!this.username){
        this.userNameError ='Username can not be blank';
      } else {
        this.userNameError ='';
      }
    },
    validateFirstName(){
      if (!this.firstName){
        this.firstNameError = 'First Name can not be blank';
      } else {
        this.firstNameError='';
      }
    },
    validateLastName(){
      if(!this.lastName){
        this.lastNameError = 'Last Name can not be blank';
      } else {
        this.lastNameError = '';
      }
    },
    validatePassword(){
      if(!this.password){
        this.passwordError = 'Password can not be blank';
      } else {
        this.passwordError='';
      }
    }, 
    validateConfirmPassword(){
      if(!this.passwordConfirm){
        this.passwordConfirmError = 'Password confirm can not be blank';
      } else if (this.passwordConfirm !== this.password) {
        this.passwordConfirmError = 'Password confirm does not match with password';
      } else {
        this.passwordConfirmError='';
      }
    },
    reset(){
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
      this.password = '';
      this.passwordConfirm = '';
      this.userNameError = '';
      this.firstNameError = '';
      this.lastNameError = '';
      this.emailError = '';
      this.phoneError = '';
      this.passwordError = '';
      this.passwordConfirmError = '';
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
h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}


.signup-container {
  max-width: 450px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.first-name-inputs,
.last-name-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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

button[type='submit'],[type='button'] {
  background-color: #851e17;
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
  background-color: #fff;
  color: #757575;
}

.error {
  color: red;
}

</style>