<template>
  <div class="pet-health-record">
    <div class="tittle">
      <h1>Pet Health Record Form</h1>
    </div> <hr>
    <div class="pet-information">
      <h2>Pet Information</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="petName">Pet Name</label>
          <input id="petName" v-model="petInfo.name" type="text">
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <input id="gender" v-model="petInfo.gender" type="text">
        </div>
        <div class="form-group">
          <label for="kindOfPet">Kind of Pet</label>
          <input id="kindOfPet" v-model="petInfo.kind" type="text">
        </div>
        <div class="form-group">
          <label for="birthday">Birthday</label>
          <input id="birthday" v-model="petInfo.birthday" type="date">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="weight">Weight</label>
          <input id="weight" v-model="petInfo.weight" type="text">
        </div>
        <div class="form-group">
          <label for="height">Height</label>
          <input id="height" v-model="petInfo.height" type="text">
        </div>
        <div class="form-group">
          <label for="species">Species</label>
          <input id="species" v-model="petInfo.species" type="text">
        </div>
        <div class="form-group">
          <label for="temperature">Temperature</label>
          <input id="temperature" v-model="petInfo.temperature" type="text">
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
    </div><hr>

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
      <input v-model="service.price" >
      <button @click="removeService(index)" class="remove-service-btn">x</button>
    </div>
    <button @click="addService" class="add-service-btn">+</button>
  </div>
    <button @click="submitForm" class="submit-btn">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'RecordPet',
  data() {
    return {
      petInfo: {
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
  methods: {
    submitForm() {
      console.log('Form submitted', this.petInfo, this.detailPrediction, this.conclude, this.services)
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
    }
  }
}
</script>

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

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
}

input, textarea, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.service-section {
  margin-top: 30px;
}

.service-header, .service-row {
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

.service-header div, .service-row input, .service-row select {
  flex: 1;
  margin-right: 10px;
}

.service-row input[readonly] {
  background-color: #e8e8e8;
}

.service-row input[type="number"] {
  width: 80px;
}

.add-service-btn, .remove-service-btn, .submit-btn {
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

.add-service-btn:hover, .submit-btn:hover {
  opacity: 0.9;
}

.remove-service-btn:hover {
  background-color: #c0392b;
}
</style>