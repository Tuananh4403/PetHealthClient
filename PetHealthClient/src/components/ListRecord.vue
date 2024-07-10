<template>
  <div class="list-record-container">
    <h1>List Record</h1>
    <div class="search-button-container">
      <button class="search-btn" @click="openSearchModal">Search</button>
    </div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="header in headers" :key="header">
              <template v-if="header !== 'Action'">
                {{ row[header.toLowerCase()] || '' }}
              </template>
              <button v-else class="update-btn" @click="openUpdateModal(row)">Update</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UpdateListRecord v-if="showUpdateModal" :record="selectedRecord" @close="closeUpdateModal" />
    <SearchListRecord
      v-if="showSearchModal"
      :headers="headers"
      @close="closeSearchModal"
      @search="performSearch"
    />
  </div>
</template>

<script>
import UpdateListRecord from '@/components/UpdateListRecord.vue'
import SearchListRecord from '@/components/SearchListRecord.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    UpdateListRecord,
    SearchListRecord
  },
  data() {
    return {
      headers: [
        'Id',
        'Name',
        'Gender',
        'Kind',
        'Birthday',
        'Weight',
        'Height',
        'Species',
        'Temperature',
        'DetailPrediction',
        'Conclude',
        'Action'
      ],
      rows: [
        {
          id: '1',
          name: 'Pet 1',
          gender: 'Male',
          kind: 'Dog',
          birthday: '2020-01-01',
          weight: '10',
          height: '50',
          species: 'Labrador',
          temperature: '38.5',
          detailprediction: 'Healthy',
          conclude: 'Good'
        },
        {
          id: '2',
          name: 'Pet 2',
          gender: 'Female',
          kind: 'Cat',
          birthday: '2019-05-15',
          weight: '4',
          height: '30',
          species: 'Persian',
          temperature: '39.0',
          detailprediction: 'Slight fever',
          conclude: 'Need attention'
        },
        {
          id: '3',
          name: 'Pet 3',
          gender: 'Male',
          kind: 'Bird',
          birthday: '2021-12-31',
          weight: '0.3',
          height: '20',
          species: 'Parrot',
          temperature: '41.0',
          detailprediction: 'High fever',
          conclude: 'Needs immediate care'
        }
      ],
      showUpdateModal: false,
      showSearchModal: false,
      selectedRecord: null,
      searchCriteria: {}
    }
  },
  computed: {
    filteredRows() {
      if (Object.keys(this.searchCriteria).length === 0) {
        return this.rows
      }
      
      return this.rows.filter(row => {
        return Object.keys(this.searchCriteria).every(key => {
          const searchValue = this.searchCriteria[key].toLowerCase()
          const rowValue = String(row[key]).toLowerCase()
          return rowValue.includes(searchValue)
        })
      })
    }
  },
  methods: {
    openUpdateModal(record) {
      this.selectedRecord = record
      this.showUpdateModal = true
    },
    closeUpdateModal() {
      this.showUpdateModal = false
      this.selectedRecord = null
    },
    openSearchModal() {
      this.showSearchModal = true
    },
    closeSearchModal() {
      this.showSearchModal = false
    },
    performSearch(criteria) {
      this.searchCriteria = criteria
      this.closeSearchModal()
    }
  }
}
</script>

<style scoped>
.list-record-container {
  margin: 0 auto; 
  width: 90%;
}

h1 {
  color: #2c3e50;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 30px;
}

.table-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.data-table th, .data-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.data-table th {
  background-color: #3498db;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  letter-spacing: 1px;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.update-btn {
  background-color: #2ecc71;
  border: none;
  color: white;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.update-btn:hover {
  background-color: #27ae60;
}

.search-button-container {
  text-align: right;
  margin-bottom: 20px;
}

.search-btn {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #2980b9;
}
</style>