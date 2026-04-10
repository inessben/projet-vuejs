<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAccountsStore } from '@/stores/accounts'
import { useWatchlistStore } from '@/stores/watchlist'

const router = useRouter()
const userStore = useUserStore()
const accountsStore = useAccountsStore()
const watchlistStore = useWatchlistStore()

const stats = computed(() => {
  const vus = watchlistStore.items.filter((i) => i.watched)
  const notes = vus.filter((i) => typeof i.rating === 'number').map((i) => i.rating)
  const moyenne = notes.length
    ? (notes.reduce((s, n) => s + n, 0) / notes.length).toFixed(1)
    : null

  const compteurGenres = {}
  vus.forEach((i) => {
    i.movie.Genre?.split(',').forEach((g) => {
      const genre = g.trim()
      if (genre) compteurGenres[genre] = (compteurGenres[genre] ?? 0) + 1
    })
  })
  const genreFavori = Object.entries(compteurGenres).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

  return { total: watchlistStore.items.length, vus: vus.length, moyenne, genreFavori }
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
  accountsStore.mettreAJourEmail(userStore.id, champEmail.value)
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
      <div class="avatar">{{ userStore.initiales }}</div>
      <div class="identity-info">
        <h1 class="section-title identity-name">@{{ userStore.username }}</h1>
        <p class="text-muted identity-email">{{ userStore.email }}</p>
      </div>
      <div class="identity-actions">
        <button class="btn btn-secondary" @click="ouvrirEdition">Modifier email</button>
        <button class="btn btn-danger" @click="seDeconnecter">Se déconnecter</button>
      </div>
    </article>

    <article v-if="modeEdition" class="panel edit-card">
      <h2 class="edit-title">Modifier l'email</h2>
      <p class="text-muted edit-note">Le nom d'utilisateur ne peut pas être changé.</p>
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
          <button type="submit" class="btn btn-primary" :disabled="!!erreurEmail">Enregistrer</button>
          <button type="button" class="btn btn-secondary" @click="modeEdition = false">Annuler</button>
        </div>
      </form>
    </article>

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
          {{ stats.moyenne ?? '—' }}<span v-if="stats.moyenne" class="stat-unit">/5</span>
        </p>
      </article>
      <article class="panel stat-card">
        <p class="stat-label">Genre favori</p>
        <p class="stat-value genre-val">{{ stats.genreFavori ?? '—' }}</p>
      </article>
    </section>

    <p v-if="stats.total === 0" class="panel empty-msg text-muted">
      Ta watchlist est vide — ajoute des films pour voir tes statistiques.
    </p>

  </section>
</template>

<style scoped>
.profile-view { display: grid; gap: 16px; padding-bottom: 24px; }

.identity-card {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.avatar {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  color: #fff;
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 6px rgba(255, 122, 69, 0.18);
}

.identity-info { flex: 1; min-width: 0; }
.identity-name { margin: 0 0 4px; font-size: clamp(1.2rem, 2vw, 1.6rem); }
.identity-email { margin: 0; font-size: 0.92rem; }
.identity-actions { display: flex; gap: 8px; flex-wrap: wrap; }

.btn-danger {
  color: var(--danger);
  background: rgba(255, 255, 255, 0.9);
  border-color: var(--danger);
}
.btn-danger:hover { background: var(--danger); color: #fff; transform: translateY(-1px); }

.edit-card { padding: 20px 24px; }
.edit-title { margin: 0 0 4px; font-family: 'Fraunces', serif; font-size: 1.1rem; }
.edit-note { margin: 0 0 16px; font-size: 0.85rem; }
.edit-form { display: grid; gap: 14px; }
.field { display: grid; gap: 5px; }
.field-label { font-size: 0.85rem; font-weight: 600; color: var(--text-700); }
.field-error { margin: 0; font-size: 0.8rem; color: var(--danger); }
.edit-buttons { display: flex; gap: 8px; }
.input-error { border-color: var(--danger) !important; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.stat-card { padding: 18px 16px; }
.stat-label { margin: 0 0 8px; color: var(--text-700); font-size: 0.85rem; }
.stat-value {
  margin: 0;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 700;
}
.stat-unit { font-size: 0.9rem; font-weight: 400; color: var(--text-700); }
.genre-val { font-size: clamp(1rem, 1.8vw, 1.4rem); }

.empty-msg { padding: 18px; margin: 0; font-size: 0.95rem; }

@media (max-width: 760px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .identity-card { flex-direction: column; align-items: flex-start; }
}
</style>
