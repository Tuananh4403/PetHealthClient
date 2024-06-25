<template>
  <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="list-container">
      <h1>List of your pets</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Pet Name</th>
            <th>Kind of pet</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Species</th>
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
  </div>
</template>


<script>
export default {
  data() {
    return {
      backgroundImage: null,
      pets: [
        { name: 'Buddy', kind: 'Dog', gender: 'Male', birthday: '2020-01-01', species: 'Canine' },
        { name: 'Mittens', kind: 'Cat', gender: 'Female', birthday: '2019-05-05', species: 'Feline' },
        { name: 'Goldie', kind: 'Fish', gender: 'Male', birthday: '2021-07-07', species: 'Goldfish' }
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
        })
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