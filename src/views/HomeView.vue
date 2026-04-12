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
  if (!q) {
    filmsRecherche.value = []
    return
  }
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
  } catch {}
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
      <p class="eyebrow">Catalogue cinéma</p>
      <h1 class="hero-title">Bienvenue sur <span class="brand-accent">CineTrack</span></h1>
      <p class="hero-subtitle text-muted">
        Cherche un film, construis ta watchlist et garde une trace de tes avis.
      </p>
      <SearchBar v-model="query" @search="(v) => (query = v)" />
    </article>

    <template v-if="query">
      <p v-if="erreur" class="panel state-msg text-muted">Erreur : {{ erreur }}</p>
      <MovieGrid :films="filmsRecherche" :chargement="chargement" message-vide="Aucun film trouvé.">
        <template #actions="{ movie }">
          <WatchlistButton :film="movie" />
        </template>
      </MovieGrid>
    </template>

    <template v-else>
      <section class="quick-grid">
        <RouterLink to="/genre/Action" class="panel quick-card">
          <h2 class="quick-title">Genres</h2>
          <p class="text-muted quick-desc">Parcours les films par univers et ambiance.</p>
        </RouterLink>
        <RouterLink to="/watchlist" class="panel quick-card">
          <h2 class="quick-title">Watchlist</h2>
          <p class="text-muted quick-desc">Retrouve tous les films que tu veux voir.</p>
        </RouterLink>
      </section>

      <section class="popular-section">
        <h2 class="section-title">Films populaires</h2>
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
  gap: 20px;
  padding-bottom: 32px;
}

.hero {
  padding: clamp(22px, 3vw, 36px);
  display: grid;
  gap: 14px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
}

.hero-title {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-900);
}

.brand-accent {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  margin: 0;
  max-width: 55ch;
  line-height: 1.65;
  font-size: 0.97rem;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.quick-card {
  text-decoration: none;
  padding: 20px;
  display: grid;
  gap: 8px;
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.quick-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

.quick-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.quick-title {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-900);
}

.quick-desc {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
}

.popular-section {
  display: grid;
  gap: 16px;
}

.state-msg {
  padding: 18px;
  margin: 0;
  font-size: 0.92rem;
}

@media (max-width: 760px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>
