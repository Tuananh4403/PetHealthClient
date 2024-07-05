<template>
    <div class="container">
      <div class="pet-frame" v-for="pet in pets" :key="pet.id">
        <img :src="pet.image" alt="Pet Image" class="pet-image">
        <a href="#" @click.prevent="navigateTo(pet.id)" class="pet-name">{{ pet.name }}</a>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const navigateTo = (petId) => {
        router.push(`/customer/petRecord/${petId}`);
      };
      return {
        navigateTo
      };
    },
    data() {
      return {
        pets: [
          { id: 1, name: 'Pet 1', image: 'path/to/image1.jpg' },
          { id: 2, name: 'Pet 2', image: 'path/to/image2.jpg' },
          { id: 3, name: 'Pet 3', image: 'path/to/image3.jpg' },
          { id: 4, name: 'Pet 4', image: 'path/to/image4.jpg' }
        ]
      };
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .pet-frame {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    margin: 10px;
    text-align: center;
  }
  
  .pet-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .pet-name {
    display: block;
    margin-top: 10px;
    color: blue;
    text-decoration: none;
    font-weight: bold;
  }
  
  .pet-name:hover {
    text-decoration: underline;
  }
  </style>
  