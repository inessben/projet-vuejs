<script setup>
import { ref, watch } from 'vue'
import { searchMovies } from '@/services/omdb'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import SearchBar from '@/components/SearchBar.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import MovieGrid from '@/components/MovieGrid.vue'
import WatchlistButton from '@/components/WatchlistButton.vue'

const query = ref('')
const films = ref([])
const filmsFiltres = ref([])
const page = ref(1)
const chargement = ref(false)
const erreur = ref(null)
const anneeFiltre = ref('')

watch(query, async (q) => {
  if (!q) {
    films.value = []
    filmsFiltres.value = []
    return
  }
  page.value = 1
  chargement.value = true
  erreur.value = null
  try {
    const data = await searchMovies(q, 1)
    films.value = data.Search ?? []
    appliquerFiltres()
  } catch (e) {
    erreur.value = e.message
  } finally {
    chargement.value = false
  }
})

function appliquerFiltres() {
  filmsFiltres.value = anneeFiltre.value
    ? films.value.filter((f) => f.Year === anneeFiltre.value)
    : [...films.value]
}

function onFilterChange({ year }) {
  anneeFiltre.value = year
  appliquerFiltres()
}

useInfiniteScroll(async () => {
  if (!query.value || chargement.value) return
  page.value++
  try {
    const data = await searchMovies(query.value, page.value)
    const nouveaux = data.Search ?? []
    films.value.push(...nouveaux)
    appliquerFiltres()
  } catch { }
})
</script>

<template>
  <section class="page search-view">
    <header class="panel header">
      <h1 class="section-title">Recherche</h1>
      <SearchBar v-model="query" @search="(v) => (query = v)" />
    </header>

    <FilterPanel @filter-change="onFilterChange" />

    <p v-if="erreur" class="text-muted panel state-msg">Erreur : {{ erreur }}</p>

    <MovieGrid
      :films="query ? filmsFiltres : []"
      :chargement="chargement"
      :message-vide="query ? 'Aucun film trouvé pour cette recherche.' : 'Entrez un titre pour commencer la recherche.'"
    >
      <template #actions="{ movie }">
        <WatchlistButton :film="movie" />
      </template>
    </MovieGrid>
  </section>
</template>

<style scoped>
.search-view {
  display: grid;
  gap: 16px;
  padding-bottom: 24px;
}

.header {
  padding: 18px;
  display: grid;
  gap: 14px;
}

.header h1 {
  margin: 0;
}

.state-msg {
  padding: 18px;
  margin: 0;
}
</style>
