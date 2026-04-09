<script setup>
defineProps({
  movie: { type: Object, required: true }
})
</script>

<template>
  <article class="movie-card">
    <img
      v-lazy-image="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'"
      :alt="movie.Title"
      class="poster"
    />
    <RouterLink :to="`/movie/${movie.imdbID}`" class="title-link">
      <h3>{{ movie.Title }}</h3>
    </RouterLink>
    <p>{{ movie.Year }}</p>

    <slot name="actions" :movie="movie" />
  </article>
</template>

<style scoped>
.movie-card {
  display: grid;
  gap: 8px;
}

.poster {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.title-link {
  text-decoration: none;
  color: inherit;
}
</style>
