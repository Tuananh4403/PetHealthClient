Dĩ nhiên, tôi sẽ tối ưu hóa CSS cho component này, giống như cách chúng ta đã làm với component search. Đây là phiên bản đã được tối ưu:
vueCopy<template>
  <div class="modal-record" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Update Record</h2>
      <form @submit.prevent="updateRecord">
        <div class="form-grid">
          <div class="form-group">
            <label for="id">Id:</label>
            <input id="id" v-model="form.id" required>
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="gender">Gender:</label>
            <input id="gender" v-model="form.gender" required>
          </div>
          <div class="form-group">
            <label for="kind">Kind:</label>
            <input id="kind" v-model="form.kind" required>
          </div>
          <div class="form-group">
            <label for="birthday">Birthday:</label>
            <input id="birthday" v-model="form.birthday" type="date" required>
          </div>
          <div class="form-group">
            <label for="weight">Weight:</label>
            <input id="weight" v-model="form.weight" type="number" step="0.1" required>
          </div>
          <div class="form-group">
            <label for="height">Height:</label>
            <input id="height" v-model="form.height" type="number" step="0.1" required>
          </div>
          <div class="form-group">
            <label for="species">Species:</label>
            <input id="species" v-model="form.species" required>
          </div>
          <div class="form-group">
            <label for="temperature">Temperature:</label>
            <input id="temperature" v-model="form.temperature" type="number" step="0.1" required>
          </div>
        </div>
        <div class="form-group">
          <label for="detailPrediction">Detail Prediction:</label>
          <textarea id="detailPrediction" v-model="form.detailprediction"></textarea>
        </div>
        <div class="form-group">
          <label for="conclude">Conclude:</label>
          <textarea id="conclude" v-model="form.conclude"></textarea>
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
    record: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.record }
    }
  },
  methods: {
    updateRecord() {
      console.log('Updating record:', this.form);
      this.$emit('update', this.form);
      this.$emit('close');
    }
  },
}
</script>

<style scoped>
.modal-record {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 50px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>