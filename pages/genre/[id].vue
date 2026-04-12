<script setup>
import { ref, computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()

const { searchByGenre } = useOmdb()

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation']

const genre = computed(() => route.params.id || 'Action')
const films = ref([])
const page = ref(1)
const chargement = ref(false)
const erreur = ref(null)

watch(
  genre,
  async (g) => {
    page.value = 1
    films.value = []
    chargement.value = true
    erreur.value = null
    try {
      const data = await searchByGenre(g)
      films.value = data.Search ?? []
    } catch (e) {
      erreur.value = e.message
    } finally {
      chargement.value = false
    }
  },
  { immediate: true }
)

useInfiniteScroll(async () => {
  if (chargement.value) return
  page.value++
  try {
    const data = await searchByGenre(genre.value, page.value)
    films.value.push(...(data.Search ?? []))
  } catch {}
})
</script>

<template>
  <section class="page genre-view">
    <article class="panel hero">
      <p class="eyebrow">Exploration</p>
      <h1 class="section-title">Genre : <span class="genre-name">{{ genre }}</span></h1>

      <nav class="genre-pills" aria-label="Choisir un genre">
        <button
          v-for="g in GENRES"
          :key="g"
          class="pill"
          :class="{ 'pill-active': g.toLowerCase() === genre.toLowerCase() }"
          @click="router.push('/genre/' + g)"
        >
          {{ g }}
        </button>
      </nav>
    </article>

    <p v-if="erreur" class="panel state-msg text-muted">Erreur : {{ erreur }}</p>

    <MovieGrid
      :films="films"
      :chargement="chargement"
      :message-vide="`Aucun film trouvé pour le genre « ${genre} ».`"
    >
      <template #actions="{ movie }">
        <WatchlistButton :film="movie" />
      </template>
    </MovieGrid>
  </section>
</template>

<style scoped>
.genre-view {
  display: grid;
  gap: 18px;
  padding-bottom: 24px;
}

.hero {
  padding: 18px;
  display: grid;
  gap: 14px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: var(--text-700);
  font-weight: 700;
}

.hero h1 {
  margin: 0;
}

.genre-name {
  text-transform: capitalize;
}

.genre-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.7);
  color: var(--text-700);
  font: inherit;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
}

.pill:hover {
  background: #fff;
  color: var(--text-900);
}

.pill-active {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  color: #fff;
  border-color: transparent;
}

.state-msg {
  padding: 18px;
  margin: 0;
}
</style>
