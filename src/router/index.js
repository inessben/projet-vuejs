import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/WatchList.vue')
    },
    {
      path: '/genre/:id',
      component: () => import('../views/GenreView.vue')
    },
    {
      path: '/profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
