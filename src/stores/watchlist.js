import { defineStore } from 'pinia'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    // Chaque item : { movie, watched, rating, comment, addedAt }
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
    }
  },

  persist: true
})
