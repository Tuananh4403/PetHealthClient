<template>
  <div id="app">
    <!-- Header with gradient background and circular patterns -->
    <div class="header">
      <h1>List of Your Pets</h1>
    </div>

    <!-- Table with centered text, bold headers, and horizontal separators -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Pet Name <i class="fas fa-paw"></i></th>
            <th>Type of Pet</th>
            <th>Gender <i class="fas fa-venus-mars"></i></th>
            <th>Birthdate</th>
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
      pets: [
        { name: 'Buddy', kind: 'Dog', gender: 'Male', birthday: '2020-01-01', species: 'Canine' },
        { name: 'Mittens', kind: 'Cat', gender: 'Female', birthday: '2019-05-05', species: 'Feline' },
        { name: 'Goldie', kind: 'Fish', gender: 'Male', birthday: '2021-07-07', species: 'Goldfish' }
      ]
    };
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  background: #f7b748;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  color: rgb(7, 7, 7); /* Changed to yellow */
  font-size: 24px;
}

.table-container {
  padding: 0 20px;
  background-color: #f0f0f0; /* Added background color */
  background-image: url(${backgroundImage}); /* Added watermark image */
}

table {
  width: 100%;
  border-spacing: 0;
  border-radius: 15px;
  overflow: hidden;
}

th, td {
  padding: 8px;
  text-align: center; /* Centered text */
}

th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold; /* Bold headers */
}

tr:not(:last-child) td {
  border-bottom: 1px solid #ddd; /* Horizontal separators */
}

tr:last-child td {
  border-bottom: none; /* No border for the last row */
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
