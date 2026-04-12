<script setup>
defineProps({
  movie: { type: Object, required: true }
})
</script>

<template>
  <article class="movie-card">
    <NuxtLink :to="`/movie/${movie.imdbID}`" class="poster-link">
      <div class="poster-wrapper">
        <img
          v-lazy-image="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'"
          :alt="movie.Title"
          class="poster"
        />
        <div class="poster-overlay">
          <span class="overlay-label">Voir le film</span>
        </div>
      </div>
    </NuxtLink>

    <div class="movie-content">
      <NuxtLink :to="`/movie/${movie.imdbID}`" class="title-link">
        <h3 class="movie-title">{{ movie.Title }}</h3>
      </NuxtLink>
      <p class="movie-year">{{ movie.Year }}</p>
      <div class="movie-actions">
        <slot name="actions" :movie="movie" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  background: var(--surface-strong);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(13, 23, 35, 0.15);
}

.poster-link {
  display: block;
  text-decoration: none;
}

.poster-wrapper {
  position: relative;
  overflow: hidden;
}

.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
  transition: transform 320ms ease;
}

.movie-card:hover .poster {
  transform: scale(1.04);
}

.poster-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 32, 0.72) 0%, transparent 55%);
  display: flex;
  align-items: flex-end;
  padding: 12px;
  opacity: 0;
  transition: opacity var(--transition);
}

.movie-card:hover .poster-overlay {
  opacity: 1;
}

.overlay-label {
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.movie-content {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.title-link {
  text-decoration: none;
  color: var(--text-900);
}

.movie-title {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition);
}

.title-link:hover .movie-title {
  color: var(--accent-strong);
}

.movie-year {
  margin: 0;
  color: var(--text-700);
  font-size: 0.82rem;
}

.movie-actions {
  margin-top: auto;
  padding-top: 8px;
}
</style>
