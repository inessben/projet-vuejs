import { ref, watch } from 'vue'
import { getMovieById } from '@/services/omdb'

export function useMovieFetch(idRef, fetcher = getMovieById) {
  const film = ref(null)
  const chargement = ref(false)
  const erreur = ref(null)

  watch(
    idRef,
    async (id) => {
      if (!id) {
        film.value = null
        erreur.value = null
        chargement.value = false
        return
      }

      chargement.value = true
      erreur.value = null

      try {
        film.value = await fetcher(id)
      } catch (e) {
        film.value = null
        erreur.value = e instanceof Error ? e.message : 'Erreur inconnue'
      } finally {
        chargement.value = false
      }
    },
    { immediate: true }
  )

  return { film, chargement, erreur }
}
