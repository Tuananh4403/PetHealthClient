<template>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="list-container">
        <h1>List of booking</h1>
        <div class="search-container">
          <select v-model="searchField" class="search-select">
          <option value="all">All Fields</option>
          <option value="Customer">Customer</option>
          <option value="PetName">Pet Name</option>
          <option value="Doctor">Doctor</option>
          <option value="Service">Service</option>
          <option value="Date">Date</option>
          <option value="Note">Note</option>
        </select>
        <input 
          v-model="searchQuery" 
          @input="filterPets" 
          placeholder="Search bookings..." 
          class="search-input"
        />
      </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Pet Name</th>
              <th>Doctor</th>
              <th>Service</th>
              <th>Date</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pet, index) in filteredPets" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ pet.Customer }}</td>
              <td>{{ pet.PetName }}</td>
              <td>{{ pet.Doctor }}</td>
              <td>{{ pet.Service }}</td>
              <td>{{ pet.Date }}</td>
              <td>{{ pet.Note }}</td>
              <td >
                <button v-if="isCustomer" @click="approveBooking(pet)">
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
import { axiosPrivate } from '@/api/axios';
import { getUserRole } from '@/utils/auth';
import { toastSuccess, toastWarning } from '@/utils/toast';


  export default {
    data() {
      return {
        backgroundImage: null,
        pets: [],
        filteredPets: [],
        searchQuery: '',
        searchField: 'all'
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
        this.fetchBookings();
        
    },
    methods: {
      fetchBookings() {
        axiosPrivate.get("/api/booking/review-booking")
          .then(response => {
            if(response.data.success){
            console.log(response.data.data);
            var data = Object.values(response.data.data)
              data.forEach(item => {
                var booking = this.mapBookingData(item);
                this.bookings.push(booking)
              });
              this.filteredPets = [...this.pets];
            }
          })
          .catch(error => {
            console.error('Error fetching pets:', error);
          });
    },
    approveBooking(pet) {
      // Example of sending data (pet) to an API endpoint
      axiosPrivate.post('/api/booking/confirm/' + pet.id)
        .then(response => {
            const data = response.data;
            if(data.success){
              toastSuccess(data.message);
            }else{
              toastWarning(data.message)
            }
        })
        .catch(error => {
          console.error('Error approving booking:', error);
          // Handle error scenario
        });
    },
    filterPets() {
      if (this.searchField === 'all') {
        this.filteredPets = this.pets.filter(pet => 
          pet.Customer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          pet.PetName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          pet.Doctor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          pet.Service.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          pet.Date.includes(this.searchQuery) ||
          pet.Note.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredPets = this.pets.filter(pet => 
          pet[this.searchField].toLowerCase().includes(this.searchQuery.toLowerCase())
        );
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
        Note: petData.note // Add any notes or additional information
    };
}

    }
  };
  </script>
  
  <style scoped>
  .search-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.search-select, .search-input {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
}

.search-select {
  width: 150px;
}

.search-input {
  flex-grow: 1;
}

.search-select:focus, .search-input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}
  .full-screen-background {
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .list-container {
    width: 90%;
    margin: auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #9b0f0a;
  }
  
  tr:hover {
    background-color: #555;
  }
  </style>
  