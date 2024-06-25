<template>
  <div class="record-health-record">
    <h2>Record health record</h2>
    <div class="pet-information">
      <h3>Pet information</h3>
      <div class="input-group">
        <input type="text" placeholder="Doctor" />
        <input type="text" placeholder="Barn" /> 
        <div class="checkbox-group">
          <input type="checkbox" id="BarnId" name="barn" value="" />
          <label for="BarnId">Save barn</label>
        </div>           
      </div>
      <div class="input-group">
        <multiselect
            class="form-multi"            
            v-model="selectedPetName"
            :options="pets"
            :custom-label="detailPet"
            placeholder=" Select Pet Name"
            label="namePet"
            track-by="idPet"
          ></multiselect>   
          <multiselect
            class="form-multi"
            v-model="selectedServiceType"
            :options="servicesType"
            :custom-label="detailServiceType"
            placeholder=" Select Service (type)"
            label="nameServiceType"
            track-by="idServiceType"
          ></multiselect>     
      </div>
      <div class="input-group">     
          
          <multiselect
            class="form-multi"
            v-model="selectedTypeVaccine"
            :options="vaccine"
            :custom-label="detailVaccine"
            placeholder=" Select type of Vaccine"
            label="nameVaccine"
            track-by="idVaccine"
          ></multiselect>
          <multiselect
            class="form-multi"
            v-model="selectedTypeMedicine"
            :options="medicine"
            :custom-label="detailMedicine"
            placeholder=" Select type of Medicine"
            label="nameMedicine"
            track-by="idMedicine"
          ></multiselect>        
      </div>
      <div class="textarea-group">
        <textarea type="text" placeholder="Detail Prediction"></textarea>
      </div>
      <div class="textarea-group">
        <textarea type="text" placeholder="Conclude"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },

  data() {
    return {
      pet: '',
      detailPrediction: '',
      barn: '',
      conclusion: '',
      doctor: '',
      saveBarn: '',

      pets: [
        { idPet: 1, namePet: 'Pet A' },
        { idPet: 2, namePet: 'Pet B' },
        { idPet: 3, namePet: 'Pet C' }
      ],
      selectedPetName: [],
      
      servicesType: [
        { idServiceType: 1, nameServiceType: 'Service A', price: '100' },
        { idServiceType: 2, nameServiceType: 'Service B', price: '200' },
        { idServiceType: 3, nameServiceType: 'Service C', price: '300' }
      ],
      selectedServiceType: [],

      vaccine: [
        { idVaccine: 1, nameVaccine: 'Vaccine A', price: '100' },
        { idVaccine: 2, nameVaccine: 'Vaccine B', price: '200' },
        { idVaccine: 3, nameVaccine: 'Vaccine C', price: '300' }
      ],
      selectedTypeVaccine: [],

      medicine: [
        { idVaccine: 1, nameMedicine: 'Medicine A', quantity: '1', price: '100' },
        { idVaccine: 2, nameMedicine: 'Medicine B', quantity: '2', price: '200' },
        { idVaccine: 3, nameMedicine: 'Medicine C', quantity: '3', price: '300' }
      ],
      selectedTypeMedicine: [],

      
    }
  },

  methods: {
    detailServiceType({ nameServiceType, price }) {
      return `${nameServiceType} - ${price} $`
    },
    detailVaccine({ nameVaccine, price }) {
      return `${nameVaccine} - ${price} $`
    },
    detailMedicine({ nameMedicine, price, quantity }) {
      return `${nameMedicine} - quantity: ${quantity} - ${price} $`
    },
    detailPet({ namePet, idPet }) {
      return `${idPet} . ${namePet}`
    },
  }
}
</script>

<style scope>
.record-health-record {
  font-family: Arial;
  width: 700px;
  margin: 80px auto;
  padding: 30px;
  background-color: #f5f5f5;
  border: 1px solid #000000;
  border-radius: 5px;
  text-align: center;
}

.record-health-record h2 {
  font-size: 32px;
}

.pet-information {
  margin-top: 10px;
  font-size: 20px;
}

.input-group {
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 15px;
}

.checkbox-group {
  width: 23%;
}

input {
  width: 35%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 4px;
}

textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #000000;
  margin-top: 20px;
}

label {
  font-size: 20px;
}

.form-multi {
    width: 100%;
    border: 2px solid #000000;
    border-radius: 3px;
}
</style>