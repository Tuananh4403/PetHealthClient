<template>
    <div class="full-screen-background" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="signup-container">
        <h1>Register for your pet</h1>
        <form @submit.prevent="handleCreatePet">
          <label for="pet-name">Pet Name</label>
          <input v-model="petName" type="text" id="pet-name" placeholder="Pet Name" />
  
          <label for="kind-of-pet">Kind Of Pet</label>
          <input v-model="kindOfPet" type="text" id="kind-of-pet" placeholder="Kind Of Pet" />
  
          <label for="gender">Gender</label>
          <multiselect v-model="gender" style="cursor: pointer" label="name" track-by="name"
                                    class="custom-input-select" selectLabel="" deselectLabel="" selectedLabel=""
                                    placeholder="Chọn giới tính" :options="genders" :custom-label="customLabel">
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
  
          <label for="birthday">Birthday</label>
          <input v-model="birthday" type="date" id="birthday" />
  
          <label for="species">Species</label>
          <input v-model="species" type="text" id="species" placeholder="Species" />
  
          <button type="submit">Add your Pet</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import { axiosPrivate } from '@/api/axios';
import { toastSuccess, toastWarning } from '@/utils/toast';
import Multiselect from 'vue-multiselect';

  export default {
    components: { Multiselect },
    data() {
      return {
        backgroundImage: null,
        petName: '',
        kindOfPet: '',
        gender: false,
        genders: [{
                value: true,
                name: 'Đực'
            },
            {
                value: false,
                name: 'Cái'
            },],
        birthday: null,
        species: '',
        
      }
    },
    
    mounted() {
      import('@/assets/images/background.png')
        .then((image) => {
          this.backgroundImage = image.default
        })
        .catch((error) => {
          console.error('Error loading image:', error)
        })
    },
    methods: {
      async handleCreatePet(){
        await axiosPrivate.post('/api/pet/register-pet', {
          PetName: this.petName,
          KindOfPet: this.kindOfPet,
          Gender: this.gender?.value,
          Birthday: this.birthday,
          Species: this.species
        })
        .then(response => {
          const data = response.data;
          console.log(response)
          if(data.success){
            toastSuccess("create Pet success!");
            this.$router.push('/customer/main'); // Redirect to the main page   
          }else{
            toastWarning(data.message)
          }
        })
      },
      customLabel({ name }) {
            return `${name}`;
        },
    }
  }
  </script>
  <style scoped>
  .full-screen-background {
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
  }
  
  .signup-container {
    max-width: 450px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f2f2f2;
    align-items: center;
  }
  label {
    display: block;
    margin-top: 10px;
    font-family: Arial, sans-serif;
  }

  input[type='text'],
  input[type='date'] {
    width: 100%;
    padding: 12px 20px;
    margin: 6px 0 16px; 
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .name-inputs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .birthday {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .birthday input[type='text'],
  .birthday input[type='date'] {
    flex: 1;
  }
  
  input[type='text'] {
    width: 100%;
    padding: 12px 20px;
    margin: 6px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: Arial, sans-serif;
  }
  
  button[type='submit'] {
    background-color: #9b0f0a;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-family: Arial, sans-serif;
  }
  
  .or {
    text-align: center;
    margin: 10px 0;
  }
  
  .social-buttons button {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  .error {
    color: red;
  }
  </style>