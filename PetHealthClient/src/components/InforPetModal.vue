<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Pet Information</h2>
      <form>
        <div class="form-group">
          <label for="petName">Pet Name</label>
          <input type="text" id="petName" v-model="pet.name" class="form-control" required readonly>
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <input type="text" id="gender" v-model="pet.gender" class="form-control" required readonly>
        </div>
        <div class="form-group">
          <label for="kindOfPet">Kind of Pet</label>
          <input type="text" id="kindOfPet" v-model="pet.kind" class="form-control" required readonly>
        </div>
        <div class="form-group">
          <label for="birthday">Birthday</label>
          <input type="date" id="birthday" v-model="pet.birthday" class="form-control" required readonly>
        </div>
      </form>
      <div class="record-health-pet">
        <h3>Record health pet</h3>
        <div class="health-buttons">
          <div class="pet-col">Pet</div>
          <div class="pet-col">Barn</div>
          <div class="pet-col">Doctor</div>
          <div class="pet-col">Save Barn</div>
          <div class="pet-col">Conclude</div>
          <div class="pet-col">Detail Prediction</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.modal {
  padding: 0px 15px;
}
.form-group {
  margin-bottom: 1rem;
}
.form-control {
  width: 100%;
  padding: 0.5rem;
}
.health-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>