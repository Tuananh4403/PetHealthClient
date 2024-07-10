<template>
  <div class="search-modal">
    <div class="search-modal-content">
      <h2>Search Records</h2>
      <form @submit.prevent="search">
        <div class="form-grid">
          <div v-for="header in searchableHeaders" :key="header" class="form-group">
            <label :for="header.toLowerCase()">{{ header }}:</label>
            <input
              :id="header.toLowerCase()"
              v-model="searchCriteria[header.toLowerCase()]"
              type="text"
            >
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="search-btn">Search</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchCriteria: {}
    }
  },
  computed: {
    searchableHeaders() {
      return this.headers.filter(header => header !== 'Action')
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchCriteria)
    }
  }
}
</script>

<style scoped>
.search-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.search-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
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
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.search-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.search-btn {
  background-color: #3498db;
}

.cancel-btn {
  background-color: #e74c3c;
}
</style>