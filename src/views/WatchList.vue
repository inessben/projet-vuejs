<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useWatchlistStore } from '@/stores/watchlist'

const store = useWatchlistStore()
const cursor = ref(0)

const testMovies = [
  { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994' },
  { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972' },
  { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008' }
]

function ajouterFilmTest() {
  const film = testMovies[cursor.value % testMovies.length]
  cursor.value += 1
  store.ajouter(film)
}
</script>

<template>
  <section class="page watchlist-view">
    <header class="panel header">
      <div>
        <h1 class="section-title">Ma watchlist</h1>
        <p class="text-muted">Retrouve tes films sauvegardes et suis ton avancement.</p>
      </div>
      <button class="btn btn-primary" @click="ajouterFilmTest">Ajouter un film test</button>
    </header>

    <p v-if="store.items.length === 0" class="panel empty-state">
      Ta watchlist est vide pour le moment.
    </p>

    <div v-else class="watchlist-grid">
      <article v-for="item in store.items" :key="item.movie.imdbID" class="panel watch-item">
        <div class="watch-main">
          <RouterLink :to="`/movie/${item.movie.imdbID}`" class="movie-link">
            <h2>{{ item.movie.Title }}</h2>
          </RouterLink>
          <p class="text-muted">{{ item.movie.Year || 'Annee inconnue' }}</p>
        </div>

        <div class="status-row">
          <span class="status" :class="item.watched ? 'status-seen' : 'status-pending'">
            {{ item.watched ? 'Vu' : 'A voir' }}
          </span>
          <span class="text-muted">Note: {{ item.rating ?? '-' }}/5</span>
        </div>

        <p v-if="item.comment" class="comment">"{{ item.comment }}"</p>

        <div class="actions">
          <button class="btn btn-secondary" @click="store.toggleVu(item.movie.imdbID)">
            {{ item.watched ? 'Marquer non vu' : 'Marquer vu' }}
          </button>
          <button class="btn btn-secondary" @click="store.retirer(item.movie.imdbID)">Retirer</button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.watchlist-view {
  display: grid;
  gap: 16px;
}

.header {
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header p {
  margin: 0;
}

.empty-state {
  margin: 0;
  padding: 16px;
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
}

.watch-main p {
  margin: 6px 0 0;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.status {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 700;
}

.status-seen {
  color: #fff;
  background: var(--success);
}

.status-pending {
  color: var(--text-900);
  background: rgba(255, 122, 69, 0.2);
}

.comment {
  margin: 0;
  color: var(--text-700);
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 760px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
