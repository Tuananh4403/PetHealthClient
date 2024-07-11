<template>
    <div class="profile-container">
      <div class="profile-image">
        <img :src="customer.image" alt="Customer Image">
      </div>
      <div class="profile-info">
        <h1>Personal Information</h1>
        <div class="info-field">
          <label>Full Name:</label>
          <span>{{ customer.fullName }}</span>
        </div>
        <div class="info-field">
          <label>Email:</label>
          <span>{{ customer.email }}</span>
        </div>
        <div class="info-field">
          <label>Phone Number:</label>
          <span>{{ customer.phoneNumber }}</span>
        </div>
        <div class="info-field">
          <label>Address:</label>
          <span>{{ customer.address }}</span>
        </div>
        <button @click="showModal = true" class="update-btn">Update Profile</button>
      </div>
  
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Update Profile</h2>
          <div class="form-group">
            <label>Full Name:</label>
            <input v-model="updatedCustomer.firstName" type="text">
          </div>
          <div class="form-group">
            <label>Last Name:</label>
            <input v-model="updatedCustomer.lastName" type="text">
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="updatedCustomer.email" type="email">
          </div>
          <div class="form-group">
            <label>Phone Number:</label>
            <input v-model="updatedCustomer.phoneNumber" type="text">
          </div>
          <div class="form-group">
            <label>Address:</label>
            <input v-model="updatedCustomer.address" type="text">
          </div>
          <div class="modal-buttons">
            <button @click="saveChanges" class="save-btn">Save Changes</button>
            <button @click="showModal = false" class="close-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { axiosPrivate } from '@/api/axios';

  export default {
    data() {
      return {
        customer: {
          image: 'path/to/customer-image.jpg',
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '123-456-7890',
          address: '123 Main St, Anytown, USA'
        },
        updatedCustomer: {},
        showModal: false
      };
    },
    methods: {
      saveChanges() {
        this.customer = { ...this.updatedCustomer };
        this.showModal = false;
      },
      getUserDetail(){
        axiosPrivate.get('/api/auth/get-detail')
        .then(res => {
          const data = res.data;
          if(data.success){
            this.customer.fullName =data.data.firstName + data.data.lastName;
            this.customer.email = data.data.email;
            this.customer.phoneNumber = data.data.phoneNumber;
            this.customer.address = data.data.address;
            console.log(data.data)
          }
        })
      }
    },
    mounted() {
      this.getUserDetail();
      this.updatedCustomer = this.customer ;
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    padding: 20px;
  }
  
  .profile-image {
    width: 25%;
    text-align: center;
  }
  
  .profile-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .profile-info {
    width: 75%;
    padding-left: 20px;
  }
  
  .profile-info h1 {
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .info-field {
    margin-bottom: 15px;
    font-size: 1.2em;
  }
  
  .info-field label {
    font-weight: bold;
  }
  
  .update-btn {
    background-color: red;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1.2em;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
  }
  
  .modal-content h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .form-group {
    width: 100%;
    margin-bottom: 15px;
    font-size: 1.2em;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .save-btn, .close-btn {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1.2em;
    margin: 0 10px;
  }
  
  .close-btn {
    background-color: gray;
  }
  </style>
  