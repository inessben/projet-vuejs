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
      <slot name="title" />
      <slot name="meta" />
      <slot name="actions" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 320px;
  border-radius: 12px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 20px;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
</style>
