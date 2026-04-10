import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/movie/:id',
      component: () => import('../views/MovieView.vue')
    },
    {
      path: '/person/:id',
      component: () => import('../views/PersonView.vue')
    },
    {
      path: '/watchlist',
      component: () => import('../views/WatchList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/genre/:id',
      component: () => import('../views/GenreView.vue')
    },
    {
      path: '/profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: ()=> import ('../views/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      component: ()=> import('../views/RegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return '/profile'
  }
})

export default router
