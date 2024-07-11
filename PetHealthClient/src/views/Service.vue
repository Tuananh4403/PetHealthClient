  <template>
  <div class="table-container">
    <!-- <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div> -->
    <!-- <div v-else> -->
      <div class="controls">
        <input
          v-model="searchQuery"
          placeholder="Search..."
          class="search-input"
          @input="filterAndPaginate"
        />
        <select v-model="filterType" @change="filterAndPaginate" class="filter-select">
          <option value="">All Types</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedRows" :key="index">
            <td v-for="header in headers" :key="header">
              <template v-if="header !== 'Action'">
                {{ getRowValue(row, header) }}
              </template>
              <button v-else class="update-btn" @click="openUpdateModal(row)">Update</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    <!-- </div> -->
  </div>

  <UpdateService v-if="showUpdateModal" :service="selectedService" @close="closeUpdateModal" />
</template>

<script>
import { axiosPrivate } from '@/api/axios';
import UpdateService from '@/components/UpdateService.vue'

export default {
  name: 'DataTable',
  components: {
    UpdateService
  },
  data() {
    return {
      headers: ['Type', 'Id', 'Name', 'Price', 'Status', 'Note', 'Unit', 'Action'],
      services: [],
      filteredServices: [],
      showUpdateModal: false,
      selectedService: null,
      currentPage: 1,
      itemsPerPage: 5,
      searchQuery: '',
      filterType: '',
      loading: false,
      error: null
    }
  },
  computed: {
    uniqueTypes() {
      return [...new Set(this.services.map((row) => row.Type))]
    },
    totalPages() {
      return Math.ceil(this.filteredServices.length / this.itemsPerPage)
    },
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredServices.slice(start, end)
    }
  },
  methods: {
    openUpdateModal(service) {
      this.selectedService = service
      this.showUpdateModal = true
    },
    closeUpdateModal() {
      this.showUpdateModal = false
      this.selectedService = null
    },
    filterAndPaginate() {
      this.filteredServices = this.services.filter((row) => {
        const matchesSearch = row.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesType = !this.filterType || row.Type === this.filterType
        return matchesSearch && matchesType
      })
      this.currentPage = 1
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    async fetchData() {
      try {
        this.loading = true
        const response = await axiosPrivate.post('/api/Service/create', {
          typeOfService: 0,
          code: '',
          name: '',
          price: 0,
          status: '',
          note: '',
          unitId: 0
        })
        this.services = Array.isArray(response.data) ? response.data : [response.data]
        this.filterAndPaginate()
      } catch (error) {
        console.error('Error fetching data:', error)
        this.error = 'An error occurred while fetching data.'
      } finally {
        this.loading = false
      }
    },
    getRowValue(row, header) {
    switch(header) {
      case 'Type': return row.typeOfService;
      case 'Id': return row.code;
      case 'Name': return row.name;
      case 'Price': return row.price;
      case 'Status': return row.status;
      case 'Note': return row.note;
      case 'Unit': return row.unitId;
      default: return '';
    }
  }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
.table-container {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 85%;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f2f2f2;
}

.search-input,
.filter-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.update-btn {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 3px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>