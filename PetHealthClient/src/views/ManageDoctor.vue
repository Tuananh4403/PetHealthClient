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
   
  <UpdateDoctor
    v-if="showUpdateModal"
    :staff="selectedStaff"
    @close="closeUpdateModal"
  />
</template>

<script>
import UpdateDoctor from '../components/UpdateDoctor.vue';

export default {
  components: {
    UpdateDoctor
  },
  data() {
    return {
      headers: ['Role', 'Id', 'Name', 'Status', 'Action'],
      rows: [
        { role: 'Doctor', id: 'DR001', name: 'Dr. John Smith', status: 'Active' },
        { role: 'Doctor', id: 'DR002', name: 'Sarah Johnson', status: 'Active' },
        { role: 'Doctor', id: 'DR003', name: 'Emily Brown', status: 'On Leave' },
        { role: 'Doctor', id: 'DR004', name: 'Dr. Emma Davis', status: 'Active' },
        { role: 'Doctor', id: 'DR005', name: 'Michael Wilson', status: 'Active' },
      ],
      showUpdateModal: false,
      selectedDoctor: null
    }
  },
  methods: {
    openUpdateModal(doctor) {
      this.selectedDoctor = doctor;
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedDoctor = null;
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