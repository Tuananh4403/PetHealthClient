<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor, index) in doctors" :key="index">
          <td v-for="header in headers" :key="header">
            <template v-if="header !== 'Action' && header !== 'Status'">
              {{ doctor[header.toLowerCase()] || '' }}
            </template>
            <template v-else-if="header === 'Status'">
              {{ status.find(s => s.value === doctor[header.toLowerCase()]).name }}
            </template>
            <template v-else>
              <button class="update-btn" @click="openUpdateModal(doctor)">Update</button>
            </template>
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
import { axiosPrivate } from '@/api/axios';
import UpdateDoctor  from '../components/UpdateDoctor.vue';
import { toastWarning } from '@/utils/toast';

export default {
  components: {
    UpdateDoctor,
  },
  data() {
    return {
      headers: ['Email', 'Name', 'id', 'phone','Status', 'Specialty','Action'],
      doctors: [],
      status: [
            {
                value: true,
                name: 'Active'
            },
            {
                value: false,
                name: 'Deactive'
            }],
      showUpdateModal: false,
      selectedDoctor: null
    }
  },
  mounted(){
    this.getDoctors();
  },
  methods: {
    openUpdateModal(doctor) {
      this.selectedDoctor = doctor;
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedDoctor = null;
    },
    getDoctors(){
      axiosPrivate.get("/api/doctor/get-doctor")
                  .then(response => {
                    const data =response.data
                    if(data.success){
                      console.log(data)
                      this,this.doctors = data.data;
                      console.log(this.doctors);
                    }else{
                      toastWarning("Can get data");
                    }
                  })
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