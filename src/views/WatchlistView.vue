<script setup>
import { ref, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
const store = useWatchlistStore()
const filtre = ref('tous')
const tri = ref('date')
const recherche = ref('')
const listeAffichee = computed(() => {
  let r = [...store.items]
  if (filtre.value === 'vus') r = r.filter((i) => i.watched)
  if (filtre.value === 'pas_vus') r = r.filter((i) => !i.watched)
  if (recherche.value) {
    const q = recherche.value.toLowerCase()
    r = r.filter((i) => i.movie.Title.toLowerCase().includes(q))
  }
  if (tri.value === 'date') r.sort((a, b) => b.addedAt - a.addedAt)
  if (tri.value === 'note') r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  if (tri.value === 'titre') r.sort((a, b) => a.movie.Title.localeCompare(b.movie.Title))
  return r
})
</script>
