<script setup>
import { ref } from 'vue'
import { useWatchlistStore } from '~/stores/watchlist'

definePageMeta({ middleware: 'auth' })

const store = useWatchlistStore()
const formulaireOuvert = ref(null)

function toggleFormulaire(imdbID) {
  formulaireOuvert.value = formulaireOuvert.value === imdbID ? null : imdbID
}

function onAvisEnregistre() {
  formulaireOuvert.value = null
}
</script>

<template>
  <section class="page watchlist-view">
    <header class="panel wl-header">
      <div>
        <h1 class="section-title">Ma watchlist</h1>
        <p class="text-muted wl-subtitle">
          {{ store.items.length }} film{{ store.items.length > 1 ? 's' : '' }} sauvegardé{{
            store.items.length > 1 ? 's' : ''
          }}
        </p>
      </div>
    </header>

    <p v-if="store.items.length === 0" class="panel empty-state">
      Ta watchlist est vide, ajoute des films depuis la page d'accueil.
    </p>

    <div v-else class="watchlist-grid">
      <article
        v-for="item in store.items"
        :key="item.movie.imdbID"
        class="panel watch-item"
        :class="{ 'is-open': formulaireOuvert === item.movie.imdbID }"
      >
        <div class="watch-main">
          <img
            v-if="item.movie.Poster && item.movie.Poster !== 'N/A'"
            :src="item.movie.Poster"
            :alt="item.movie.Title"
            class="thumb"
          />
          <div v-else class="thumb thumb-placeholder">🎬</div>

          <div class="watch-info">
            <NuxtLink :to="`/movie/${item.movie.imdbID}`" class="movie-link">
              <h2 class="movie-title">{{ item.movie.Title }}</h2>
            </NuxtLink>
            <p class="movie-meta text-muted">{{ item.movie.Year || 'Année inconnue' }}</p>

            <div class="status-row">
              <span class="status" :class="item.watched ? 'status-seen' : 'status-pending'">
                {{ item.watched ? '✓ Vu' : '· À voir' }}
              </span>
              <RatingStars v-if="item.rating" :model-value="item.rating" :readonly="true" />
              <span v-else class="text-muted no-rating">Non noté</span>
            </div>

            <p v-if="item.comment" class="comment">"{{ item.comment }}"</p>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-secondary btn-sm" @click="store.toggleVu(item.movie.imdbID)">
            {{ item.watched ? 'Marquer non vu' : 'Marquer vu' }}
          </button>
          <button class="btn btn-secondary btn-sm" @click="toggleFormulaire(item.movie.imdbID)">
            {{
              formulaireOuvert === item.movie.imdbID
                ? 'Fermer'
                : item.rating
                  ? 'Modifier avis'
                  : 'Laisser un avis'
            }}
          </button>
          <button class="btn btn-danger-soft btn-sm" @click="store.retirer(item.movie.imdbID)">
            Retirer
          </button>
        </div>

        <Transition name="slide">
          <MovieReviewForm
            v-if="formulaireOuvert === item.movie.imdbID"
            :film-id="item.movie.imdbID"
            @enregistre="onAvisEnregistre"
          />
        </Transition>
      </article>
    </div>
  </section>
</template>

<style scoped>
.watchlist-view {
  display: grid;
  gap: 16px;
  padding-bottom: 32px;
}

.wl-header {
  padding: 20px 24px;
}

.wl-header .section-title {
  margin-bottom: 4px;
}

.wl-subtitle {
  margin: 0;
  font-size: 0.9rem;
}

.empty-state {
  margin: 0;
  padding: 28px;
  color: var(--text-700);
  font-size: 0.95rem;
  text-align: center;
}

.watchlist-grid {
  display: grid;
  gap: 12px;
}

.watch-item {
  padding: 16px;
  display: grid;
  gap: 14px;
  transition: box-shadow var(--transition);
}

.watch-item.is-open {
  box-shadow: 0 8px 32px rgba(255, 122, 69, 0.12);
  border-color: rgba(255, 122, 69, 0.22);
}

.watch-main {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.thumb {
  width: 56px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.thumb-placeholder {
  width: 56px;
  height: 80px;
  border-radius: var(--radius-sm);
  background: rgba(22, 32, 45, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.watch-info {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 5px;
}

.movie-link {
  text-decoration: none;
  color: var(--text-900);
}

.movie-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  transition: color var(--transition);
}

.movie-link:hover .movie-title {
  color: var(--accent-strong);
}

.movie-meta {
  margin: 0;
  font-size: 0.82rem;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.status {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-seen {
  color: #fff;
  background: var(--success);
}

.status-pending {
  color: var(--text-700);
  background: rgba(22, 32, 45, 0.07);
}

.no-rating {
  font-size: 0.8rem;
  font-style: italic;
}

.comment {
  margin: 0;
  color: var(--text-700);
  font-style: italic;
  font-size: 0.87rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 6px 14px;
  font-size: 0.82rem;
}

.btn-danger-soft {
  color: var(--danger);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(211, 72, 72, 0.25);
}

.btn-danger-soft:hover {
  background: var(--danger);
  color: #fff;
  border-color: var(--danger);
  transform: translateY(-1px);
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
</style>
