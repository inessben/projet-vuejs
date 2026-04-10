<script setup>
import { computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
import { useAuthStore } from '@/stores/auth'

const store = useWatchlistStore()
const authStore = useAuthStore()

const stats = computed(() => {
  const vus = store.items.filter((item) => item.watched)
  const notes = vus.filter((item) => typeof item.rating === 'number')
  const moyenne = notes.length
    ? (notes.reduce((somme, item) => somme + item.rating, 0) / notes.length).toFixed(1)
    : '0.0'

  return {
    total: store.items.length,
    vus: vus.length,
    moyenne
  }
})

const displayName = computed(() => authStore.user?.name || 'Utilisateur')
const displayEmail = computed(() => authStore.user?.email || '')
</script>

<template>
  <section class="page profile-view">
    <header class="panel header">
      <h1 class="section-title">Profil</h1>
      <p class="text-muted">Bienvenue {{ displayName }}.</p>
      <p class="text-muted">{{ displayEmail }}</p>
    </header>

    <section class="stats-grid">
      <article class="panel stat-card">
        <p class="label">Films dans la liste</p>
        <p class="value">{{ stats.total }}</p>
      </article>

      <article class="panel stat-card">
        <p class="label">Films vus</p>
        <p class="value">{{ stats.vus }}</p>
      </article>

      <article class="panel stat-card">
        <p class="label">Note moyenne</p>
        <p class="value">{{ stats.moyenne }}/5</p>
      </article>
    </section>
  </section>
</template>

<style scoped>
.profile-view {
  display: grid;
  gap: 16px;
}

.header {
  padding: 18px;
}

.header p {
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat-card {
  padding: 16px;
}

.label {
  margin: 0 0 8px;
  color: var(--text-700);
  font-size: 0.9rem;
}

.value {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.55rem, 3vw, 2rem);
}

@media (max-width: 760px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
