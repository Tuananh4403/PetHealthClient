<template>
  <div class="modal-doctor" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Update Doctor</h2>
      <form @submit.prevent="updateDoctor">
        <div class="form-group">
          <label for="status">Status:</label>
          <multiselect v-model="statusSelected" style="cursor: pointer" label="status" track-by="name"
                                    class="custom-input-select" selectLabel="" deselectLabel="" selectedLabel=""
                                    placeholder="Choose Status" :options="status" :custom-label="customLabel">
                                    <template #tag="{ option, remove }">
                                        <span class="multiselect__tag" style="background: #22445d">
                                            <span class="font-weight-bold">{{
                                        option.name
                                    }}</span>
                                            <i tabindex="1" class="multiselect__tag-icon" @click="remove(option)"></i>
                                        </span>
                                    </template>
                                    <template #noResult>
                                        Không tìm thấy dữ liệu.
                                    </template>
                                </multiselect>
  
        </div>
        <div class="form-group">
          <label for="name">Specialtys:</label>
          <input id="name" v-model="form.specialty" required>
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
import {Multiselect} from 'vue-multiselect';
export default {
  components:{
    Multiselect
  },
  name: 'UpdateDoctor',
  props: {
    doctor: {
      type: Object,
      required: true,
      
    }
  },
  data() {
    return {
      form: { ...this.doctor },
      statusSelected: false,
      status: [
            {
                value: true,
                name: 'Active'
            },
            {
                value: false,
                name: 'Deactive'
            }],
    }
  },
  methods: {
    customLabel(status) {
      return `${status.name}`;
    },
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
