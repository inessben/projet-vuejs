import { watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { useAccountsStore } from '~/stores/accounts'
import { useWatchlistStore } from '~/stores/watchlist'

export default defineNuxtPlugin(() => {
  const userStore = useUserStore()
  const accountsStore = useAccountsStore()
  const watchlistStore = useWatchlistStore()

  watch(
    () => watchlistStore.items,
    (items) => {
      if (userStore.id) {
        accountsStore.sauvegarderWatchlist(userStore.id, items)
      }
    },
    { deep: true }
  )
})
