<script setup>
defineProps({
  film: { type: Object, required: true }
})
</script>

<template>
  <section v-if="film" class="hero">
    <img
      :src="film.Poster !== 'N/A' ? film.Poster : '/placeholder.png'"
      :alt="film.Title"
      class="hero-image"
    />
    <div class="hero-overlay">
      <div class="hero-title">
        <slot name="title" />
      </div>
      <div class="hero-meta">
        <slot name="meta" />
      </div>
      <div class="hero-actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 360px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-hard);
  border: 1px solid rgba(255, 255, 255, 0.32);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.05);
}

.hero-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: clamp(16px, 3vw, 26px);
  display: grid;
  gap: 10px;
  color: #fff;
  background: linear-gradient(to top, rgba(9, 15, 22, 0.86), rgba(9, 15, 22, 0.15));
}

.hero-title :deep(h1) {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.55rem, 3vw, 2.5rem);
  line-height: 1.1;
}

.hero-meta :deep(p) {
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1rem;
}

.hero-actions :deep(button) {
  margin-top: 4px;
}

@media (max-width: 760px) {
  .hero {
    min-height: 300px;
  }
}
</style>
