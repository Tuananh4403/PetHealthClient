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
import BaseLayout from '../layouts/BaseLayout.vue'
import RecordPage from '../components/RecordPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/button',
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
      path: '/petListP',
      name: 'PetListP',
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
      path: '/',
      component: BaseLayout,
      children: [
        { path: 'petlistModal', component: BaseLayout },
        // Add more routes as needed
      ],
      
    },
    {
      path: '/',
      component: () => import('../layouts//BaseLayout.vue'),
      children: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: { roles: ['Admin'] }
        },
        // Pages
        {
          name: 'Home',
          path: '/home',
          component: () => import('../views/Home.vue'),
        },
        {
          name: 'medicalHistory',
          path: '/medicalHistory',
          component: () => import('../views/MedicalHistory.vue'),
        },
        {
          name: 'PetList',
          path: '/pet-list',
          component: () => import('../views/PetList.vue'),
        },
        {
          name: 'VaccineCalendar',
          path: '/vaccine-calendar',
          component: () => import('../views/VaccineCalendar.vue'),
        },
        {
          name: 'Kennel',
          path: '/kennel',
          component: () => import('../views/Kennel.vue'),
        },
        {
          name: 'Service',
          path: '/service',
          component: () => import('../views/Service.vue'),
        },   
        {
          name: 'ManageDoctor',
          path: '/manage-doctor',
          component: () => import('../views/ManageDoctor.vue'),
        },
        {
          name: 'ManageStaff',
          path: '/manage-staff',
          component: () => import('../views/ManageStaff.vue'),
        },   
      ],
    },
  ]
})

export default router
