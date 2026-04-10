import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/search',
      redirect: '/',
    },
    {
      path: '/movie/:id',
      component: () => import('../views/MovieView.vue'),
    },
    {
      path: '/person/:id',
      component: () => import('../views/PersonView.vue'),
    },
    {
      path: '/watchlist',
      component: () => import('../views/WatchList.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/genre/:id',
      component: () => import('../views/GenreView.vue'),
    },
    {
      path: '/profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.estConnecte) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && userStore.estConnecte) {
    return { path: '/profile' }
  }
})

export default router
