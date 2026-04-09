<script setup>
import { computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
import { useToast } from '@/composables/useToast'
const props = defineProps({ film: Object })
const store = useWatchlistStore()
const { showToast } = useToast()
const dansLaListe = computed(() => store.estDansLaListe(props.film.imdbID))
function basculer() {
  if (dansLaListe.value) {
    store.retirer(props.film.imdbID)
    showToast('Film retiré de la watchlist')
  } else {
    store.ajouter(props.film)
    showToast('Film ajouté à la watchlist !')
  }
}
</script>
<template>
  <button @click="basculer">{{ dansLaListe ? 'Retirer' : '+ Watchlist' }}</button>
</template>
