<script setup>
import { ref, computed, watch } from 'vue'
import { useWatchlistStore } from '~/stores/watchlist'

const route = useRoute()
const { getMovieById } = useOmdb()
const movieId = computed(() => route.params.id)
const { film, chargement, erreur } = useMovieFetch(movieId, getMovieById)

const showForm = ref(false)
const watchlistStore = useWatchlistStore()

const estDansLaListe = computed(() =>
  film.value ? watchlistStore.estDansLaListe(film.value.imdbID) : false
)

watch(movieId, () => {
  showForm.value = false
})

watch(estDansLaListe, (dansLaListe) => {
  if (!dansLaListe) showForm.value = false
})
</script>

<template>
  <section class="page movie-view">
    <p v-if="chargement" class="panel state-box">Chargement...</p>
    <p v-else-if="erreur" class="panel state-box state-error">Erreur : {{ erreur }}</p>

    <div v-else-if="film" class="movie-layout">
      <HeroSection :film="film">
        <template #title>
          <h1>{{ film.Title }}</h1>
        </template>
        <template #meta>
          <p>{{ film.Year }} - {{ film.Runtime }} - {{ film.imdbRating }}/10</p>
        </template>
        <template #actions>
          <WatchlistButton :film="film" />
        </template>
      </HeroSection>

      <article class="panel story-block">
        <h2 class="section-title">Synopsis</h2>
        <p class="text-muted">{{ film.Plot }}</p>
      </article>

      <CastCarousel :acteurs="film.Actors" />

      <button v-if="estDansLaListe" class="btn btn-secondary" @click="showForm = !showForm">
        {{ showForm ? 'Fermer le formulaire' : 'Laisser un avis' }}
      </button>
      <p v-else class="text-muted">Ajoute d'abord ce film a la watchlist pour laisser un avis.</p>

      <MovieReviewForm v-if="showForm" :key="film.imdbID" :film-id="film.imdbID" />
    </div>
  </section>
</template>

<style scoped>
.movie-view {
  display: grid;
  gap: 18px;
}

.movie-layout {
  display: grid;
  gap: 18px;
}

.state-box {
  margin: 0;
  padding: 16px;
}

.state-error {
  color: var(--danger);
}

.story-block {
  padding: 18px;
}

.story-block p {
  margin: 0;
  line-height: 1.7;
}
</style>
