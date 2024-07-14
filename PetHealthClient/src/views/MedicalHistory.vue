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
          <img src="../assets/images/icon.png" alt="Profile Image" />
          <a href="#" @click="toggleDropdown">{{ userName }}</a>
          <div class="dropdown-content" v-show="showDropdown">
            <span>{{ fullName }}</span>
            <hr>
            <a href="#" @click="navigateTo('customer/profile')">View Profile</a>
            <a href="#" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </nav>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div>
        <div class="pet-health-records">
          <h1>Pet Health Records</h1>
          <div class="section" v-for="(section, index) in sections" :key="index">
            <div class="section-header" @click="toggleSection(index)">
              <h2>{{ section.title }}</h2>
              <span class="arrow" :class="{ 'up': !section.collapsed, 'down': section.collapsed }"></span>
            </div>
            <div class="section-content" v-show="!section.collapsed">
              <div v-if="section.title === 'Pet Information'" class="pet-information">
                <div>
                  <label>Pet Name</label>
                  <input type="text" v-model="pet.name" />
                </div>
                <div>
                  <label>Kind Of Pet</label>
                  <input type="text" v-model="pet.kind" />
                </div>
                <div>
                  <label>Gender</label>
                  <input type="text" v-model="pet.gender" />
                </div>
                <div>
                  <label>Birthday</label>
                  <input type="text" v-model="pet.birthday" />
                </div>
                <div>
                  <label>Species</label>
                  <input type="text" v-model="pet.species" />
                </div>
              </div>
              <div v-if="section.title === 'Medical History'" class="medical-history">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Doctor</th>
                      <th>Detail Prediction</th>
                      <th>Conclude</th>
                      <th>View Detail</th>
                      <th>Save Barn</th>
                      <th>Barn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(record, index) in medicalHistory" :key="index">
                      <td><input type="text" v-model="record.date" /></td>
                      <td><input type="text" v-model="record.doctor" /></td>
                      <td><input type="text" v-model="record.detailPrediction" /></td>
                      <td><input type="text" v-model="record.conclude" /></td>
                      <td><input type="text" v-model="record.viewDetail" /></td>
                      <td><input type="checkbox" v-model="record.saveBarn" /></td>
                      <td><input type="text" v-model="record.barn" v-if="record.saveBarn" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
      </div>
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getUserName } from '@/utils/auth';

export default {
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
      pet: {
        name: '',
        kind: '',
        gender: '',
        birthday: '',
        species: ''
      },
      medicalHistory: [
        {
          date: '2024-01-01',
          doctor: 'Dr. John',
          saveBarn: true,
          barn: 'Barn 1',
          detailPrediction: 'Prediction 1',
          conclude: 'Conclude 1',
          viewDetail: 'Detail 1'
        },
        {
          date: '2024-02-01',
          doctor: 'Dr. Smith',
          saveBarn: false,
          barn: '',
          detailPrediction: '',
          conclude: '',
          viewDetail: ''
        },
        {
          date: '2024-03-01',
          doctor: 'Dr. Jane',
          saveBarn: true,
          barn: 'Barn 2',
          detailPrediction: 'Prediction 2',
          conclude: 'Conclude 2',
          viewDetail: 'Detail 2'
        }
      ],
      sections: [
        {
          title: 'Pet Information',
          collapsed: false
        },
        {
          title: 'Medical History',
          collapsed: false
        }
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
  },
  methods: {
    toggleSection(index) {
      this.sections[index].collapsed = !this.sections[index].collapsed;
    },
    logout() {
      try {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error(error);

      }
    },
    fetchUsername() {
      this.userName = getUserName();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body,
html {
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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

.dropdown-content a,
.dropdown-content span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1
}

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

.pet-health-records {
  width: 80%;
  height: 100%; 
  overflow: hidden; 
  margin: auto;
  font-family: 'Open Sans', sans-serif;
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

h1,
h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-align: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.arrow {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.section-content {
  max-height: 400px; 
  overflow-y: auto; 
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.pet-information div,
.medical-record div {
  margin-bottom: 8px;
}

.medical-history table {
  width: 100%;
  border-collapse: collapse;
}

.medical-history th,
.medical-history td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

input[type="text"],
input[type="email"],
input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-left: 10px;
}

.medical-history th {
  background-color: #e0e0e0;
  text-align: center;
  font-weight: bold;
}

</style>
