<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Create New User</h2>
      <form @submit.prevent="createUser" class="two-column-form">
        <div class="form-group">
          <input v-model="newUser.username" placeholder="Username" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.role" placeholder="Role" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.password" type="password" placeholder="Password" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.firstname" placeholder="First Name" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.lastname" placeholder="Last Name" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.birthday" type="date" placeholder="Birthday" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.email" type="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input v-model="newUser.phonenumber" placeholder="Phone Number" required>
        </div>
        <div class="form-group full-width">
          <input v-model="newUser.address" placeholder="Address" required>
        </div>
        <div class="button-group full-width">
          <button type="submit">Create</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        username: '',
        role: '',
        password: '',
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        phonenumber: '',
        address: ''
      }
    }
  },
  methods: {
    createUser() {
      this.$emit('user-created', { ...this.newUser });
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 700px;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.two-column-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: 1 / -1;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
}

button[type="button"]:hover {
  background-color: #da190b;
}
</style>