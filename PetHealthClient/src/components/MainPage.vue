<template>
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
          <a href="#" @click="navigateTo('customer/petList')">List Pet</a>
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
      <div class="profile-right">
      <li class="profile dropdown split">
        <img src="../assets/images/icon.png" alt="Profile Image"/>
        <a href="#" @click="toggleDropdown">Username</a>
          <div class="dropdown-content" v-show="showDropdown">
          <a href="#" @click="navigateTo('customer/profile')">View Profile</a>
          <a href="#" @click="logout">Logout</a>
        </div>
      </li>
    </div>
    </ul>
  </nav>
  <div class="header-content bg-image" :style="{ backgroundImage: `url(${backgroundImage})` }">
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
//import BookingModal from '../components/BookingModal.vue'

export default {
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
      showDropdown
    }
  },

  data() {
    return {
      backgroundImage: null,
    }
  },

  mounted() {
    import('@/assets/images/bgmain.png')
      .then((image) => {
        this.backgroundImage = image.default
      })
      .catch((error) => {
        console.error('Error loading image:', error)
      })
  },
  methods: {
    logout(){
      try {
        this.$store.dispatch('logout');
        this.$router.push('/login'); // Redirect to the main page
      } catch (error) {
        console.error( error);
        // Optionally show an error message to the user
      }
    }
  }
}
</script>

<style>
.profile-right {
    display: flex;
    justify-content: right; /* Align items to the right */
    align-items: center; /* Center vertically */
}
nav {
  background-color: #ffd68e;
  padding: 8px;
}

nav ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 20px;
}

nav ul li a {
  color: black;
  text-decoration: none;
  font-size: 20px;
}

.header-content {
  color: #fff;
  display: flex;
  justify-content: center;
  height: 455px;
}

.bg-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 535px;
}

.welcome {
  font-size: 36px;
  margin-top: 200px;
}

.content-cards {
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
}

.button-cards {
  display: flex;
  justify-content: space-between;
  margin: 100px 0;
  align-items: stretch;
}

.content-vacxin-cards {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  width: 53%;
  height: 400px;
}

.content-kennel-cards {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  width: 42%;
  height: 400px;
}

.card {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  width: 48%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.card h3 {
  margin-bottom: 10px;
}

.content {
  height: 150px;
  background-color: #ddd;
  padding-top: 200px;
}

.btn-mainpage {
  background-color: black;
  color: yellow;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
nav ul {
  position: relative; 
}

.profile {
  position: absolute;
  right: 0; 
  display: flex; 
  align-items: center; 
  height: 100%; 
}

.profile img {
  height: 50px; 
  width: auto; 
  margin-left: auto;
}

.profile span {
  font-weight: bold; 
}
.header-content img {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: auto; 
  margin: auto; 
  display: block;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

</style>