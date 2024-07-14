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
      <img src="@/assets/images/petshop.png" alt="Pet" class="background-image" />
      <div class="text-content">
          <h2 class="animated-text">PET SERVICE</h2>
          <span class="animated-text">Dịch vụ thú cưng</span>
          <span class="animated-text">Uy tín hàng đầu TP HCM</span>
          <button class="booking-button">Booking now</button>
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
          <p><strong>Hotline:</strong>  0819790919</p>
          <p><strong>Zalo:</strong>   0819790919</p>
          <p><strong>Address:</strong>   8A, Le Van Viet Street, District 9, Thu Duc City</p>
        </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Chatbox from '@/components/ChatBox.vue'
import { getUserName } from '@/utils/auth';

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
      fullName: "John Doe" // Replace with actual full name fetching logic
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
    logout(){
      try {
        this.$store.dispatch('logout');
        this.$router.push('/login'); // Redirect to the main page
      } catch (error) {
        console.error(error);
        // Optionally show an error message to the user
      }
    },
    fetchUsername(){
      this.userName = getUserName();
    }
  }
}
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

/* nav ul li {
  margin: 0 5px; 
} */

nav ul li:first-child {
  margin-left: 100px; 
}

nav ul li:last-child {
  margin-right: 100px; /* Increase spacing for the last item */
}

nav ul li a {
  color: black;
  text-decoration: none;
  font-size: 22px; 
}

.profile img {
  height: 22px; /* Adjust icon size */
  width: auto;
  margin-right: 8px;
}
.background-image {
  width: 50%; 
  height: 50%; 
  object-fit: cover; 
  margin-right: 20px; 
  margin-top: 200px;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.text-content {
  color: white;
  margin-top: 300px;
  margin-left: 150px;
}

.animated-text {
  animation: fadeIn 2s ease-in-out;
  display: block; /* Ensure each text is on a new line */
}

.animated-text:hover {
  animation: bounce 0.5s;
}

h2.animated-text {
  font-size: 100px; /* Increase size for PET SERVICE */
}

span.animated-text {
  font-size: 36px; /* Increase size for other texts */
  margin-top: 10px; 
}

.booking-button {
  background-color: #d4a017; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px; /* Add spacing above the button */
}

.booking-button:hover {
  background-color: #b8860b; 
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
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
  background-image: url('../assets/images/background.png'); /* Ensure the background image covers the entire screen */
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
</style>


