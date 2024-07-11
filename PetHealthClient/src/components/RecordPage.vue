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
          <label for="petName">Pet </label>
          <multiselect v-model="selectedPet" :options="petOptions" label="name" track-by="name"
                                    v-debounce:300ms="fetchPetOptions"
                                    placeholder="Select a pet" 
                                    @select="onPetSelect" 
                                    :hide-selected="true"
                                    :searchable="true" 
                                    :close-on-select="true"
                                    :showNoOptions="false"
                                    @open="fetchPetOptions"
                                    :allow-empty="false"
                                    class="selectPet"
                              :clear-on-select="false">
                              <template #singleLabel="{ option }">
                                <span class="option__code">
                                    <span :title="option.name">{{ option.name }}</span>
                                </span>
                            </template>
                            <template #noResult>  
                                Không tìm thấy phương thức thanh toán phù hợp.
                            </template>
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
    <button @click="submitForm" class="submit-btn">Create</button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { axiosPrivate } from '@/api/axios';
import { toastError, toastSuccess, toastWarning } from '@/utils/toast';
import $ from 'jquery';

export default {
  name: 'RecordPet',
  components: { Multiselect },

  data() {
    return {
      selectedPet: null,
      petOptions: [],
      petInfo: {
        id: 0,
        name: '',
        gender: '',
        kind: '',
        birthday: '',
        weight: '',
        height: '',
        species: '',
        temperature: ''
      },
      detailPrediction: '',
      conclude: '',
      services: [
        { no: '', name: '', code: '', type: '', quantity: '', unit: '', price: '' }
      ],
      serviceOptions: [
        { name: 'Service 1', code: 'S001', type: 'Type 1', unit: 'Unit 1' },
        { name: 'Service 2', code: 'S002', type: 'Type 2', unit: 'Unit 2' },
        { name: 'Service 3', code: 'S003', type: 'Type 3', unit: 'Unit 3' },
      ]
    }
  },
  create() {
    this.fetchPetOptions();
  },
  methods: {
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
    async fetchPetOptions() {
      var pet_info = $(".selectPet").find("input").val().trim();

      await axiosPrivate.get('/api/pets', {
        params: {
                _info: pet_info,
        },
      })
        .then(response => {
          this.petOptions = response.data;
        })
        .catch(error => {
          console.error('Error fetching pet options:', error);
        });
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
  min-height: 100vh;
  margin: 0;
  padding: 40px;
  background-color: #f0f4f8;
  box-sizing: border-box;
}

.tittle {
  text-align: center;
  margin-bottom: 40px;
}

.tittle h1 {
  color: #2c3e50;
  font-size: 2.5em;
  border-bottom: 4px solid #3498db;
  display: inline-block;
  padding-bottom: 10px;
}

h2 {
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.8em;
  border-left: 5px solid #3498db;
  padding-left: 15px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1 1 calc(33.333% - 20px);
  min-width: 250px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

/* Multiselect specific styles */
.multiselect {
  width: 100% !important;
}

.multiselect__tags {
  min-height: 44px !important;
  padding: 8px 40px 0 8px !important;
  border-radius: 4px !important;
  border: 1px solid #bdc3c7 !important;
}

.multiselect__select {
  height: 44px !important;
}

.multiselect__input,
.multiselect__single {
  font-size: 16px !important;
  line-height: 24px !important;
}

.multiselect__option {
  padding: 12px !important;
  min-height: 40px !important;
}

.service-section {
  margin-top: 40px;
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.service-header,
.service-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.service-header div,
.service-row input,
.service-row select {
  flex: 1;
  margin-right: 10px;
}

.service-header div {
  font-weight: bold;
  color: #2c3e50;
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
  transition: background-color 0.3s ease;
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

hr {
  border: none;
  height: 1px;
  background-color: #bdc3c7;
  margin: 30px 0;
}
</style>