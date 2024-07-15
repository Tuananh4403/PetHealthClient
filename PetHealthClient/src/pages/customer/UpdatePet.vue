<template>
  <div id="app">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
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
          <a href="#" @click="toggleDropdown">{{fullName}}</a>
          <div class="dropdown-content" v-show="showDropdown">
            <span>{{userName}}</span>
            <hr>
            <a href="#" @click="navigateTo('customer/profile')">View Profile</a>
            <a href="#" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </nav>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="signup-container">
        <h1>Update your pet</h1>
        <form  @submit.prevent="updatePet">
          <label for="name">Pet Name</label>
          <multiselect 
          v-model="selectedPet"
          @open="fetchPetData" 
          :options="pets" 
          placeholder="Pet Name" 
          label="name" 
          track-by="id"
          :custom-label="detailPet"
          :searchable="true"
          :allow-empty="false"
        />
  
          <label for="kind-of-pet">Kind Of Pet</label>
          <input v-model="selectedPet.kind" type="text" id="kind-of-pet" placeholder="Kind Of Pet" />
  
          <label for="gender">Gender</label>
          <multiselect v-model="selectedPet.gender" style="cursor: pointer"
                                    class="custom-input-select" 
                                    placeholder="Choose Gender" :options="genders" :custom-label="detailGender">
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
          <input type="date" v-model="selectedPet.birthday" id="birthday" />
  
          <label for="species">Species</label>
          <input type="text" v-model="selectedPet.species" id="species" placeholder="Species" />
  
          <button type="submit">Save change</button>
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
  import Multiselect from 'vue-multiselect';
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  // import Chatbox from '@/components/ChatBox.vue'
  import { getUserFullName, getUserName } from '@/utils/auth';
import { formatDate } from '@/utils/common';
import { toastSuccess } from '@/utils/toast';

export default {
  components: {
    Multiselect
  },
  setup() {
    const router = useRouter()
    const showDropdown = ref(false)
    const isChatOpen = ref(false)

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const navigateTo = (route) => {
      router.push(`/${route}`)
    }

    const toggleChat = () => {
      console.log('toggleChat called, isChatOpen:', isChatOpen.value);
      isChatOpen.value = !isChatOpen.value;
    }

    return {
      navigateTo,
      toggleDropdown,
      showDropdown,
      isChatOpen,
      toggleChat
    }
  },
    
    data() {
      return {
        backgroundImage: null,
        userName: "",
        fullName:"",
        pets: [],
        selectedPet: {
          id: 0,
          petName: '',
          gender: false,
          kind: '',
          birthday: '',
          species: '',
        },
      genders: [
          {
                value: true,
                name: 'Male'
            },
            {
                value: false,
                name: 'Female'
            }
          ],
      }
    },
    watch: {
    selectedPet(newVal) {
      console.log(newVal.id);
      if (newVal) {
        // console.log(this.selectedPet.gender)
        this.selectedPet.gender = this.genders.find(g => g.value === newVal.gender);
        console.log(this.selectedPet.gender)
        this.selectedPet.kind = newVal.kindOfPet;
        this.selectedPet.birthday = formatDate(newVal.birthday);
        this.selectedPet.species = newVal.species;
      } else {
        this.petOwner = '';
        this.gender = '';
      }
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
        this
    },
    methods:{
      detailPet({petName}){
      return `${petName}`;
    },
    detailGender({name}){
      return `${name}`
    },
      async fetchPetData() {
      try {
        await axiosPrivate.get('/api/pet/get-list-pet-by-user')
          .then(response => {
            const data = response.data;
            if (data.success) {
              this.pets = data.data;
            }
          }); 
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    },
      async updatePet(){
           axiosPrivate.put("/api/pet/update-pet/"+ this.selectedPet.id, {
            petName : this.selectedPet.petName,
            gender : this.selectedPet.gender?.value,
            KindOfPet: this.selectedPet.kind,
            Birthday: this.selectedPet.birthday,
            Species: this.selectedPet.species,
           })
           .then(response => {
            const data = response.data;
            if (data.success) {
              this.$router.push('/customer/main');
              toastSuccess(data.message);
            }
          });
      },
      fetchUsername(){
      this.userName = getUserName();
      this.fullName = getUserFullName();
    }
    }
    
  }
  </script>
  <style>
  #app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  background-color: rgba(255, 214, 142, 0.9); 
  padding: 8px;
}

nav ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between; 
  align-items: center;
}

nav ul li:first-child {
  margin-left: 100px; 
}

nav ul li:last-child {
  margin-right: 100px; 
}

nav ul li a {
  color: black;
  text-decoration: none;
  font-size: 22px; 
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
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
.dropdown-content a, .dropdown-content span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}.chat-toggle {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.chat-bar {
  width: 100%;
  height: 100%;
  background-color: #007bff;
  color: white;
  align-content: center;
}
  .full-screen-background {
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
  }
  
  .signup-container {
    max-width: 450px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f2f2f2;
    align-items: center;
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
  .error {
    color: red;
  }
  </style>