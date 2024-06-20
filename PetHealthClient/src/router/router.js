import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import MainPage_2 from '../components/MainPage_2.vue'
import BookingModal from '../components/BookingModal.vue'
import PetListPage from '../pages/PetListPage.vue'
import PetListModal from '../components/PetListModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/button',
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
      path: '/petListP',
      name: 'petList',
      component: PetListPage
    },
    {
      path: '/petlistModal',
      name: 'petListModal',
      component: PetListModal
    },
    // {
    //   path: '/baseLayout',
    //   name: 'baseLayout',
    //   component: BaseLayout
    // },
    {
      // path: '/',
      // component: BaseLayout,
      // children: [
      //   { path: 'petlistModal', component: BaseLayout },
      //   // Add more routes as needed
      // ],
    },
    {
      path: '/',
      component: () => import('../layouts//BaseLayout.vue'),
      children: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('../views/Dashboard.vue'),
        },
        // Pages
        {
          name: 'Home',
          path: '/home',
          component: () => import('../views/Home.vue'),
        },
        {
          name: 'MedicalHistory',
          path: '/medicalHistory',
          component: () => import('../views/MedicalHistory.vue'),
        },
        {
          name: 'PetList',
          path: '/petList',
          component: () => import('../views/PetList.vue'),
        },
        {
          name: 'VaccineCalendar',
          path: '/vaccineCalendar',
          component: () => import('../views/VaccineCalendar.vue'),
        },
        {
          name: 'Kennel',
          path: '/kennel',
          component: () => import('../views/Kennel.vue'),
        },
        // Maps
        {
          name: 'Service',
          path: '/service',
          component: () => import('../views/Service.vue'),
        },      
      ],
    },
  ]
})

export default router
