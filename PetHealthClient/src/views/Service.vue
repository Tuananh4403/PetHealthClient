<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="header in headers" :key="header">
            <template v-if="header !== 'Action'">
              {{ row[header.toLowerCase()] || '' }}
            </template>
            <button v-else class="update-btn" @click="openUpdateModal(row)">Update</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <UpdateService
    v-if="showUpdateModal"
    :service="selectedService"
    @close="closeUpdateModal"
  />
</template>

<script>
import UpdateService from '../components/UpdateService.vue';

export default {
  name: 'DataTable',
  components: {
    UpdateService
  },
  data() {
    return {
      headers: ['Type', 'Id', 'Name', 'Status', 'Price', 'Note', 'Action'],
      rows: [
        { type: 'Service', id: 'SV001', name: 'General Checkup', status: 'Available', price: '$50' },
        { type: 'Medical', id: 'MD001', name: 'Antibiotics', status: 'In Stock', price: '$25' },
        { type: 'Vaccine', id: 'VC001', name: 'Flu Shot', status: 'Available', price: '$30' },
        { type: 'Service', id: 'SV002', name: 'Dental Cleaning', status: 'Available', price: '$75' },
        { type: 'Medical', id: 'MD002', name: 'Pain Reliever', status: 'Low Stock', price: '$15' },
        { type: 'Vaccine', id: 'VC002', name: 'COVID-19 Vaccine', status: 'Limited', price: '$0' },
        { type: 'Service', id: 'SV003', name: 'X-Ray', status: 'Available', price: '$100' },
        { type: 'Medical', id: 'MD003', name: 'Allergy Medicine', status: 'In Stock', price: '$20' },
        { type: 'Vaccine', id: 'VC003', name: 'Tetanus Shot', status: 'Available', price: '$40' },
      ],
      showUpdateModal: false,
      selectedService: null
    }
  },
  methods: {
    openUpdateModal(service) {
      this.selectedService = service;
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedService = null;
    }
  }
}
</script>

<style scoped>
.table-container {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 85%;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.update-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 3px;
}
</style>