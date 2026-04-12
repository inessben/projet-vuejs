<script setup>
defineProps({
  film: { type: Object, required: true }
})
</script>

<template>
  <section v-if="film" class="hero panel">
    <div class="poster-shell">
      <img
        :src="film.Poster !== 'N/A' ? film.Poster : '/placeholder.png'"
        :alt="film.Title"
        class="hero-image"
      />
    </div>

    <div class="hero-content">
      <div class="hero-copy">
        <div class="hero-title">
          <slot name="title" />
        </div>
        <div class="hero-meta">
          <slot name="meta" />
        </div>
      </div>

      <div class="hero-actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(170px, 240px) minmax(0, 1fr);
  gap: clamp(18px, 3vw, 28px);
  padding: clamp(18px, 3vw, 28px);
  align-items: end;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-hard);
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(255, 122, 69, 0.1), transparent 40%),
    linear-gradient(145deg, var(--surface-strong) 0%, var(--surface) 100%);
}

.poster-shell {
  width: 100%;
  max-width: 240px;
}

.hero-image {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--line);
  background: var(--surface-muted);
}

.hero-content {
  min-width: 0;
  display: grid;
  gap: 18px;
  align-self: stretch;
}

.hero-copy {
  display: grid;
  gap: 10px;
  align-content: end;
}

.hero-title :deep(h1) {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  line-height: 1.08;
  color: var(--text-900);
}

.hero-meta :deep(p) {
  margin: 0;
  color: var(--text-700);
  font-size: 1rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .poster-shell {
    max-width: 190px;
  }

  .hero-content {
    width: 100%;
  }
}
</style>
