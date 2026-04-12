import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  if (!userStore.estConnecte) {
    return navigateTo('/login')
  }
})
