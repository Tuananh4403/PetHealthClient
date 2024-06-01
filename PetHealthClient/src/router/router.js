import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import LoginPage from '../components/auth/LoginPage.vue'
import RegisterPage from '../components/auth/RegisterPage.vue'
import MainPage_2 from '../components/MainPage_2.vue'
import BookingModal from '../components/BookingModal.vue'

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
  ]
})

export default router
