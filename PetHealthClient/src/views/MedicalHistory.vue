<template>
  <div class="pet-health-records">
    <h1>Pet Health Records</h1>
    <div class="section" v-for="(section, index) in sections" :key="index">
      <div class="section-header" @click="toggleSection(index)">
        <h2>{{ section.title }}</h2>
        <span class="arrow" :class="{ 'up': !section.collapsed, 'down': section.collapsed }"></span>
      </div>
      <div class="section-content" v-show="!section.collapsed">
        <div v-if="section.title === 'Pet Information'" class="pet-information">
          <div>
            <label>Pet Name</label>
            <input type="text" v-model="pet.name" />
          </div>
          <div>
            <label>Kind Of Pet</label>
            <input type="text" v-model="pet.kind" />
          </div>
          <div>
            <label>Gender</label>
            <input type="text" v-model="pet.gender" />
          </div>
          <div>
            <label>Birthday</label>
            <input type="text" v-model="pet.birthday" />
          </div>
          <div>
            <label>Species</label>
            <input type="text" v-model="pet.species" />
          </div>
        </div>
        <div v-if="section.title === 'Owner Information'" class="owner-information">
          <div>
            <label>Owner's Name</label>
            <input type="text" v-model="owner.firstName" placeholder="First Name" />
            <input type="text" v-model="owner.lastName" placeholder="Last Name" />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="text" v-model="owner.phoneNumber" />
          </div>
          <div>
            <label>Email</label>
            <input type="text" v-model="owner.email" />
          </div>
          <div>
            <label>Address</label>
            <input type="text" v-model="owner.address" />
          </div>
        </div>
        <div v-if="section.title === 'Medical History'" class="medical-history">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Detail Prediction</th>
                <th>Conclude</th>
                <th>View Detail</th>
                <th>Save Barn</th>
                <th>Barn</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in medicalHistory" :key="index">
                <td><input type="text" v-model="record.date" /></td>
                <td><input type="text" v-model="record.doctor" /></td>
                <td><input type="text" v-model="record.detailPrediction" /></td>
                <td><input type="text" v-model="record.conclude" /></td>
                <td><input type="text" v-model="record.viewDetail" /></td>
                <td><input type="checkbox" v-model="record.saveBarn" /></td>
                <td><input type="text" v-model="record.barn" v-if="record.saveBarn" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pet: {
        name: '',
        kind: '',
        gender: '',
        birthday: '',
        species: ''
      },
      owner: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: ''
      },
      medicalHistory: [
        {
          date: '2024-01-01',
          doctor: 'Dr. John',
          saveBarn: true,
          barn: 'Barn 1',
          detailPrediction: 'Prediction 1',
          conclude: 'Conclude 1',
          viewDetail: 'Detail 1'
        },
        {
          date: '2024-02-01',
          doctor: 'Dr. Smith',
          saveBarn: false,
          barn: '',
          detailPrediction: '',
          conclude: '',
          viewDetail: ''
        },
        {
          date: '2024-03-01',
          doctor: 'Dr. Jane',
          saveBarn: true,
          barn: 'Barn 2',
          detailPrediction: 'Prediction 2',
          conclude: 'Conclude 2',
          viewDetail: 'Detail 2'
        }
      ],
      sections: [
        {
          title: 'Pet Information',
          collapsed: false
        },
        {
          title: 'Owner Information',
          collapsed: false
        },
        {
          title: 'Medical History',
          collapsed: false
        }
      ]
    };
  },
  methods: {
    toggleSection(index) {
      this.sections[index].collapsed = !this.sections[index].collapsed;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.pet-health-records {
  width: 80%;
  margin: auto;
  font-family: 'Open Sans', sans-serif;
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-align: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.arrow {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.section-content {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.pet-information div, .owner-information div, .medical-record div {
  margin-bottom: 8px;
}

.medical-history table {
  width: 100%;
  border-collapse: collapse;
}

.medical-history th, .medical-history td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

input[type="text"], input[type="email"], input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-left: 10px;
}
.medical-history th {
  background-color: #e0e0e0;
  text-align: center;
  font-weight: bold;
}

</style>
