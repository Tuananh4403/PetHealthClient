<template>
  <div class="pet-health-record">
    <div class="header-container">
      <button @click="returnToPreviousPage" class="return-btn">Return</button>
    <div class="title">
      <h1>Pet Health Record Form</h1>
    </div>
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
          <div class="form-row">
            <div class="form-group"> 
              <label for="temperature">Temperature</label>
              <input id="temperature" v-model="petInfo.temperature" type="number" step="any" >
            </div>
            <div class="form-group"> 
              <label for="weight">Weight</label>
              <input id="weight" v-model="petInfo.weight"  type="number" step="any" >
            </div>
        </div>
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
        <div class="no">NO</div>
        <div class="name">Name/Code</div>
        <div class="type">Type</div>
        <div class="quantity">Quantity</div>
        <div class="unit">Unit</div>
        <div class="price">Price</div>
        <div class="total">Total</div>
      </div>
      <div v-for="(service, index) in services" :key="index" class="service-row">
        <input type="text" class="no" readonly :value="index+1">
        <multiselect 
        v-model="service.selectedService" 
        :options="serviceOptions" 
        :showNoOptions="false" :allow-empty="false" :showLabels="false"
        :multiple="false" 
        :close-on-select="true"
        :searchable="true"
        label="name" 
        track-by="selectedService"
        placeholder="Select a service"
        :custom-label="detailService"
        @open="getService"
        @select="updateService(service)"
        class="service-select name">
      </multiselect>
        <input v-model="service.type" type="text" readonly class="service-input type">
        <input v-model="service.quantity" type="number" class="service-input quantity" @change="updateTotal(index)">
        <input v-model="service.unit" type="text" readonly class="service-input unit">
        <input v-model="service.price" type="number" readonly class="service-input price">
        <input v-model="service.total" type="number" readonly class="service-input total">

        <button @click="removeService(index)" class="service-input remove-service-btn .delete-btn">x</button>
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
      genders: [
          {
                value: true,
                name: 'Male'
            },
            {
                value: false,
                name: 'Female'
            }
          ],
      detailPrediction: '',
      conclude: '',
      servicesSelected: [],
      services: [
        { no: '', id: 0, name: '', type: '', quantity: '', unit: '', price: 0, total: 0}
      ],
      serviceOptions: []
    }
  },
  create() {
    this.fetchPetOptions();
    this.getService();
  },
  watch: {
    selectedPet(newVal) {
      if (newVal) {
        this.petOwner = newVal.customerName;
        this.petInfo.id = newVal.id;
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
    returnToPreviousPage() {
      this.$router.go(-1); // Navigates back one step in history
    },
    detailPet({petName}) {
      return `${petName}`
    },
    detailService({name, code}){
      return `${name} - ${code}`;
    },
    async submitForm() {
      try {
        this.handleService(this.services)
        const data ={ PetId: this.petInfo.id,
          Heght: this.petInfo.weight,
          DetailPrediction: this.detailPrediction,
          Conclude: this.conclude,
          serviceQuantities: this.handleService(this.services),
          ServiceIds: this.servicesSelected,
          SaveBarn: false,
          barnId: 0}
          console.log(data);
        await axiosPrivate.post('/api/record/create', data)
          .then(res => {
            if (res.data.success) {
              toastSuccess(res.data.message)
              this.$router.push('/customer/main');
            } else {
              toastWarning(res.data.message)
            }
          });
      }
      catch (error){
        console.log(error)
      }
    },
    async getPet(){
      await axiosPrivate.get('/api/pet/get-list-pet')
                  .then(async response => {
                    const data = response.data;
                    if(data.success){
                      this.pets = data.data;
                    }
                  })
    },
    handleService(services){
      var result ;
      for(var service in services){
        var data = services[service];
        let id = String(data.id);
        result = {
          [id]: data.quantity
        };
        this.servicesSelected.push(data.id)
      }
      console.log(result)
      return result;
    },
    addService() {
      this.services.push({ no: '', name: '', type: '', quantity: '', unit: '', price: '' , total: ''})
    },
    updateService(service) {
      if (service) {
        service.id = service.selectedService.id,
        service.code = service.selectedService.code;
        service.type = service.selectedService.type;
        service.unit = service.selectedService.unit;
        service.price = service.selectedService.price;
        service.total = service.selectedService.price * service.selectedService.quantity;
      }
    },
    removeService(index) {
      this.services.splice(index, 1)
    },
    
    async getService(){
      await axiosPrivate.get('/api/service/get-service')
      .then(response => {
        const data = response.data;
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
    },
    updateTotal(index) {
      const service = this.services[index];
      const quantity = parseFloat(service.quantity) || 0;
      const price = parseFloat(service.price) || 0;
      service.total = quantity * price;
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

header-container {
  display: flex;
  justify-content: space-between; /* Align items with space between */
  align-items: center; /* Center items vertically */
  margin-bottom: 30px;
}
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  flex-grow: 1; /* Allows the title to take up remaining space */
  text-align: center; /* Centers the title text */
}

.title h1 {
  color: #2c3e50;
  font-size: 2.5em;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
}

.return-btn {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.return-btn:hover {
  background-color: #2c3e50;
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
  font-size: 10px;
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
  border: none;
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
  border: none;
  border-radius: 4px;
  font-size: 10px;
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
.service-select{
  width: 13%;
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

.service-header .no {
  display: flex;
  justify-content: center;
  width: 5%; /* Smallest width */
}

.service-header .name {
  display: flex;
  justify-content: center;
  
  width: 25%; /* Largest width */
}

.service-header .type,
.service-header .quantity,
.service-header .unit,
.service-header .price,
.service-header .total {
  display: flex;
  justify-content: center;

  flex: 1; /* Equal width for these columns */
}

.service-header .delete-btn {
  justify-content: center;
  display: flex;
  width: 5%; /* Fixed width for delete button */
  text-align: center; /* Centering delete button */
}




.service-row .no {
  justify-content: center;

  width: 5%; /* Smallest width */
}

.service-row .name {
  justify-content: center;

  width: 25%; /* Largest width */
}

.service-row .type,
.service-row .quantity,
.service-row .unit,
.service-row .price,
.service-row .total {
  justify-content: center;
  display: flex;
  flex: 1; /* Equal width for these columns */
}

.service-row .delete-btn {
  justify-content: center;
  display: flex;

  width: 5%; /* Fixed width for delete button */
  text-align: center; /* Centering delete button */
}


.service-row input[readonly] {
  background-color: #e8e8e8;
}

.service-row input[type="number"] {
  width: 70px; /* Fixed width for quantity input */
}
.service-row .delete-btn {
  width: 5%; /* Fixed width for delete button */
  text-align: center; /* Centering delete button */
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