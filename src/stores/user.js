import { defineStore } from 'pinia'
import { useAccountsStore } from '@/stores/accounts'
import { useWatchlistStore } from '@/stores/watchlist'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: '',
    email: '',
    estConnecte: false
  }),

  getters: {
    initiales: (state) => {
      if (!state.username) return '?'
      return state.username.slice(0, 2).toUpperCase()
    }
  },

  actions: {
    ouvrirSession({ id, username, email }) {
      this.id = id
      this.username = username
      this.email = email
      this.estConnecte = true

      const accountsStore = useAccountsStore()
      const watchlistStore = useWatchlistStore()
      const compte = accountsStore.comptes.find((c) => c.id === id)
      watchlistStore.charger(compte?.watchlistItems ?? [])
    },

    fermerSession() {
      const accountsStore = useAccountsStore()
      const watchlistStore = useWatchlistStore()

      if (this.id) {
        accountsStore.sauvegarderWatchlist(this.id, watchlistStore.items)
      }

      watchlistStore.vider()

      this.id = null
      this.username = ''
      this.email = ''
      this.estConnecte = false
    },

    mettreAJourEmail(email) {
      this.email = email.trim()
    }
  },

  persist: true
})
