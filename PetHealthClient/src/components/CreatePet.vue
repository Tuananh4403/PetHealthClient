<template>
  <div id="app">
  <nav>
      <ul>
        <li><a href="#"@click="navigateTo('/')">Home</a></li>
        <li class="dropdown">
          <a href="#" @click="toggleDropdown">Medical History</a>
          <div class="dropdown-content" v-show="showDropdown">
            <a href="#" @click="navigateTo('customer/petMedicalHistory')">Pet Medical</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" @click="toggleDropdown">Pet</a>
          <div class="dropdown-content" v-show="showDropdown">
            <a href="#" @click="navigateTo('customer/createPet')">Create Pet</a>
            <a href="#" @click="navigateTo('customer/updatePet')">Update Pet</a>
            <a href="#" @click="navigateTo('customer/deletePet')">Delete Pet</a>
            <a href="#" @click="navigateTo('customer/pet-list')">List Pet</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" @click="toggleDropdown">Kennel</a>
          <div class="dropdown-content" v-show="showDropdown">
            <a href="#" @click="navigateTo('customer/viewBarn')">Save Barn</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" @click="toggleDropdown">Service</a>
          <div class="dropdown-content" v-show="showDropdown">
            <a href="#" @click="navigateTo('customer/booking')">Create Booking</a>
            <a href="#" @click="navigateTo('customer/listBooking')">List Booking</a>
          </div>
        </li>
        <li class="profile dropdown split">
          <img src="../assets/images/icon.png" alt="Profile Image"/>
          <a href="#" @click="toggleDropdown">{{userName}}</a>
          <div class="dropdown-content" v-show="showDropdown">
            <span>{{fullName}}</span>
            <hr>
            <a href="#" @click="navigateTo('customer/profile')">View Profile</a>
            <a href="#" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </nav>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      
      <div class="signup-container">
        <h1>Register for your pet</h1>
        <form @submit.prevent="handleCreatePet">
          <label for="pet-name">Pet Name</label>
          <input v-model="petName" type="text" id="pet-name" placeholder="Pet Name" />
  
          <label for="kind-of-pet">Kind Of Pet</label>
          <input v-model="kindOfPet" type="text" id="kind-of-pet" placeholder="Kind Of Pet" />
  
          <label for="gender">Gender</label>
          <multiselect v-model="gender" style="cursor: pointer" label="name" track-by="name"
                                    class="custom-input-select" selectLabel="" deselectLabel="" selectedLabel=""
                                    placeholder="Choose Gender" :options="genders" :custom-label="customLabel">
                                    <template #tag="{ option, remove }">
                                        <span class="multiselect__tag" style="background: #22445d">
                                            <span class="font-weight-bold">{{
                                        option.name
                                    }}</span>
                                            <i tabindex="1" class="multiselect__tag-icon" @click="remove(option)"></i>
                                        </span>
                                    </template>
                                    <template #noResult>
                                        Không tìm thấy dữ liệu.
                                    </template>
                                </multiselect>
  
          <label for="birthday">Birthday</label>
          <input v-model="birthday" type="date" id="birthday" />
  
          <label for="species">Species</label>
          <input v-model="species" type="text" id="species" placeholder="Species" />
  
          <button type="submit">Add your Pet</button>
        </form>
      </div>
    </div>
    <div class="footer-content">
        <h2>PET SERVICE</h2>
        <p>Your pet's health and happiness are our top priority.</p>
        <div class="footer-info">
          <p><strong>Hotline:</strong>  0819790919</p>
          <p><strong>Zalo:</strong>   0819790919</p>
          <p><strong>Address:</strong>   8A, Le Van Viet Street, District 9, Thu Duc City</p>
        </div>
    </div>
  </div>
  </template>
  
  <script>
import { axiosPrivate } from '@/api/axios';
import { toastSuccess, toastWarning } from '@/utils/toast';
import Multiselect from 'vue-multiselect';
import { getUserName } from '@/utils/auth';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

  export default {
    components: { Multiselect },
    setup() {
    const router = useRouter()
    const showDropdown = ref(false)

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const navigateTo = (route) => {
      router.push(`/${route}`)
    }

    return {
      navigateTo,
      toggleDropdown,
      showDropdown,
    }
  },
    data() {
      return {
        backgroundImage: null,
        userName: "",
        petName: '',
        kindOfPet: '',
        gender: false,
        genders: [{
                value: true,
                name: 'Male'
            },
            {
                value: false,
                name: 'Female'
            },],
        birthday: null,
        species: '',
        
        
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
        this.fetchUsername();
    },
    methods: {
      async handleCreatePet(){
        await axiosPrivate.post('/api/pet/register-pet', {
          PetName: this.petName,
          KindOfPet: this.kindOfPet,
          Gender: this.gender?.value,
          Birthday: this.birthday,
          Species: this.species
        })
        .then(response => {
          const data = response.data;
          console.log(response)
          if(data.success){
            toastSuccess("create Pet success!");
            this.$router.push('/customer/main'); // Redirect to the main page   
          }else{
            toastWarning(data.message)
          }
        })
      },
      logout(){
      try {
        this.$store.dispatch('logout');
        this.$router.push('/login'); 
      } catch (error) {
        console.error(error);
       
      }
    },
      fetchUsername(){
      this.userName = getUserName();
    },
      customLabel({ name }) {
            return `${name}`;
        },
    }
  }
  </script>
  <style>
  #app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.full-screen-background {
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center; /* Center the form horizontally */
  align-items: center; /* Center the form vertically */
}

nav {
  background-color: rgba(255, 214, 142, 0.9); 
  padding: 1px;
  width: 100%; 
  margin: 0 auto; 
  height: 80px;
}

nav ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 100%;
}

nav ul li:first-child {
  margin-left: 20px; 
}

nav ul li:last-child {
  margin-right: 20px; 
}

nav ul li a {
  color: black;
  text-decoration: none;
  font-size: 22px; 
}
nav ul li img {
  width: 70%;
  height: 80px; 
}


.signup-container {
  max-width: 450px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f2f2f2;
  align-items: center;
  animation: fadeIn 1s ease-in-out; /* Add animation */
}

label {
  display: block;
  margin-top: 10px;
  font-family: Arial, sans-serif;
}

input[type='text'],
input[type='date'] {
  width: 100%;
  padding: 12px 20px;
  margin: 6px 0 16px; 
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.name-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.birthday {
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.birthday input[type='text'],
.birthday input[type='date'] {
  flex: 1;
}

input[type='text'] {
  width: 100%;
  padding: 12px 20px;
  margin: 6px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Arial, sans-serif;
}

button[type='submit'] {
  background-color: #9b0f0a;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s ease; /* Add transition for hover effect */
}

button[type='submit']:hover {
  background-color: #7a0c08; /* Darker red on hover */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.footer-content {
  color: black;
  text-align: center;
  background: rgba(255, 214, 142, 0.9); 
}

.footer-content h2 {
  font-size: 24px;
  font-weight: bold;
}

.footer-content .footer-info {
  display: flex;
  justify-content: space-around; 
  font-weight: bold; 
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a, .dropdown-content span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}
  .error {
    color: red;
  }
  </style>