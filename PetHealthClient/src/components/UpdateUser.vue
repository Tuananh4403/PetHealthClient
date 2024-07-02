<template>
  <div class="modal-user" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      <h2 class="modal-title">Update User</h2>
      <form @submit.prevent="updateUser">
        <div class="form-row">
          <div class="form-group">
            <label for="username">Username:</label>
            <input id="username" v-model="form.username" disabled />
          </div>
          <div class="form-group">
            <label for="role">Role:</label>
            <multiselect
              v-model="form.role"
              :options="roleOptions"
              placeholder="Select role"
              :searchable="true"
              :allow-empty="false"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="password">Password:</label>
            <input id="password" v-model="form.password" type="password" required />
          </div>
          <div class="form-group">
            <label for="firstname">First Name:</label>
            <input id="firstname" v-model="form.firstname" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="lastname">Last Name:</label>
            <input id="lastname" v-model="form.lastname" required />
          </div>
          <div class="form-group">
            <label for="birthday">Birthday:</label>
            <input id="birthday" v-model="form.birthday" type="date" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label for="phonenumber">Phone Number:</label>
            <input id="phonenumber" v-model="form.phonenumber" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full-width">
            <label for="address">Address:</label>
            <input id="address" v-model="form.address" required />
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.user },
      roleOptions: ['role 1', 'role 2', 'role 3']
    }
  },
  methods: {
    updateUser() {
      console.log('Updating user:', this.form)
      this.$emit('update', this.form)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-user {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 600px;
  max-width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.form-row {
  display: flex;
  gap: 15px;
 
}

.form-group {
  flex: 1;
}

.form-group.full-width {
  flex-basis: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-group input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.multiselect {
  width: 100%;
  box-sizing: border-box;
}
</style>