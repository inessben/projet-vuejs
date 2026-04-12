import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    watchlistsParUtilisateur: {}
  }),
  actions: {
    sauvegarderWatchlist(userId, items) {
      this.watchlistsParUtilisateur[userId] = [...items]
    },
    chargerWatchlist(userId) {
      return this.watchlistsParUtilisateur[userId] ?? []
    }
  },
  persist: true
})
