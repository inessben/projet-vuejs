import { defineStore } from 'pinia'
import { hashPassword } from '@/utils/crypto'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    comptes: []
  }),

  getters: {
    usernameDejaUtilise: (state) => (username) =>
      state.comptes.some((c) => c.username.toLowerCase() === username.toLowerCase()),

    trouverParUsername: (state) => (username) =>
      state.comptes.find((c) => c.username.toLowerCase() === username.toLowerCase())
  },

  actions: {
    async inscrire({ username, email, password }) {
      if (this.usernameDejaUtilise(username)) {
        return { ok: false, erreur: "Ce nom d'utilisateur est déjà pris." }
      }

      const passwordHash = await hashPassword(password)
      const compte = {
        id: crypto.randomUUID(),
        username: username.trim(),
        email: email.trim(),
        passwordHash,
        watchlistItems: [],
        createdAt: Date.now()
      }

      this.comptes.push(compte)
      return { ok: true, compte }
    },

    async verifierConnexion({ username, password }) {
      const compte = this.trouverParUsername(username)
      if (!compte) {
        return { ok: false, erreur: "Nom d'utilisateur introuvable." }
      }

      const hashSaisi = await hashPassword(password)
      if (hashSaisi !== compte.passwordHash) {
        return { ok: false, erreur: 'Mot de passe incorrect.' }
      }

      return { ok: true, compte }
    },

    mettreAJourEmail(id, email) {
      const compte = this.comptes.find((c) => c.id === id)
      if (compte) compte.email = email.trim()
    },

    sauvegarderWatchlist(id, items) {
      const compte = this.comptes.find((c) => c.id === id)
      if (compte) compte.watchlistItems = [...items]
    }
  },

  persist: true
})
