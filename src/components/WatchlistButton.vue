<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWatchlistStore } from '@/stores/watchlist'
import { useUserStore } from '@/stores/user'
import { useToast } from '@/composables/useToast'

const props = defineProps({ film: Object })
const store = useWatchlistStore()
const userStore = useUserStore()
const { showToast } = useToast()
const router = useRouter()
const route = useRoute()

const dansLaListe = computed(() => store.estDansLaListe(props.film.imdbID))

function basculer() {
  if (!userStore.estConnecte) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
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
