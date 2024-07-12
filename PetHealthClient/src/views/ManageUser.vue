<template>
  <div>
    <h2>Create New User</h2>  
    <div class="table-container">
      <div class="controls">
        <input
          v-model="searchQuery"
          placeholder="Search..."
          class="search-input"
          @input="filterAndPaginate"
        />
        <select v-model="filterRole" @change="filterAndPaginate" class="filter-select">
          <option value="">All Roles</option>
          <option v-for="header in headers" :key="header" :value="header.toLowerCase()">
            {{ header }}
          </option>
        </select>
        <button class="create-btn" @click="openCreateModal">Create User</button>
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
                {{ row[header.toLowerCase()] || '' }}
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
    </div>

    <UpdateUser
      v-if="showUpdateModal"
      :user="selectedUser"
      @close="closeUpdateModal"
    />
    
    <CreateUser
      v-if="showCreateModal"
      @close="closeCreateModal"
      @user-created="addUser"
    />
  </div>
</template>

<script>
import UpdateUser from '@/components/UpdateUser.vue';
import CreateUser from '@/components/CreateUser.vue';

export default {
  components: {
    UpdateUser,
    CreateUser
  },
  data() {
    return {
      headers: ['Username', 'Role', 'Password', 'FirstName', 'LastName', 'Birthday', 'Email', 'PhoneNumber', 'Address', 'Action'],
      rows: [
        { username: 'user1', role: 'role 1', password: '123456', firstname: 'John', lastname: 'Doe', birthday: '1990-01-01', email: 'john.doe@example.com', phonenumber: '1234567890', address: '123 Main St' },
        { username: 'user2', role: 'role 2', password: '123456', firstname: 'Jane', lastname: 'Smith', birthday: '1992-05-15', email: 'jane.smith@example.com', phonenumber: '0987654321', address: '456 Elm St' },
        { username: 'user3', role: 'role 3', password: '123456', firstname: 'Bob', lastname: 'Johnson', birthday: '1985-12-31', email: 'bob.johnson@example.com', phonenumber: '5555555555', address: '789 Oak Ave' },
      ],
      showUpdateModal: false,
      showCreateModal: false,
      selectedUser: null,
      searchQuery: '',
      filterField: '',
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    filteredRows() {
      return this.rows.filter(row => {
        if (this.searchQuery === '' && this.filterField === '') return true;
        
        const matchesSearch = Object.values(row).some(value => 
          value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (this.filterField === '') return matchesSearch;

        const fieldValue = row[this.filterField];
        return fieldValue && fieldValue.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    totalPages() {
      return Math.ceil(this.filteredRows.length / this.itemsPerPage);
    },
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredRows.slice(start, end);
    }
  },
  methods: {
    openUpdateModal(user) {
      this.selectedUser = user;
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedUser = null;
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    addUser(newUser) {
      this.rows.push(newUser);
      this.closeCreateModal();
    },
    filterAndPaginate() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
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

h2 {
  text-align: center;
}

.controls {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

.search-input, .filter-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.create-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.create-btn:hover {
  background-color: #45a049;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.update-btn {
  background-color: #4CAF50;
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
  border: 1px solid #ccc;
  background-color: #f2f2f2;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>