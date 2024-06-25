<template>
  <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="booking-page">
      <div class="booking-form">
        <h2>Book an appointment</h2>
        <multiselect class="form-service" v-model="selectedService" :options="services" :custom-label="detailService"
          placeholder=" Select Service" label="nameService" track-by="idService"></multiselect>
        
        <div class="form-row">
          <div>
            <multiselect v-model="selectedDoctor" :options="doctors" :custom-label="detailDoctor"
              placeholder=" Select doctor" label="nameDoctor" track-by="idDoctor">
            </multiselect>
          </div>
          <div>
            <multiselect v-model="selectedPetName" :options="pets" :custom-label="detailPet"
              placeholder=" Select Pet Name" label="namePet" track-by="idPet">
            </multiselect>
          </div>
        </div>
        <div class="form-row">
          <input placeholder="Pet owner" />
          <input placeholder="Gender" />
        </div>
        <div class="form-row">
          <flat-pickr v-model="dateValue" :config="dateConfig" placeholder="Date"></flat-pickr>
          <flat-pickr v-model="timeValue" :config="timeConfig" placeholder="Time"></flat-pickr>
        </div>
        <textarea placeholder="Note"></textarea>
        <div class="form-actions">
          <button class="accept" @click="createBooking">Booking</button>
          <button class="cancel" @click="cancelAction">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  components: {
    flatPickr,
    Multiselect
  },

  data() {
    return {
      backgroundImage: null,
      dateValue: null,
      timeValue: null,
      dateConfig: {
        dateFormat: 'd/m/Y',
        static: true
      },
      timeConfig: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        static: true
      },

      doctors: [
        { idDoctor: 1, nameDoctor: 'Doctor A' },
        { idDoctor: 2, nameDoctor: 'Doctor B' },
        { idDoctor: 3, nameDoctor: 'Doctor C' }
      ],
      selectedDoctor: [],

      pets: [
        { idPet: 1, namePet: 'Pet A' },
        { idPet: 2, namePet: 'Pet B' },
        { idPet: 3, namePet: 'Pet C' }
      ],
      selectedPetName: [],

      services: [
        { idService: 1, nameService: 'Service A' },
        { idService: 2, nameService: 'Service B' },
        { idService: 3, nameService: 'Service C' },
      ],
      selectedService: [],
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
    cancelAction() {
      this.$emit('close-modal')
    },

    detailDoctor({ nameDoctor, idDoctor }) {
      return `${idDoctor} . ${nameDoctor}`
    },

    detailPet({ namePet, idPet }) {
      return `${idPet} . ${namePet}`
    },
    detailService({ nameService, idService }) {
      return `${idService} . ${nameService}`
    },
    async handleLogin() {
      try {
        let data = JSON.stringify({
          "username": "tes5",
          "password": "123"
        });

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:4000/api/auth/authenticate',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        const response = await axios.request(config);
        Cookies.set('auth_token', response.data.token, { expires: 7 });
        const router = this.$router;
        router.push('/main'); 
      } catch (error) {
        console.error(error);
      }
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
.booking-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.booking-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 10px; 
  margin-bottom: 15px;
}
.form-row > div,
.form-row input,
.form-service > .multiselect__single,
.flat-pickr {
  width: 100%;
}
.flat-pickr .flatpickr-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}
.multiselect {
  width: 100%;
}
.form-service {
  margin-bottom: 30px;
}


input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 16px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  grid-column: 1 / -1; 
}

.input-time {
  margin-bottom: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}
.form-actions {
  display: flex;
  justify-content: center; 
  gap: 20px; 
  margin-top: 20px; 
}
.accept,
.cancel {
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  
}

.accept {
  background-color: #9b0707;
  color: #fff;
  border: none;
  border-radius: 10px;
}

.cancel {
  background-color: rgb(181, 175, 175);
  color: white;
  border: none;
  border-radius: 10px;
}

</style>