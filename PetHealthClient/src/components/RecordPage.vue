<template>
  <div class="pet-health-record">
    <div class="tittle">
      <h1>Pet Health Record Form</h1>
    </div>
    <hr>
    <div class="pet-information">
      <h2>Pet Information</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="petName">Pet Name</label>
          <multiselect v-model="selectedPet" :options="pets" :custom-label="detailPet"
             :showNoOptions="false" :allow-empty="false" :close-on-select="true" :showLabels="false"
              placeholder=" Select Pet Name" @open="getPet" label="namePet" track-by="idPet">
            </multiselect>
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <input id="gender" v-model="petInfo.gender" type="text" readonly>
        </div>
        <div class="form-group">
          <label for="kindOfPet">Kind of Pet</label>
          <input id="kindOfPet" v-model="petInfo.kind" type="text" readonly>
        </div>
        <div class="form-group">
          <label for="birthday">Birthday</label>
          <input id="birthday" v-model="petInfo.birthday" type="date" readonly>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="species">Species</label>
          <input id="species" v-model="petInfo.species" type="text" readonly>
        </div>
        <div class="form-group">
          <label for="temperature">Temperature</label>
          <input id="temperature" v-model="petInfo.temperature" type="text" readonly>
        </div>
      </div>

    </div>

    <div class="form-group">
      <label for="detailPrediction">Detail prediction</label>
      <textarea id="detailPrediction" v-model="detailPrediction" rows="4"></textarea>
    </div>

    <div class="form-group">
      <label for="conclude">Conclude</label>
      <textarea id="conclude" v-model="conclude" rows="4"></textarea>
    </div>
    <hr>

    <div class="service-section">
      <h2>Service</h2>
      <div class="service-header">
        <div>NO</div>
        <div>Name</div>
        <div>CODE</div>
        <div>Type</div>
        <div>Quantity</div>
        <div>Unit</div>
        <div>Price</div>
      </div>
      <div v-for="(service, index) in services" :key="index" class="service-row">
        <input v-model="service.no" type="text">
        <select v-model="service.name" @change="updateService(service)">
          <option v-for="option in serviceOptions" :key="option.name" :value="option.name">
            {{ option.name }}
          </option>
        </select>
        <input v-model="service.code" type="text" readonly>
        <input v-model="service.type" type="text" readonly>
        <input v-model="service.quantity" type="number">
        <input v-model="service.unit" type="text" readonly>
        <input v-model="service.price">
        <button @click="removeService(index)" class="remove-service-btn">x</button>
      </div>
      <button @click="addService" class="add-service-btn">+</button>
    </div>
    <button @click="submitForm" class="submit-btn">Submit</button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { axiosPrivate } from '@/api/axios';
import { toastError, toastSuccess, toastWarning } from '@/utils/toast';
import { formatDate } from '@/utils/common';

export default {
  name: 'RecordPet',
  components: { Multiselect },

  data() {
    return {
      selectedPet: null,
      pets: [],
      petInfo: {
        id: 0,
        name: '',
        gender: null,
        kind: '',
        birthday: '',
        weight: '',
        height: '',
        species: '',
        temperature: ''
      },
      genders: [{
                value: true,
                name: 'Đực'
            },
            {
                value: false,
                name: 'Cái'
            },],
      detailPrediction: '',
      conclude: '',
      services: [
        { no: '', name: '', code: '', type: '', quantity: '', unit: '', price: '' }
      ],
      serviceOptions: [

      ]
    }
  },
  create() {
    this.fetchPetOptions();
    this.getService();
  },
  watch: {
    selectedPet(newVal) {
      if (newVal) {
        const name = newVal.customer.user.firstName + ' ' + newVal.customer.user.lastName;
        console.log(newVal);
        this.petOwner = name;
        this.petInfo.gender = this.genders.find(g => g.value === newVal.gender).name;
        this.petInfo.kind = newVal.kindOfPet;
        this.petInfo.birthday = formatDate(newVal.birthday);
        this.petInfo.species = newVal.species;
      } else {
        this.petOwner = '';
        this.gender = '';
      }
    }
  },
  methods: {
    detailPet({petName}) {
      return `${petName}`
    },
    async submitForm() {
      console.log('Form submitted', this.petInfo, this.detailPrediction, this.conclude, this.services)
      try {
        await axiosPrivate.post('api/record/create', {
          PetId: this.petInfo.id,
          Heght: this.petInfo.height,
          DetailPrediction: this.detailPrediction,
          Conclude: this.conclude,
          ServiceIds: this.services,
          SaveBarn: false

        }
          .then(res => {
            if (res.data.success) {
              toastSuccess(res.data.message)
            } else {
              toastWarning(res.data.message)
            }
          }));
      }
      catch{
        toastError("Lỗi hệ thống vui lòng thử lại!");
      }
    },
    addService() {
      this.services.push({ no: '', name: '', code: '', type: '', quantity: '', unit: '', price: '' })
    },
    updateService(service) {
      const selectedService = this.serviceOptions.find(option => option.name === service.name)
      if (selectedService) {
        service.code = selectedService.code
        service.type = selectedService.type
        service.unit = selectedService.unit
      }
    },
    removeService(index) {
      this.services.splice(index, 1)
    },
    async getPet(){
      await axiosPrivate.get('/api/pet/get-list-pet-by-user')
                  .then(async response => {
                    const data = response.data;
                    if(data.success){
                      console.log(data.data)
                      this.pets = data.data;
                    }
                  })
    },
    async getService(){
      await axiosPrivate.get('/api/service/get-service')
      .then(response => {
        const data = response.data;
        console.log(data);
        if(data.success){
          this.serviceOptions = data.data;
          
          }
        }
      )
    },
    onPetSelect(selectedPet) {
      this.petInfo = {
        gender: selectedPet.gender,
        kind: selectedPet.kind,
        birthday: selectedPet.birthday,
        species: selectedPet.species,
        temperature: selectedPet.temperature
      };
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.pet-health-record {
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.tittle {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.tittle h1 {
  color: #2c3e50;
  font-size: 2.5em;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
}

h2 {
  color: #34495e;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-right: 20px;
}

.form-group:last-child {
  margin-right: 0;
}

/* General input styles */
input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.multiselect {
  padding: 12px;
  width: 100%;
}

.multiselect__option--highlight {
  background: #22445d !important;
}

.multiselect .multiselect__select {
  top: -2px !important;
}

.multiselect .multiselect__tags {
  min-height: 36px !important;
 
  padding: 6px 26px 0px 6px !important;
  overflow: hidden;
}

.multiselect .multiselect__tags .multiselect__tag {
  margin-bottom: 0px !important;
}

.multiselect .multiselect__tags .multiselect__placeholder {
  margin-bottom: 5px !important;
}

.multiselect__tag-icon:after {
  color: #ffffff;
}

.multiselect__element {
  cursor: not-allowed;
}

.multiselect__option--selected {
  background: #ebebeb;
  pointer-events: none;
}

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 2px;
  width: 33px;
  height: 29px;
  background: #fff;
  display: block;
}

.disabled-product-select-option .multiselect {
  pointer-events: none !important;
}

.disabled-product-select-option .multiselect .multiselect__tags {
  background: #e8e8e8 !important;
}
.multiselect__option{
  white-space: normal !important;
  word-break: break-all !important;
}
.vue-multiselect input[type="text"] {
  /* Your styles here */
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #eedbdb;
}

.vue-multiselect input[type="text"]:focus {
  border-color: #ee240a;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 104, 3, 0.5);
}
.service-section {
  margin-top: 30px;
}

.service-header,
.service-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background-color: #ecf0f1;
  padding: 10px;
  border-radius: 4px;
}

.service-header div {
  font-weight: bold;
  color: #2c3e50;
}

.service-header div,
.service-row input,
.service-row select {
  flex: 1;
  margin-right: 10px;
}

.service-row input[readonly] {
  background-color: #e8e8e8;
}

.service-row input[type="number"] {
  width: 80px;
}

.add-service-btn,
.remove-service-btn,
.submit-btn {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  background-color: #27ae60;
  font-size: 18px;
  float: right;
  margin-top: 20px;
}

.add-service-btn {
  background-color: #3498db;
  margin-top: 15px;
}

.remove-service-btn {
  background-color: #e74c3c;
  padding: 5px 10px;
}

.add-service-btn:hover,
.submit-btn:hover {
  opacity: 0.9;
}

.remove-service-btn:hover {
  background-color: #c0392b;
}
</style>