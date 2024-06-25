import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import MainPage_2 from '../components/MainPage_2.vue'
import BookingModal from '../components/BookingModal.vue'
import PetListPage from '../pages/PetListPage.vue'
import PetListModal from '../components/PetListModal.vue'
import CreatePet from '../components/CreatePet.vue'
import UpdatePet from '@/pages/customer/UpdatePet.vue' 
import DeletePet from '../pages/customer/DeletePet.vue'
import UpdateBooking from '../pages/customer/UpdateBooking.vue'
import BaseLayout from '../layouts/BaseLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/main',
      name: 'mainP',
      component: MainPage_2
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingModal
    },
    {
      path: '/petList',
      name: 'petList',
      component: PetListPage
    },
    {
      path: '/petlistModal',
      name: 'petListModal',
      component: PetListModal
    },
    {
      path: '/createPet',
      name: 'createPet',
      component: CreatePet
    },
    {
      path: '/updatePet',
      name: 'updatePet',
      component: UpdatePet
    },
    {
      path: '/deletePet',
      name: 'deletePet',
      component: DeletePet
    },
    {
      path: '/updateBooking',
      name: 'updateBooking',
      component: UpdateBooking
    },
  ]
})

export default router
