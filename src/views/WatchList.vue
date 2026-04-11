<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { useWatchlistStore } from '@/stores/watchlist'
import RatingStars from '@/components/RatingStars.vue'

const store = useWatchlistStore()

const MovieReviewForm = defineAsyncComponent(() => import('@/views/MovieReviewForm.vue'))

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
    <header class="panel header">
      <div>
        <h1 class="section-title">Ma watchlist</h1>
        <p class="text-muted">Retrouve tes films sauvegardés et suis ton avancement.</p>
      </div>
    </header>

    <p v-if="store.items.length === 0" class="panel empty-state">
      Ta watchlist est vide — ajoute des films depuis la page d'accueil.
    </p>

    <div v-else class="watchlist-grid">
      <article v-for="item in store.items" :key="item.movie.imdbID" class="panel watch-item">

        <div class="watch-main">
          <RouterLink :to="`/movie/${item.movie.imdbID}`" class="movie-link">
            <h2>{{ item.movie.Title }}</h2>
          </RouterLink>
          <p class="text-muted">{{ item.movie.Year || 'Année inconnue' }}</p>
        </div>

        <div class="status-row">
          <span class="status" :class="item.watched ? 'status-seen' : 'status-pending'">
            {{ item.watched ? 'Vu' : 'À voir' }}
          </span>
          <RatingStars v-if="item.rating" :model-value="item.rating" :readonly="true" />
          <span v-else class="text-muted no-rating">Pas encore noté</span>
        </div>

        <p v-if="item.comment" class="comment">"{{ item.comment }}"</p>

        <div class="actions">
          <button class="btn btn-secondary" @click="store.toggleVu(item.movie.imdbID)">
            {{ item.watched ? 'Marquer non vu' : 'Marquer vu' }}
          </button>
          <button
            class="btn btn-secondary"
            @click="toggleFormulaire(item.movie.imdbID)"
          >
            {{ formulaireOuvert === item.movie.imdbID ? 'Fermer' : item.rating ? 'Modifier avis' : 'Laisser un avis' }}
          </button>
          <button class="btn btn-danger-soft" @click="store.retirer(item.movie.imdbID)">
            Retirer
          </button>
        </div>

        <MovieReviewForm
          v-if="formulaireOuvert === item.movie.imdbID"
          :film-id="item.movie.imdbID"
          @enregistre="onAvisEnregistre"
        />

      </article>
    </div>
  </section>
</template>

<style scoped>
.watchlist-view {
  display: grid;
  gap: 16px;
  padding-bottom: 24px;
}

.header {
  padding: 18px;
}

.header p { margin: 0; }

.empty-state {
  margin: 0;
  padding: 18px;
  color: var(--text-700);
}

.watchlist-grid {
  display: grid;
  gap: 14px;
}

.watch-item {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.movie-link {
  text-decoration: none;
  color: var(--text-900);
}

.movie-link h2 {
  margin: 0;
  font-size: 1.1rem;
  transition: color 160ms ease;
}

.movie-link:hover h2 { color: var(--accent-strong); }

.watch-main p { margin: 4px 0 0; }

.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.status {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.status-seen   { color: #fff; background: var(--success); }
.status-pending { color: var(--text-900); background: rgba(255, 122, 69, 0.18); }

.no-rating {
  font-size: 0.85rem;
  font-style: italic;
}

.comment {
  margin: 0;
  color: var(--text-700);
  font-style: italic;
  font-size: 0.92rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-danger-soft {
  color: var(--danger);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(211, 72, 72, 0.3);
}

.btn-danger-soft:hover {
  background: var(--danger);
  color: #fff;
}
</style>
