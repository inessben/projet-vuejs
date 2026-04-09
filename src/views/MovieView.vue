<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieFetch } from '@/composables/useMovieFetch'
import HeroSection from '@/components/HeroSection.vue'
import CastCarousel from '@/components/CastCarousel.vue'

const route = useRoute()
const movieId = computed(() => route.params.id)
const { film, chargement, erreur } = useMovieFetch(movieId)
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
          <p>{{ film.Year }} · {{ film.Runtime }} · {{ film.imdbRating }}/10</p>
        </template>

        <template #actions>
          <p>Bouton watchlist à brancher quand WatchlistButton sera prêt.</p>
        </template>
      </HeroSection>

      <p>{{ film.Plot }}</p>

      <CastCarousel :acteurs="film.Actors" />
    </div>
  </section>
</template>

<style scoped></style>
