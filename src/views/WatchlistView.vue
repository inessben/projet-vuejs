<script setup>
import { ref, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlist'
const store = useWatchlistStore()
const filtre = ref('tous') // 'tous', 'vus', 'pas_vus'
const tri = ref('date') // 'date', 'note', 'titre'
const recherche = ref('') // recherche par titre dans la liste
const listeAffichee = computed(() => {
  let r = [...store.items]
  // Filtre par statut
  if (filtre.value === 'vus') r = r.filter((i) => i.watched)
  if (filtre.value === 'pas_vus') r = r.filter((i) => !i.watched)
  // Recherche par titre
  if (recherche.value) {
    const q = recherche.value.toLowerCase()
    r = r.filter((i) => i.movie.Title.toLowerCase().includes(q))
  }
  // Tri
  if (tri.value === 'date') r.sort((a, b) => b.addedAt - a.addedAt)
  if (tri.value === 'note') r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  if (tri.value === 'titre') r.sort((a, b) => a.movie.Title.localeCompare(b.movie.Title))
  return r
})
</script>
