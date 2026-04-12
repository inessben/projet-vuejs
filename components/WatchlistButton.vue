<script setup>
import { computed, ref } from 'vue'
import { useWatchlistStore } from '~/stores/watchlist'
import { useUserStore } from '~/stores/user'

const props = defineProps({ film: Object })
const store = useWatchlistStore()
const userStore = useUserStore()
const { showToast } = useToast()
const router = useRouter()
const route = useRoute()
const { getMovieById } = useOmdb()
const chargement = ref(false)

const dansLaListe = computed(() => store.estDansLaListe(props.film.imdbID))

async function basculer() {
  if (chargement.value) return

  if (!userStore.estConnecte) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }

  if (dansLaListe.value) {
    store.retirer(props.film.imdbID)
    showToast('Film retire de la watchlist')
  } else {
    chargement.value = true
    try {
      const filmComplet = await getMovieById(props.film.imdbID)
      store.ajouter(filmComplet)
      showToast('Film ajoute a la watchlist !')
    } catch {
      store.ajouter(props.film)
      showToast('Film ajoute a la watchlist (infos partielles).', 'error')
    } finally {
      chargement.value = false
    }
  }
}
</script>

<template>
  <button class="btn" :class="dansLaListe ? 'btn-secondary' : 'btn-primary'" :disabled="chargement" @click="basculer">
    {{ chargement ? 'Ajout...' : dansLaListe ? 'Retirer' : '+ Watchlist' }}
  </button>
</template>
