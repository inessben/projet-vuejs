<script setup>
import { useWatchlistStore } from '@/stores/watchlist'
const store = useWatchlistStore()

const testMovie = { imdbID: 'tt0111161', Title: 'The Shawshank Redemption' }

const ajouter = () => store.ajouter(testMovie)
const retirer = () => store.retirer(testMovie.imdbID)
const marquerVu = () => store.toggleVu(testMovie.imdbID)
</script>

<template>
  <div>
    <button @click="ajouter">Ajouter film</button>
    <button @click="marquerVu">Marquer vu</button>
    <button @click="retirer">Retirer</button>
    <pre>{{ store.items }}</pre>
  </div>
</template>
