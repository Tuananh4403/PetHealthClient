<template>
    <div class="pet-detail">
      <h1 class="pet-name">{{ petInfo.name }}</h1>
      <div v-for="(record, index) in petRecords" :key="index" class="record">
        <div class="date" @click="toggleRecord(index)">
          {{ record.date }}
          <span class="arrow" :class="{ open: record.open }">▼</span>
        </div>
        <div v-if="record.open" class="details">
          <div class="field">
            <label>Gender:</label>
            <span>{{ record.gender }}</span>
          </div>
          <div class="field">
            <label>Kind of Pet:</label>
            <span>{{ record.kind }}</span>
          </div>
          <div class="field">
            <label>Species:</label>
            <span>{{ record.species }}</span>
          </div>
          <div class="field">
            <label>Birthday:</label>
            <span>{{ record.birthday }}</span>
          </div>
          <div class="field">
            <label>Temperature:</label>
            <span>{{ record.temperature }}</span>
          </div>
          <div class="field">
            <label>Weight:</label>
            <span>{{ record.weight }}</span>
          </div>
          <div class="field">
            <label>Description:</label>
            <span>{{ record.description }}</span>
          </div>
          <div class="field">
            <label>Status:</label>
            <span>{{ record.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        petInfo: {
          name: 'Pet Name'
        },
        petRecords: [
          {
            date: '2024-07-01',
            gender: 'Male',
            kind: 'Dog',
            species: 'Golden Retriever',
            birthday: '2020-01-01',
            temperature: '38°C',
            weight: '30kg',
            description: 'Healthy and active',
            status: 'Good',
            open: false
          },
          {
            date: '2024-06-01',
            gender: 'Male',
            kind: 'Dog',
            species: 'Golden Retriever',
            birthday: '2020-01-01',
            temperature: '37.5°C',
            weight: '29kg',
            description: 'Slightly underweight',
            status: 'Fair',
            open: false
          }
        ]
      };
    },
    methods: {
      toggleRecord(index) {
        this.petRecords[index].open = !this.petRecords[index].open;
      }
    }
  };
  </script>
  
  <style scoped>
  .pet-detail {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .pet-name {
    text-align: center;
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .record {
    margin-bottom: 10px;
  }
  
  .date {
    cursor: pointer;
    font-weight: bold;
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .details {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
  }
  
  .field {
    margin-bottom: 10px;
  }
  
  .field label {
    font-weight: bold;
  }
  
  .arrow {
    transition: transform 0.3s;
  }
  
  .arrow.open {
    transform: rotate(180deg);
  }
  </style>
  