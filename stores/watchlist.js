import { defineStore } from 'pinia'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    items: []
  }),

  getters: {
    estDansLaListe: (state) => (id) => state.items.some((i) => i.movie.imdbID === id),
    getAvis: (state) => (id) => state.items.find((i) => i.movie.imdbID === id)
  },

  actions: {
    ajouter(film) {
      if (this.estDansLaListe(film.imdbID)) return
      this.items.push({
        movie: film,
        watched: false,
        rating: null,
        comment: '',
        addedAt: Date.now()
      })
    },

    retirer(id) {
      this.items = this.items.filter((i) => i.movie.imdbID !== id)
    },

    toggleVu(id) {
      const i = this.items.find((i) => i.movie.imdbID === id)
      if (i) i.watched = !i.watched
    },

    enregistrerAvis(id, { rating, comment }) {
      const i = this.items.find((i) => i.movie.imdbID === id)
      if (!i) return false
      i.rating = rating
      i.comment = comment
      return true
    },

    charger(items) {
      this.items = items ? [...items] : []
    },

    vider() {
      this.items = []
    }
  },

  persist: false
})
