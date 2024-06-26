<template>
  <div class="modal-doctor" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Update Doctor</h2>
      <form @submit.prevent="updateDoctor">
        <div class="form-group">
          <label for="role">Role:</label>
          <input id="role" v-model="form.role" required>
        </div>
        <div class="form-group">
          <label for="id">ID:</label>
          <input id="id" v-model="form.id" required>
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="status">Status:</label>
          <input id="status" v-model="form.status" required>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Update</button>
          <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.doctor }
    }
  },
  methods: {
    updateDoctor() {
      console.log('Updating doctor:', this.form);
      this.$emit('update', this.form);
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-doctor {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
