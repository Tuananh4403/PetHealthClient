<template>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Medical History</a></li>
        <li><a href="#">Petlast</a></li>
        <li><a href="#">Vaccin Calendar</a></li>
        <li><a href="#">Kennail</a></li>
        <li><a href="#">Service</a></li>
      </ul>
    </nav>
    <div class="header-content bg-image" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="welcome">Welcome Username</div>
    </div>
    <main>
      <div class="content-cards">
        <div class="content-vacxin-cards">
          <h3>Vacxin Calendar</h3>
          <div class="content">abc</div>
        </div>
        <div class="content-kennel-cards">
          <h3>View Kennel</h3>
          <div class="content">abc</div>
        </div>
      </div>
      <div class="button-cards">
        <div class="card">
          <h3>View Pet List</h3>
          <button class="btn-mainpage" @click="navigateTo('petList')">Button</button>
        </div>
        <div class="card">
          <h3>Create Booking</h3>
          <button class="btn-mainpage" @click="showBookingModal = true">Button</button>
        </div>
        <div class="card">
          <h3>About Us</h3>
          <button class="btn-mainpage">Button</button>
        </div>
      </div>
    </main>
    <footer>
      <p>Footer</p>
    </footer>
    <div class="modal" v-if="showBookingModal">
      <booking-modal @close-modal="showBookingModal = false" />
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import BookingModal from '../components/BookingModal.vue'

export default {
  setup() {
    const router = useRouter()

    const navigateTo = (route) => {
      router.push(`/${route}`)
    }

    return {
      navigateTo
    }
  },

  components: {
    BookingModal
  },

  data() {
    return {
      showBookingModal: false,
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
}
</script>

