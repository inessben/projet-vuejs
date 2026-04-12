<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { useWatchlistStore } from '~/stores/watchlist'

definePageMeta({ middleware: 'auth' })

const router = useRouter()
const userStore = useUserStore()
const watchlistStore = useWatchlistStore()

const stats = computed(() => {
  const vus = watchlistStore.items.filter((i) => i.watched)
  const notes = vus.filter((i) => typeof i.rating === 'number').map((i) => i.rating)
  const moyenne = notes.length ? (notes.reduce((s, n) => s + n, 0) / notes.length).toFixed(1) : null

  const compteurGenres = {}
  watchlistStore.items.forEach((i) => {
    i.movie.Genre?.split(',').forEach((g) => {
      const genre = g.trim()
      if (genre) compteurGenres[genre] = (compteurGenres[genre] ?? 0) + 1
    })
  })
  const genresTries = Object.entries(compteurGenres).sort((a, b) => b[1] - a[1])
  const genreFavori = genresTries[0]?.[0] ?? null
  const topGenres = genresTries.slice(0, 3).map(([nom, total]) => ({ nom, total }))
  const progression = watchlistStore.items.length
    ? Math.round((vus.length / watchlistStore.items.length) * 100)
    : 0

  return {
    total: watchlistStore.items.length,
    vus: vus.length,
    moyenne,
    genreFavori,
    topGenres,
    progression
  }
})

const modeEdition = ref(false)
const champEmail = ref('')
const erreurEmail = computed(() => {
  if (!champEmail.value) return 'Email requis.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champEmail.value)) return 'Email invalide.'
  return ''
})

function ouvrirEdition() {
  champEmail.value = userStore.email
  modeEdition.value = true
}

function enregistrerEmail() {
  if (erreurEmail.value) return
  userStore.mettreAJourEmail(champEmail.value)
  modeEdition.value = false
}

function seDeconnecter() {
  userStore.fermerSession()
  router.push('/login')
}
</script>

<template>
  <section class="page profile-view">
    <article class="panel identity-card">
      <div class="avatar-wrap">
        <div class="avatar">{{ userStore.initiales }}</div>
      </div>
      <div class="identity-info">
        <h1 class="section-title identity-name">@{{ userStore.username }}</h1>
        <p class="text-muted identity-email">{{ userStore.email }}</p>
      </div>
      <div class="identity-actions">
        <button class="btn btn-secondary" @click="ouvrirEdition">Modifier email</button>
        <button class="btn btn-danger" @click="seDeconnecter">Se deconnecter</button>
      </div>
    </article>

    <Transition name="slide">
      <article v-if="modeEdition" class="panel edit-card">
        <h2 class="edit-title">Modifier l'email</h2>
        <p class="text-muted edit-note">Le nom d'utilisateur ne peut pas etre change.</p>
        <form class="edit-form" @submit.prevent="enregistrerEmail">
          <div class="field">
            <label class="field-label" for="edit-email">Nouvel email</label>
            <input
              id="edit-email"
              v-model="champEmail"
              class="input"
              :class="{ 'input-error': champEmail && erreurEmail }"
              type="email"
            />
            <p v-if="champEmail && erreurEmail" class="field-error">{{ erreurEmail }}</p>
          </div>
          <div class="edit-buttons">
            <button type="submit" class="btn btn-primary" :disabled="!!erreurEmail">
              Enregistrer
            </button>
            <button type="button" class="btn btn-secondary" @click="modeEdition = false">
              Annuler
            </button>
          </div>
        </form>
      </article>
    </Transition>

    <section class="stats-grid">
      <article class="panel stat-card">
        <p class="stat-label">Films en liste</p>
        <p class="stat-value">{{ stats.total }}</p>
      </article>
      <article class="panel stat-card">
        <p class="stat-label">Films vus</p>
        <p class="stat-value">{{ stats.vus }}</p>
      </article>
      <article class="panel stat-card">
        <p class="stat-label">Note moyenne</p>
        <p class="stat-value">
          {{ stats.moyenne ?? '-' }}<span v-if="stats.moyenne" class="stat-unit">/5</span>
        </p>
      </article>
      <article class="panel stat-card">
        <p class="stat-label">Genre favori</p>
        <p class="stat-value genre-val">{{ stats.genreFavori ?? '-' }}</p>
      </article>
    </section>

    <section v-if="stats.total > 0" class="dashboard-grid">
      <article class="panel dashboard-card">
        <div class="dashboard-head">
          <h2 class="dashboard-title">Progression</h2>
          <p class="dashboard-value">{{ stats.vus }}/{{ stats.total }}</p>
        </div>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" :style="{ width: `${stats.progression}%` }" />
        </div>
        <p class="text-muted dashboard-note">{{ stats.progression }}% de ta watchlist a ete vue</p>
      </article>

      <article class="panel dashboard-card">
        <div class="dashboard-head">
          <h2 class="dashboard-title">Top genres</h2>
          <p class="dashboard-value">{{ stats.topGenres.length }}</p>
        </div>
        <div v-if="stats.topGenres.length" class="genre-rank">
          <div v-for="(genre, index) in stats.topGenres" :key="genre.nom" class="genre-row">
            <span class="genre-index">#{{ index + 1 }}</span>
            <span class="genre-name">{{ genre.nom }}</span>
            <span class="genre-count">{{ genre.total }}</span>
          </div>
        </div>
        <p v-else class="text-muted dashboard-note">Ajoute des films avec des genres pour voir le classement.</p>
      </article>
    </section>

    <p v-if="stats.total === 0" class="panel empty-msg text-muted">
      Ta watchlist est vide, ajoute des films pour voir tes statistiques.
    </p>
  </section>
</template>

<style scoped>
.profile-view {
  display: grid;
  gap: 16px;
  padding-bottom: 32px;
}

.identity-card {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.avatar-wrap {
  flex-shrink: 0;
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  color: #fff;
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 5px var(--accent-soft);
}

.identity-info {
  flex: 1;
  min-width: 0;
}

.identity-name {
  margin: 0 0 4px;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
}

.identity-email {
  margin: 0;
  font-size: 0.9rem;
}

.identity-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-danger {
  color: var(--danger);
  background: var(--button-danger-soft-bg);
  border-color: rgba(211, 72, 72, 0.3);
}

.btn-danger:hover {
  background: var(--button-danger-soft-hover-bg);
  color: #fff;
  border-color: var(--danger);
  transform: translateY(-1px);
}

.edit-card {
  padding: 22px 24px;
}

.edit-title {
  margin: 0 0 4px;
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 700;
}

.edit-note {
  margin: 0 0 16px;
  font-size: 0.85rem;
}

.edit-form {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 5px;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-700);
}

.field-error {
  margin: 0;
  font-size: 0.8rem;
  color: var(--danger);
}

.edit-buttons {
  display: flex;
  gap: 8px;
}

.input-error {
  border-color: var(--danger) !important;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 12px;
}

.dashboard-card {
  padding: 20px 18px;
  display: grid;
  gap: 14px;
}

.dashboard-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 10px;
}

.dashboard-title {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-900);
}

.dashboard-value {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-strong);
}

.dashboard-note {
  margin: 0;
  font-size: 0.88rem;
}

.progress-track {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: var(--button-secondary-bg);
  overflow: hidden;
  border: 1px solid var(--line);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  box-shadow: 0 0 18px rgba(239, 95, 39, 0.25);
}

.genre-rank {
  display: grid;
  gap: 8px;
}

.genre-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--button-secondary-bg);
  border: 1px solid var(--line);
}

.genre-index {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-strong);
}

.genre-name {
  font-weight: 600;
  color: var(--text-900);
}

.genre-count {
  min-width: 28px;
  text-align: right;
  font-weight: 700;
  color: var(--text-700);
}

.stat-card {
  padding: 20px 18px;
  display: grid;
  gap: 8px;
  transition: transform var(--transition), box-shadow var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.stat-label {
  margin: 0;
  color: var(--text-700);
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-value {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1;
  color: var(--text-900);
}

.stat-unit {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-700);
  font-family: 'Open Sans', sans-serif;
}

.genre-val {
  font-size: clamp(1rem, 1.8vw, 1.4rem);
}

.empty-msg {
  padding: 20px;
  margin: 0;
  font-size: 0.92rem;
  text-align: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 760px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .identity-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
