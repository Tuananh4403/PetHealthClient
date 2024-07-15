<template>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="list-container">
        <h1>Your Payment</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Pet Name</th>
              <th>Service</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pet, index) in pets" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ pet.name }}</td>
              <td>{{ pet.kind }}</td>
              <td>{{ pet.gender }}</td>
              <td>{{ pet.birthday }}</td>
              <td>{{ pet.species }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button>Total Money: </button>
    </div>
    
  </template>
  
  
  <script>
  import { axiosPrivate } from '@/api/axios';
  import { formatDate } from '@/utils/common';
  import { toastSuccess, toastWarning } from '@/utils/toast';
  export default {
    data() {
      return {
        backgroundImage: null,
        pets: [
        ]
      };
    },
  
    mounted() {
        import('@/assets/images/background.png')
          .then((image) => {
            this.backgroundImage = image.default
          })
          .catch((error) => {
            console.error('Error loading image:', error)
          }),
          this.fetchGetPet();
      },
    methods: {
      async fetchGetPet(){
        await axiosPrivate.get('/api/pet/get-list-pet-by-user')
                    .then(async response => {
                      const data = response.data;
                      if(data.success){
                        await this.addMappedPet(data.data);
                      }
                    })
      },
      mapPetData(data) {
        // console.log(data.petName);
        var pet = {
          id: data.id,
          name: data.petName,
          kind: data.kindOfPet,
          gender: data.gender ? 'Male' : 'Female',
          birthday: formatDate(data.birthday),
          species: data.species
        }
        // console.log(pet);
        return pet;
      },
      async addMappedPet(data) {
        for(var pet in data){
          const mappedPet = this.mapPetData(data[pet]);
          // console.log(mappedPet)
          await this.pets.push(mappedPet);
        }
    },
    }
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
  button{
    margin-right: 30px ;
    color: ;
  }
  </style>