<template>
  <div class="container-pet-list-page">
    <h2>List of your pets</h2>
    <div class="pet-list">
      <div class="pet-header">
        <div class="pet-col">No</div>
        <div class="pet-col">Pet Name</div>
        <div class="pet-col">Kind of pet</div>
        <div class="pet-col">Gender</div>
        <div class="pet-col">Birthday</div>
        <div class="pet-col">Actions</div>
      </div>
      <div class="pet-row" v-for="(pet, index) in pets" :key="index">
        <div class="pet-col">{{ index + 1 }}</div>
        <div class="pet-col pet-name">
          <div class="pet-image">
            <img v-if="pet.image" :src="pet.image" :alt="pet.name" />
          </div>
          <a @click.prevent="showInforPetModal(pet)" class="pet-link">{{ pet.name }}</a>
        </div>
        <div class="pet-col">{{ pet.kind }}</div>
        <div class="pet-col">{{ pet.gender }}</div>
        <div class="pet-col">{{ pet.birthday }}</div>
        <div class="pet-col">
          <button class="btn btn-primary" @click="showUpdateModal = true">Update</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" v-if="showUpdateModal">    
    <pet-list-modal   @close-modal="showUpdateModal = false" />
  </div>
  <div class="modal" v-if="showInforPetModal" :pet="selectedPet">    
    <infor-pet-modal  @close-modal="closeInforPetModal = false"/>
  </div>
  
</template>

<script>
import PetListModal from '../components/PetListModal.vue'
import InforPetModal from '../components/InforPetModal.vue'

export default {
  data() {
    return {
      pets: [
        {
          name: 'Buddy',
          kind: 'Dog',
          gender: 'Male',
          birthday: '2020-01-01',
          image: 'https://example.com/pet-a.png'
        },
        {
          name: 'Mittens',
          kind: 'Cat',
          gender: 'Female',
          birthday: '2019-05-05',
          image: 'https://example.com/pet-a.png'
        },
        {
          name: 'Goldie',
          kind: 'Fish',
          gender: 'Male',
          birthday: '2021-07-07',
          image: 'https://example.com/pet-a.png'
        }
      ],
      showUpdateModal: false,
      showInforPetModal: false,
      selectedPet: null
    }
  },

  components: {
    PetListModal,
    InforPetModal
  },

  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    showInforPetModal(pet) {
      this.selectedPet = pet
      this.showInforPetModal = true
    }
  }
}
</script>

<style scoped>
.container-pet-list-page {
  padding: 0px 15px;
}

.pet-list {
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.pet-header {
  display: flex;
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.pet-row {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.pet-col {
  flex: 1;
}

.pet-name {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pet-image {
  width: 35px;
  height: 35px;
  background-color: #ccc;
}
</style>
