<template>
  <div class="modal-service" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Update Service</h2>
      <form @submit.prevent="updateService">
        <div class="form-group">
          <label for="type">Type:</label>
          <multiselect
            v-model="form.type"
            :options="typeOptions"
            :multiple="false"
            placeholder="Select Type"
          ></multiselect>
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
          <label for="price">Price:</label>
          <input id="price" v-model="form.price" required>
        </div>
        <div class="form-group">
          <label for="note">Note:</label>
          <textarea id="note" v-model="form.note"></textarea>
        </div>
        <div class="form-group">
          <label for="unit">Unit:</label>
          <multiselect
            v-model="form.unit"
            :options="unitOptions"
            :multiple="false"
            placeholder="Select Unit"
          ></multiselect>
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
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect
  },
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.service },
      typeOptions: ['Service', 'Medical', 'Vaccine'],
      unitOptions: ['None', 'Item', 'Package', 'Dose', 'Vial', 'Tablet', 'Bottle', 'Unit']
    }
  },
  methods: {
    updateService() {
      console.log('Updating service:', this.form);
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-service {
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
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px; 
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

.modal-title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}

form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-group {
  width: 48%; 
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
}

.multiselect {
  width: 100%;
}

textarea {
  min-height: 70px;
}

.form-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

</style>
