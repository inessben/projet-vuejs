<script setup>
import MovieCard from '@/components/MovieCard.vue'

defineProps({
  films: { type: Array, default: () => [] },
  chargement: Boolean,
  messageVide: { type: String, default: 'Aucun film à afficher' }
})
</script>

<template>
  <div v-if="chargement">Chargement...</div>
  <p v-else-if="films.length === 0">{{ messageVide }}</p>
  <div v-else style="display: grid">
    <MovieCard v-for="film in films" :key="film.imdbID" :movie="film">
      <template #actions="{ movie }">
        <slot name="actions" :movie="movie" />
      </template>
    </MovieCard>
  </div>
</template>

<style scoped></style>
