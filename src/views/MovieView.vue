<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieFetch } from '@/composables/useMovieFetch'
import { useWatchlistStore } from '@/stores/watchlist'
import HeroSection from '@/components/HeroSection.vue'
import CastCarousel from '@/components/CastCarousel.vue'
import WatchlistButton from '@/components/WatchlistButton.vue'

const route = useRoute()
const movieId = computed(() => route.params.id)
const { film, chargement, erreur } = useMovieFetch(movieId)

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

const MovieReviewForm = defineAsyncComponent(() => import('@/views/MovieReviewForm.vue'))
</script>

<template>
  <section>
    <p v-if="chargement">Chargement...</p>
    <p v-else-if="erreur">Erreur : {{ erreur }}</p>

    <div v-else-if="film">
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

      <p>{{ film.Plot }}</p>
      <CastCarousel :acteurs="film.Actors" />

      <button v-if="estDansLaListe" @click="showForm = !showForm">
        {{ showForm ? 'Fermer le formulaire' : 'Laisser un avis' }}
      </button>
      <p v-else>Ajoute d'abord ce film a la watchlist pour laisser un avis.</p>

      <MovieReviewForm v-if="showForm" :key="film.imdbID" :film-id="film.imdbID" />
    </div>
  </section>
</template>
