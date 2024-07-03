<template>
    <div>
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
              <a href="#" @click="navigateTo('viewBarn')">Save Barn</a>
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
                <a href="#" @click="navigateTo('booking')">View Profile</a>
                <a href="#" @click="logout">Logout</a>
              </div>
            </li>
          </div>
        </ul>
      </nav>
      <div class="header-content bg-image" :style="{ backgroundImage: `url(${backgroundImage})` }">
      </div>
      <div class="pet-container">
        <div class="pet-card" v-for="pet in pets" :key="pet.id">
          <img :src="pet.image" alt="Pet Image" class="pet-image"/>
          <h3>{{ pet.name }}</h3>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
    setup(){
        const router = useRouter()
        const navigateTo = (route) => {
        router.push(`/${route}`)
        }
    return {
      navigateTo,
    }
},
data() {
    return {
        showDropdown: false,
        backgroundImage: null,
      pets: [
        { id: 1, name: 'Pet 1', image: 'path/to/pet1.jpg' },
        { id: 2, name: 'Pet 2', image: 'path/to/pet2.jpg' },
        { id: 3, name: 'Pet 3', image: 'path/to/pet3.jpg' }
      ]
    };
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    navigateTo(path) {
      this.$router.push({ path });
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  background-color: #333;
}

nav ul li {
  position: relative;
}

nav ul li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav ul li a:hover {
  background-color: #111;
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
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.profile-right {
  margin-left: auto;
}

.bg-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.pet-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.pet-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: calc(50% - 40px); /* 2 cards per row */
}

.pet-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

h3 {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}
</style>
  