import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'
import MainPage from '../components/MainPage.vue'
import BookingModal from '../components/BookingModal.vue'
import PetListPage from '../pages/PetListPage.vue'
import CreatePet from '../components/CreatePet.vue'
import UpdatePet from '@/pages/customer/UpdatePet.vue' 
import DeletePet from '../pages/customer/DeletePet.vue'
import RecordPage from '../components/RecordPage.vue'
import store  from "@/store/store";
import BookingList from '../views/BookingList.vue'

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
      path: '/customer',
      meta: { requiresAuth: true, role: ['Customer']},
      children: [
        {
          path: 'updatePet',
          name: 'updatePet',
          component: UpdatePet
        },
        {
          path: 'createPet',
          name: 'createPet',
          component: CreatePet,
          // meta: { requiresAuth: true }
        },
        {
          path: 'booking',
          name: 'Booking',
          component: BookingModal
        },
        {
          path: 'main',
          name: 'main',
          component: MainPage
        },
        {
          path: 'petListP',
          name: 'PetListP',
          component: PetListPage
        },
        {
          path: 'deletePet',
          name: 'deletePet',
          component: DeletePet
        },
      ],
      
    },
    
    {
      path: '/doctor',
      meta: { requiresAuth: true, role: ['Doctor']},
      children: [
        {
          path: 'record',
          name: 'Record',
          component: RecordPage
        },
        // Add more routes as needed
      ],
      
    },
    {
      path: '/staff',
      meta: { requiresAuth: true, role: ['Staff']},
      children: [
        {
          path: '/listBooking',
          name: 'listBooking',
          component: BookingList
        },
        // Add more routes as needed
      ],
      
    },
    {
      path: '/admin',
      // component: () => import('../layouts//BaseLayout.vue'),
      meta: { requiresAuth: true, role: ['Admin']},
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
          name: 'MedicalHistory',
          path: '/medical-history',
          component: () => import('../views/MedicalHistory.vue'),
        },
        {
          name: 'PetListP',
          path: '/petListP',
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' }); // Redirect to login if not authenticated
    } else {
      const userRoles = store.getters.roles;
      const requiredRoles = to.meta.roles;
      if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
        next({ name: 'Home' }); // Redirect to home if user lacks required role
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router
