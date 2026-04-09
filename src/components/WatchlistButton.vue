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
    showToast('Film retire de la watchlist')
  } else {
    store.ajouter(props.film)
    showToast('Film ajoute a la watchlist !')
  }
}
</script>

<template>
  <button class="btn" :class="dansLaListe ? 'btn-secondary' : 'btn-primary'" @click="basculer">
    {{ dansLaListe ? 'Retirer' : '+ Watchlist' }}
  </button>
</template>
