<script setup>
import { ref, watch, onMounted } from 'vue'
import { searchMovies, searchByGenre } from '@/services/omdb'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import SearchBar from '@/components/SearchBar.vue'
import MovieGrid from '@/components/MovieGrid.vue'
import WatchlistButton from '@/components/WatchlistButton.vue'

const query = ref('')
const filmsRecherche = ref([])
const page = ref(1)
const chargement = ref(false)
const erreur = ref(null)

watch(query, async (q) => {
  if (!q) { filmsRecherche.value = []; return }
  page.value = 1
  chargement.value = true
  erreur.value = null
  try {
    const data = await searchMovies(q, 1)
    filmsRecherche.value = data.Search ?? []
  } catch (e) {
    erreur.value = e.message
  } finally {
    chargement.value = false
  }
})

useInfiniteScroll(async () => {
  if (!query.value || chargement.value) return
  page.value++
  try {
    const data = await searchMovies(query.value, page.value)
    filmsRecherche.value.push(...(data.Search ?? []))
  } catch { }
})

const filmsPopulaires = ref([])
const chargementPopulaires = ref(false)

onMounted(async () => {
  chargementPopulaires.value = true
  try {
    const data = await searchByGenre('action')
    filmsPopulaires.value = data.Search ?? []
  } finally {
    chargementPopulaires.value = false
  }
})
</script>

<template>
  <section class="page home-view">

    <article class="panel hero">
      <p class="eyebrow">Catalogue cinema</p>
      <h1 class="section-title title">Bienvenue sur CineTrack</h1>
      <p class="text-muted subtitle">
        Cherche un film, crée ta watchlist et garde une trace de tes avis.
      </p>
      <SearchBar v-model="query" @search="(v) => (query = v)" />
    </article>

    <template v-if="query">
      <p v-if="erreur" class="panel state-msg text-muted">Erreur : {{ erreur }}</p>
      <MovieGrid
        :films="filmsRecherche"
        :chargement="chargement"
        message-vide="Aucun film trouvé."
      >
        <template #actions="{ movie }">
          <WatchlistButton :film="movie" />
        </template>
      </MovieGrid>
    </template>

    <template v-else>
      <section class="quick-grid">
        <RouterLink to="/genre/Action" class="panel quick-card">
          <h2>Genres</h2>
          <p class="text-muted">Parcours les films par univers et ambiance.</p>
        </RouterLink>
        <RouterLink to="/watchlist" class="panel quick-card">
          <h2>Watchlist</h2>
          <p class="text-muted">Retrouve tous les films que tu veux voir.</p>
        </RouterLink>
      </section>

      <section class="popular-section">
        <h2 class="section-title popular-title">Films populaires</h2>
        <MovieGrid
          :films="filmsPopulaires"
          :chargement="chargementPopulaires"
          message-vide="Aucun film populaire disponible."
        >
          <template #actions="{ movie }">
            <WatchlistButton :film="movie" />
          </template>
        </MovieGrid>
      </section>
    </template>

  </section>
</template>

<style scoped>
.home-view {
  display: grid;
  gap: 18px;
  padding-bottom: 24px;
}

.hero {
  padding: clamp(18px, 3vw, 28px);
  display: grid;
  gap: 14px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-700);
  font-size: 0.78rem;
  font-weight: 700;
}

.title {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
}

.subtitle {
  margin: 0;
  max-width: 65ch;
  line-height: 1.65;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.quick-card {
  text-decoration: none;
  padding: 16px;
  transition: transform 180ms ease;
}

.quick-card:hover {
  transform: translateY(-3px);
}

.quick-card h2 {
  margin: 0 0 8px;
  font-family: 'Fraunces', serif;
}

.quick-card p {
  margin: 0;
}

.popular-title {
  margin-bottom: 16px;
}

.popular-section {
  display: grid;
  gap: 16px;
}

.state-msg {
  padding: 18px;
  margin: 0;
}

@media (max-width: 760px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>
