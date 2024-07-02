<template>
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
    
  <UpdateUser
    v-if="showUpdateModal"
    :user="selectedUser"
    @close="closeUpdateModal"
  />
</template>

<script>
import UpdateUser from '../components/UpdateUser.vue';

export default {
  components: {
    UpdateUser
  },
  data() {
    return {
      headers: ['Username','Role', 'Password', 'FirstName', 'LastName', 'Birthday', 'Email', 'PhoneNumber', 'Address', 'Action'],
      rows: [
        { username: 'user1', role: 'role 1', password: '123456', firstname: 'John', lastname: 'Doe', birthday: '1990-01-01', email: 'john.doe@example.com', phonenumber: '1234567890', address: '123 Main St' },
        { username: 'user2', role: 'role 2', password: '123456', firstname: 'Jane', lastname: 'Smith', birthday: '1992-05-15', email: 'jane.smith@example.com', phonenumber: '0987654321', address: '456 Elm St' },
        { username: 'user3', role: 'role 3', password: '123456', firstname: 'Bob', lastname: 'Johnson', birthday: '1985-12-31', email: 'bob.johnson@example.com', phonenumber: '5555555555', address: '789 Oak Ave' },
      ],
      showUpdateModal: false,
      selectedUser: null
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
</style>