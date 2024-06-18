import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import MainPage_2 from '../components/MainPage_2.vue'
import BookingModal from '../components/BookingModal.vue'
import PetListPage from '../pages/PetListPage.vue'
import PetListModal from '../components/PetListModal.vue'
import RecordPage from '../components/RecordPage.vue'
import InforPetModal from '../components/InforPetModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/main',
      name: 'MainP',
      component: MainPage_2
    },
    {
      path: '/booking',
      name: 'Booking',
      component: BookingModal
    },
    {
      path: '/petList',
      name: 'PetList',
      component: PetListPage
    },
    {
      path: '/petlistModal',
      name: 'PetListModal',
      component: PetListModal
    },
    {
      path: '/record',
      name: 'Record',
      component: RecordPage
    },
    {
      path: '/inforPet',
      name: 'InforPet',
      component: InforPetModal
    },
  ]
})

export default router
