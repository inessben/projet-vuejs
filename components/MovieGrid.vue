<script setup>
defineProps({
  films: { type: Array, default: () => [] },
  chargement: Boolean,
  messageVide: { type: String, default: 'Aucun film a afficher' }
})
</script>

<template>
  <div v-if="chargement" class="panel state-box">Chargement des films...</div>
  <p v-else-if="films.length === 0" class="panel state-box">{{ messageVide }}</p>
  <div v-else class="movie-grid">
    <MovieCard v-for="film in films" :key="film.imdbID" :movie="film">
      <template #actions="{ movie }">
        <slot name="actions" :movie="movie" />
      </template>
    </MovieCard>
  </div>
</template>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
}

.state-box {
  margin: 0;
  padding: 18px;
  color: var(--text-700);
}

@media (max-width: 760px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
    gap: 14px;
  }
}
</style>
