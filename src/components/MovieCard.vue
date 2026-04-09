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

    <div class="movie-content">
      <RouterLink :to="`/movie/${movie.imdbID}`" class="title-link">
        <h3>{{ movie.Title }}</h3>
      </RouterLink>
      <p class="movie-year">{{ movie.Year }}</p>
      <div class="movie-actions">
        <slot name="actions" :movie="movie" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.movie-card {
  display: grid;
  gap: 12px;
  background: var(--surface-strong);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transform: translateY(0);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 30px rgba(20, 29, 44, 0.18);
}

.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.movie-content {
  padding: 0 14px 14px;
  display: grid;
  gap: 8px;
}

.title-link {
  text-decoration: none;
  color: var(--text-900);
}

.title-link h3 {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.35;
}

.movie-year {
  margin: 0;
  color: var(--text-700);
  font-size: 0.93rem;
}

.movie-actions {
  margin-top: 4px;
}
</style>
