<template>
    <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td v-for="header in headers" :key="header">
            <template v-if="header !== 'Detail'">
              
              {{ record[header] || '' }}
            </template>
            
              <button v-else class="update-btn" @click="navigateTo('record/'+ record['id'] )">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </template>
  <script>
import { axiosPrivate } from '@/api/axios';
import { useRouter } from 'vue-router';
import { getUserRole } from '@/utils/auth';
import { formatDate } from '@/utils/common';
import { toastSuccess, toastWarning } from '@/utils/toast';


  export default {
    setup(){
      const router = useRouter()
      const navigateTo = (route) => {
        router.push(`/${route}`)
      }
      return {
        navigateTo}
    },
    data() {
      return {
      headers: ['Pet', 'Date', 'Doctor', 'Detail Prediction','Conclude','Save Barn', 'Barn','Detail'],

        backgroundImage: null,
        records: [],
        userRoles: null,
        isCustomer: false
      };
    },
  
    mounted() {
      import('@/assets/images/background.png')
        .then((image) => {
          this.backgroundImage = image.default;
        })
        .catch((error) => {
          console.error('Error loading image:', error);
        });
        this.userRoles = getUserRole();
        if(this.userRoles.includes('Customer')){
          this.isCustomer = true;
        }
        this.fetchRecord();
        
    },
    methods: {
      createRecord(){
        axiosPrivate.post("/api/record/create")
        .then(res => {
          const data = res.data; 
          if(data.success){
            toastSuccess(data.message)
          }else{
            toastWarning(data.message);
          }
        })
      },
      fetchRecord() {
        axiosPrivate.get("/api/record/get-list-record")
          .then(response => {
            console.log(response)
            const data = response.data;
            if(data.success){
              var result = [];
              this.records = result
              data.data.forEach(element => {
                var record = this.mapRecordToFields(element);
                result.push(record)
              });
              this.records = result;
            }
          })
          .catch(error => {
            console.error('Error fetching pets:', error);
          });
    },
    mapRecordToFields(record) {
    return {
        id: record.id        ,
        Pet: record.pet.petName,
        Date: formatDate(record.createdAt),
        Doctor: record.doctor.user.firstName +  " " +record.doctor.user.lastName,  // Assuming the doctor's name is stored in record.doctor.user.name
        'Detail Prediction': record.detailPrediction,
        Conclude: record.conclude,
        'Save Barn': record.saveBarn ? "Yes" : "No",
        Barn: record.barnId || "",
        'View Detail': record.id
    }
  },
    mapBookingData(petData) {
    const pet = petData.pet;
    const customer = pet.customer.user;
    const Doctor = petData.doctor ? petData.doctor.user : 'Default Doctor';
    return {
        id : petData.id,
        Customer: `${customer.firstName} ${customer.lastName}`,
        PetName: pet.petName,
        Doctor: Doctor ? `${Doctor.firstName} ${Doctor.lastName}` :  'Default Doctor',
        Service: petData.bookingServices[0].service.name ? petData.bookingServices[0].service.name : 'Default Service', // Replace with actual service information if available
        Date: new Date(petData.bookingTime).toLocaleDateString(), // Format date as needed
        Note: petData.note, // Add any notes or additional information
        Status: petData.status
    };
}

    }
  };
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
  text-align: center;
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
  