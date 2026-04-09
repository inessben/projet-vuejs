<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const genre = computed(() => route.params.id || 'inconnu')
</script>

<template>
  <section class="page genre-view">
    <article class="panel hero">
      <p class="eyebrow">Exploration</p>
      <h1 class="section-title">Genre: {{ genre }}</h1>
      <p class="text-muted">
        Cette vue est prete pour recevoir la liste de films filtres par genre via l'API.
      </p>
    </article>
  </section>
</template>

<style scoped>
.genre-view {
  display: grid;
}

.hero {
  padding: 18px;
  display: grid;
  gap: 10px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: var(--text-700);
  font-weight: 700;
}

.hero p {
  margin: 0;
}
</style>
