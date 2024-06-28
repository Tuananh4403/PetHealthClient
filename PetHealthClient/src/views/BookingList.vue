<template>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="list-container">
        <h1>List of booking</h1>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pet, index) in pets" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ pet.Customer }}</td>
              <td>{{ pet.PetName }}</td>
              <td>{{ pet.Doctor }}</td>
              <td>{{ pet.Service }}</td>
              <td>{{ pet.Date }}</td>
              <td>{{ pet.Note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        backgroundImage: null,
        pets: [
          { Customer: 'Chi', PetName: 'Destiny', Doctor: 'Mr Abram', Service: 'General Examination', Date: '2024-06-30', Note: "Coming soon" },
          { Customer: 'ChiLe', PetName: 'Dorry', Doctor: 'Mr Vu', Service: 'General Examination', Date: '2024-06-30', Note: "Coming soon" },
          { Customer: 'Tuan', PetName: 'Tom', Doctor: 'Mr Nhan', Service: 'General Examination', Date: '2024-07-01', Note: "Weight" }
        ]
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
    },
  };
  </script>
  
  <style scoped>
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
  