<template>
  <div id="app">
    <nav>
      <ul>
        <li><a href="#" @click="navigateTo('/')">Home</a></li>
        <li class="dropdown">
          <a href="#" @click="toggleDropdown">Medical History</a>
          <div class="dropdown-content" v-show="showDropdown">
            <a href="#" @click="navigateTo('customer/petOfMedicalHistory')">Pet Medical</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" @click="toggleDropdown">Pet</a>
          <div class="dropdown-content" v-show="showDropdown">
            <a href="#" @click="navigateTo('customer/createPet')">Create Pet</a>
            <a href="#" @click="navigateTo('customer/updatePet')">Update Pet</a>
            <a href="#" @click="navigateTo('customer/delete-pet')">Delete Pet</a>
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
      <div class="container">
        <div class="pet-frame" v-for="pet in pets" :key="pet.id" @click="navigateTo('customer/petBarnMedical')">
          <span class="pet-name">{{ pet.name }}</span>
        </div>
      </div>
      <div class="chat-toggle" @click="toggleChat">
        <div class="chat-bar">Message</div>
      </div>
      <Chatbox v-if="isChatOpen" :isOpen="isChatOpen" @close="toggleChat" />
    </div>
    <div class="footer-content">
      <h2>PET SERVICE</h2>
      <p>Your pet's health and happiness are our top priority.</p>
      <div class="footer-info">
        <p><strong>Hotline:</strong> 0819790919</p>
        <p><strong>Zalo:</strong> 0819790919</p>
        <p><strong>Address:</strong> 8A, Le Van Viet Street, District 9, Thu Duc City</p>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import Chatbox from '@/components/ChatBox.vue'
import { getUserName } from '@/utils/auth';
import { axiosPrivate } from '@/api/axios';
import { formatDate } from '@/utils/common';

export default {
  components: {
    Chatbox
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
      pets: [
        { id: 1, name: 'Pet 1' },
        { id: 2, name: 'Pet 2' },
        { id: 3, name: 'Pet 3' },
        { id: 4, name: 'Pet 4' }
      ]
    };
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
    this.fetchGetPet();
  },
  methods: {
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
    async fetchGetPet(){
      await axiosPrivate.get('/api/pet/get-list-pet-by-user')
                  .then(async response => {
                    const data = response.data;
                    if(data.success){
                      await this.addMappedPet(data.data);
                    }
                  })
    },
    mapPetData(data) {
      // console.log(data.petName);
      var pet = {
        id: data.id,
        name: data.petName,
        kind: data.kindOfPet,
        gender: data.gender ? 'Male' : 'Female',
        birthday: formatDate(data.birthday),
        species: data.species
      }
      // console.log(pet);
      return pet;
    },
    async addMappedPet(data) {
      for(var pet in data){
        const mappedPet = this.mapPetData(data[pet]);
        // console.log(mappedPet)
        await this.pets.push(mappedPet);
      }
  },
  }
};
</script>
<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

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

.profile img {
  height: 22px; 
  width: auto;
  margin-right: 8px;
}

.background-image {
  width: 50%; 
  height: 50%; 
  object-fit: cover; 
  margin-right: 20px; 
  margin-top: 20px;
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
}

.content {
  flex: 1;
  padding: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../assets/images/background.png'); 
}

.chat-toggle {
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

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pet-frame {
  width: 300px;
  height: 150px;
  background-color: rgba(255, 214, 142, 0.9); 
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; 
  flex-basis: calc(50% - 20px); 
  border-radius: 10px ;
}

.pet-frame:hover {
  transform: scale(1.05); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.pet-name {
  color: white;
  font-size: 24px;
  font-weight: bold;
}
</style>