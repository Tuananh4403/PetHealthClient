<template>
  <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="booking-page">
      <div class="booking-form">
        <h2>Book an appointment</h2>
        <multiselect class="form-service" v-model="selectedService" :options="services" :custom-label="detailService"
         :showNoOptions="false" :allow-empty="false" :close-on-select="true" :showLabels="false"
          placeholder=" Select Service" label="nameService" @open="getService" track-by="idService"></multiselect>
        
        <div class="form-row">
          <div>
            <multiselect v-model="selectedDoctor" :options="doctors" :custom-label="detailDoctor"
            :showNoOptions="false" :allow-empty="false" :close-on-select="true" :showLabels="false"
              placeholder=" Select doctor" label="nameDoctor" @open="getDoctor" track-by="idDoctor">
            </multiselect>
          </div>
          <div>
            <multiselect v-model="selectedPetName" :options="pets" :custom-label="detailPet"
             :showNoOptions="false" :allow-empty="false" :close-on-select="true" :showLabels="false"
              placeholder=" Select Pet Name" @open="getPet" label="namePet" track-by="idPet">
            </multiselect>
          </div>
        </div>
        <div class="form-row">
          <input v-model="petOwner" :disabled="true" placeholder="Pet owner" />
          <input  v-model="gender" :disabled="true" placeholder="Gender" />
        </div>
        <div class="form-row">
          <flat-pickr v-model="dateValue" :config="dateConfig" placeholder="Date"></flat-pickr>
          <multiselect v-model="shift" :options="shifts" :custom-label="detailShift"
           :showNoOptions="false" :allow-empty="false" :close-on-select="true" :showLabels="false"
              placeholder=" Select shift" @open="getShift" label="shift" track-by="id">
            </multiselect>
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
import Multiselect from 'vue-multiselect';
import { axiosPrivate } from '@/api/axios';
import { formatNumber } from '@/utils/common';
import { toastSuccess, toastWarning } from '@/utils/toast';

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
      petOwner: '',
      gender: '',
      genders: [{
                value: true,
                name: 'Male'
            },
            {
                value: false,
                name: 'Female'
            },],
      doctors: [],
      selectedDoctor: [],

      pets: [
      ],
      selectedPetName: null,

      services: [],
      selectedService: [],
      shifts: [],
      shift: null
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
  watch: {
    selectedPetName(newVal) {
      console.log(newVal.customer.user);
      if (newVal) {
        const name = newVal.customer.user.firstName + ' ' + newVal.customer.user.lastName;
        this.petOwner = name;
        this.gender = this.genders.find(g => g.value === newVal.gender).name;
      } else {
        this.petOwner = '';
        this.gender = '';
      }
    }
  },
  methods: {
    cancelAction() {
      this.$router.push('/customer/main');
    },

    detailDoctor({ name }) {
      return `${name}`
    },

    detailPet({petName}) {
      return `${petName}`
    },
    detailService({ name, code, price}) {
      return `${code} - ${name} - ${formatNumber(price)} VNĐ`
    },
    detailShift({ timeRange}) {
      return `${timeRange}`
    },
    async getService(){
      await axiosPrivate.get('/api/service/get-service?typeId=1')
      .then(response => {
        const data = response.data;
        if(data.success){
          this.services = data.data;
          }
        }
      )
    },

    async getPet(){
      await axiosPrivate.get('/api/pet/get-list-pet-by-user')
                  .then(async response => {
                    const data = response.data;
                    if(data.success){
                      this.pets = data.data;
                    }
                  })
    },
    async getShift(){
      await axiosPrivate.get('/api/booking/get-shift')
                  .then(async response => {
                    const data = response.data;
                    if(data.success){
                      this.shifts = data.data;
                    }
                  })
    },
    async getDoctor(){
      await axiosPrivate.get('/api/doctor/get-doctor')
                  .then(async response => {
                    const data = response.data;
                    if(data.success){
                      this.doctors = this.mapDotor(data.data);
                    }
                  })
    },
    mapDotor(doctors){
      var result = [];
      for(var doc in doctors){
        var doctor = new Object;
        doctor.id = doctors[doc].id;
        doctor.name = doctors[doc].user.firstName + ' ' +doctors[doc].user.lastName;
        result.push(doctor)
      }
      return result
    },
    async createBooking(){
      const data = {
        PetId: this.selectedPetName.id,
        CustomerId: this.selectedPetName.customerId,
        ServiceIds: [this.selectedService.id],
        DoctorId: this.selectedDoctor.id,
        BookingDate: this.dateValue,
        Shift: this.shift.id,
        Note: this.Note ?? "",
      }
      await axiosPrivate.post('/api/booking/create', data)
      .then(response => {
        const data = response.data;
        if(data.success){
          toastSuccess(data.message);
          this.$router.push('/customer/main');
        }else{
          toastWarning(data.messsage)
        }
      })
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.multiselect__content-wrapper {
  max-height: 200px; /* Set a max height for the dropdown */
  overflow-y: auto; /* Enable vertical scrolling */
}
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
  justify-content: center; /* Aligns buttons to the center */
  gap: 20px; /* Adds space between the buttons */
  margin-top: 20px; /* Adds space above the button row */
}
.accept,
.cancel {
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  /* Remove margin-left from .accept to use gap for spacing */
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